const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true, // Remove espaços extras
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'E-mail inválido'],
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
  },
}, { timestamps: true }); // Adiciona createdAt e updatedAt automaticamente

// Hook: executa ANTES de salvar — criptografa a senha
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Só criptografa se a senha mudou
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar senha digitada com a senha criptografada
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);