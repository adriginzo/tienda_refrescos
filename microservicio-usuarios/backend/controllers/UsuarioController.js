const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');


// Método para obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioComprobar.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioComprobar.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }
    
    res.status(200).json(usuarioComprobar);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para obtener ROLE de usuario por ID
exports.getRoleUsuariosById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioComprobar.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const usuario = await Usuario.findById(req.params.id).select('role'); // solo selecciona el campo 'role'
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ role: usuario.role });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para crear nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const savedUsuario = await usuario.save();
    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Método para actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (usuarioComprobar.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.Id, req.body, { new: true });
    if (!updatedUsuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(updatedUsuario);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Método para eliminar usuario por ID
exports.deleteUsuario = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioComprobar.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.Id);
    if (!deletedUsuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para eliminar usuario actual por ID
exports.deleteUsuarioActual = async (req, res) => {
  try {
    const IdActual = req.params.IdActual;
    if (!mongoose.Types.ObjectId.isValid(IdActual)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.IdActual);
    if (!deletedUsuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};














// Método para obtener usuario por ID
exports.getUsuarioByIdCompra = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const usuarioComprobar = await Usuario.findById(userId);
    if (!usuarioComprobar) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioComprobar.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }
    
    res.status(200).json(usuarioComprobar);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};