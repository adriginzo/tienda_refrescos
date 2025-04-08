const Usuario = require('../models/Usuario');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRoleUsuariosById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('role'); // solo selecciona el campo 'role'
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ role: usuario.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  try {
    const savedUsuario = await usuario.save();
    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUsuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(updatedUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!deletedUsuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};