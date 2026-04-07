# 📊 Dashboard Financeiro Personalizado

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Este é um projeto de **Gestão Financeira Pessoal** focado em praticidade e aprendizado técnico. O sistema permite o controle de rendas e gastos mensais, utilizando uma arquitetura moderna baseada em nuvem para que os dados possam ser acessados tanto pelo computador quanto pelo celular de forma sincronizada.

---

## 🌟 Diferenciais do Projeto

O grande salto deste projeto foi a transição do armazenamento local (`localStorage`) para o **Google Firebase**. 

* **Sincronização Cloud**: Acesse seus dados de qualquer lugar.
* **Segurança**: Autenticação real via Firebase Auth (E-mail e Senha).
* **Persistência**: Seus dados não são perdidos ao limpar o cache do navegador.
* **Interface Moderna**: Sistema de login com transições suaves e dashboard intuitivo.

---

## 🛠️ Tecnologias e Ferramentas

* **Frontend**: HTML5 Semântico e CSS3 (com animações de Keyframes).
* **Lógica**: JavaScript Vanilla (ES6+).
* **Backend (BaaS)**: 
    * **Authentication**: Controle de acesso de usuários.
    * **Firestore Database**: Banco de Dados NoSQL para salvar transações em tempo real.
* **Hospedagem**: Sugerido Netlify ou Firebase Hosting.

---

## 📁 Estrutura de Arquivos

```text
├── index.html          # Tela de entrada (Login e Registro)
├── dashboard.html      # Resumo financeiro principal
├── financeiro.html     # Lógica detalhada de entradas/saídas
├── configuracoes.html  # Definição de metas e perfil
├── style.css           # Identidade visual e responsividade
└── script.js           # Integração com Firebase e lógica de navegação
```


## 🚀 Como Configurar
Clonar o projeto:

```Bash 
git clone [https://github.com/KaueOliveira0/LoginPage.git](https://github.com/KaueOliveira0/LoginPage.git)
```
Configurar o Firebase:

* Crie um projeto no Firebase Console.

*  Ative o método E-mail/Senha em Authentication.

* Crie um banco Firestore em modo de teste.

* No index.html, substitua as constantes no firebaseConfig pelas chaves do seu projeto.

Execução:

No VS Code, clique com o botão direito no index.html e selecione Open with Live Server.

## 📈 Roadmap / Próximas Implementações
[ ] Implementação de gráficos de pizza para categorias de gastos.

[ ] Sistema de notificações para contas a vencer.

[ ] Modo Escuro (Dark Mode).

[ ] Conversão para PWA (App instalável no Android/iOS).

## 👤 Autor
Kaue Desenvolvedor focado em soluções práticas e aprendizado constante de novas tecnologias.