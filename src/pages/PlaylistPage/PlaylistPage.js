import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Field, Form, Formik } from "formik";
import { TiEdit } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { getPickedPlaylist, getSongs } from "../../api/playlistApi";
import { useSort } from "../../hooks/useSort";
import { createPlaylistSchema } from "../../schemas/createPlaylistSchema";
import { editPlaylist } from "../../store/playlistsSlice";
import MainLayout from "../../components/MainLayout";
import SortBy from "../../components/SortBy";
import Song from "../../components/Song";
import FormInput from "../../components/common/FormInput";
import playlistDefaultImage from "../../assets/images/default-playlist-img.jpeg";
import "./playlistPage.scss";

function PlaylistPage() {
  const { clear, sortState, onSortBy } = useSort();

  const userId = useSelector((state) => state.auth.user.id);
  const { id: playlistId } = useParams();
  const dispatch = useDispatch();

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState(null);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    setPlaylistSongs([]);
    getPickedPlaylist(userId, playlistId).then(({ data: [playlist] }) => {
      setCurrentPlaylist(playlist);
      const { songsIds } = playlist;
      getSongs(sortState)
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
  }, [playlistId, sortState, isEditMode]);

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
                <Formik
                  initialValues={{
                    name: currentPlaylist?.name,
                    description: currentPlaylist?.description,
                  }}
                  validationSchema={createPlaylistSchema}
                  onSubmit={handleEditPlaylist}
                >
                  <Form className="edit-playlist-form">
                    <Field
                      component={FormInput}
                      name="name"
                      placeholder="name..."
                    />
                    <Field
                      component={FormInput}
                      name="description"
                      placeholder="description..."
                      isTextarea
                    />
                    <div className="playlist-button">
                      <button className="edit-playlist-button">
                        Save changes
                      </button>
                    </div>
                  </Form>
                </Formik>
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
          </div>
          <div className="playlist-songs">
            <SortBy clear={clear} sortState={sortState} onSortBy={onSortBy} />
            <div className="playlist-songs-list">
              {playlistSongs?.length ? (
                playlistSongs?.map(
                  ({ author, name: songName, duration, id: songId, url }) => (
                    <Song
                      author={author}
                      name={songName}
                      duration={duration}
                      id={songId}
                      key={songId}
                      url={url}
                    />
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
