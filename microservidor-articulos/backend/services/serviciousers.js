const fetch = require('node-fetch');

async function obtenerRoleUsuarios(id) {
  const res = await fetch(`http://localhost:3001/api/usuarios/role/${id}`);
  if (!res.ok) {
    throw new Error(`Error al contactar microservicio Usuarios: ${res.status}`);
  }
  return await res.json();
}

module.exports = { obtenerRoleUsuarios };
