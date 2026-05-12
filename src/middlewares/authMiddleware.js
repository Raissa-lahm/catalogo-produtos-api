// Importa o JWT para verificar e decodificar o token
const jwt = require('jsonwebtoken');

// Middleware de proteção de rotas
// É executado antes de qualquer controller que exija autenticação
// Se o token for válido, permite o acesso. Se não, bloqueia a requisição
const protect = (req, res, next) => {

  // Pega o valor do header Authorization enviado na requisição
  // O formato esperado é: Bearer eyJhbGci...
  const authHeader = req.headers.authorization;

  // Verifica se o header foi enviado e se começa com a palavra "Bearer"
  // Se não tiver token ou estiver no formato errado, bloqueia o acesso
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // Separa a string pelo espaço e pega apenas o token
  // Ex: "Bearer abc123" vira ["Bearer", "abc123"] e pegamos o índice [1]
  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido usando a chave secreta do .env
    // Se o token foi adulterado ou expirou, o jwt.verify lança um erro
    // Se for válido, retorna os dados que foram codificados no token (como o ID do usuário)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Anexa os dados decodificados do token na requisição
    // Assim, os controllers conseguem saber qual usuário está logado
    // acessando req.user.id por exemplo
    req.user = decoded;

    // Chama o próximo middleware ou controller da rota
    next();
  } catch (error) {
    // Se o token for inválido, adulterado ou expirado, retorna erro 401
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Exporta o middleware para ser usado nas rotas
module.exports = protect;