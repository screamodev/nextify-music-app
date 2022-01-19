import NextifyLogo from "../../assets/images/logo-nextify.png";
import FormInput from "../common/FormInput";
import "./authorizationPage.scss";

function AuthorizationPage() {
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorizationPage;
