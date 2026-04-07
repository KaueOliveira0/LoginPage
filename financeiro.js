const db = firebase.firestore();
const auth = firebase.auth();

let dataVisualizacao = new Date();

// Vigia de Login Inteligente
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário autenticado:", user.email);
        
        // Aqui você chama as funções específicas de cada página
        if (typeof listar === "function") listar(); 
        if (typeof atualizarDashboard === "function") atualizarDashboard(user.uid);
        if (typeof carregarRenda === "function") carregarRenda();

        // Busca o nome do usuário para exibir no painel
        db.collection("usuarios").doc(user.uid).get().then((doc) => {
            const nomeExibicao = doc.exists ? doc.data().nome : "Usuário";
            const campoNome = document.getElementById('user-name');
            if (campoNome) campoNome.innerText = nomeExibicao;
        });

    } else {
        // Se o Firebase confirmou que REALMENTE não há usuário
        console.warn("Nenhum usuário logado. Redirecionando...");
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

    // Salva cada parcela no Firestore
    for (let i = 0; i < numParcelas; i++) {
        let dataParcela = new Date(dataVisualizacao);
        dataParcela.setMonth(dataParcela.getMonth() + i);
        
        await db.collection("gastos").add({
            uid: user.uid,
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
    // Limpa os campos
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
    
    // Busca no Firestore filtrando por Usuário, Mês e Ano
    db.collection("gastos")
        .where("uid", "==", user.uid)
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
            document.getElementById('total-gastos').innerText = `R$ ${total.toFixed(2)}`;
        })
        .catch((error) => console.error("Erro ao carregar gastos:", error));
}

function removerGasto(id) {
    if (confirm("Deseja excluir este gasto?")) {
        db.collection("gastos").doc(id).delete().then(() => {
            renderizar();
        });
    }
}