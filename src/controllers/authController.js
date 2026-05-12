// Importa o modelo de usuário para acessar o banco de dados
const User = require('../models/User');

// Importa o JWT para gerar tokens de autenticação
const jwt = require('jsonwebtoken');

// Função auxiliar que gera um token JWT com o ID do usuário
// O token expira em 7 dias e é assinado com a chave secreta do .env
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Rota: POST /api/auth/register
// Responsável por cadastrar um novo usuário no banco de dados
exports.register = async (req, res) => {
  try {
    // Pega os dados enviados no corpo da requisição
    const { name, email, password } = req.body;

    // Verifica se já existe um usuário com esse e-mail no banco
    // Evita cadastros duplicados
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    // Cria o objeto do usuário com os dados recebidos
    // A senha é criptografada automaticamente pelo hook no modelo User.js
    const user = new User({ name, email, password });

    // Salva o usuário no banco de dados
    await user.save();

    // Gera o token JWT para o usuário recém-criado
    const token = generateToken(user._id);

    // Retorna status 201 (criado) com o token e os dados básicos do usuário
    // A senha nunca é retornada por segurança
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    // Se houver algum erro de validação ou banco, retorna status 400
    res.status(400).json({ message: error.message });
  }
};

// Rota: POST /api/auth/login
// Responsável por autenticar um usuário já cadastrado
exports.login = async (req, res) => {
  try {
    // Pega o e-mail e senha enviados no corpo da requisição
    const { email, password } = req.body;

    // Busca o usuário no banco pelo e-mail
    const user = await User.findOne({ email });

    // Se não encontrar o usuário ou a senha estiver errada, retorna erro 401
    // O método comparePassword está definido no modelo User.js
    // Ele compara a senha digitada com a senha criptografada no banco
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    // Gera um novo token JWT para o usuário autenticado
    const token = generateToken(user._id);

    // Retorna status 200 com o token e os dados básicos do usuário
    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    // Se houver erro interno no servidor, retorna status 500
    res.status(500).json({ message: error.message });
  }
};