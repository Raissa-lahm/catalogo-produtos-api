const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo'],
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['eletronicos', 'roupas', 'alimentos', 'outros'], // Valores permitidos
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  // Atributos dinâmicos — aqui está o poder do NoSQL!
  // Um tênis pode ter { tamanho: 42, cor: 'preto' }
  // Um celular pode ter { ram: '8GB', armazenamento: '128GB' }
  attributes: {
    type: Map,
    of: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo User
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);