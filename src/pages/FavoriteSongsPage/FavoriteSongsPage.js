import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { useSort } from "../../hooks/useSort";
import { getUserById, updateUserById } from "../../api/userApi";
import { getSongs } from "../../api/songsApi";
import MainLayout from "../../components/MainLayout";
import SortBy from "../../components/SortBy";
import Song from "../../components/Song";
import favoriteSongsImage from "../../assets/images/favorite-songs-img.png";
import "./favoriteSongsPage.scss";

function FavoriteSongsPage() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [songsIds, setSongsIds] = useState([]);
  const userId = useSelector((state) => state.auth.user.id);
  const { clear, sortState, onSortBy } = useSort();

  const fetchPlaylistSongs = () => {
    setFavoriteSongs([]);
    getUserById(userId).then(({ data: { favoriteSongsIds } }) => {
      setSongsIds(favoriteSongsIds);
      getSongs(sortState)
        .then(({ data: allSongs }) => {
          allSongs.forEach(
            (song) =>
              favoriteSongsIds.includes(song.id) &&
              setFavoriteSongs((prevSongs) => [...prevSongs, song])
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  };

  const unmakeFavorite = (songId) => {
    const updatedFavoriteSongsIds = songsIds.filter((id) => id !== songId);
    updateUserById({
      userId,
      favoriteSongsIds: updatedFavoriteSongsIds,
    }).then(fetchPlaylistSongs);
  };

  useEffect(fetchPlaylistSongs, [sortState]);

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
