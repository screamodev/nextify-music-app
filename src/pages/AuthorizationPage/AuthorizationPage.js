import { useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../store/authSlice";
import { signinSchema } from "../../schemas/authSchemas";
import FormInput from "../../components/common/FormInput";
import RegistrationModal from "../../components/RegistrationModal";
import PreLoader from "../../components/common/PreLoader/PreLoader";
import NextifyLogo from "../../assets/images/logo-nextify.png";
import "./authorizationPage.scss";

function AuthorizationPage() {
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginFetch, setIsLoginFetch] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = ({ email, password }) => {
    setIsLoginFetch(true);
    setIsLoginError(false);
    dispatch(login({ email, password }))
      .then(unwrapResult)
      .catch(() => {
        setIsLoginError(true);
        setIsLoginFetch(false);
      });
  };

  const openModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-info">
            <div className="info-logo">
              <img className="info-logo-image" src={NextifyLogo} alt="logo" />
            </div>
            <h1 className="info-upper-heading">
              Free listening to songs from little Nextify database
            </h1>
            <h2 className="info-bottom-heading">
              Create special playlist with your favorite songs or choose your
              favorite genres and listen to them with Nextify.
            </h2>
          </div>
          <div className="auth-form-wrapper">
            {isLoginFetch ? (
              <PreLoader />
            ) : (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={signinSchema}
                onSubmit={submitHandler}
              >
                {
                  <Form className="sign-in-form">
                    <Field
                      component={FormInput}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                    />
                    <Field
                      component={FormInput}
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                    />
                    <button className="sign-in-button">Sign in</button>
                    {isLoginError && (
                      <div className="error-message">
                        Incorrect email or password.
                      </div>
                    )}
                  </Form>
                }
              </Formik>
            )}
            <hr />
            <button className="sign-up-button" onClick={openModal}>
              Sign up
            </button>
          </div>
        </div>
      </div>
      <RegistrationModal isOpen={isRegisterModalOpen} closeModal={closeModal} />
    </>
  );
}

export default AuthorizationPage;
