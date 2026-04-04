const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Selecionando os botões de ação
const signUpBtn = document.getElementById('btn-signup');
const signInBtn = document.getElementById('btn-signin');

// Animação de troca de tela
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// --- LÓGICA DE REGISTRO ---
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(name && email && pass) {
        // Verificar se o e-mail já existe
        const userExists = localStorage.getItem(email);

        if (userExists) {
            alert("Este e-mail já está cadastrado! Tente fazer login.");
            container.classList.remove("active");
            return;
        }

        // Salva o usuário usando o e-mail como chave única
        const user = { name, email, pass };
        localStorage.setItem(email, JSON.stringify(user)); 
        
        alert("Conta criada com sucesso! Agora você pode entrar.");
        container.classList.remove("active");
    } else {
        alert("Por favor, preencha todos os campos para criar sua conta.");
    }
});

// --- LÓGICA DE LOGIN (IDENTIFICA O USUÁRIO ATIVO) ---
signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        
        if (user.pass === pass) {
            // GUARDA O EMAIL DO USUÁRIO LOGADO
            localStorage.setItem('lastLoggedIn', email); 
            window.location.href = "dashboard.html";
        } else {
            alert("Senha incorreta! Tente novamente.");
        }
    } else {
        alert("Usuário não encontrado. Verifique o e-mail ou crie uma conta.");
    }
});