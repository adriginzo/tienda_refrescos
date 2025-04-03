const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true,
    enum: ['Cliente', 'Administrador'] // Valores permitidos
  }
}, { versionKey: false }); // Deshabilitar el campo __v

module.exports = mongoose.model('Usuario', UsuarioSchema);