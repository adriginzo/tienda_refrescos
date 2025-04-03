const Refresco = require('../models/Refresco');

exports.getAllRefrescos = async (req, res) => {
  try {
    const refrescos = await Refresco.find();
    res.status(200).json(refrescos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRefrescoById = async (req, res) => {
  try {
    const refresco = await Refresco.findById(req.params.id);
    if (!refresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(refresco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRefrescoByNombre = async (req, res) => {
  try {
    const nombre = req.params.nombre; // Obtener el nombre del parámetro de la URL
    const refresco = await Refresco.find({ nombre: { $regex: new RegExp(nombre, 'i') } }); // Búsqueda insensible a mayúsculas/minúsculas
    if (!refresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(refresco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRefresco = async (req, res) => {
  const refresco = new Refresco(req.body);
  try {
    const savedRefresco = await refresco.save();
    res.status(201).json(savedRefresco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRefresco = async (req, res) => {
  try {
    const updatedRefresco = await Refresco.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(updatedRefresco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRefresco = async (req, res) => {
  try {
    const deletedRefresco = await Refresco.findByIdAndDelete(req.params.id);
    if (!deletedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json({ message: 'Refresco eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};