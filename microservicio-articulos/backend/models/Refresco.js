const mongoose = require('mongoose');

const RefrescoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  sabor: { type: String, required: true },
  volumen: { type: Number, required: true },
  tipoEnvase: {
    type: String,
    required: true,
    enum: ['lata', 'botella', 'vidrio'] // Valores permitidos
  },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true }
}, { versionKey: false }); // Deshabilitar el campo __v

module.exports = mongoose.model('Refresco', RefrescoSchema);