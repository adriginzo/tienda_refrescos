const fetch = require('node-fetch');

async function obtenerUsuarios() {
  const res = await fetch('http://localhost:3001/api/usuarios');
  if (!res.ok) {
    throw new Error(`Error al contactar microservicio B: ${res.status}`);
  }
  return await res.json();
}

module.exports = { obtenerUsuarios };
