# 📊 Dashboard Financeiro Personalizado

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![VSCODE](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

Este é um ecossistema de **Gestão Financeira Pessoal** desenvolvido para oferecer controle total sobre rendas e gastos. O projeto evoluiu de um armazenamento local para uma aplicação **Cloud-Native**, permitindo que múltiplos usuários gerenciem suas finanças de forma isolada, segura e sincronizada.


---

## ❓Como Usar

```bash
https://pagefinanceirokaue.web.app
```

---

## 🚀 Evolução e Diferenciais

O projeto foi reestruturado para suportar uma arquitetura de dados escalável e profissional:

* **Multi-Auth (OAuth 2.0):** Autenticação robusta via **Google** e **GitHub**, além do tradicional E-mail/Senha.
* **Arquitetura Baseada em UID:** Implementação de subcoleções no Firestore (`usuarios/{uid}/gastos`), garantindo que cada usuário acesse apenas seus próprios registros.
* **Queries Otimizadas:** Configuração de **Índices Compostos** no Firebase para filtragem de gastos por mês, ano e status de pagamento em tempo real.
* **Recuperação de Acesso:** Fluxo de redefinição de senha via e-mail integrado para usuários de login manual.
* **Interface Responsiva:** Dashboard intuitivo com cálculo automático de saldo livre, pendências e total mensal.

---

## 🛠️ Tecnologias e Ferramentas

* **Frontend:** HTML5 Semântico, CSS3 (Flexbox/Grid) e FontAwesome 6.
* **Lógica:** JavaScript Vanilla (ES6+) com foco em programação assíncrona e manipulação de DOM.
* **Backend (Firebase Services):**
    * **Authentication:** Gestão de provedores sociais e domínios autorizados (OAuth).
    * **Cloud Firestore:** Banco de Dados NoSQL com estrutura de subcoleções otimizada.
    * **Hosting:** Deploy contínuo para acesso via web.

---

## 📂 Estrutura do Projeto

```text
├── index.html          # Portal de acesso com Auth Social & Email
├── dashboard.html      # Painel de indicadores (Renda, Gastos, Saldo)
├── financeiro.html     # CRUD de transações e controle de fluxo
├── style.css           # Design responsivo e animações de transição
├── script.js           # Lógica de Login, Registro e Auth Social
└── financeiro.js       # Integração com Firestore e cálculos do Dashboard
```

---

## 🚀 Como Configurar
1. Clonar o projeto:

```Bash 
git clone [https://github.com/KaueOliveira0/LoginPage.git](https://github.com/KaueOliveira0/LoginPage.git)
```
2. Configurar o Firebase:

No Firebase Console, ative Google e GitHub em Authentication > Sign-in method.

Em Settings > Authorized Domains, adicione 127.0.0.1 e seu domínio final.

Defina um E-mail de Suporte nas configurações gerais do projeto.

3. Habilitar Índices:

Ao rodar o projeto, clique no link de erro do console para gerar automaticamente os índices compostos necessários para a coleção de gastos.

---

## Execução:

No VS Code, clique com o botão direito no index.html e selecione Open with Live Server.

---

## 📈 Roadmap / Próximas Implementações
* [x] Login Social (Google/GitHub).

* [x] Arquitetura de dados por Usuário (UID).

* [x] Sistema de recuperação de senha.

* [ ] Gráficos dinâmicos por categoria.

* [ ] Sistema de metas compartilhadas (Modo Casal).

* [ ] Modo Escuro (Dark Mode).

---

## 👤 Autor
Kaue Desenvolvedor focado em soluções práticas e aprendizado constante de novas tecnologias.