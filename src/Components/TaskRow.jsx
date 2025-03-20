import React from "react";

function TaskRow({ task }) {
  return (
    <div key={task.id} className="table-row">
      <p>{task.title}</p>
      <p
        className={
          task.status === "To do"
            ? "red"
            : task.status === "Doing"
            ? "yellow"
            : "green"
        }
      >
        {task.status}
      </p>
      <p>{task.createdAt}</p>
    </div>
  );
}

export default React.memo(TaskRow);
