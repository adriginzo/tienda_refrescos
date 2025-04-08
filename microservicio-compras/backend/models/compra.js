const mongoose = require("mongoose");

const comprasSchema = new mongoose.Schema({

  id_cliente: { type: mongoose.Types.ObjectId, required: true },
  nombre: { type: String, required: true },
  id_articulo: { type: mongoose.Types.ObjectId, required: true },
  cantidad: { type: Number, required: true },
  direccion: { type: String, required: true },
});

comprasSchema.set('toJSON', {
  versionKey: false // elimina __v del output JSON
});


module.exports = mongoose.model("Compra", comprasSchema);