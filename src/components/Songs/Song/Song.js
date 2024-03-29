import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import { IoIosAddCircle, IoMdHeart } from "react-icons/io";
import { addSongToPlaylist } from "../../../api/playlistApi";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { getPlaylists } from "../../../store/playlistsSlice";
import { updateFavorites } from "../../../store/favoriteSongsSlice";
import SelectPlaylist from "./SelectPlaylist";
import "./song.scss";

function Song({
  isLastElement,
  lastSongElementRef,
  author,
  name,
  duration,
  id,
  url,
  dispatchSongsOnPlay,
}) {
  const userId = useSelector((state) => state.auth.user.id);
  const playlists = useSelector((state) => state.playlists.playlists);
  const favoriteSongsIds = useSelector(
    (state) => state.favorites.favoriteSongsIds
  );

  const dispatch = useDispatch();

  const [isSelectShown, setIsSelectShown] = useState(false);

  const { currentSong, isPlaying, setCurrentSong, onPlay, onPause } =
    useContext(PlayerContext);

  const isActive = currentSong?.id === id;
  const isFavorite = favoriteSongsIds.includes(id);
  const isCurrentSongPlaying = isPlaying && isActive;

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

  const onPlaySong = () => {
    if (currentSong?.id !== id) {
      setCurrentSong({ id, url, name, author });

      if (dispatchSongsOnPlay) {
        dispatchSongsOnPlay();
      }
    }

    onPlay();
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

  return (
    <div ref={isLastElement ? lastSongElementRef : undefined} className="song">
      <button
        className="play-button"
        onClick={isCurrentSongPlaying ? onPause : onPlaySong}
      >
        {isCurrentSongPlaying ? (
          <AiFillPauseCircle className="play-button-icon" />
        ) : (
          <AiFillPlayCircle className="play-button-icon" />
        )}
      </button>
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
        <button
          onClick={
            isFavorite ? () => unmakeFavorite(id) : () => makeFavorite(id)
          }
          className="add-to-button"
        >
          {isFavorite ? (
            <AiFillCheckCircle className="add-to-button-icon" />
          ) : (
            <IoMdHeart className="add-to-button-icon" />
          )}
        </button>
      </div>
    </div>
  );
}

Song.propTypes = {
  dispatchSongsOnPlay: PropTypes.func,
  isLastElement: PropTypes.bool,
  lastSongElementRef: PropTypes.func,
  author: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

Song.defaultProps = {
  isLastElement: null,
  lastSongElementRef: null,
  dispatchSongsOnPlay: undefined,
};

export default Song;
