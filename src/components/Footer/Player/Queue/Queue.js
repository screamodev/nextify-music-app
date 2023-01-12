import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSort } from "../../../../hooks/useSort";
import { addSongs } from "../../../../store/playerReducer";
import Songs from "../../../Songs";
import "./queue.scss";

function Queue({ closeQueue }) {
  const songs = useSelector((state) => state.player.songs);

  const dispatch = useDispatch();

  const { clear, sortState, onSortBy, sortByDirection, sortById } = useSort();

  useEffect(() => {
    if (songs.length) {
      dispatch(
        addSongs(sortState.order ? sortByDirection(songs) : sortById(songs))
      );
    }
  }, [sortState]);

  return (
    <div className="queue">
      <div className="queue-heading">
        <h1 className="queue-heading-text">Queue</h1>
        <button onClick={closeQueue}>
          <AiFillCloseCircle className="queue-close-button-icon" />
        </button>
      </div>
      <Songs
        clearSortState={clear}
        sortState={sortState}
        onSortBy={onSortBy}
        songs={songs}
      />
    </div>
  );
}

Queue.propTypes = {
  closeQueue: PropTypes.func.isRequired,
};

export default Queue;
