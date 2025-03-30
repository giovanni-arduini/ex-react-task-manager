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
        <form
          className="flex flex-col gap-3"
          ref={editFormRef}
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col" htmlFor="">
            Nome task:
            <input
              className="block mb-2 text-sm font-medium text-gray-900 bg-white p-2 border rounded"
              type="text"
              value={editedTask.title}
              onChange={(e) => changeEditedTask("title", e)}
            />
          </label>
          <label className="flex flex-col">
            Descrizione:
            <textarea
              className="block mb-2 text-sm font-medium text-gray-900 rows-4 bg-white border p-2 rounded"
              value={editedTask.description}
              onChange={(e) => changeEditedTask("description", e)}
            ></textarea>
          </label>
          <label className="flex flex-col">
            Stato:
            <select
              className="block mb-2 text-sm font-medium text-gray-900 bg-white border p-2 rounded"
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
