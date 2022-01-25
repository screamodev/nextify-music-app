import { useState } from "react";
import FormInput from "../../components/common/FormInput";
import RegistrationModal from "../../components/RegistrationModal";
import NextifyLogo from "../../assets/images/logo-nextify.png";
import "./authorizationPage.scss";

function AuthorizationPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
            <form className="sign-in-form">
              <FormInput label="Email" placeholder="Enter email" />
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter password"
              />
              <button className="sign-in-button" type="button">
                Sign in
              </button>
            </form>
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
