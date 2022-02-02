import { NavLink } from "react-router-dom";
import { bubble as Menu } from "react-burger-menu";
import {
  CREATE_PLAYLIST,
  FAVORITE,
  PROFILE,
  SEARCH,
} from "../../constants/routes";
import "./sidebar.scss";

function Sidebar() {
  return (
    <aside>
      <Menu className="aside-menu">
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to={PROFILE}>Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={SEARCH}>Search</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={CREATE_PLAYLIST}>Create playlist</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={FAVORITE}>Favorite songs</NavLink>
            </li>
          </ul>
        </nav>
        <hr className="dividing-line" />
        <div className="playlists">
          <ul className="playlists-list">
            <li>Reggae</li>
            <li>Rock</li>
            <li>Pop</li>
          </ul>
        </div>
      </Menu>
    </aside>
  );
}

export default Sidebar;
