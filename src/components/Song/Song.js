import PropTypes from "prop-types";
import { useContext } from "react";
import { IoIosAddCircle, IoMdHeart } from "react-icons/io";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { PlayerContext } from "../../contexts/PlayerContext";
import "./song.scss";

function Song({ author, name, duration, id, url }) {
  const { currentSong, isPlaying, setCurrentSong, onPlay, onPause } =
    useContext(PlayerContext);

  const onPlaySong = () => {
    if (currentSong?.id !== id) {
      setCurrentSong({ id, url });
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
      <div className="song-info">{author}</div>
      <div className="song-info">{name}</div>
      <div className="song-duration">{duration}</div>
      <div className="song-add-buttons">
        <button className="add-to-button">
          <IoIosAddCircle className="add-to-button-icon" />
        </button>
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
