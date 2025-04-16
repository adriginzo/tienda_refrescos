const express = require('express');
const router = express.Router();
const RefrescoController = require('../controllers/RefrescoController');

// Obtener todos los refrescos
router.get('/usuarioID/:userId', RefrescoController.getAllRefrescos);

// Obtener refresco por ID
router.get('/usuarioID/:userId/refrescoID/:refrescoId', RefrescoController.getRefrescoById);

// Obtener refresco por NOMBRE
router.get('/usuarioID/:userId/nombre/:nombre', RefrescoController.getRefrescoByNombre);

// Crear nuevo refresco
router.post('/usuarioID/:userId', RefrescoController.createRefresco);

// Actualizar refresco
router.put('/usuarioID/:userId/refrescoID/:refrescoId', RefrescoController.updateRefresco);

// Eliminar un refresco por ID
router.delete('/usuarioID/:userId/refrescoID/:refrescoId', RefrescoController.deleteRefresco);






// Obtener todos los refrescos para compra
router.get('/compra/', RefrescoController.getAllRefrescosCompra);
// Obtener refresco por ID
router.get('/compra/id/:refrescoId', RefrescoController.getRefrescoByIdCompra);
// Obtener refresco por NOMBRE
router.get('/compra/nombre/:nombre', RefrescoController.getRefrescoByNombreCompra);
// Actualizar refresco
router.put('/compra/:refrescoId', RefrescoController.updateRefrescoCompra);


module.exports = router;
