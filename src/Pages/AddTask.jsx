import { useRef, useState, useMemo } from "react";

function AddTask() {
  const [title, setTitle] = useState("");
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
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

  function handleSubmit(e) {
    e.preventDefault();

    console.log(title, descriptionRef.current.value, statusRef.current.value);

    setTitle("");
    descriptionRef.current.value = null;
    statusRef.current.value = "toDo";
    return;
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
