import "./modal.scss";

function Modal({ isOpen, children }) {
  return (
    isOpen && (
      <div className="registration-modal-overlay">
        <div className="modal-window">{children}</div>
      </div>
    )
  );
}

export default Modal;
