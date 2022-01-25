import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../components/common/FormInput";
import RegistrationModal from "../../components/RegistrationModal";
import { login } from "../../store/authSlice";
import NextifyLogo from "../../assets/images/logo-nextify.png";
import "./authorizationPage.scss";

const initialState = {
  email: "",
  password: "",
};

function AuthorizationPage() {
  const [formData, setFormData] = useState(initialState);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <form className="sign-in-form" onSubmit={handleSubmit}>
              <FormInput
                name="email"
                label="Email"
                type="email"
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
              <button className="sign-in-button" type="submit">
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
