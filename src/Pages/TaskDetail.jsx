function TaskDetail(task) {
  function handleRemove(task) {
    return console.log(`Elimino la task ${task.id}`);
  }

  return (
    <>
      <section>
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.createdAt}</p>
        </div>
        <div>
          <button onClick={handleRemove}>Elimina task</button>
        </div>
      </section>
    </>
  );
}

export default TaskDetail;
