import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
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
