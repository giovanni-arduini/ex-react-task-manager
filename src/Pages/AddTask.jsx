import { useRef, useState, useMemo, useContext } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

function AddTask() {
  const { addTask } = useGlobalContext();
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
      statusRef.current.value = "To do";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="container mx-auto mt-8 flex justify-center">
        <form
          className="w-1/2 md:w-1/3 flex flex-col content-center"
          onSubmit={handleSubmit}
        >
          <section className="flex flex-col gap-3">
            <label className="text-lg dark:text-gray-200" htmlFor="title">
              Nuova Task
            </label>
            <input
              className=" block mb-2 text-sm font-medium text-gray-900 rows-4 dark:bg-slate-500 dark:text-gray-100 bg-white border p-2 rounded"
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
            <input
              type="text"
              name="description"
              id="description "
              className=" block mb-2 text-sm font-medium text-gray-900 rows-4 dark:bg-slate-500 dark:text-gray-100 bg-white border p-2 rounded"
              placeholder="Scrivi una descrizione"
              ref={descriptionRef}
            />
            <select
              className=" block mb-2 text-sm font-medium text-gray-900 rows-4 dark:bg-slate-500 dark:text-gray-100 bg-white border p-2 rounded"
              name="status"
              id="status"
              ref={statusRef}
            >
              <option value="To do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </section>
          <button className="mt-7 bg-blue-500 hover:bg-blue-700 text-white dark:bg-sky-700 dark:hover:bg-sky-900 hover:cursor-pointer font-bold py-2 px-4 rounded ">
            Aggiungi Taks
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
