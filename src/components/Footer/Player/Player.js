import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import "./player.scss";

function Player() {
  return (
    <div className="player">
      <div className="player-controls">
        <div className="player-controls-buttons">
          <div className="player-controls-play-button">
            <button>
              <AiFillPlayCircle className="play-toggle-button-icon" />
              <AiFillPauseCircle className="play-toggle-button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
