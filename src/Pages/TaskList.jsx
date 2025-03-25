import { GlobalContext } from "../Context/GlobalContext";
import { useContext, useMemo, useState } from "react";
import "../Components/TaskRow";
import TaskRow from "../Components/TaskRow";
import { memo } from "react";

const TaskList = memo(() => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setsortOrder] = useState(1);

  const sortTask = useMemo(() => {
    let comparison;

    return [...tasks].sort((a, b) => {
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statuses = ["To do", "Doing", "Done"];
        comparison = statuses.indexOf(a.status) - statuses.indexOf(b.status);
      } else if ("createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }

      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  function sortHandler(check) {
    if (sortBy === check) {
      setsortOrder((prev) => prev * -1);
    } else {
      setSortBy(check);
      setsortOrder(1);
    }
  }

  return (
    <>
      <h1>Lista task</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortHandler("title")}>Titolo</th>
            <th onClick={() => sortHandler("status")}>Stato</th>
            <th onClick={() => sortHandler("createdAt")}>Data creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
});

export default TaskList;
