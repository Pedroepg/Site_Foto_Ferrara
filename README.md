# Foto Ferrara E-Commerce & Painel — Versão 1.0.5 (PI_v_1.0.5)

> **Versão Oficial Mais Recente (6º Semestre — FAM)**  
> **Data de Lançamento:** Novembro / 2026  
> **Repositório Central:** `6_Semetre/PI_v_1.0.5`

---

## 🚀 Novidades da Versão 1.0.5

Esta versão consolida os recursos mais avançados do Projeto Interdisciplinar para a **Foto Ferrara**, trazendo autonomia para o cliente enviar fotos para revelação online e novas ferramentas analíticas para a diretoria no Dashboard administrativo.

### 1. Sistema de Envio de Fotos para Impressão Online (`impressao.html`)
- **Upload Múltiplo Interativo:**
  - Área *Drag & Drop* moderna com suporte a múltiplos arquivos (JPG, PNG, WebP) direto da câmera, galeria ou WhatsApp.
  - Pré-visualização instantânea em grade com miniaturas de cada foto enviada.
- **Configurações por Foto e em Lote (Batch):**
  - **Formatos Disponíveis:** 10x15 cm (Clássico), 13x18 cm (Porta-Retrato), 15x21 cm (A5), 20x30 cm (A4 / Pôster), Estilo Polaroid (8x10 cm) e Cartela 3x4 para documentos.
  - **Tipo de Papel:** Fotográfico Brilhante (*Glossy*) ou Fosco (*Matte* / Acetinado).
  - **Acabamento:** Com borda branca clássica ou sem borda (sangria total).
  - **Enquadramento:** Ajustar imagem inteira sem cortes ou preencher papel com recorte automático.
  - **Quantidade:** Seletor de cópias independente por foto (`[-]` `[qtd]` `[+]`).
  - **Configurador Rápido:** Botão "Aplicar a Todas as Fotos" para pedidos com 20, 50 ou mais fotos.
- **Desconto Progressivo por Volume:**
  - 1 a 19 fotos: Tabela padrão.
  - 20 a 49 fotos: **10% de desconto automático**.
  - 50+ fotos: **20% de desconto automático**.
  - Barra de progresso visual estimulando o cliente a adicionar mais fotos para desbloquear o desconto.
- **Checkout Híbrido:**
  - **Adicionar ao Carrinho:** Integração direta com `carrinho.html` do site para pagamento online (Pix/Cartão/Boleto) e cálculo de frete.
  - **Enviar via WhatsApp:** Geração automática da mensagem para `(11) 3258-9351` com discriminação de fotos, tamanhos e valores.

---

### 2. Painel Financeiro Anual & Períodos Interativos no Dashboard (`dashboard.html`)
- **Faturamento Anual:**
  - Visualização histórica consolidada comparando os anos de **2023, 2024, 2025 e 2026**.
  - Demonstrativo de Faturamento Anual (DRE Consolidado) com faturamento bruto, custos de insumos de laboratório, despesas fixas e margem líquida.
- **Filtros Dinâmicos de Períodos:**
  - **Botão Anual:** Gráfico consolidado com evolução dos exercícios.
  - **Botão Mensal:** Detalhamento dos 12 meses (Jan a Dez) do ano ativo.
  - **Botão Trimestral:** Agrupamento por trimestres (Q1 a Q4).
  - **Seletor de Ano Ativo:** Dropdown com alternância rápida entre 2026, 2025 e 2024.
- **Botões Interativos de Desempenho Financeiro:**
  - `[Faturamento vs Despesas]`: Comparativo entre receitas brutas e custos operacionais.
  - `[Lucro Líquido]`: Curva de rentabilidade real e margem de lucro.
  - `[Faturamento por Categoria]`: Distribuição por segmento (Relógios, Revelação Online, Câmeras/Filmes, Presentes e Serviços Técnicos).
  - `[Ticket Médio]`: Evolução do valor médio gasto por cliente.
- **Cards de Indicadores (KPIs) Reativos:**
  - Todos os números do topo (Faturamento Total, Lucro Líquido, Meta Anual e Ticket Médio) são recalculados em tempo real com transições suaves via ApexCharts ao clicar em qualquer filtro.

---

## 📂 Estrutura de Arquivos da Versão 1.0.5

```text
PI_v_1.0.5/
├── HomePage - Fotoferrara.html     # Página inicial com banner da nova Revelação Online
├── impressao.html                  # ★ NOVO: Envio de fotos, formatos e cálculo de impressão ★
├── loja.html                       # Catálogo de produtos com botão direto para envio de fotos
├── carrinho.html                   # Carrinho integrado com suporte a itens de impressão
├── dashboard.html                  # ★ Painel com Faturamento Anual, períodos e botões interativos ★
├── Login - Fotoferrara.html        # Autenticação segura com hash SHA-256
├── Cadastro - Fotoferrara.html     # Cadastro de clientes com validação de CPF e CEP
├── conta.html                      # Painel do cliente logado
├── assets/
│   ├── css/theme.css               # Design system compartilhado com destaque de navegação
│   ├── js/app.js                   # Núcleo do site, menu dinâmico e gestão de carrinho custom
│   ├── js/catalogo.js              # Base de produtos e regras de compra
│   └── img/                        # Imagens de produtos e artigos do blog
├── tests/
│   └── auth-hash.test.js           # Suíte de testes de hash de senha
└── backend/                        # API Django e controle de estoque
```

---

## 🛠️ Como Executar

1. Abra a pasta `6_Semetre/PI_v_1.0.5` no Visual Studio Code.
2. Inicie com **Live Server** ou abra `HomePage - Fotoferrara.html` no navegador.
3. Para testar o envio de fotos: acesse o botão **"Imprimir Fotos"** no menu do topo ou abra diretamente `impressao.html`.
4. Para testar o painel interativo: faça login como administrador ou acesse `dashboard.html`.
