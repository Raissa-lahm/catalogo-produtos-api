// Importa o Express para criar o roteador
const express = require('express');

// Cria uma instância do Router do Express
// O Router permite organizar as rotas em arquivos separados
const router = express.Router();

// Importa as funções de registro e login do controller de autenticação
const { register, login } = require('../controllers/authController');

// Rota pública — qualquer pessoa pode acessar sem precisar de token
// POST /api/auth/register — cadastra um novo usuário no banco de dados
router.post('/register', register);

// Rota pública — qualquer pessoa pode acessar sem precisar de token
// POST /api/auth/login — autentica o usuário e retorna um token JWT
router.post('/login', login);

// Exporta o roteador para ser usado no server.js
module.exports = router;