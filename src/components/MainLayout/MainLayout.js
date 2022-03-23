import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylists } from "../../store/playlistsSlice";
import { getFavorites } from "../../store/favoriteSongsSlice";
import Nav from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import "./mainLayout.scss";

function MainLayout({ children }) {
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylists(userId));
    dispatch(getFavorites(userId));
  }, [userId]);

  return (
    <>
      <div className="wrapper-main">
        <Sidebar />
        <div className="main-content">
          <Nav />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
