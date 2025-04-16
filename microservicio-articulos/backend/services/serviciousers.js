const fetch = require('node-fetch');

async function obtenerUsuariosID(userId) {
  try {
    const res = await fetch(`http://localhost:3001/api/usuarios/usuarioID/${userId}`);
    
    if (!res.ok) {
      let errorMessage = `Error al contactar microservicio Usuarios: ${res.status}`;
      
      const errorData = await res.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      
      throw new Error(errorMessage);
    }
    
    return await res.json();
    
  } catch (error) {
    throw error; 
  }
}

module.exports = { obtenerUsuariosID };