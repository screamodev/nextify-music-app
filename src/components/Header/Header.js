import { useDispatch } from "react-redux";
import { signOut } from "../../store/authSlice";
import "./header.scss";

function Header() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <header className="header">
      <div />
      <div className="header-logout-wrapper">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
