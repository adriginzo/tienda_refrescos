const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// CRUD Routes usuarios
router.get('/microservicioU/:id', compraController.getUsuariosID);
router.get('/microservicioU/role/:id', compraController.getUsuariosRoleByID);

//CRUD Routes Articulos

//router.get('microservicioA/cantidad/:id', compraController.get)
router.get('/microservicioA/:id', compraController.getRefrescos);


// CRUD Routes usuario
router.get('/', compraController.getAllCompras);
router.get('/:id', compraController.getCompraById);
router.post('/', compraController.createCompra);
router.put('/:id', compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

// CRUD Routes refrescos 

module.exports = router;