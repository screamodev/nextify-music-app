import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { IoIosAddCircle, IoMdHeart } from "react-icons/io";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { addSongToPlaylist } from "../../api/playlistApi";
import { PlayerContext } from "../../contexts/PlayerContext";
import { getPlaylists } from "../../store/playlistsSlice";
import SelectPlaylist from "./SelectPlaylist";
import "./song.scss";

function Song({ author, name, duration, id, url }) {
  const { currentSong, isPlaying, setCurrentSong, onPlay, onPause } =
    useContext(PlayerContext);

  const userId = useSelector((state) => state.auth.user.id);
  const playlists = useSelector((state) => state.playlists.playlists);
  const [isSelectShown, setIsSelectShown] = useState(false);
  const dispatch = useDispatch();

  const openSelect = () => {
    setIsSelectShown(true);
  };

  const closeSelect = () => {
    setIsSelectShown(false);
  };

  const addSong = (playlist) => {
    addSongToPlaylist(playlist.id, {
      songsIds: [...playlist.songsIds, id],
    })
      .then(() => {
        dispatch(getPlaylists(userId));
        closeSelect();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const isActive = currentSong?.id === id;

  const onPlaySong = () => {
    if (currentSong?.id !== id) {
      setCurrentSong({ id, url, name, author });
    }
    onPlay();
  };

  return (
    <div className="song">
      {isPlaying && currentSong?.id === id ? (
        <button className="play-button" onClick={onPause}>
          <AiFillPauseCircle className="play-button-icon" />
        </button>
      ) : (
        <button className="play-button" onClick={onPlaySong}>
          <AiFillPlayCircle className="play-button-icon" />
        </button>
      )}
      <div className={`song-info ${isActive ? "song-info-active" : ""}`}>
        {author}
      </div>
      <div className="song-info">{name}</div>
      <div className="song-duration">{duration}</div>
      <div className="song-add-buttons">
        <div className="song-add-button-with-dropdown">
          <button onClick={openSelect} className="add-to-button">
            <IoIosAddCircle className="add-to-button-icon" />
          </button>
          {isSelectShown && (
            <SelectPlaylist
              playlists={playlists}
              addSong={addSong}
              songId={id}
              closeSelect={closeSelect}
            />
          )}
        </div>
        <button className="add-to-button">
          <IoMdHeart className="add-to-button-icon" />
        </button>
      </div>
    </div>
  );
}

Song.propTypes = {
  author: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default Song;
