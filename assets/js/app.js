/* =========================================================
   Foto Ferrara — núcleo compartilhado do site
   Produtos, carrinho, sessão e cabeçalho/rodapé em todas as páginas.
   (Dados em localStorage por enquanto; troque por chamadas à API/MySQL depois.)
   ========================================================= */

const PAGINAS = {
    home: 'HomePage - Fotoferrara.html',
    login: 'Login - Fotoferrara.html',
    cadastro: 'Cadastro - Fotoferrara.html',
    loja: 'loja.html',
    carrinho: 'carrinho.html',
    conta: 'conta.html',
    painel: 'dashboard.html'
};

const CATEGORIAS = {
    impressoes: 'Impressões de fotos',
    molduras: 'Molduras e Decoração',
    acessorios: 'Acessórios',
    presentes: 'Foto-presentes'
};

// ATENÇÃO: preços de exemplo (fictícios). Substituir pelos do banco de dados.
const PRODUTOS = [
    { id: 1,  cat: 'impressoes', nome: 'Foto 10x15 Brilho', preco: 1.50, icone: 'image', desc: 'Revelação em papel fotográfico brilhante, cores vivas.' },
    { id: 2,  cat: 'impressoes', nome: 'Foto 15x21 Fosca', preco: 4.50, icone: 'image', desc: 'Acabamento fosco, ideal para retratos e porta-retratos.' },
    { id: 3,  cat: 'impressoes', nome: 'Papel Glossy A4 (50 folhas)', preco: 59.90, icone: 'layers', desc: 'Papel fotográfico glossy para impressão em casa.' },
    { id: 4,  cat: 'impressoes', nome: 'Papel Matte 10x15 (100 folhas)', preco: 39.90, icone: 'layers', desc: 'Papel matte de alta gramatura, sem reflexo.' },
    { id: 5,  cat: 'impressoes', nome: 'Álbum 200 Fotos', preco: 89.90, icone: 'book-open', desc: 'Álbum com bolsos para até 200 fotos 10x15.' },
    { id: 6,  cat: 'molduras',   nome: 'Moldura A4 Preta', preco: 49.90, icone: 'frame', desc: 'Moldura clássica preta com vidro e suporte de parede.' },
    { id: 7,  cat: 'molduras',   nome: 'Moldura 20x25 Dourada', preco: 69.90, icone: 'frame', desc: 'Acabamento dourado envelhecido, combina com qualquer ambiente.' },
    { id: 8,  cat: 'molduras',   nome: 'Quadro Decorativo Médio', preco: 129.90, icone: 'image', desc: 'Quadro pronto para pendurar, impressão de alta qualidade.' },
    { id: 9,  cat: 'molduras',   nome: 'Tela Canvas 40x60', preco: 189.90, icone: 'image', desc: 'Sua foto impressa em canvas com bastidor de madeira.' },
    { id: 10, cat: 'molduras',   nome: 'Porta-Retrato de Madeira', preco: 39.90, icone: 'frame', desc: 'Porta-retrato de madeira natural para mesa.' },
    { id: 11, cat: 'molduras',   nome: 'Mini Suporte de Mesa', preco: 24.90, icone: 'frame', desc: 'Suporte compacto para fotos instantâneas.' },
    { id: 12, cat: 'acessorios', nome: 'Cartão SD 64GB', preco: 54.90, icone: 'hard-drive', desc: 'Cartão de memória classe 10, ótimo para fotos e vídeos.' },
    { id: 13, cat: 'acessorios', nome: 'Tripé Fotográfico', preco: 119.90, icone: 'camera', desc: 'Tripé ajustável em alumínio com bolsa de transporte.' },
    { id: 14, cat: 'acessorios', nome: 'Lente 50mm f/1.8', preco: 649.00, icone: 'aperture', desc: 'Lente fixa luminosa, perfeita para retratos.' },
    { id: 15, cat: 'acessorios', nome: 'Lente 18-55mm', preco: 459.00, icone: 'aperture', desc: 'Lente zoom versátil para o dia a dia.' },
    { id: 16, cat: 'acessorios', nome: 'Ring Light 18"', preco: 179.90, icone: 'lamp', desc: 'Iluminação circular com intensidade regulável.' },
    { id: 17, cat: 'acessorios', nome: 'Softbox com Tripé', preco: 249.90, icone: 'sun', desc: 'Kit de iluminação suave para estúdio.' },
    { id: 18, cat: 'acessorios', nome: 'Câmera DSLR Canon', preco: 3899.00, icone: 'camera', desc: 'Câmera DSLR para quem quer levar a fotografia a sério.' },
    { id: 19, cat: 'acessorios', nome: 'Câmera Instantânea Fujifilm', preco: 549.00, icone: 'camera', desc: 'Fotos reveladas na hora, direto da câmera.' },
    { id: 20, cat: 'acessorios', nome: 'Impressora Fotográfica Epson', preco: 1299.00, icone: 'printer', desc: 'Impressora fotográfica com tanque de tinta.' },
    { id: 21, cat: 'acessorios', nome: 'Cartucho Tinta Colorido', preco: 69.90, icone: 'droplet', desc: 'Cartucho colorido compatível com a impressora Epson.' },
    { id: 22, cat: 'presentes',  nome: 'Caneca Branca Personalizada', preco: 39.90, icone: 'coffee', desc: 'Caneca de cerâmica com a sua foto favorita.' },
    { id: 23, cat: 'presentes',  nome: 'Caneca Interior Colorido', preco: 44.90, icone: 'coffee', desc: 'Interior e alça coloridos, foto personalizada.' },
    { id: 24, cat: 'presentes',  nome: 'Relógio com Foto Personalizada', preco: 99.90, icone: 'clock', desc: 'Relógio de parede com a sua foto no mostrador.' },
    { id: 25, cat: 'presentes',  nome: 'Relógio de Parede Vintage', preco: 89.90, icone: 'clock', desc: 'Relógio de parede em estilo vintage.' },
    { id: 26, cat: 'presentes',  nome: 'Álbum Premium Couro', preco: 159.90, icone: 'book-open', desc: 'Álbum artesanal com capa de couro para presentear.' }
];

// Regras de exemplo do frete (ajustar depois)
const FRETE_FIXO = 15;
const FRETE_GRATIS_ACIMA = 200;

/* ---------- utilidades ---------- */
function brl(v) { return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function produtoPorId(id) { return PRODUTOS.find(p => p.id === Number(id)); }
function lerJSON(chave, padrao) {
    try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; }
}
function escapar(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- sessão ---------- */
function estaLogado() { return !!localStorage.getItem('token'); }
function ehAdmin() { return localStorage.getItem('token') === 'LOCAL-TOKEN-ADMIN'; }
function usuarioAtual() {
    const email = localStorage.getItem('userEmail');
    const cadastro = (lerJSON('usuarios', {}))[email] || {};
    return { email, nome: localStorage.getItem('userName') || cadastro.nome || '', ...cadastro };
}
function sair() {
    // Remove só a sessão — NÃO apaga usuários cadastrados, carrinho nem pedidos.
    ['token', 'userEmail', 'userName'].forEach(k => localStorage.removeItem(k));
    window.location.href = PAGINAS.home;
}

/* ---------- carrinho ---------- */
function lerCarrinho() { return lerJSON('carrinho', {}); }
function salvarCarrinho(c) { localStorage.setItem('carrinho', JSON.stringify(c)); atualizarBadge(); }
function adicionarAoCarrinho(id, qtd = 1) {
    const c = lerCarrinho(); c[id] = (c[id] || 0) + qtd; salvarCarrinho(c);
}
function definirQuantidade(id, qtd) {
    const c = lerCarrinho();
    if (qtd <= 0) delete c[id]; else c[id] = qtd;
    salvarCarrinho(c);
}
function limparCarrinho() { salvarCarrinho({}); }
function itensDoCarrinho() {
    const c = lerCarrinho();
    return Object.keys(c).map(id => ({ produto: produtoPorId(id), qtd: c[id] })).filter(i => i.produto);
}
function subtotal() { return itensDoCarrinho().reduce((s, i) => s + i.produto.preco * i.qtd, 0); }
function frete(sub) { return sub === 0 || sub >= FRETE_GRATIS_ACIMA ? 0 : FRETE_FIXO; }
function totalItens() { return itensDoCarrinho().reduce((s, i) => s + i.qtd, 0); }
function atualizarBadge() {
    const b = document.getElementById('cartBadge'); if (!b) return;
    const n = totalItens(); b.textContent = n; b.classList.toggle('show', n > 0);
}

/* ---------- interface ---------- */
function mostrarAviso(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200);
}

function montarCabecalho() {
    const alvo = document.getElementById('site-header'); if (!alvo) return;
    const pagina = decodeURIComponent(location.pathname.split('/').pop() || '');
    const catAtual = new URLSearchParams(location.search).get('cat');
    const links = [
        { href: PAGINAS.home, label: 'Início', ativo: pagina === PAGINAS.home },
        ...Object.entries(CATEGORIAS).map(([k, l]) => ({
            href: `${PAGINAS.loja}?cat=${k}`, label: l, ativo: pagina === PAGINAS.loja && catAtual === k
        }))
    ];
    let conta;
    if (estaLogado()) {
        const nome = (localStorage.getItem('userName') || 'Minha conta').split(' ')[0];
        conta = ehAdmin()
            ? `<a href="${PAGINAS.painel}">Painel</a><a href="#" id="btnSair">Sair</a>`
            : `<a href="${PAGINAS.conta}" class="${pagina === PAGINAS.conta ? 'active' : ''}">Olá, ${escapar(nome)}</a><a href="#" id="btnSair">Sair</a>`;
    } else {
        conta = `<a href="${PAGINAS.login}" class="primary-btn">Entrar</a>`;
    }
    const el = document.createElement('header');
    el.className = 'site-header';
    el.innerHTML = `
        <a href="${PAGINAS.home}" class="logo">
            <div class="logo-box"><i data-lucide="camera"></i></div>
            <span class="logo-text">Foto<span>Ferrara</span></span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu"><i data-lucide="menu"></i></button>
        <nav class="site-nav" id="siteNav">
            ${links.map(l => `<a href="${l.href}" class="${l.ativo ? 'active' : ''}">${l.label}</a>`).join('')}
            <a href="${PAGINAS.carrinho}" class="cart-link ${pagina === PAGINAS.carrinho ? 'active' : ''}" aria-label="Carrinho">
                <i data-lucide="shopping-cart"></i><span class="cart-badge" id="cartBadge">0</span>
            </a>
            ${conta}
        </nav>`;
    alvo.replaceWith(el);
    document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('siteNav').classList.toggle('open'));
    const s = document.getElementById('btnSair');
    if (s) s.addEventListener('click', e => { e.preventDefault(); sair(); });
    atualizarBadge();
}

function montarRodape() {
    const alvo = document.getElementById('site-footer'); if (!alvo) return;
    const el = document.createElement('footer');
    el.className = 'site-footer';
    el.innerHTML = `
        <div class="footer-links">
            ${Object.entries(CATEGORIAS).map(([k, l]) => `<a href="${PAGINAS.loja}?cat=${k}">${l}</a>`).join('')}
            <a href="${PAGINAS.carrinho}">Carrinho</a>
            <a href="${estaLogado() && !ehAdmin() ? PAGINAS.conta : PAGINAS.login}">Minha conta</a>
        </div>
        &copy; 2026 FotoFerrara - Todos os direitos reservados`;
    alvo.replaceWith(el);
}

document.addEventListener('DOMContentLoaded', () => {
    montarCabecalho();
    montarRodape();
    if (window.lucide) lucide.createIcons();
});
