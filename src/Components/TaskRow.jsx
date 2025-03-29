import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  return (
    <tr>
      <td className="p-2">
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td
        className={`${
          task.status === "To do"
            ? "red"
            : task.status === "Doing"
            ? "yellow"
            : "green"
        } text-center p-2
          `}
      >
        {task.status}
      </td>
      <td className="p-2  text-center">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}

export default React.memo(TaskRow);
