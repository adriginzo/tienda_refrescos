const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// CRUD Routes usuario
router.get('/', compraController.getAllCompras);
router.get('/:id', compraController.getCompraById);
router.post('/', compraController.createCompra);
router.put('/:id', compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

// CRUD Routes refrescos 

module.exports = router;