import { useEffect, useState } from 'react';
import { obtenerTareas } from './services/api';
import TareaForm from './components/TareaForm';
import TareaLista from './components/TareaLista';

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const pedirTareas = () =>
    obtenerTareas()
      .then(setTareas)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));

  useEffect(() => {
    pedirTareas();
  }, []);

  const reintentar = () => {
    setCargando(true);
    setError(null);
    pedirTareas();
  };

  const agregarTarea = (nueva) => {
    setTareas((actuales) => [...actuales, nueva]);
  };

  return (
    <main className="contenedor">
      <header>
        <h1>Gestor de tareas</h1>
        <p>Frontend en React conectado a una API en Express + MongoDB</p>
      </header>

      <TareaForm onTareaCreada={agregarTarea} />

      <section>
        <h2>Tareas</h2>

        {cargando && (
          <div className="cargando">
            <span className="spinner" /> Cargando tareas...
          </div>
        )}

        {error && (
          <div className="mensaje error">
            <p>{error}</p>
            <button onClick={reintentar}>Reintentar</button>
          </div>
        )}

        {!cargando && !error && <TareaLista tareas={tareas} />}
      </section>
    </main>
  );
}

export default App;
