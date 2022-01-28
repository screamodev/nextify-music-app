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

function RegistrationModal({ isOpen, closeModal }) {
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isRegisterFetch, setIsRegisterFetch] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = ({ name, email, password }) => {
    setIsRegisterFetch(true);
    setIsRegisterError(false);
    dispatch(register({ name, email, password }))
      .then(unwrapResult)
      .catch(() => {
        setIsRegisterError(true);
        setIsRegisterFetch(false);
      });
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
        {isRegisterFetch ? (
          <PreLoader />
        ) : (
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={signupSchema}
            onSubmit={submitHandler}
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
                <div className="error-message">User already exists.</div>
              )}
            </Form>
          </Formik>
        )}
      </div>
    </Modal>
  );
}

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default RegistrationModal;
