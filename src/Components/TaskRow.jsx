function TaskRow({ task }) {
  return (
    <div key={task.id} className="table-row">
      <p>{task.title}</p>
      <p className="status-col">{task.status}</p>
      <p>{task.createdAt}</p>
    </div>
  );
}

export default TaskRow;
