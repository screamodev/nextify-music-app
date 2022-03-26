import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { Form, Formik, Field } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { register } from "../../store/authSlice";
import { signupSchema } from "../../schemas/authSchemas";
import PreLoader from "../common/PreLoader/PreLoader";
import FormInput from "../common/FormInput";
import Modal from "../common/Modal";
import "./registrationModal.scss";

let initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function RegistrationModal({ isOpen, closeModal }) {
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    setIsRegisterError(false);
    dispatch(register({ name, email, password, favoriteSongsIds: [] }))
      .then(unwrapResult)
      .catch(() => {
        initialState = { name, email, password, ...initialState };
        setIsRegisterError(true);
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    closeModal();
    setIsRegisterError(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="registration-modal-header">
        <h3 className="registration-modal-heading">Sign up</h3>
        <AiFillCloseCircle
          className="registration-modal-heading-icon"
          onClick={handleCloseModal}
        />
      </div>
      <div className="registration-modal-body">
        {isLoading ? (
          <PreLoader />
        ) : (
          <Formik
            initialValues={initialState}
            validationSchema={signupSchema}
            onSubmit={handleRegister}
          >
            <Form className="registration-modal-form">
              <Field
                component={FormInput}
                name="name"
                label="Name"
                placeholder="Enter name"
              />
              <Field
                component={FormInput}
                name="email"
                label="Email"
                placeholder="Enter email"
              />
              <Field
                component={FormInput}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
              />
              <Field
                component={FormInput}
                name="passwordConfirm"
                label="Confirm password"
                type="password"
                placeholder="Enter password"
              />
              <button className="registration-form-button">Sign up</button>
              {isRegisterError && (
                <div className="error-message">Something went wrong.</div>
              )}
            </Form>
          </Formik>
        )}
      </div>
    </Modal>
  );
}

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RegistrationModal;
