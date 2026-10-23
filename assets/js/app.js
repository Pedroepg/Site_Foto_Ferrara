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




/* ---------- utilidades ---------- */
function lerJSON(chave, padrao) {
    try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; }
}
function escapar(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function atualizarIcones() { if (window.lucide) lucide.createIcons(); }

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
    const catsAtuais = (new URLSearchParams(location.search).get('cat') || '').split(',').filter(Boolean);
    const naLoja = pagina === PAGINAS.loja;
    const links = [
        { href: PAGINAS.loja, label: 'Produtos', ativo: naLoja && catsAtuais.length === 0 },
        ...MENU.map(g => ({
            href: `${PAGINAS.loja}?cat=${g.cats.join(',')}`, label: g.label,
            ativo: naLoja && catsAtuais.length > 0 && catsAtuais.every(c => g.cats.includes(c))
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
            <a href="${PAGINAS.home}">Início</a>
            ${MENU.map(g => `<a href="${PAGINAS.loja}?cat=${g.cats.join(',')}">${g.label}</a>`).join('')}
            <a href="${PAGINAS.carrinho}">Carrinho</a>
            <a href="${estaLogado() && !ehAdmin() ? PAGINAS.conta : PAGINAS.login}">Minha conta</a>
        </div>
        &copy; 2026 FotoFerrara - Todos os direitos reservados`;
    alvo.replaceWith(el);
}

document.addEventListener('DOMContentLoaded', () => {
    montarCabecalho();
    montarRodape();
    atualizarIcones();
});
