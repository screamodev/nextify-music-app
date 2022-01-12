import { useContext } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { PlayerContext } from "../../../contexts/PlayerContext";
import "./player.scss";

function Player() {
  const { isPlaying, togglePlay } = useContext(PlayerContext);

  return (
    <div className="player">
      <div className="player-controls">
        <div className="player-controls-buttons">
          <div className="player-controls-play-button">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <AiFillPauseCircle className="play-toggle-button-icon" />
              ) : (
                <AiFillPlayCircle className="play-toggle-button-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
