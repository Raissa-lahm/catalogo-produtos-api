const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createProduct, getProducts,
  getProductById, updateProduct, deleteProduct
} = require('../controllers/productController');

// Todas as rotas de produto exigem autenticação
router.use(protect);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;