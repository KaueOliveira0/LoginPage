const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Selecionando os novos elementos
const signUpBtn = document.getElementById('btn-signup');
const signInBtn = document.getElementById('btn-signin');

// Animação de troca de tela (seu código original)
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// --- LÓGICA DE REGISTRO ---
// --- LÓGICA DE REGISTRO ATUALIZADA ---
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(name && email && pass) {
        // 1. Verificar se o e-mail já existe no banco (LocalStorage)
        const userExists = localStorage.getItem(email);

        if (userExists) {
            alert("Este e-mail já está cadastrado! Tente fazer login.");
            container.classList.remove("active"); // Opcional: leva o usuário para o login
            return; // PARA a execução aqui e não salva nada
        }

        // 2. Se não existir, salva normalmente
        const user = { name, email, pass };
        localStorage.setItem(email, JSON.stringify(user)); 
        alert("Conta criada com sucesso!");
        container.classList.remove("active");
    } else {
        alert("Preencha todos os campos!");
    }
});

// --- LÓGICA DE LOGIN ---
signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    // Busca o usuário pelo email (chave) no LocalStorage
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
        const user = JSON.parse(storedUser); // Transforma a string de volta em objeto
        
        if (user.pass === pass) {
            alert(`Bem-vindo de volta, ${user.name}!`);
            // Aqui você poderia redirecionar: window.location.href = "home.html";
        } else {
            alert("Senha incorreta!");
        }
    } else {
        alert("Usuário não encontrado!");
    }
});