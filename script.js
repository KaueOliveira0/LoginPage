// Inicializando as ferramentas do Firebase
const auth = firebase.auth();
const db = firebase.firestore();

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const signUpBtn = document.getElementById('btn-signup');
const signInBtn = document.getElementById('btn-signin');

// Animação de troca de tela (Mantida igual)
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// --- LÓGICA DE REGISTRO COM FIREBASE ---
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(name && email && pass) {
        // Cria o usuário no Firebase Authentication
        auth.createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Salva o nome do usuário no Banco de Dados (Firestore)
                return db.collection("usuarios").doc(userCredential.user.uid).set({
                    nome: name,
                    email: email,
                    criadoEm: new Date()
                });
            })
            .then(() => {
                alert("Conta criada com sucesso no Firebase!");
                container.classList.remove("active");
            })
            .catch((error) => {
                alert("Erro ao registrar: " + error.message);
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// --- LÓGICA DE LOGIN COM FIREBASE ---
signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    // Tenta fazer o login no servidor do Google
    auth.signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Guarda apenas para compatibilidade com suas outras páginas por enquanto
            localStorage.setItem('lastLoggedIn', email); 
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Login falhou: Verifique e-mail e senha.");
            console.error(error);
        });
});