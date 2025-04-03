const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const refrescoRoutes = require('./routes/refrescos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/refrescos', refrescoRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda_refrescos') // Nombre de la base de datos: REFRESCOS
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));