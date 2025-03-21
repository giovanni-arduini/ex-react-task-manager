import GlobalContext from "../Context/GlobalContext";
import { useContext, useMemo } from "react";
import "../Components/TaskRow";
import TaskRow from "../Components/TaskRow";
import { memo } from "react";

const TaskList = memo(() => {
  const { tasks } = useContext(GlobalContext);

  return (
    <>
      <div className="table">
        <div>
          <div className="table-header">
            <p>Titolo</p>
            <p>Stato</p>
            <p>Data creazione</p>
          </div>
          <div className="table-body">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default TaskList;
