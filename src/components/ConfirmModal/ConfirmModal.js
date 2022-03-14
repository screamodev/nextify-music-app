import PropTypes from "prop-types";
import Modal from "../common/Modal";
import "./confirmModal.scss";

function ConfirmModal({ onConfirm, closeModal, isOpen }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="confirm-modal">
        <p>Are you sure?</p>
        <button onClick={onConfirm} className="confirm-modal-button">
          yes
        </button>
        <button onClick={closeModal} className="confirm-modal-button">
          no
        </button>
      </div>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default ConfirmModal;
