// Banco de Dados Local (localStorage) — provisório até a integração com o MySQL/API
function obterUsuarios() {
    try { return JSON.parse(localStorage.getItem('usuarios')) || {}; } catch (e) { return {}; }
}
function salvarUsuarios(users) {
    localStorage.setItem('usuarios', JSON.stringify(users));
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Valida CPF pelos dígitos verificadores
function validarCPF(cpf) {
    const d = cpf.replace(/\D/g, '');
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) soma += Number(d[i]) * (t + 1 - i);
        const dv = ((soma * 10) % 11) % 10;
        if (dv !== Number(d[t])) return false;
    }
    return true;
}

// Só aceita redirecionar para páginas locais do próprio site
function destinoSeguro(next) {
    return next && /^[\w .\-]+\.html$/.test(next) ? next : null;
}
function paramNext() {
    return destinoSeguro(new URLSearchParams(location.search).get('next'));
}

// Máscaras simples
function mascara(el, fn) { el.addEventListener('input', () => { el.value = fn(el.value.replace(/\D/g, '')); }); }
const maskCPF = v => v.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const maskTel = v => v.slice(0, 11).replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
const maskCEP = v => v.slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');

// Login
async function fazerLogin(email, senha) {
    if (!email || !senha) { alert("Preencha todos os campos!"); return; }
    if (!validarEmail(email)) { alert("Email inválido!"); return; }

    // Conta de administrador padrão -> painel
    if (email === "admin@fotoferrara.com" && senha === "senha123") {
        localStorage.setItem('token', 'LOCAL-TOKEN-ADMIN');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', 'Administrador');
        window.location.href = 'dashboard.html';
        return;
    }

    const usuarios = obterUsuarios();
    if (usuarios[email] && usuarios[email].senha === senha) {
        localStorage.setItem('token', 'LOCAL-TOKEN-' + btoa(email));
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', usuarios[email].nome);
        // Cliente volta para onde estava (ex.: carrinho) ou vai para a loja
        window.location.href = paramNext() || 'loja.html';
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

// Cadastro com dados completos do cliente
async function fazerCadastro(d) {
    const obrig = ['nome', 'email', 'telefone', 'cpf', 'senha', 'confirmarSenha', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'uf'];
    if (obrig.some(k => !d[k])) { alert("Preencha todos os campos obrigatórios!"); return; }
    if (!validarEmail(d.email)) { alert("Email inválido!"); return; }
    if (d.telefone.replace(/\D/g, '').length < 10) { alert("Telefone inválido!"); return; }
    if (!validarCPF(d.cpf)) { alert("CPF inválido!"); return; }
    if (d.cep.replace(/\D/g, '').length !== 8) { alert("CEP inválido!"); return; }
    if (d.uf.length !== 2) { alert("UF deve ter 2 letras (ex.: SP)."); return; }
    if (d.senha.length < 6) { alert("A senha deve ter pelo menos 6 caracteres!"); return; }
    if (d.senha !== d.confirmarSenha) { alert("As senhas não conferem!"); return; }

    const usuarios = obterUsuarios();
    if (usuarios[d.email]) { alert("Este e-mail já está cadastrado!"); return; }

    usuarios[d.email] = {
        nome: d.nome,
        senha: d.senha,
        telefone: d.telefone,
        cpf: d.cpf,
        endereco: {
            cep: d.cep, rua: d.rua, numero: d.numero, complemento: d.complemento,
            bairro: d.bairro, cidade: d.cidade, uf: d.uf.toUpperCase()
        },
        criadoEm: new Date().toISOString()
    };
    salvarUsuarios(usuarios);

    alert("Cadastro realizado com sucesso!");
    const next = paramNext();
    window.location.href = 'Login - Fotoferrara.html' + (next ? '?next=' + encodeURIComponent(next) : '');
}

// Busca endereço pelo CEP (ViaCEP); se estiver sem internet, o usuário preenche à mão
async function buscarCep(prefixo) {
    const cep = document.getElementById(prefixo + 'Cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
        const j = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
        if (j.erro) return;
        document.getElementById(prefixo + 'Rua').value = j.logradouro || '';
        document.getElementById(prefixo + 'Bairro').value = j.bairro || '';
        document.getElementById(prefixo + 'Cidade').value = j.localidade || '';
        document.getElementById(prefixo + 'Uf').value = j.uf || '';
        document.getElementById(prefixo + 'Numero').focus();
    } catch (e) { /* ignora */ }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            fazerLogin(document.getElementById('loginEmail').value.trim(), document.getElementById('loginSenha').value);
        });
        const aviso = document.getElementById('avisoNext');
        if (aviso && paramNext()) aviso.style.display = 'block';
        const esq = document.getElementById('esqueceuSenha');
        if (esq) esq.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Recuperação de senha ainda não está disponível. Procure a loja ou crie uma nova conta.");
        });
        const criar = document.getElementById('linkCriarConta');
        if (criar && paramNext()) criar.href += '?next=' + encodeURIComponent(paramNext());
    }

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        mascara(document.getElementById('cadastroCpf'), maskCPF);
        mascara(document.getElementById('cadastroTelefone'), maskTel);
        mascara(document.getElementById('cadastroCep'), maskCEP);
        document.getElementById('cadastroCep').addEventListener('blur', () => buscarCep('cadastro'));
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const v = id => document.getElementById(id).value.trim();
            fazerCadastro({
                nome: v('cadastroNome'), email: v('cadastroEmail'), telefone: v('cadastroTelefone'), cpf: v('cadastroCpf'),
                senha: document.getElementById('cadastroSenha').value,
                confirmarSenha: document.getElementById('cadastroConfirmarSenha').value,
                cep: v('cadastroCep'), rua: v('cadastroRua'), numero: v('cadastroNumero'), complemento: v('cadastroComplemento'),
                bairro: v('cadastroBairro'), cidade: v('cadastroCidade'), uf: v('cadastroUf')
            });
        });
    }
});
