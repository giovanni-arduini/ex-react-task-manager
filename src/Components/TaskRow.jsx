import React from "react";

function TaskRow({ task }) {
  return (
    <tr>
      <td>
        <a href={`http://localhost:3001/tasks/${task.id}`}>{task.title}</a>
      </td>
      <td
        className={
          task.status === "To do"
            ? "red"
            : task.status === "Doing"
            ? "yellow"
            : "green"
        }
      >
        {task.status}
      </td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
