import { useContext } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import {
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { formatTime } from "../../../helpers/audio";
import { useAudio } from "../../../hooks/useAudio";
import "./player.scss";

function Player() {
  const {
    currentSong,
    isPrevDisabled,
    isNextDisabled,
    isPlaying,
    onPlay,
    onPause,
    onPrev,
    onNext,
  } = useContext(PlayerContext);

  const {
    progress,
    current,
    audioDuration,
    volume,
    isMuted,
    changeCurrentTime,
    changeVolume,
    toggleMute,
  } = useAudio(currentSong, isPlaying, onPause);

  const getVolumeIcon = () => {
    if (volume > 0.5 && !isMuted) {
      return <BsFillVolumeUpFill className="volume-toggle-button-icon" />;
    }
    if (volume <= 0.5 && !isMuted && volume !== 0) {
      return <BsFillVolumeDownFill className="volume-toggle-button-icon" />;
    }
    if (volume === 0 || isMuted) {
      return <BsFillVolumeMuteFill className="volume-toggle-button-icon" />;
    }
    return null;
  };

  return (
    <div className="player">
      <div className="player-music-info" />
      <div className="player-controls">
        <div className="controls-buttons">
          <div className="controls-play-button">
            <button
              onClick={onPrev}
              disabled={isPrevDisabled}
              className="controls-switch-button"
            >
              <BiSkipPrevious className="controls-switch-button-icon" />
            </button>
            {isPlaying ? (
              <button onClick={onPause}>
                <AiFillPauseCircle className="play-toggle-button-icon" />
              </button>
            ) : (
              <button onClick={onPlay}>
                <AiFillPlayCircle className="play-toggle-button-icon" />
              </button>
            )}
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className="controls-switch-button"
            >
              <BiSkipNext className="controls-switch-button-icon" />
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
      <div className="volume-controls">
        <button className="volume-button" onClick={toggleMute}>
          {getVolumeIcon()}
        </button>
        <input
          className="volume-control"
          type="range"
          value={isMuted ? "0" : volume}
          max="1"
          step="0.05"
          onChange={(e) => changeVolume(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Player;
