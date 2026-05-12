 Catálogo de Produtos API

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de produtos com autenticação JWT e criptografia de senhas.

 Sobre o Projeto

Este projeto é um sistema de backend para um catálogo de produtos. Ele permite cadastrar usuários, realizar login com autenticação segura e gerenciar produtos com operações de criar, listar, buscar, atualizar e deletar (CRUD completo).

A aplicação utiliza MongoDB como banco de dados NoSQL, o que permite armazenar atributos dinâmicos nos produtos. Por exemplo, um tênis pode ter tamanho e cor, enquanto um celular pode ter armazenamento e câmera, sem precisar mudar a estrutura do banco de dados.

 Tecnologias Utilizadas

- Node.js — Ambiente de execução JavaScript no servidor
- Express — Framework para criação das rotas e servidor HTTP
- MongoDB — Banco de dados NoSQL orientado a documentos
- Mongoose — ODM para modelagem e conexão com o MongoDB
- JWT (JsonWebToken) — Autenticação via tokens
- BCryptjs — Criptografia de senhas antes de salvar no banco
- Dotenv — Gerenciamento de variáveis de ambiente

 Estrutura do Projeto

catalogo-produtos-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   └── routes/
│       ├── authRoutes.js
│       └── productRoutes.js
├── .env.example
├── .gitignore
├── server.js
└── package.json

 Como Rodar o Projeto

 Pré-requisitos
- Node.js v18 ou superior
- MongoDB instalado localmente ou conta no MongoDB Atlas
- Git

 1. Clone o repositório

git clone https://github.com/Raissa-lahm/catalogo-produtos-api.git
cd catalogo-produtos-api

 2. Instale as dependências

npm install

 3. Configure as variáveis de ambiente

Crie um arquivo .env baseado no .env.example e preencha com suas credenciais:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/catalogo
JWT_SECRET=sua_chave_secreta_aqui

 4. Inicie o servidor

npm run dev

O servidor vai rodar em http://localhost:3000

 Endpoints

 Autenticação
Rotas públicas, não precisam de token.

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Registrar novo usuário |
| POST | /api/auth/login | Login e geração do token JWT |

 Produtos
Todas as rotas de produtos exigem autenticação via token JWT.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/products | Listar todos os produtos |
| POST | /api/products | Criar novo produto |
| GET | /api/products/:id | Buscar produto por ID |
| PUT | /api/products/:id | Atualizar produto |
| DELETE | /api/products/:id | Deletar produto |

 Como Usar a Autenticação

1. Registre um usuário enviando name, email e password para POST /api/auth/register

2. Faça login enviando email e password para POST /api/auth/login e copie o token gerado na resposta

3. Use o token nas rotas de produtos adicionando no header de cada requisição:
Authorization: Bearer seu_token_aqui

 Exemplo de Cadastro de Produto

{
  "name": "Notebook Dell",
  "description": "Notebook para trabalho",
  "price": 3500,
  "category": "eletronicos",
  "stock": 10,
  "attributes": {
    "ram": "16GB",
    "processador": "i7",
    "armazenamento": "512GB SSD"
  }
}

O campo attributes é dinâmico, ou seja, cada produto pode ter atributos diferentes aproveitando a flexibilidade do MongoDB.

 Segurança

- As senhas são criptografadas com BCrypt antes de serem salvas no banco de dados
- A autenticação é feita via JWT com expiração de 7 dias
- As rotas de produtos são protegidas e retornam erro 401 sem um token válido
- As variáveis sensíveis como senha do banco e chave JWT ficam protegidas no arquivo .env que não é enviado ao GitHub

 Branches utilizadas no projeto

- main: versão estável do projeto
- develop: integração das funcionalidades desenvolvidas
- feature/setup-inicial: configuração inicial da estrutura do projeto
- feature/testes-api: ajustes e correções durante os testes da API