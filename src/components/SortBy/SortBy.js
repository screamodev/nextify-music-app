import PropTypes from "prop-types";
import SortButton from "./SortButton";
import "./sortBy.scss";

function SortBy({ clear, sortState, onSortBy }) {
  return (
    <div className="sort-by">
      <div className="sort-by-text">Sort by:</div>
      <SortButton
        name="author"
        order={sortState.order}
        isActive={sortState.field === "author"}
        onSortBy={onSortBy}
        clear={clear}
      />
      <SortButton
        name="name"
        order={sortState.order}
        isActive={sortState.field === "name"}
        onSortBy={onSortBy}
        clear={clear}
      />
    </div>
  );
}

SortBy.propTypes = {
  sortState: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  clear: PropTypes.func,
  onSortBy: PropTypes.func,
};

export default SortBy;
