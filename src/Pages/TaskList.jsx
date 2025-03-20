import GlobalContext from "../Context/GlobalContext";
import { useContext } from "react";
function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <>
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
    </>
  );
}

export default TaskList;
