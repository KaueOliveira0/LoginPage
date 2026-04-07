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

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => window.location.href = "dashboard.html")
        .catch(error => alert("Login falhou: Verifique os dados."));
});