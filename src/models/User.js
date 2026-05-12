// Importa o Mongoose para criar o Schema e o modelo
const mongoose = require('mongoose');

// Importa o BCrypt para criptografar a senha antes de salvar no banco
const bcrypt = require('bcryptjs');

// Define a estrutura (Schema) dos documentos de usuário no MongoDB
const userSchema = new mongoose.Schema({

  // Nome do usuário
  // É obrigatório e remove espaços extras no início e no fim
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },

  // E-mail do usuário
  // É obrigatório e deve ser único no banco — não pode ter dois usuários com o mesmo e-mail
  // É convertido para letras minúsculas automaticamente antes de salvar
  // O match valida se o e-mail tem um formato válido usando expressão regular
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'E-mail inválido'],
  },

  // Senha do usuário
  // É obrigatória e deve ter pelo menos 6 caracteres
  // A senha nunca é salva em texto puro — é criptografada pelo hook abaixo
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
  },

// O timestamps adiciona automaticamente dois campos em cada documento:
// createdAt — data e hora que o usuário foi criado
// updatedAt — data e hora da última atualização
}, { timestamps: true });

// Hook que executa automaticamente ANTES de salvar o usuário no banco
// Verifica se a senha foi modificada para não criptografar duas vezes
// O número 12 é o "salt rounds" — quanto maior, mais segura e mais lenta a criptografia
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Método personalizado para comparar senhas durante o login
// Recebe a senha digitada pelo usuário e compara com a senha criptografada no banco
// O bcrypt.compare retorna true se as senhas coincidirem e false se não coincidirem
// Isso é necessário porque não é possível descriptografar o BCrypt — só comparar
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporta o modelo User para ser usado nos controllers
module.exports = mongoose.model('User', userSchema);