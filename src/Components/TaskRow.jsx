import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td className="p-2 text-lg hover:cursor-pointer hover:text-blue-300">
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td
        className={`${
          task.status === "To do"
            ? "red"
            : task.status === "Doing"
            ? "yellow"
            : "green"
        } text-center p-2 text-black
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
