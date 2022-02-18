import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdClear } from "react-icons/md";
import MainLayout from "../../components/MainLayout";
import Song from "../../components/Song";
import SortBy from "../../components/SortBy";
import { searchSongs } from "../../api/searchApi";
import { addSongs } from "../../store/playerReducer";
import { useSort } from "../../hooks/useSort";
import "./searchPage.scss";

function SearchPage() {
  const { sortState, onSortBy, clear } = useSort();

  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchInput) {
      searchSongs({ searchInput, ...sortState }).then(({ data }) => {
        setSongs(data);
      });
    } else if (!searchInput) {
      setSongs([]);
    }
  }, [searchInput, sortState]);

  useEffect(() => {
    if (songs.length) {
      dispatch(addSongs(songs));
    }
  }, [songs]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearInput = () => {
    setSearchInput("");
  };

  return (
    <MainLayout>
      <div className="search-wrapper">
        <div className="search-wrapper-content">
          <div className="search-input-block">
            <input
              className="search-input"
              placeholder="Artist or song name"
              value={searchInput}
              onChange={handleChange}
            />
            <button onClick={clearInput} className="search-input-button">
              <MdClear className="search-input-button-icon" />
            </button>
          </div>
          <div className="search-songs">
            <SortBy clear={clear} sortState={sortState} onSortBy={onSortBy} />
            <div className="search-songs-list">
              {songs.length ? (
                songs.map(({ author, name, duration, id, url }) => (
                  <Song
                    author={author}
                    name={name}
                    duration={duration}
                    id={id}
                    key={id}
                    url={url}
                  />
                ))
              ) : (
                <div className="search-not-found">
                  Not found. Type something else
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SearchPage;
