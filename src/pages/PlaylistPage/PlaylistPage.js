import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPickedPlaylist, getSongs } from "../../api/playlistApi";
import { useSort } from "../../hooks/useSort";
import MainLayout from "../../components/MainLayout";
import SortBy from "../../components/SortBy";
import Song from "../../components/Song";
import playlistDefaultImage from "../../assets/images/default-playlist-img.jpeg";
import "./playlistPage.scss";

function PlaylistPage() {
  const { clear, sortState, onSortBy } = useSort();

  const userId = useSelector((state) => state.auth.user.id);
  const { id: playlistId } = useParams();

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState(null);

  useEffect(() => {
    setPlaylistSongs([]);
    getPickedPlaylist(userId, playlistId).then(({ data: [playlist] }) => {
      setCurrentPlaylist(playlist);
      const { songsIds } = playlist;
      getSongs(sortState).then(({ data: allSongs }) => {
        allSongs.forEach(
          (song) =>
            songsIds.includes(song.id) &&
            setPlaylistSongs((prevSongs) => [...prevSongs, song])
        );
      });
    });
  }, [playlistId, sortState]);

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
            <div className="playlist-info">
              <p className="playlist-info-text">{currentPlaylist?.name}</p>
              <p className="playlist-info-text">
                {currentPlaylist?.description}
              </p>
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
