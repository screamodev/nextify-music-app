import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PLAYLISTS } from "../../constants/routes";
import MainLayout from "../../components/MainLayout";
import playlistDefaultImage from "../../assets/images/default-playlist-img.jpeg";
import profileDefaultImage from "../../assets/images/default-profile-img.png";
import "./userProfilePage.scss";

function UserProfilePage() {
  const playlists = useSelector((state) => state.playlists.playlists);
  const { name: userName, email } = useSelector((state) => state.auth.user);

  return (
    <MainLayout>
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-photo">
            <div className="profile-photo-holder">
              <img
                className="profile-photo-img"
                src={profileDefaultImage}
                alt="profile"
              />
            </div>
            <button className="profile-upload-photo-button">Upload</button>
          </div>
          <div className="profile-info-holder">
            <div className="profile-info">
              <p className="profile-info-text">Profile</p>
              <p className="profile-info-text">{userName}</p>
              <p className="profile-info-text">{email}</p>
            </div>
          </div>
        </div>
        <div className="playlists-list">
          <p className="playlists-list-title">Your Playlists</p>
          <div className="playlist-cards">
            {playlists.map(({ id, name }) => (
              <NavLink key={id} to={`${PLAYLISTS}/${id}`}>
                <div className="playlist-card">
                  <img
                    className="playlist-card-img"
                    src={playlistDefaultImage}
                    alt="playlist"
                  />
                  <p className="playlist-card-text">{name}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserProfilePage;
