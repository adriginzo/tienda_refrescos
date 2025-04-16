const Compra = require('../models/Compra');
const mongoose = require('mongoose');
const { obtenerUsuariosID, obtenerAllRefescos, obtenerRefescoPorId, obtenerRefescoPorNombre, actualizarRefresco } = require('../services/serviciousers');


exports.getCompraById = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const compra = await Compra.find({ id_cliente: userId });
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });

    res.status(200).json(compra);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCompra = async (req, res) => {
  try {
    const userId = req.params.userId;
        
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const compra = new Compra(req.body);
    const savedCompra = await compra.save();
    res.status(201).json(savedCompra);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCompra = async (req, res) => {
  try {
    const userId = req.params.userId;
        
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const updatedCompra = await Compra.findByIdAndUpdate(req.params.compraId, req.body, { new: true });
    if (!updatedCompra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.status(200).json(updatedCompra);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCompra = async (req, res) => {
  try {
    const userId = req.params.userId;
        
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const deletedCompra = await Compra.findByIdAndDelete(req.params.compraId);
    if (!deletedCompra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.status(200).json({ message: 'Compra eliminada' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Método para obtener todos los refrescos
exports.getAllRefrescos = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);
    
    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const refrescos = await obtenerAllRefescos();
    return res.status(200).json(refrescos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para obtener un refresco por ID
exports.getRefrescoById = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const refresco = await obtenerRefescoPorId(req.params.refrescoId);
    if (!refresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(refresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para obtener un represco por NOMBRE
exports.getRefrescoByNombre = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const refresco = await obtenerRefescoPorNombre(req.params.nombre);
    if (!refresco || refresco.length === 0) {
      return res.status(404).json({ message: 'Refresco no encontrado' });
    }
    res.status(200).json(refresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para actualizar un refresco
exports.updateRefresco = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const refrescoId = req.params.refrescoId;
    const updateData = req.body;
    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Cliente') {
      return res.status(403).json({ message: 'Se requieren permisos de Cliente' });
    }

    const updatedRefresco = await actualizarRefresco(refrescoId, updateData, { new: true } );
    if (!updatedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(updatedRefresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};