import { createPortal } from "react-dom";

function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  return (
    <>
      {show &&
        createPortal(
          <div className="modal-overlay fixed w-full h-full z-50 opacity-80 inset-0 bg-grey-400 dark:bg-gray-700 flex align-center justify-center items-center">
            <div className="modal-container min-w-1/3 p-8 flex flex-col bg-grey-300 dark:bg-gray-400 rounded shadow-lg">
              <h2 className="text-center text-lg">{title}</h2>
              {content}
              <div className=" flex justify-around mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-sky-700 dark:hover:bg-sky-900 hover:cursor-pointer font-bold py-2 px-4 rounded"
                  onClick={onConfirm}
                >
                  {confirmText}
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-sky-700 dark:hover:bg-sky-900 hover:cursor-pointer font-bold py-2 px-4 rounded"
                  onClick={onClose}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Modal;
