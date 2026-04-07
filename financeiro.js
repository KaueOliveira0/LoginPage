const db = firebase.firestore();
const auth = firebase.auth();

function adicionarGasto() {
    const user = auth.currentUser;
    if (!user) return;

    const desc = document.getElementById('desc').value;
    const valorTotal = parseFloat(document.getElementById('valor').value);
    const numParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    const categoria = document.getElementById('categoria').value; // Ex: Lazer, Fixo

    if (!desc || !valorTotal) return alert("Preencha tudo!");

    const valorParcela = valorTotal / numParcelas;

    for (let i = 0; i < numParcelas; i++) {
        let dataParcela = new Date();
        dataParcela.setMonth(dataParcela.getMonth() + i);
        
        db.collection("gastos").add({
            uid: user.uid,
            descricao: `${desc} (${i + 1}/${numParcelas})`,
            valor: valorParcela,
            mes: dataParcela.getMonth(),
            ano: dataParcela.getFullYear(),
            categoria: categoria,
            pago: false,
            dataCriacao: new Date()
        });
    }
    alert("Gastos registados na nuvem!");
    renderizar(); 
}

function renderizar() {
    const user = auth.currentUser;
    const mes = dataVisualizacao.getMonth();
    const ano = dataVisualizacao.getFullYear();

    db.collection("gastos")
      .where("uid", "==", user.uid)
      .where("mes", "==", mes)
      .where("ano", "==", ano)
      .get().then((querySnapshot) => {
          let html = '';
          querySnapshot.forEach((doc) => {
              const g = doc.data();
              html += `<tr>
                  <td>${g.descricao}</td>
                  <td>R$ ${g.valor.toFixed(2)}</td>
                  <td><button onclick="removerGastoCloud('${doc.id}')">🗑️</button></td>
              </tr>`;
          });
          document.getElementById('lista-gastos').innerHTML = html;
      });
}


let dataVisualizacao = new Date(); // Mês que o usuário está vendo

function mudarMes(direcao) {
    dataVisualizacao.setMonth(dataVisualizacao.getMonth() + direcao);
    renderizar();
}

function adicionarGasto() {
    const desc = document.getElementById('desc').value;
    const valorTotal = parseFloat(document.getElementById('valor').value);
    const numParcelas = parseInt(document.getElementById('parcelas').value) || 1;

    if (!desc || !valorTotal) return alert("Preencha os campos!");

    const valorParcela = valorTotal / numParcelas;
    let gastosSalvos = JSON.parse(localStorage.getItem('gastos_familia')) || [];

    // Gerar parcelas para os meses futuros
    for (let i = 0; i < numParcelas; i++) {
        let dataParcela = new Date();
        dataParcela.setMonth(dataParcela.getMonth() + i);
        
        const novaEntrada = {
            id: Date.now() + Math.random(),
            descricao: `${desc} (${i + 1}/${numParcelas})`,
            valor: valorParcela,
            mes: dataParcela.getMonth(),
            ano: dataParcela.getFullYear()
        };
        gastosSalvos.push(novaEntrada);
    }

    localStorage.setItem('gastos_familia', JSON.stringify(gastosSalvos));
    renderizar();
    
    // Limpa campos
    document.getElementById('desc').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('parcelas').value = '';
}

function renderizar() {
    const mesAtual = dataVisualizacao.getMonth();
    const anoAtual = dataVisualizacao.getFullYear();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    document.getElementById('mes-extenso').innerText = `${meses[mesAtual]} ${anoAtual}`;

    const gastos = JSON.parse(localStorage.getItem('gastos_familia')) || [];
    const lista = document.getElementById('lista-gastos');
    lista.innerHTML = '';

    // Filtra apenas o que é do mês que o usuário está navegando
    const gastosMes = gastos.filter(g => g.mes === mesAtual && g.ano === anoAtual);
    
    let total = 0;
    gastosMes.forEach(g => {
        total += g.valor;
        lista.innerHTML += `
            <tr>
                <td>${g.descricao}</td>
                <td>R$ ${g.valor.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="removerGasto(${g.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });

    const renda = 0; // Sua renda familiar
    document.getElementById('total-gastos').innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('saldo-livre').innerText = `R$ ${(renda - total).toFixed(2)}`;
}

function removerGasto(id) {
    let gastos = JSON.parse(localStorage.getItem('gastos_familia')) || [];
    gastos = gastos.filter(g => g.id !== id);
    localStorage.setItem('gastos_familia', JSON.stringify(gastos));
    renderizar();
}

function limparDados() {
    if(confirm("Deseja apagar todos os registros?")) {
        localStorage.removeItem('gastos_familia');
        renderizar();
    }
}

// Inicia o painel
renderizar();