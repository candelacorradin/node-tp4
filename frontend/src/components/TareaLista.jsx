function TareaLista({ tareas }) {
  if (tareas.length === 0) {
    return <p className="vacio">Todavía no hay tareas cargadas.</p>;
  }

  return (
    <ul className="lista">
      {tareas.map((tarea) => (
        <li key={tarea._id} className="tarea">
          <div className="tarea-encabezado">
            <h3>{tarea.titulo}</h3>
            <span className={`prioridad ${tarea.prioridad}`}>{tarea.prioridad}</span>
          </div>
          {tarea.descripcion && <p>{tarea.descripcion}</p>}
          <small>{tarea.completada ? '✔ Completada' : 'Pendiente'}</small>
        </li>
      ))}
    </ul>
  );
}

export default TareaLista;
