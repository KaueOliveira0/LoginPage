const db = firebase.firestore();
const auth = firebase.auth();

let dataVisualizacao = new Date();

// Vigia de Login Inteligente
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário autenticado:", user.email);
        
        if (typeof renderizar === "function") renderizar(); 
        if (typeof atualizarDashboard === "function") atualizarDashboard();
        if (typeof carregarRenda === "function") carregarRenda();

        db.collection("usuarios").doc(user.uid).get().then((doc) => {
            const nomeExibicao = doc.exists ? doc.data().nome : "Usuário";
            const campoNome = document.getElementById('user-name');
            if (campoNome) campoNome.innerText = nomeExibicao;
        });

    } else {
        window.location.href = "index.html";
    }
});

function mudarMes(direcao) {
    dataVisualizacao.setMonth(dataVisualizacao.getMonth() + direcao);
    renderizar();
}

async function adicionarGasto() {
    const user = auth.currentUser;
    if (!user) return;

    const desc = document.getElementById('desc').value;
    const valorTotal = parseFloat(document.getElementById('valor').value);
    const numParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const categoria = document.getElementById('categoria').value; 

    if (!desc || !valorTotal) return alert("Preencha os campos!");

    const valorParcela = valorTotal / numParcelas;

    // --- MUDANÇA AQUI: Salvando na subcoleção do usuário ---
    const usuarioRef = db.collection("usuarios").doc(user.uid).collection("gastos");

    for (let i = 0; i < numParcelas; i++) {
        let dataParcela = new Date(dataVisualizacao);
        dataParcela.setMonth(dataParcela.getMonth() + i);
        
        await usuarioRef.add({
            descricao: numParcelas > 1 ? `${desc} (${i + 1}/${numParcelas})` : desc,
            valor: valorParcela,
            categoria: categoria,
            mes: dataParcela.getMonth(),
            ano: dataParcela.getFullYear(),
            pago: false,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    alert("Gasto(s) adicionado(s) com sucesso!");
    document.getElementById('desc').value = "";
    document.getElementById('valor').value = "";
    renderizar();
}

function renderizar() {
    const user = auth.currentUser;
    if (!user) return;

    const mesAtual = dataVisualizacao.getMonth();
    const anoAtual = dataVisualizacao.getFullYear();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    document.getElementById('mes-extenso').innerText = `${meses[mesAtual]} ${anoAtual}`;
    const lista = document.getElementById('lista-gastos');
    
    // --- MUDANÇA AQUI: Buscando da subcoleção do usuário ---
    db.collection("usuarios").doc(user.uid).collection("gastos")
        .where("mes", "==", mesAtual)
        .where("ano", "==", anoAtual)
        .get()
        .then((querySnapshot) => {
            let html = '';
            let total = 0;

            querySnapshot.forEach((doc) => {
                const g = doc.data();
                total += g.valor;
                html += `
                    <tr>
                        <td>${g.descricao}</td>
                        <td>R$ ${g.valor.toFixed(2)}</td>
                        <td><button class="btn-delete" onclick="removerGasto('${doc.id}')"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                `;
            });

            lista.innerHTML = html;
            const campoTotal = document.getElementById('total-gastos');
            if (campoTotal) campoTotal.innerText = `R$ ${total.toFixed(2)}`;
        })
        .catch((error) => console.error("Erro ao carregar gastos:", error));
}

function removerGasto(id) {
    const user = auth.currentUser;
    if (confirm("Deseja excluir este gasto?")) {
        // --- MUDANÇA AQUI: Removendo da subcoleção correta ---
        db.collection("usuarios").doc(user.uid).collection("gastos").doc(id).delete().then(() => {
            renderizar();
        });
    }
}