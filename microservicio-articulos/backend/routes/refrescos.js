const express = require('express');
const router = express.Router();
const RefrescoController = require('../controllers/RefrescoController');

// CRUD Routes usuarios
router.get('/microservicioU/:id', RefrescoController.getUsuariosID);
router.get('/microservicioU/role/:id', RefrescoController.getUsuariosRoleByID);

// CRUD Routes refresco
router.get('/', RefrescoController.getAllRefrescos);
router.get('/:id', RefrescoController.getRefrescoById);
router.post('/', RefrescoController.createRefresco);
router.put('/:id', RefrescoController.updateRefresco);
router.delete('/:id', RefrescoController.deleteRefresco);

router.get('/nombre/:nombre', RefrescoController.getRefrescoByNombre);

module.exports = router;