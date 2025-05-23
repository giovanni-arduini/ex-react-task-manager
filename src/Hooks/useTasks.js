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
    if (tasks.some((t) => t.title === newTask.title)) {
      throw new Error("Esiste già una task con questo nome");
    }

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

  async function removeMultipeTasks(taskIds) {
    const requestsPromises = taskIds.map((taskId) => {
      return fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    });
    const results = await Promise.allSettled(requestsPromises);

    console.log(results);

    const fulfilled = [];
    const rejected = [];

    results.forEach((result, i) => {
      const taskId = taskIds[i];
      if (result.status === "fulfilled" && result.value.success) {
        fulfilled.push(taskId);
      } else {
        rejected.push(taskId);
      }
    });

    if (fulfilled.length > 0) {
      setTasks((prev) => prev.filter((task) => !fulfilled.includes(task.id)));
    }

    if (rejected.length > 0) {
      throw new Error(
        `Errore nell'eliminazione delle task con id: ${rejected.join(", ")}`
      );
    }
  }

  async function updateTask(udt) {
    // Aggiornamento di una task

    if (tasks.find((t) => t.title === udt.title && t.id !== udt.id)) {
      throw new Error("Esiste già una task con questo nome");
    }

    const response = await fetch(`http://localhost:3001/tasks/${udt.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(udt),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);

    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }

  return { tasks, addTask, removeTask, updateTask, removeMultipeTasks };
}

export default useTasks;
