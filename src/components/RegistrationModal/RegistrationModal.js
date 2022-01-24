import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import FormInput from "../common/FormInput";
import Modal from "../common/Modal";
import { register } from "../../store/authSlice";
import "./registrationModal.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function RegistrationModal({ isOpen, closeModal }) {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    setFormData({ ...initialState });
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        <form className="registration-modal-form" onSubmit={handleSubmit}>
          <FormInput
            name="name"
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="registration-form-button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default RegistrationModal;
