import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosAddCircle, IoMdHeart } from "react-icons/io";
import PropTypes from "prop-types";
import "./song.scss";

function Song({ author, name, duration }) {
  return (
    <div className="song">
      <button className="play-button">
        <AiFillPlayCircle className="play-button-icon" />
      </button>
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
  author: PropTypes.string,
  name: PropTypes.string,
};

export default Song;
