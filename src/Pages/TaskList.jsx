import { useCallback, useMemo, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import "../Components/TaskRow";
import TaskRow from "../Components/TaskRow";
import { memo } from "react";

// Debounce function

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearInterval(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

const TaskList = memo(() => {
  const { tasks } = useGlobalContext();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setsortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceSearch = useCallback(debounce(setSearchQuery, 500), []);

  const filteredSortedTask = useMemo(() => {
    let comparison;

    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder, searchQuery]);

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
      <input
        type="text"
        placeholder="Cerca una task"
        onChange={(e) => debounceSearch(e.target.value)}
      ></input>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortHandler("title")}>Titolo</th>
            <th onClick={() => sortHandler("status")}>Stato</th>
            <th onClick={() => sortHandler("createdAt")}>Data creazione</th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}, []);

export default TaskList;
