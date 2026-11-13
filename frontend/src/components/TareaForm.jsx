import { useState } from 'react';
import { crearTarea } from '../services/api';

const estadoInicial = { titulo: '', descripcion: '', prioridad: 'media' };

function TareaForm({ onTareaCreada }) {
  const [form, setForm] = useState(estadoInicial);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);

    try {
      const nueva = await crearTarea(form);
      onTareaCreada(nueva);
      setForm(estadoInicial);
      setMensaje({ tipo: 'exito', texto: `Tarea "${nueva.titulo}" creada correctamente.` });
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <label>
        Título
        <input name="titulo" value={form.titulo} onChange={handleChange} />
      </label>

      <label>
        Descripción
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} />
      </label>

      <label>
        Prioridad
        <select name="prioridad" value={form.prioridad} onChange={handleChange}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Crear tarea'}
      </button>

      {mensaje && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</p>}
    </form>
  );
}

export default TareaForm;
