import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClear } from "react-icons/md";
import { clearSongs, search } from "../../store/searchSlice";
import MainLayout from "../../components/MainLayout";
import Song from "../../components/Song";
import "./searchPage.scss";

function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchInput) {
      dispatch(search(searchInput));
    } else {
      dispatch(clearSongs());
    }
  }, [searchInput]);

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
            <div className="sort-by">
              <div className="sort-by-text">Sort by:</div>
              <button className="sort-by-name">name</button>
            </div>
            <div className="search-songs-list">
              {songs.length ? (
                songs.map(({ author, name, duration, id }) => (
                  <Song
                    author={author}
                    name={name}
                    duration={duration}
                    key={id}
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
