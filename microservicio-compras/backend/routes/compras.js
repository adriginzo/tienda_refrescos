const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');


// Obtener compas de un userId
router.get('/:userId/', compraController.getCompraById);

// Crear nueva compra
router.post('/:userId', compraController.createCompra);

// Modificar una compra
router.put('/:userId/compraID/:compraId', compraController.updateCompra);

// Eliminar una compra por ID
router.delete('/:userId/compraID/:compraId', compraController.deleteCompra);




// Obtener todos los refrescos
router.get('/:userId/refrescos',compraController.getAllRefrescos);
// Obtener refresco por ID
router.get('/usuarioID/:userId/refrescoID/:refrescoId', compraController.getRefrescoById);
// Obtener refresco por NOMBRE
router.get('/usuarioID/:userId/refrescoNombre/:nombre', compraController.getRefrescoByNombre);
// Actualizar refresco
router.put('/usuarioID/:userId/refrescoID/:refrescoId', compraController.updateRefresco);


module.exports = router;