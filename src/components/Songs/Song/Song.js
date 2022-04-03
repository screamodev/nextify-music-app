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

function Song({ lastSongElementRef, author, name, duration, id, url }) {
  const [isSelectShown, setIsSelectShown] = useState(false);
  const userId = useSelector((state) => state.auth.user.id);
  const playlists = useSelector((state) => state.playlists.playlists);
  const favoriteSongsIds = useSelector(
    (state) => state.favorites.favoriteSongsIds
  );
  const dispatch = useDispatch();
  const { currentSong, isPlaying, setCurrentSong, onPlay, onPause } =
    useContext(PlayerContext);

  const isActive = currentSong?.id === id;
  const isFavorite = favoriteSongsIds.includes(id);

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

  const onPlaySong = () => {
    if (currentSong?.id !== id) {
      setCurrentSong({ id, url, name, author });
    }
    onPlay();
  };

  return (
    <div ref={lastSongElementRef} className="song">
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
        {isFavorite ? (
          <button onClick={() => unmakeFavorite(id)} className="add-to-button">
            <AiFillCheckCircle className="add-to-button-icon" />
          </button>
        ) : (
          <button onClick={() => makeFavorite(id)} className="add-to-button">
            <IoMdHeart className="add-to-button-icon" />
          </button>
        )}
      </div>
    </div>
  );
}

Song.propTypes = {
  lastSongElementRef: PropTypes.func,
  author: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

Song.defaultProps = {
  lastSongElementRef: null,
};

export default Song;
