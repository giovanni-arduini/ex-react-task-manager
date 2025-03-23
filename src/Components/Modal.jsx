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
          <div className="overlay">
            <div className="modal">
              <h2>{title}</h2>
              {content}
              <button onClick={onConfirm}>{confirmText}</button>
              <button onClick={onClose}>Chiudi</button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Modal;
