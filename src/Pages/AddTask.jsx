import { useRef, useState } from "react";

function AddTask() {
  const [taskName, setTaskName] = useState("");

  function handleNameChange(event) {
    setTaskName(event.target.value);
  }

  const descriptionRef = useRef();
  const statusRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(
      taskName,
      descriptionRef.current.value,
      statusRef.current.value
    );

    setTaskName("");
    descriptionRef.current.value = null;
    statusRef.current.value = "toDo";
    return;
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task_name"
            id="task_name"
            placeholder="Inserisci la nuova taks"
            value={taskName}
            onChange={handleNameChange}
          />
          <input
            type="text"
            name="description"
            id="description "
            placeholder="Scrivi una descrizione"
            ref={descriptionRef}
          />
          <select name="status" id="status" ref={statusRef}>
            <option value="toDo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button>Aggiungi Taks</button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
