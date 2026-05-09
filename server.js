require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

app.get('/', (req, res) => res.json({ message: 'API funcionando! 🚀' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));