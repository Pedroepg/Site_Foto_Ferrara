from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User, Group
from django.http import HttpResponseForbidden, JsonResponse
from .models import Produto
from .forms import FormularioProduto


def _autorizado(usuario):
    """Retorna True se o usuário for staff ou pertencer aos grupos 'gerente' ou 'funcionario'."""
    if not usuario or not usuario.is_authenticated:
        return False
    if usuario.is_staff:
        return True
    return usuario.groups.filter(name__in=['gerente', 'funcionario']).exists()


def painel(request):
    """View do painel de controle de estoque. Redireciona para a tela intermediária
    se o usuário não tiver autorização.
    """
    if not _autorizado(request.user):
        return redirect('/estoque/intermediaria/')

    produtos = Produto.objects.all().order_by('-atualizado_em')
    total = produtos.count()
    baixo_estoque = produtos.filter(quantidade__lt=5).count()
    contexto = {
        'produtos': produtos,
        'total_produtos': total,
        'baixo_estoque': baixo_estoque,
    }
    return render(request, 'estoque/painel.html', contexto)


def produto_criar(request):
    if not _autorizado(request.user):
        return redirect('/estoque/intermediaria/')

    if request.method == 'POST':
        formulario = FormularioProduto(request.POST)
        if formulario.is_valid():
            formulario.save()
            return redirect('estoque:painel')
    else:
        formulario = FormularioProduto()
    return render(request, 'estoque/produto_form.html', {'formulario': formulario})


def produto_editar(request, pk):
    if not _autorizado(request.user):
        return redirect('/estoque/intermediaria/')

    produto = get_object_or_404(Produto, pk=pk)
    if request.method == 'POST':
        formulario = FormularioProduto(request.POST, instance=produto)
        if formulario.is_valid():
            formulario.save()
            return redirect('estoque:painel')
    else:
        formulario = FormularioProduto(instance=produto)
    return render(request, 'estoque/produto_form.html', {'formulario': formulario, 'produto': produto})


def produto_excluir(request, pk):
    if not _autorizado(request.user):
        return redirect('/estoque/intermediaria/')

    produto = get_object_or_404(Produto, pk=pk)
    if request.method == 'POST':
        produto.delete()
        return redirect('estoque:painel')
    return render(request, 'estoque/produto_confirm_delete.html', {'produto': produto})


def firebase_login(request):
    """Endpoint de login temporário para integração com Firebase (mesma lógica do stub anterior).

    Aceita POST com idToken e role. Para desenvolvimento aceita tokens que comecem com TEST-.
    """
    if request.method != 'POST':
        return HttpResponseForbidden('Use POST para autenticar')

    id_token = request.POST.get('idToken') or request.POST.get('id_token')
    role = (request.POST.get('role') or '').lower()

    if not id_token or not role:
        return HttpResponseForbidden('idToken e role são obrigatórios (para testes)')

    uid = None
    if id_token.startswith('TEST-') or id_token.startswith('FIREBASE-'):
        uid = id_token.split('-', 1)[1]
    else:
        try:
            import firebase_admin
            from firebase_admin import auth as firebase_auth
            decoded = firebase_auth.verify_id_token(id_token)
            uid = decoded.get('uid') or decoded.get('sub')
            if not role:
                role = decoded.get('role', '')
        except Exception:
            return HttpResponseForbidden('Token inválido. Em desenvolvimento use TEST-<uid> ou configure firebase_admin.')

    if not uid:
        return HttpResponseForbidden('Não foi possível determinar UID')

    usuario, criado = User.objects.get_or_create(username=uid)
    if role in ['manager', 'gerente']:
        grupo, _ = Group.objects.get_or_create(name='gerente')
        usuario.groups.add(grupo)
        usuario.is_staff = True
        usuario.save()
    elif role in ['employee', 'funcionario']:
        grupo, _ = Group.objects.get_or_create(name='funcionario')
        usuario.groups.add(grupo)
        usuario.save()
    else:
        return HttpResponseForbidden('Role desconhecido')

    usuario.backend = 'django.contrib.auth.backends.ModelBackend'
    login(request, usuario)
    return redirect('/estoque/')


def intermediaria(request):
    """Tela intermediária (placeholder) para orientar a integração Firebase"""
    return render(request, 'estoque/intermediaria.html')


def api_dashboard_data(request):
    """API que retorna os dados consolidados do painel administrativo,
    integrando dados do PostgreSQL local (vendas) com produtos do banco SQLite
    e simulações premium para as demais visões.
    """
    if request.method == "OPTIONS":
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    total_produtos = Produto.objects.count()
    baixo_estoque = Produto.objects.filter(quantidade__lt=5).count()

    # Tenta consultar o banco de dados PostgreSQL conforme as credenciais de PIFerrara.py
    vendedores_labels = []
    vendedores_series = []
    
    try:
        from sqlalchemy import create_engine
        import pandas as pd
        
        USER = "postgres"
        PASSWORD = "2374"  
        HOST = "localhost"
        PORT = "5432"
        DATABASE = "meu_dashboard"
        
        # Conexão SQLAlchemy com PostgreSQL
        engine = create_engine(f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}")
        
        # Query idêntica à de PIFerrara.py
        query_grafico = """
            SELECT vendedor as "Vendedor", COUNT(id_venda) as "Quantidade_Vendas"
            FROM vendas_fotografia
            GROUP BY vendedor
            ORDER BY "Quantidade_Vendas" DESC;
        """
        df = pd.read_sql_query(query_grafico, engine)
        
        vendedores_labels = df["Vendedor"].tolist()
        vendedores_series = df["Quantidade_Vendas"].tolist()
        
    except Exception as e:
        # Fallback caso o PostgreSQL esteja offline ou faltem dependências
        print(f"Erro ao conectar ao PostgreSQL local (usando dados simulados): {e}")
        vendedores_labels = ['Carlos Souza', 'Ana Clara', 'Lucas Lima', 'Beatriz Costa', 'Fernanda Oliveira']
        vendedores_series = [42, 35, 28, 21, 15]

    data = {
        'total_clientes': 342,
        'sessoes_realizadas': 128,
        'faturamento_total': 48500.00,
        'agendamentos_hoje': 4,
        'crescimento_mensal': 12.5,
        'total_produtos': total_produtos,
        'baixo_estoque': baixo_estoque,
        'charts': {
            'crescimento': {
                'labels': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                'series': [8, 12, 10, 15, 14, 18]
            },
            'sessoes': {
                'labels': ['Retratos', 'Eventos', 'Ensaios Externos', 'Newborn', 'Casamentos'],
                'series': [44, 25, 30, 15, 14]
            },
            'financeiro': {
                'labels': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                'receitas': [12000, 15000, 13500, 18000, 17500, 22000],
                'despesas': [7000, 8500, 7800, 9200, 8900, 10500]
            },
            'vendedores': {
                'labels': vendedores_labels,
                'series': vendedores_series
            }
        },
        'clientes_recentes': [
            {'nome': 'Alice Silva', 'servico': 'Ensaio Newborn', 'data': '26/05/2026', 'valor': 850.00, 'status': 'Concluído'},
            {'nome': 'Bruno Souza', 'servico': 'Cobertura Casamento', 'data': '25/05/2026', 'valor': 3200.00, 'status': 'Pendente'},
            {'nome': 'Camila Lima', 'servico': 'Retrato Corporativo', 'data': '24/05/2026', 'valor': 450.00, 'status': 'Concluído'},
            {'nome': 'Daniel Rocha', 'servico': 'Ensaio Externo', 'data': '22/05/2026', 'valor': 700.00, 'status': 'Cancelado'},
            {'nome': 'Elisa Mello', 'servico': 'Álbum Premium Couro', 'data': '20/05/2026', 'valor': 350.00, 'status': 'Concluído'}
        ],
        'agenda': [
            {'titulo': 'Ensaio Gestante - Julia', 'horario': '09:00 - 11:30', 'tipo': 'Ensaios'},
            {'titulo': 'Reunião Noivos - Carlos & Ana', 'horario': '14:00 - 15:00', 'tipo': 'Reunião'},
            {'titulo': 'Retrato Profissional - Thiago', 'horario': '16:00 - 17:00', 'tipo': 'Retratos'},
            {'titulo': 'Entrega Álbum - Maria', 'horario': '17:30 - 18:00', 'tipo': 'Entrega'}
        ]
    }

    response = JsonResponse(data)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "*"
    return response
