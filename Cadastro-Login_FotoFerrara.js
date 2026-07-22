// Banco de Dados Local (localStorage)
function obterUsuarios() {
    const users = localStorage.getItem('usuarios');
    return users ? JSON.parse(users) : {};
}

function salvarUsuarios(users) {
    localStorage.setItem('usuarios', JSON.stringify(users));
}

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Login usando Banco de Dados Local + Conta Admin Padrão
async function fazerLogin(email, senha) {
    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }
    if (!validarEmail(email)) {
        alert("Email inválido!");
        return;
    }

    // Conta de administrador padrão
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
        
        // Redireciona para o dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

// Cadastro usando Banco de Dados Local
async function fazerCadastro(nome, email, senha, confirmarSenha) {
    if (!nome || !email || !senha || !confirmarSenha) {
        alert("Preencha todos os campos!");
        return;
    }
    if (!validarEmail(email)) {
        alert("Email inválido!");
        return;
    }
    if (senha !== confirmarSenha) {
        alert("As senhas não conferem!");
        return;
    }

    const usuarios = obterUsuarios();
    
    if (usuarios[email]) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Registra o usuário localmente
    usuarios[email] = {
        nome: nome,
        senha: senha
    };
    salvarUsuarios(usuarios);
    
    alert("Cadastro realizado com sucesso!");
    window.location.href = 'Login - Fotoferrara.html'; // Redireciona para login
}

// Vinculação de Eventos nos Formulários HTML
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginSenha').value;
            fazerLogin(email, senha);
        });
    }

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('cadastroNome').value;
            const email = document.getElementById('cadastroEmail').value;
            const senha = document.getElementById('cadastroSenha').value;
            const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;
            fazerCadastro(nome, email, senha, confirmarSenha);
        });
    }
});
