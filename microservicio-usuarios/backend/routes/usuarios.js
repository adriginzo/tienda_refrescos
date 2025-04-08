const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// CRUD Routes usuario
router.get('/', UsuarioController.getAllUsuarios);
router.get('/:id', UsuarioController.getUsuarioById);
router.get('/role/:id', UsuarioController.getRoleUsuariosById);
router.post('/', UsuarioController.createUsuario);
router.put('/:id', UsuarioController.updateUsuario);
router.delete('/:id', UsuarioController.deleteUsuario);

// CRUD Routes refrescos 

module.exports = router;