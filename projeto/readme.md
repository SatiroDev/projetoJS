# 👤 API de Gerenciamento de Usuários

Esta é uma API RESTful para gerenciamento de usuários, construída com **Node.js**, **Express** e **MySQL**.  
Inclui cadastro, listagem, atualização e exclusão de usuários, além de **validação dos dados** e **criptografia de senhas com bcrypt**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**  
- **Express**  
- **MySQL** (via `mysql2/promise` com pool de conexões)  
- **Joi** (validação de dados)  
- **Bcrypt** (criptografia de senhas)  
- **Dotenv** (variáveis de ambiente)

---

## 📌 Funcionalidades

- ✅ Cadastro de usuário com validação e senha criptografada  
- ✅ Listagem de usuários (sem exibir a senha)  
- ✅ Busca de usuário por ID  
- ✅ Atualização parcial de usuário, atualizando só os campos modificados  
- ✅ Exclusão de usuário por ID  
- ✅ Tratamento global de erros com mensagens claras  
- ✅ Middleware para verificar existência de usuário antes de operações que usam ID  
- ✅ Estrutura organizada em pastas para facilitar manutenção e escalabilidade  

---

## 📁 Estrutura do Projeto

```bash
estudo3/
│
├── controller/
│   └── controllerUser.js
├── db/
│   ├── conexao.js
│   └── createTableUsers.js
├── middlewares/
│   ├── erroGlobal.js
│   └── existsUserById.js
├── routes/
│   └── routerUser.js
├── senhaHash/
│   └── bcryptHash.js
├── services/
│   └── userServices.js
├── validation/
│   └── validationUser.js
├── index.js
└── .env
```

---

## ▶️ Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/SatiroDev/projetoJS.git](https://github.com/SatiroDev/projetoJS)
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure seu arquivo `.env` com as variáveis do banco de dados e porta:**

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   PORT=3000
   ```

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

5. A API estará rodando em:  
   [http://localhost:3000](http://localhost:3000)

---

## 📮 Rotas da API

| Método | Rota         | Descrição                 | Middleware necessário                |
|--------|--------------|---------------------------|--------------------------------------|
| POST   | `/users`     | Cadastrar novo usuário    | Validação de cadastro                |
| GET    | `/users`     | Listar todos os usuários  | -                                    |
| GET    | `/users/:id` | Buscar usuário por ID     | Verifica se o usuário existe         |
| PUT    | `/users/:id` | Atualizar usuário por ID  | Verifica existência + validação      |
| DELETE | `/users/:id` | Deletar usuário por ID    | Verifica se o usuário existe         |

---

## 🔎 Observações

- 🔒 Senhas são sempre armazenadas criptografadas com **bcrypt** (`saltRounds = 10`)  
- 🔄 Atualização parcial só altera os campos diferentes dos já existentes no banco  
- 🧩 Middleware global de erro captura e envia mensagens padronizadas para o cliente

---

## 🤝 Contato

Criado por **[José Satiro]** — sinta-se à vontade para abrir issues ou pull requests!  
GitHub: [SatiroDev](https://github.com/SatiroDev)
