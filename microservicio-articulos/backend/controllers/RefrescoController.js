const Refresco = require('../models/Refresco');
const mongoose = require('mongoose');
const { obtenerUsuariosID } = require('../services/serviciousers');



// METODOS PARA EL MICROSERVICIO ARTICULOS //


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

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const refrescos = await Refresco.find();
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

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const refresco = await Refresco.findById(req.params.refrescoId);
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

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const nombre = req.params.nombre;
    const refresco = await Refresco.find({ nombre: { $regex: new RegExp(nombre, 'i') } });
    if (!refresco || refresco.length === 0) {
      return res.status(404).json({ message: 'Refresco no encontrado' });
    }
    res.status(200).json(refresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para crear un nuevo refresco
exports.createRefresco = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const refrescoData = req.body;
    const refresco = new Refresco(refrescoData);
    const savedRefresco = await refresco.save();
    res.status(201).json(savedRefresco);

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

    const updateData = req.body;
    const userData = await obtenerUsuariosID(userId);

    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const updatedRefresco = await Refresco.findByIdAndUpdate(req.params.refrescoId, updateData, { new: true } );
    if (!updatedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(updatedRefresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para eliminar un refresco
exports.deleteRefresco = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario no es válido' });
    }

    const userData = await obtenerUsuariosID(userId);
    
    if (!userData) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    if (userData.role !== 'Administrador') {
      return res.status(403).json({ message: 'Se requieren permisos de Administrador' });
    }

    const deletedRefresco = await Refresco.findByIdAndDelete(req.params.refrescoId);
    if (!deletedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json({ message: 'Refresco eliminado' });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




















// METODOS PARA EL MICROSERVICIO COMPRAS //

// Método para obtener todos los refrescos
exports.getAllRefrescosCompra = async (req, res) => {
  try {
    const refrescos = await Refresco.find();
    return res.status(200).json(refrescos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener un refresco por ID
exports.getRefrescoByIdCompra = async (req, res) => {
  try {
    const refresco = await Refresco.findById(req.params.refrescoId);
    if (!refresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(refresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para obtener un represco por NOMBRE
exports.getRefrescoByNombreCompra = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const refresco = await Refresco.find({ nombre: { $regex: new RegExp(nombre, 'i') } });
    if (!refresco || refresco.length === 0) {
      return res.status(404).json({ message: 'Refresco no encontrado' });
    }
    res.status(200).json(refresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Método para actualizar un refresco
exports.updateRefrescoCompra = async (req, res) => {
  try {
    const refrescoId = req.params.refrescoId;
    const updateData = req.body;

    const updatedRefresco = await Refresco.findByIdAndUpdate(refrescoId, updateData, { new: true } );
    if (!updatedRefresco) return res.status(404).json({ message: 'Refresco no encontrado' });
    res.status(200).json(updatedRefresco);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};