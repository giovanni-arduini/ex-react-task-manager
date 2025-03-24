import { useState, useEffect } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const addTask = async (newTask) => {
    const { title, description, status } = newTask;

    const response = await fetch(`http://localhost:3001/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks((prev) => [...prev, task]);
  };

  async function removeTask(taskId) {
    // Elminazione di una task

    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });

    const { success, message } = await response.json();

    if (!success) {
      throw new Error(message);
    }

    setTasks((prev) => prev.filter((t) => t.id != taskId));
  }

  async function updateTask(udt) {
    // Aggiornamento di una task
    const response = await fetch(`http://localhost:3001/tasks/${udt.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(udt),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);

    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }

  return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;
