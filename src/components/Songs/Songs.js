import PropTypes from "prop-types";
import SortBy from "../SortBy";
import Song from "./Song";
import PreLoader from "../common/PreLoader/PreLoader";
import "./songs.scss";

function Songs({
  isLoading,
  lastSongElementRef,
  clearSortState,
  sortState,
  onSortBy,
  songs,
}) {
  return (
    <div className="songs">
      <SortBy
        clear={clearSortState}
        sortState={sortState}
        onSortBy={onSortBy}
      />
      <div className="songs-list">
        {songs.length ? (
          songs.map(({ author, name, duration, id, url }, index) => (
            <Song
              lastSongElementRef={
                songs.length === index + 1 ? lastSongElementRef : null
              }
              author={author}
              name={name}
              duration={duration}
              id={id}
              key={id}
              url={url}
            />
          ))
        ) : (
          <div className="songs-not-found">Not found. Type something else</div>
        )}
        {isLoading ? <PreLoader /> : null}
      </div>
    </div>
  );
}

Songs.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lastSongElementRef: PropTypes.func.isRequired,
  clearSortState: PropTypes.func.isRequired,
  sortState: PropTypes.shape({
    field: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
  onSortBy: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Songs;
