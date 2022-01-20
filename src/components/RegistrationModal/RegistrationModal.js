import { AiFillCloseCircle } from "react-icons/ai";
import FormInput from "../common/FormInput";
import Modal from "../common/Modal";
import "./registrationModal.scss";

function RegistrationModal({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="registration-modal-header">
        <h3 className="registration-modal-heading">Sign up</h3>
        <AiFillCloseCircle
          className="registration-modal-heading-icon"
          onClick={closeModal}
        />
      </div>
      <div className="registration-modal-body">
        <form className="registration-modal-form">
          <FormInput label="Name" placeholder="Enter name" />
          <FormInput label="Email" placeholder="Enter email" />
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <button className="registration-form-button">Sign up</button>
        </form>
      </div>
    </Modal>
  );
}

export default RegistrationModal;
