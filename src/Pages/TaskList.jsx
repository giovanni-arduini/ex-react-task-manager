import GlobalContext from "../Context/GlobalContext";
import { useContext } from "react";
function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <>
      <thead>
        <tr>
          <th>Titolo</th>
          <th>Descrizione</th>
          <th>Stato</th>
        </tr>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </thead>
    </>
  );
}

export default TaskList;
