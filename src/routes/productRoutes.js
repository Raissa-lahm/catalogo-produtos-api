// Importa o Express para criar o roteador
const express = require('express');

// Cria uma instância do Router do Express
const router = express.Router();

// Importa o middleware de autenticação que protege as rotas
const protect = require('../middlewares/authMiddleware');

// Importa todas as funções do controller de produtos
const {
  createProduct, getProducts,
  getProductById, updateProduct, deleteProduct
} = require('../controllers/productController');

// Aplica o middleware de autenticação em todas as rotas deste arquivo
// Ou seja, qualquer requisição para /api/products vai passar pelo protect primeiro
// Se o token não for válido, a requisição é bloqueada antes de chegar no controller
router.use(protect);

// Rotas para o caminho /api/products
// GET /api/products — lista todos os produtos
// POST /api/products — cria um novo produto
router.route('/')
  .get(getProducts)
  .post(createProduct);

// Rotas para o caminho /api/products/:id
// O :id é um parâmetro dinâmico que representa o ID do produto na URL
// GET /api/products/:id — busca um produto específico pelo ID
// PUT /api/products/:id — atualiza os dados de um produto pelo ID
// DELETE /api/products/:id — deleta um produto pelo ID
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

// Exporta o roteador para ser usado no server.js
module.exports = router;