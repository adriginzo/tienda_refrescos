const Compra = require('../models/compra');

exports.getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompraById = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCompra = async (req, res) => {
  const compra = new Compra(req.body);
  try {
    const savedCompra = await compra.save();
    res.status(201).json(savedCompra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCompra = async (req, res) => {
  try {
    const updatedCompra = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.status(200).json(updatedCompra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCompra = async (req, res) => {
  try {
    const deletedCompra = await Compra.findByIdAndDelete(req.params.id);
    if (!deletedCompra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.status(200).json({ message: 'Compra eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};