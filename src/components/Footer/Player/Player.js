import { useContext } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { formatTime } from "../../../helpers/audio";
import "./player.scss";

function Player() {
  const {
    isPlaying,
    progress,
    current,
    audioDuration,
    togglePlay,
    changeCurrentTime,
  } = useContext(PlayerContext);

  return (
    <div className="player">
      <div className="player-controls">
        <div className="controls-buttons">
          <div className="controls-play-button">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <AiFillPauseCircle className="play-toggle-button-icon" />
              ) : (
                <AiFillPlayCircle className="play-toggle-button-icon" />
              )}
            </button>
          </div>
        </div>
        <div className="controls-progress-bar-holder">
          <span>{formatTime(current)}</span>
          <input
            className="controls-progress-bar"
            type="range"
            value={progress}
            max="100"
            step="1"
            onChange={(event) => changeCurrentTime(event.target.value)}
          />
          <span>{formatTime(audioDuration)}</span>
        </div>
      </div>
    </div>
  );
}

export default Player;
