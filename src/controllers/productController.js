const Product = require('../models/Product');

// CREATE — POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id, // Vem do token JWT
    });
    res.status(201).json({ message: 'Produto criado!', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL — GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    res.json({ total: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE — GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE — PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Retorna o doc atualizado e valida
    );
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.json({ message: 'Produto atualizado!', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE — DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};