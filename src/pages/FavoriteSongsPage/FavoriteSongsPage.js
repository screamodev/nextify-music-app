import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSort } from "../../hooks/useSort";
import { getSongs } from "../../api/songsApi";
import { updateFavorites } from "../../store/favoriteSongsSlice";
import MainLayout from "../../components/MainLayout";
import SortBy from "../../components/SortBy";
import Song from "../../components/Songs/Song";
import favoriteSongsImage from "../../assets/images/favorite-songs-img.png";
import "./favoriteSongsPage.scss";
import { addSongs } from "../../store/playerReducer";

function FavoriteSongsPage() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const userId = useSelector((state) => state.auth.user.id);
  const favoriteSongsIds = useSelector(
    (state) => state.favorites.favoriteSongsIds
  );
  const dispatch = useDispatch();
  const { clear, sortState, onSortBy, sortById, sortByDirection } = useSort();

  const fetchFavoriteSongs = () => {
    getSongs({ field: "", order: "" })
      .then(({ data: allSongs }) => {
        setFavoriteSongs(
          allSongs.filter((song) => favoriteSongsIds.includes(song.id))
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const unmakeFavorite = (songId) => {
    const updatedFavoriteSongsIds = favoriteSongsIds.filter(
      (id) => id !== songId
    );
    dispatch(
      updateFavorites({ userId, favoriteSongsIds: updatedFavoriteSongsIds })
    )
      .then(unwrapResult)
      .then(fetchFavoriteSongs);
  };

  const sortFavoriteSongs = () =>
    setFavoriteSongs(() =>
      sortState.order ? sortByDirection(favoriteSongs) : sortById(favoriteSongs)
    );

  useEffect(fetchFavoriteSongs, []);
  useEffect(sortFavoriteSongs, [sortState]);
  useEffect(() => {
    if (favoriteSongs.length) {
      dispatch(addSongs(favoriteSongs));
    }
  }, [favoriteSongs]);

  return (
    <MainLayout>
      <div className="playlist-wrapper">
        <div className="playlist-content">
          <div className="playlist-info-block">
            <div className="playlist-photo-holder">
              <div className="playlist-photo">
                <img
                  className="playlist-photo-img"
                  src={favoriteSongsImage}
                  alt="playlist"
                />
              </div>
            </div>
            <div className="playlist-info-holder">
              <div className="playlist-info">
                <p className="playlist-info-text">Favorite songs</p>
              </div>
            </div>
          </div>
          <div className="playlist-songs">
            <SortBy clear={clear} sortState={sortState} onSortBy={onSortBy} />
            <div className="playlist-songs-list">
              {favoriteSongs.length ? (
                favoriteSongs.map(
                  ({ author, name: songName, duration, id: songId, url }) => (
                    <div key={songId} className="playlist-song-delete">
                      <Song
                        author={author}
                        name={songName}
                        duration={duration}
                        id={songId}
                        url={url}
                      />
                      <div className="playlist-song-delete-button-block">
                        <button
                          onClick={() => unmakeFavorite(songId)}
                          className="playlist-song-delete-button"
                        >
                          <MdDeleteForever className="playlist-song-delete-button-icon" />
                        </button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="playlist-empty">No favorite songs.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FavoriteSongsPage;
