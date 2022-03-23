import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { bubble as Menu } from "react-burger-menu";
import {
  CREATE_PLAYLIST,
  FAVORITE_PAGE,
  PLAYLISTS,
  PROFILE,
  SEARCH_PAGE,
} from "../../constants/routes";
import "./sidebar.scss";

function Sidebar() {
  const userPlaylists = useSelector((state) => state.playlists.playlists);

  return (
    <aside>
      <Menu className="aside-menu">
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to={PROFILE}>Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={SEARCH_PAGE}>Search</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={CREATE_PLAYLIST}>Create playlist</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={FAVORITE_PAGE}>Favorite songs</NavLink>
            </li>
          </ul>
        </nav>
        <hr className="dividing-line" />
        <div className="playlists">
          <ul className="playlists-list">
            {userPlaylists.map(({ id, name }) => (
              <li key={id}>
                <NavLink className="nav-item" to={`${PLAYLISTS}/${id}`}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Menu>
    </aside>
  );
}

export default Sidebar;
