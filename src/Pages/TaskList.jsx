import GlobalContext from "../Context/GlobalContext";
import { useContext } from "react";

function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Stato</th>
            <th>Data creazione</th>
          </tr>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
            </tr>
          ))}
        </thead>
      </table>
    </>
  );
}

export default TaskList;
