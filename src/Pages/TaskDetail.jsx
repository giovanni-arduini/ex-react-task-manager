import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import Modal from "../Components/Modal";
import EditTaskModal from "../Components/EditTaskModal";

function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
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
      <section>
        <div>
          <h2>{task.title}</h2>
          <p>Descrizione: {task.description}</p>
          <p>Status: {task.status}</p>
          <p>
            Data di creazione: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <button onClick={() => setIsShow(true)}>Elimina task</button>
          <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
        </div>
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
      </section>
    </>
  );
}

export default TaskDetail;
