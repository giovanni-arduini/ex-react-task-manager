import { useCallback, useMemo, useState, useRef } from "react";
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
  const { tasks, removeMultipeTasks } = useGlobalContext();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setsortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const sectionRef = useRef();

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

  function toggleSelection(taskId) {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));
    } else {
      setSelectedTaskIds((prev) => [...prev, taskId]);
    }
  }

  async function handleDelete() {
    try {
      await removeMultipeTasks(selectedTaskIds);
      console.alert("Task eliminate con successo");
      setSelectedTaskIds([]);
    } catch (error) {
      console.error(error);
    }
  }

  function toTop() {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section
        className="max-w-3/4 m-auto flex flex-col mt-4 min-h-screen"
        ref={sectionRef}
      >
        <h1 className="mt-4 title dark:text-gray-300">Cose da fare!</h1>
        <input
          className="self-start mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Cerca una task"
          onChange={(e) => debounceSearch(e.target.value)}
        ></input>

        {selectedTaskIds.length > 0 && (
          <button onClick={handleDelete}>Elimina task selezionate</button>
        )}

        <div className="relative overflow-x-auto mt-6">
          <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* <table className="mt-6 table-fixed"> */}
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th></th>
                <th
                  className=" text-lg text-center px-6 py-3 hover:cursor-pointer"
                  scope="col"
                  onClick={() => sortHandler("title")}
                >
                  Titolo
                </th>
                <th
                  className="text-lg px-6 py-3 text-center hover:cursor-pointer"
                  scope="col"
                  onClick={() => sortHandler("status")}
                >
                  Stato
                </th>
                <th
                  className="text-lg px-6 py-3 text-center hover:cursor-pointer"
                  scope="col"
                  onClick={() => sortHandler("createdAt")}
                >
                  Data creazione
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSortedTask.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  checked={selectedTaskIds.includes(task.id)}
                  onToggle={toggleSelection}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex justify-center m-4">
        <button
          className="p-2 bg-gray-300 dark:bg-gray-800 dark:text-white rounded-lg"
          onClick={toTop}
        >
          Torna su
        </button>
      </section>
    </>
  );
}, []);

export default TaskList;
