const API_URL = import.meta.env.VITE_API_URL;

// Hace el pedido y transforma cualquier falla en un Error con un mensaje legible
const pedir = async (ruta, opciones) => {
  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error('No se pudo conectar con la API. Revisá que el servidor esté funcionando.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const detalle = data.detalles ? data.detalles.join('. ') : data.error;
    throw new Error(detalle || `Error ${res.status}`);
  }

  return data;
};

export const obtenerTareas = () => pedir('/tareas');

export const crearTarea = (tarea) =>
  pedir('/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
