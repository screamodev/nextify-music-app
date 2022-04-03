import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdClear } from "react-icons/md";
import { addSongs } from "../../store/playerReducer";
import { useSort } from "../../hooks/useSort";
import { useSearchInfinityScroll } from "../../hooks/useSearchInfinityScroll";
import { searchSongs } from "../../api/searchApi";
import MainLayout from "../../components/MainLayout";
import Songs from "../../components/Songs";
import "./searchPage.scss";

function SearchPage() {
  const { clear, sortState, onSortBy } = useSort();

  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const fetchSearchSongs = ({
    searchInputValue,
    pageNumber: page,
    sortState: sort,
  }) => searchSongs(searchInputValue, { ...sort }, page);

  const {
    isLoading,
    items: songs,
    lastSongElementRef,
  } = useSearchInfinityScroll(
    searchInput,
    pageNumber,
    setPageNumber,
    sortState,
    fetchSearchSongs
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setPageNumber(1);
  };

  const clearInput = () => {
    setSearchInput("");
  };

  useEffect(() => {
    if (songs.length) {
      dispatch(addSongs(songs));
    }
  }, [songs]);

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
          <Songs
            isLoading={isLoading}
            searchInputValue={searchInput}
            lastSongElementRef={lastSongElementRef}
            clearSortState={clear}
            sortState={sortState}
            onSortBy={onSortBy}
            songs={songs}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default SearchPage;
