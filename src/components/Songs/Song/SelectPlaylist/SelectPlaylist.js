import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CREATE_PLAYLIST } from "../../../../constants/routes";
import "./selectPlaylist.scss";

function SelectPlaylist({ playlists, addSong, songId, closeSelect }) {
  const playlistListRef = useRef(null);

  useEffect(() => {
    const closeSelectHolder = (e) => {
      if (!e.target.contains(playlistListRef.current)) {
        closeSelect();
      }
    };
    document.body.addEventListener("click", closeSelectHolder);

    return () => {
      document.body.removeEventListener("click", closeSelectHolder);
    };
  }, []);

  return (
    <ul ref={playlistListRef} className="select-playlists-list">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="select-playlists-list-element">
          <button
            className="playlists-list-button"
            disabled={playlist.songsIds.includes(songId)}
            onClick={() => addSong(playlist)}
          >
            {playlist.name}
          </button>
        </li>
      ))}
      <hr className="playlist-list-line" />
      <div className="playlists-list-element">
        <NavLink className="playlists-list-button" to={CREATE_PLAYLIST}>
          Create playlist
        </NavLink>
      </div>
    </ul>
  );
}

SelectPlaylist.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      songs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number])),
    })
  ).isRequired,
  addSong: PropTypes.func.isRequired,
  songId: PropTypes.number.isRequired,
  closeSelect: PropTypes.func.isRequired,
};

export default SelectPlaylist;
