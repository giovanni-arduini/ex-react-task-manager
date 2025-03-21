import React from "react";

function TaskRow({ task }) {
  return (
    <tr>
      <td>{task.title}</td>
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
