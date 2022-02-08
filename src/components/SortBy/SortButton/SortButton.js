import PropTypes from "prop-types";
import { MdArrowDropDown, MdArrowDropUp, MdClear } from "react-icons/md";
import { ASCENDING, DESCENDING } from "../../../constants/sortDirections";
import "./sortButton.scss";

function SortButton({ name, order, isActive, onSortBy, clear }) {
  const getDirectionArrow = () => {
    if (order === ASCENDING) {
      return <MdArrowDropUp className="sort-order-arrow" />;
    } else if (order === DESCENDING) {
      return <MdArrowDropDown className="sort-order-arrow" />;
    }
  };

  return (
    <button
      onClick={() => onSortBy(name)}
      className={`${isActive ? "sort-by-active" : "sort-by-default"}`}
    >
      {name}
      {isActive && (
        <>
          <span onClick={clear}>
            <MdClear className="stop-sort" />
          </span>
          <span>{getDirectionArrow()}</span>
        </>
      )}
    </button>
  );
}

SortButton.propTypes = {
  name: PropTypes.string,
  order: PropTypes.string,
  isActive: PropTypes.bool,
  onSortBy: PropTypes.func,
  clear: PropTypes.func,
};

export default SortButton;
