import { useRef, useState, useMemo, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

function AddTask() {
  const { addTask } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const symbols = "£!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const descriptionRef = useRef();
  const statusRef = useRef();

  // validazione con useMemo, ricalcolata solo se cambia title
  const isTitleValid = useMemo(() => {
    const validChars = title.split("").every((c) => !symbols.includes(c));
    return validChars;
  }, [title]);

  function handleNameChange(event) {
    setTitle(event.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isTitleValid || title.trim().length === 0) {
      alert("Il titolo non è valido");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      console.log("Task inserita con successo");
      setTitle("");
      descriptionRef.current.value = null;
      statusRef.current.value = "To Do";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <section>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Titolo della task"
              value={title}
              onChange={handleNameChange}
            />
            {(!isTitleValid && (
              <p style={{ color: "red" }}>
                Il titolo non può contenere caratteri speciali
              </p>
            )) ||
              (title.trim().length === 0 && (
                <p style={{ color: "red" }}>Il titolo non può essere vuoto</p>
              ))}
          </section>
          <input
            type="text"
            name="description"
            id="description "
            placeholder="Scrivi una descrizione"
            ref={descriptionRef}
          />
          <select name="status" id="status" ref={statusRef}>
            <option value="To do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button>Aggiungi Taks</button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
