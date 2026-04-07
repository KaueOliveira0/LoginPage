const auth = firebase.auth();
const db = firebase.firestore();

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpBtn = document.getElementById('btn-signup');
const signInBtn = document.getElementById('btn-signin');

registerBtn.addEventListener('click', () => container.classList.add("active"));
loginBtn.addEventListener('click', () => container.classList.remove("active"));

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(name && email && pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                return db.collection("usuarios").doc(userCredential.user.uid).set({
                    nome: name,
                    email: email,
                    criadoEm: new Date()
                });
            })
            .then(() => {
                alert("Conta criada com sucesso!");
                container.classList.remove("active");
            })
            .catch(error => alert("Erro: " + error.message));
    }
});

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    // No seu script.js, dentro do evento de clique do login:
auth.signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        console.log("Logado com sucesso!");
        // Opcional: Force um pequeno delay para garantir que o token foi gerado
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    })
    .catch((error) => {
        alert("Erro: " + error.message);
    });
});

// --- FUNÇÃO ESQUECEU A SENHA --- 
const forgotPassLink = document.getElementById('forgot-password');

forgotPassLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;

    if (!email) {
        alert("Por favor, digite seu e-mail no campo de login primeiro.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
});


// 1. Seleciona TODOS os botões que têm as classes abaixo
const googleButtons = document.querySelectorAll('.btn-google');
const githubButtons = document.querySelectorAll('.btn-github');

// 2. Função de Autenticação (serve para Login e Registro)
const iniciarAuthGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // O merge: true é vital: ele cria a conta se não existir 
            // e apenas loga se ela já existir, sem apagar dados.
            return db.collection("usuarios").doc(user.uid).set({
                nome: user.displayName,
                email: user.email,
                criadoEm: new Date()
            }, { merge: true });
        })
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            if(error.code !== 'auth/popup-closed-by-user') {
                alert("Erro Google: " + error.message);
            }
        });
};

// 3. Aplica o evento de clique em CADA botão do Google na tela
googleButtons.forEach(button => {
    button.addEventListener('click', iniciarAuthGoogle);
});

// 4. Aplica o mesmo para o GitHub (se as chaves já estiverem no Firebase)
githubButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GithubAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                return db.collection("usuarios").doc(user.uid).set({
                    nome: user.displayName || "Usuário GitHub",
                    email: user.email,
                    criadoEm: new Date()
                }, { merge: true });
            })
            .then(() => window.location.href = "dashboard.html")
            .catch(error => alert("Erro GitHub: " + error.message));
    });
});