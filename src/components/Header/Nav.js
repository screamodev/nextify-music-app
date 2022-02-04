import { useDispatch } from "react-redux";
import { signOut } from "../../store/authSlice";
import "./nav.scss";

function Nav() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <nav className="nav">
      <div />
      <div className="nav-logout-wrapper">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
