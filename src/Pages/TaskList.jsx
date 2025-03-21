import { GlobalContext } from "../Context/GlobalContext";
import { useContext, useMemo } from "react";
import "../Components/TaskRow";
import TaskRow from "../Components/TaskRow";
import { memo } from "react";

const TaskList = memo(() => {
  const { tasks } = useContext(GlobalContext);

  return (
    <>
      <h1>Lista task</h1>
      <table>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Stato</th>
            <th>Data creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
});

export default TaskList;
