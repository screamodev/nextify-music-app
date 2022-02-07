import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import MainLayout from "../../components/MainLayout";
import Song from "../../components/Song";
import SortBy from "../../components/SortBy";
import { searchSongs } from "../../api/searchApi";
import { ASCENDING, DESCENDING } from "../../constants/sortDirections";
import "./searchPage.scss";

const initialSortState = {
  field: "",
  order: "",
};

function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [sortState, setSortState] = useState(initialSortState);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (searchInput) {
      searchSongs({ searchInput, ...sortState }).then(({ data }) => {
        setSongs(data);
      });
    } else if (!searchInput) {
      setSongs([]);
    }
  }, [searchInput, sortState]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearInput = () => {
    setSearchInput("");
  };

  const getOrderSort = () =>
    sortState.order === ASCENDING ? DESCENDING : ASCENDING;

  const onSortBy = (field) => {
    setSortState(({ field: prevField }) => ({
      field,
      order: prevField === field ? getOrderSort() : ASCENDING,
    }));
  };

  const clear = (e) => {
    e.stopPropagation();
    setSortState(initialSortState);
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
