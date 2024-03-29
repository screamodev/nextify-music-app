import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getPickedPlaylist, deletePlaylist } from "../../api/playlistApi";
import { getSongs } from "../../api/songsApi";
import { useSort } from "../../hooks/useSort";
import { addSongs } from "../../store/playerReducer";
import { deletePlaylistSong, editPlaylist } from "../../store/playlistsSlice";
import { SEARCH_PAGE } from "../../constants/routes";
import { PlayerContext } from "../../contexts/PlayerContext";
import { isSongPlayingInCurrentSongList } from "../../helpers/songs";
import MainLayout from "../../components/MainLayout";
import SortBy from "../../components/SortBy";
import Song from "../../components/Songs/Song";
import ConfirmModal from "../../components/ConfirmModal";
import EditPlaylistForm from "../../components/EditPlaylistForm";
import playlistDefaultImage from "../../assets/images/default-playlist-img.jpeg";
import "./playlistPage.scss";

function PlaylistPage() {
  const userId = useSelector((state) => state.auth.user.id);

  const { id: playlistId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const { clear, sortState, onSortBy, sortByDirection, sortById } = useSort();
  const { currentSong } = useContext(PlayerContext);

  const isPlaylistSongPlaying = isSongPlayingInCurrentSongList(
    playlistSongs,
    currentSong
  );

  const fetchPlaylistSongs = () => {
    setPlaylistSongs([]);
    getPickedPlaylist(userId, playlistId).then(({ data: [playlist] }) => {
      setCurrentPlaylist(playlist);
      const { songsIds } = playlist;
      getSongs({ field: "", order: "" })
        .then(({ data: allSongs }) => {
          allSongs.forEach(
            (song) =>
              songsIds.includes(song.id) &&
              setPlaylistSongs((prevSongs) => [...prevSongs, song])
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  };

  const handleEditPlaylist = ({ name, description }, { resetForm }) => {
    dispatch(editPlaylist({ name, description, playlistId }))
      .then(unwrapResult)
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    resetForm();
  };

  const handleDeletePlaylist = () => {
    deletePlaylist({ playlistId })
      .then(() => {
        navigate(SEARCH_PAGE);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeletePlaylistSong = (songId) => {
    const updatedPlaylistSongsIds = currentPlaylist.songsIds.filter(
      (id) => id !== songId
    );
    dispatch(
      deletePlaylistSong({ playlistId, songsIds: updatedPlaylistSongsIds })
    )
      .then(unwrapResult)
      .then(() => fetchPlaylistSongs());
  };

  const closeModal = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const dispatchSongsOnPlay = () => {
    dispatch(addSongs(playlistSongs));
  };

  useEffect(() => {
    fetchPlaylistSongs();
  }, [playlistId, isEditMode]);

  useEffect(() => {
    if (playlistSongs.length) {
      const sortedSongs = sortState.order
        ? sortByDirection(playlistSongs)
        : sortById(playlistSongs);

      if (isPlaylistSongPlaying) {
        dispatch(addSongs(sortedSongs));
      }

      setPlaylistSongs(sortedSongs);
    }
  }, [sortState]);

  return (
    <MainLayout>
      <div className="playlist-wrapper">
        <div className="playlist-content">
          <div className="playlist-info-block">
            <div className="playlist-photo-holder">
              <div className="playlist-photo">
                <img
                  className="playlist-photo-img"
                  src={playlistDefaultImage}
                  alt="playlist"
                />
              </div>
              <button className="playlist-upload-photo-button">Upload</button>
            </div>
            <div className="playlist-info-holder">
              {isEditMode ? (
                <EditPlaylistForm
                  currentPlaylist={currentPlaylist}
                  onEditPlaylist={handleEditPlaylist}
                />
              ) : (
                <div className="playlist-info">
                  <p className="playlist-info-text">{currentPlaylist?.name}</p>
                  <p className="playlist-info-text">
                    {currentPlaylist?.description}
                  </p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="set-edit-button"
                  >
                    <TiEdit className="set-edit-button-icon" />
                  </button>
                </div>
              )}
            </div>
            <div className="delete-playlist-block">
              {isConfirmDeleteModalOpen ? (
                <ConfirmModal
                  onConfirm={handleDeletePlaylist}
                  closeModal={closeModal}
                  isOpen={isConfirmDeleteModalOpen}
                />
              ) : (
                <button
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  className="delete-playlist-block-delete-button"
                >
                  Delete playlist
                </button>
              )}
            </div>
          </div>
          <div className="playlist-songs">
            <SortBy clear={clear} sortState={sortState} onSortBy={onSortBy} />
            <div className="playlist-songs-list">
              {playlistSongs.length ? (
                playlistSongs.map(
                  ({ author, name: songName, duration, id: songId, url }) => (
                    <div key={songId} className="playlist-song-delete">
                      <Song
                        dispatchSongsOnPlay={dispatchSongsOnPlay}
                        author={author}
                        name={songName}
                        duration={duration}
                        id={songId}
                        url={url}
                      />
                      <div className="playlist-song-delete-button-block">
                        <button
                          onClick={() => handleDeletePlaylistSong(songId)}
                          className="playlist-song-delete-button"
                        >
                          <MdDeleteForever className="playlist-song-delete-button-icon" />
                        </button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="playlist-empty">Empty.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlaylistPage;
