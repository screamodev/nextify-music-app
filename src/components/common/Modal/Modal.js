import PropTypes from "prop-types";
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
