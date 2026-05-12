// Importa o Mongoose para criar o Schema e o modelo
const mongoose = require('mongoose');

// Define a estrutura (Schema) dos documentos de produto no MongoDB
// Cada campo tem seu tipo de dado e regras de validação
const productSchema = new mongoose.Schema({

  // Nome do produto
  // É obrigatório, remove espaços extras e tem limite de 100 caracteres
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
  },

  // Descrição detalhada do produto
  // É obrigatória mas não tem limite de caracteres
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },

  // Preço do produto
  // É obrigatório e não pode ser negativo
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo'],
  },

  // Categoria do produto
  // É obrigatória e só aceita os valores definidos no enum
  // Se tentar salvar uma categoria diferente, o Mongoose retorna erro de validação
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['eletronicos', 'roupas', 'alimentos', 'outros'],
  },

  // Quantidade em estoque
  // Não é obrigatório — se não for enviado, começa com 0 por padrão
  // Não pode ser negativo
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },

  // Atributos dinâmicos do produto
  // Aqui está o poder do MongoDB — cada produto pode ter atributos diferentes
  // Um tênis pode ter { tamanho: "42", cor: "preto" }
  // Um celular pode ter { ram: "8GB", armazenamento: "128GB" }
  // O tipo Map permite guardar pares de chave e valor de forma flexível
  // sem precisar mudar a estrutura do banco de dados
  attributes: {
    type: Map,
    of: String,
  },

  // Referência ao usuário que criou o produto
  // Guarda apenas o ID do usuário (ObjectId)
  // O populate nos controllers substitui esse ID pelos dados reais do usuário
  // como nome e email
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

// O timestamps adiciona automaticamente dois campos em cada documento:
// createdAt — data e hora que o produto foi criado
// updatedAt — data e hora da última atualização
}, { timestamps: true });

// Exporta o modelo Product para ser usado nos controllers
module.exports = mongoose.model('Product', productSchema);