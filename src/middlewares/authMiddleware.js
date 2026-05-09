const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Pega o token do header Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido e decodifica
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa os dados do usuário na requisição
    next(); // Continua para o próximo middleware/controller
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = protect;