import { useState, useRef } from "react";
import Modal from "./Modal.jsx";

function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedtask] = useState(task);
  const editFormRef = useRef();

  function changeEditedTask(key, event) {
    setEditedtask((prev) => ({ ...prev, [key]: event.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(editedTask);
  }

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label htmlFor="">
            Nome task:
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => changeEditedTask("title", e)}
            />
          </label>
          <label>
            Descrizione:
            <textarea
              value={task.description}
              onChange={(e) => changeEditedTask("description", e)}
            ></textarea>
          </label>
          <label>
            Stato:
            <select
              value={task.status}
              onChange={(e) => changeEditedTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      onConfirm={() => {
        editFormRef.current.requestSubmit();
      }}
      show={show}
      onClose={onClose}
    ></Modal>
  );
}

export default EditTaskModal;
