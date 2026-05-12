// Importa o modelo de produto para acessar o banco de dados
const Product = require('../models/Product');

// Rota: POST /api/products
// Responsável por criar um novo produto no banco de dados
// Rota protegida — exige token JWT válido
exports.createProduct = async (req, res) => {
  try {
    // Cria o produto com os dados enviados no corpo da requisição
    // O operador ...req.body copia todos os campos enviados (name, price, etc.)
    // O campo createdBy é preenchido automaticamente com o ID do usuário logado
    // que vem do token JWT decodificado pelo middleware de autenticação
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });

    // Retorna status 201 (criado) com os dados do produto salvo
    res.status(201).json({ message: 'Produto criado!', product });
  } catch (error) {
    // Se houver erro de validação (campo obrigatório faltando, etc.), retorna 400
    res.status(400).json({ message: error.message });
  }
};

// Rota: GET /api/products
// Responsável por listar todos os produtos cadastrados no banco
// Rota protegida — exige token JWT válido
exports.getProducts = async (req, res) => {
  try {
    // Busca todos os produtos no banco de dados
    // O populate substitui o ID do createdBy pelos dados reais do usuário
    // mostrando apenas o nome e email de quem criou o produto
    const products = await Product.find().populate('createdBy', 'name email');

    // Retorna a lista de produtos junto com o total encontrado
    res.json({ total: products.length, products });
  } catch (error) {
    // Se houver erro interno no servidor, retorna status 500
    res.status(500).json({ message: error.message });
  }
};

// Rota: GET /api/products/:id
// Responsável por buscar um único produto pelo seu ID
// Rota protegida — exige token JWT válido
exports.getProductById = async (req, res) => {
  try {
    // Busca o produto pelo ID que vem na URL (ex: /api/products/abc123)
    // O populate traz os dados do usuário que criou o produto
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');

    // Se não encontrar nenhum produto com esse ID, retorna erro 404
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    // Retorna os dados completos do produto encontrado
    res.json(product);
  } catch (error) {
    // Se houver erro interno no servidor, retorna status 500
    res.status(500).json({ message: error.message });
  }
};

// Rota: PUT /api/products/:id
// Responsável por atualizar os dados de um produto existente
// Rota protegida — exige token JWT válido
exports.updateProduct = async (req, res) => {
  try {
    // Busca o produto pelo ID da URL e atualiza com os dados do corpo da requisição
    // A opção "new: true" faz retornar o produto já atualizado e não o antigo
    // A opção "runValidators: true" garante que as validações do Schema sejam aplicadas
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Se não encontrar o produto com esse ID, retorna erro 404
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    // Retorna o produto com os dados já atualizados
    res.json({ message: 'Produto atualizado!', product });
  } catch (error) {
    // Se houver erro de validação nos dados enviados, retorna 400
    res.status(400).json({ message: error.message });
  }
};

// Rota: DELETE /api/products/:id
// Responsável por deletar um produto do banco de dados pelo ID
// Rota protegida — exige token JWT válido
exports.deleteProduct = async (req, res) => {
  try {
    // Busca e deleta o produto pelo ID que vem na URL
    const product = await Product.findByIdAndDelete(req.params.id);

    // Se não encontrar o produto com esse ID, retorna erro 404
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    // Retorna mensagem de confirmação que o produto foi deletado
    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    // Se houver erro interno no servidor, retorna status 500
    res.status(500).json({ message: error.message });
  }
};