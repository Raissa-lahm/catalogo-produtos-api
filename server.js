require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const connectDB = require('./src/config/database');

const app = express();

connectDB();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Catálogo de Produtos - Docs',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

app.use('/api/auth',     require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

app.get('/', (req, res) =>
  res.json({ message: 'API funcionando!  Acesse /api-docs para a documentação.' })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
  console.log(` Documentação: http://localhost:${PORT}/api-docs`);
});