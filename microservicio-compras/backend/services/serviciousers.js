const fetch = require('node-fetch');

async function obtenerUsuariosID(userId) {
  try {
    const res = await fetch(`http://localhost:3001/api/usuarios/compra/usuarioID/${userId}`);
    
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


async function obtenerAllRefescos() {
  try {
    const res = await fetch(`http://localhost:3000/api/refrescos/compra`);
    
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


async function obtenerRefescoPorId(refrescoId) {
  try {
    const res = await fetch(`http://localhost:3000/api/refrescos/compra/id/${refrescoId}`);
    
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



async function obtenerRefescoPorNombre(nombre) {
  try {
    const res = await fetch(`http://localhost:3000/api/refrescos/compra/nombre/${nombre}`);
    
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




async function actualizarRefresco(refrescoId, updateData) {
  try {
    const res = await fetch(`http://localhost:3000/api/refrescos/compra/${refrescoId}`, {
      method: 'PUT',  // Usar PUT para actualizar
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)  // Enviar todo el objeto updateData
    });

    if (!res.ok) {
      let errorMessage = `Error al contactar microservicio Usuarios: ${res.status}`;
      let errorData;

      try {
        errorData = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        const text = await res.text();
        errorMessage = `Error inesperado: ${text}`;
      }

      throw new Error(errorMessage);
    }

    return await res.json();

  } catch (error) {
    throw error;
  }
}





module.exports = { obtenerUsuariosID, obtenerAllRefescos, obtenerRefescoPorId, obtenerRefescoPorNombre, actualizarRefresco };
