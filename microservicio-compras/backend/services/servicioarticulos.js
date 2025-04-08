const fetch = require('node-fetch');

async function getRefrescoById(id) {

    const res = await fetch(`http://localhost:3000/api/refrescos/${id}`);
      if (!res.ok) {
        throw new Error(`Error al contactar microservicio Refrescos: ${res.status}`);
      }
      return await res.json();
    
}



module.exports = { getRefrescoById};