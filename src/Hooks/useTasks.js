import { useState, useEffect } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  function addTask(newTask) {
    // Creazione nuova task
  }

  function removeTask(task) {
    // Elminazione di una task
  }

  function updateTask(task) {
    // Aggiornamento di una task
  }

  return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;
