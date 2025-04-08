const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const comprasRoutes = require('./routes/compras');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/compras', comprasRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda_refrescos') // Nombre de la base de datos: REFRESCOS
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));