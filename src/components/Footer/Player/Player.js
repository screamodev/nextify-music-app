import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillCheckCircle,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import {
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { MdQueueMusic } from "react-icons/md";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { updateFavorites } from "../../../store/favoriteSongsSlice";
import { formatTime } from "../../../helpers/audio";
import { useAudio } from "../../../hooks/useAudio";
import Queue from "./Queue";
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

  const userId = useSelector((state) => state.auth.user?.id);
  const favoriteSongsIds = useSelector(
    (state) => state.favorites.favoriteSongsIds
  );
  const dispatch = useDispatch();
  const { name, author, id } = currentSong;
  const isFavorite = favoriteSongsIds.includes(id);
  const [isQueueShown, setIsQueueShown] = useState(false);

  const switchQueue = () => {
    setIsQueueShown(!isQueueShown);
  };

  const closeQueue = () => {
    setIsQueueShown(false);
  };

  const makeFavorite = (songId) => {
    dispatch(
      updateFavorites({
        userId,
        favoriteSongsIds: [...favoriteSongsIds, songId],
      })
    );
  };

  const unmakeFavorite = (songId) => {
    const updatedFavoriteSongsIds = favoriteSongsIds.filter(
      (trackId) => trackId !== songId
    );
    dispatch(
      updateFavorites({ userId, favoriteSongsIds: updatedFavoriteSongsIds })
    );
  };

  const getVolumeIcon = () => {
    if (volume > 0.5 && !isMuted) {
      return <BsFillVolumeUpFill className="volume-button-icon" />;
    }
    if (volume <= 0.5 && !isMuted && volume !== 0) {
      return <BsFillVolumeDownFill className="volume-button-icon" />;
    }
    if (volume === 0 || isMuted) {
      return <BsFillVolumeMuteFill className="volume-button-icon" />;
    }
    return null;
  };

  return (
    <div className="player">
      <div className="player-music-info">
        <p className="player-current-music-info">{name}</p>
        <p className="player-current-music-info">{author}</p>
      </div>
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
      <div className="side-buttons">
        <button className="side-buttons-button" onClick={switchQueue}>
          <MdQueueMusic className="side-buttons-button-icon" />
        </button>
        {isFavorite ? (
          <button
            onClick={() => unmakeFavorite(id)}
            className="side-buttons-button"
          >
            <AiFillCheckCircle className="side-buttons-button-icon" />
          </button>
        ) : (
          <button
            onClick={() => makeFavorite(id)}
            className="side-buttons-button"
          >
            <IoMdHeart className="side-buttons-button-icon" />
          </button>
        )}
        <div className="side-buttons-volume">
          <button className="side-buttons-button" onClick={toggleMute}>
            {getVolumeIcon()}
          </button>
          <input
            className="side-buttons-volume-control"
            type="range"
            value={isMuted ? "0" : volume}
            max="1"
            step="0.05"
            onChange={(e) => changeVolume(e.target.value)}
          />
        </div>
      </div>
      {isQueueShown && <Queue closeQueue={closeQueue} />}
    </div>
  );
}

export default Player;
