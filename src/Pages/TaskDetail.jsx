import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import Modal from "../Components/Modal";
import EditTaskModal from "../Components/EditTaskModal";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const [isShow, setIsShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  async function handleRemove() {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function handleUpdate(updatedTask) {
    try {
      await updateTask(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="max-w-3/4 sm:max-w-1/2 m-auto flex flex-col mt-8">
        <div className="flex flex-col bg-gray-300 dark:bg-slate-500 p-4 rounded-lg shadow-md p-5 text-gray-900 dark:text-gray-300">
          <h2 className="text-3xl">{task.title}</h2>
          <p className="mt-2 ">
            <strong>Descrizione:</strong> {task.description}
          </p>
          <p className="mt-2 ">
            <strong>Status: </strong>
            {task.status}
          </p>
          <p className="mt-2 ">
            Data di creazione: {dayjs(task.createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex justify-around mt-4 sm:flex-row flex-col gap-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 hover:cursor-pointer font-bold py-2 px-4 rounded"
            onClick={() => setIsShow(true)}
          >
            Elimina task
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-sky-700 dark:hover:bg-sky-900 hover:cursor-pointer font-bold py-2 px-4 rounded"
            onClick={() => setShowEditModal(true)}
          >
            Modifica Task
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <Modal
            title="Conferma eliminazione"
            content={<p>Sei sicuro di voler eliminare questa task?</p>}
            show={isShow}
            onClose={() => setIsShow(false)}
            onConfirm={handleRemove}
            confirmText="Elimina"
          />
          <EditTaskModal
            task={task}
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdate}
          />
          <NavLink
            className="mt-10 max-w-1/4 bg-blue-500 hover:bg-blue-700 text-white dark:bg-sky-700 dark:hover:bg-sky-900 hover:cursor-pointer font-bold py-2 px-4 rounded"
            to={"/"}
          >
            Torna alla lista
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default TaskDetail;
