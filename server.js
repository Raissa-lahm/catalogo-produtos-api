// Carrega as variáveis de ambiente do arquivo .env
// Deve ser a primeira linha do arquivo para que todas as variáveis
// estejam disponíveis antes de qualquer outra importação
require('dotenv').config();

// Importa o Express para criar o servidor HTTP
const express = require('express');

// Importa a função de conexão com o MongoDB
const connectDB = require('./src/config/database');

// Cria a aplicação Express
const app = express();

// Conecta ao banco de dados MongoDB
// Se a conexão falhar, a aplicação encerra automaticamente
connectDB();

// Middleware que permite a aplicação entender requisições com corpo em JSON
// Sem isso, o req.body chegaria undefined nos controllers
app.use(express.json());

// Registra as rotas de autenticação
// Todas as rotas definidas em authRoutes.js ficam disponíveis em /api/auth
// Exemplos: POST /api/auth/register e POST /api/auth/login
app.use('/api/auth', require('./src/routes/authRoutes'));

// Registra as rotas de produtos
// Todas as rotas definidas em productRoutes.js ficam disponíveis em /api/products
// Exemplos: GET /api/products e POST /api/products
app.use('/api/products', require('./src/routes/productRoutes'));

// Rota raiz para verificar se o servidor está funcionando
// Acesse http://localhost:3000 no navegador para testar
app.get('/', (req, res) => res.json({ message: 'API funcionando! 🚀' }));

// Define a porta do servidor
// Usa a porta definida no .env ou a porta 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e exibe uma mensagem no terminal quando estiver pronto
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));