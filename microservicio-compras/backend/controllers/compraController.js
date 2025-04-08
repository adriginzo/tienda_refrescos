const Compra = require('../models/compra');

const { obtenerUsuariosID } = require('../services/serviciousers');
const { comprobarRoleUsuarios} = require('../services/serviciousers');
const {getRefrescoById} = require('../services/servicioarticulos');




exports.getRefrescos = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = await getRefrescoById(id)
    res.json(datos)
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos del microservicio Articulos' });
  }
}


exports.getUsuariosID = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = await obtenerUsuariosID(id);
    res.json({ datos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos del microservicio Usuarios' });
  }
};
exports.getUsuariosRoleByID = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = await comprobarRoleUsuarios(id);
    res.json(datos.role);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos del microservicio Usuarios' });
  }
};

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