const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Obtener todos los usuarios
router.get('/:userId', UsuarioController.getAllUsuarios);

// Obtener usuario por ID
router.get('/usuarioID/:userId', UsuarioController.getUsuarioById);

// Obtener usuario por NOMBRE
router.get('/:userId/role/:id', UsuarioController.getRoleUsuariosById);

// Crear un nuevo usuario
router.post('/', UsuarioController.createUsuario);

// Actualizar un usuario
router.put('/:userId/ID/:Id', UsuarioController.updateUsuario);

// Eliminar un usuario por ID
router.delete('/:userId/ID/:Id', UsuarioController.deleteUsuario);

// Eliminar usuario actual
router.delete('/:IdActual', UsuarioController.deleteUsuarioActual);





// Obtener usuario por ID
router.get('/compra/usuarioID/:userId', UsuarioController.getUsuarioByIdCompra);


module.exports = router;