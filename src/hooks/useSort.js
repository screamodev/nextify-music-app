import { useState } from "react";
import { ASCENDING, DESCENDING } from "../constants/sortDirections";

const initialSortState = {
  field: "",
  order: "",
};

export function useSort() {
  const [sortState, setSortState] = useState(initialSortState);

  const getOrderSort = () =>
    sortState.order === ASCENDING ? DESCENDING : ASCENDING;

  const onSortBy = (field) => {
    setSortState(({ field: prevField }) => ({
      field,
      order: prevField === field ? getOrderSort() : ASCENDING,
    }));
  };

  const clear = () => {
    setSortState(initialSortState);
  };

  const sortById = (array) =>
    [...array].sort((currentField, nextField) => {
      if (currentField.id > nextField.id) {
        return 1;
      }
      if (currentField.id < nextField.id) {
        return -1;
      }
      return 0;
    });

  const sortByDirection = (array) =>
    [...array].sort((currentField, nextField) => {
      if (currentField[sortState.field] > nextField[sortState.field]) {
        return sortState.order === ASCENDING ? 1 : -1;
      }
      if (currentField[sortState.field] < nextField[sortState.field]) {
        return sortState.order === ASCENDING ? -1 : 1;
      }
      return 0;
    });

  return {
    clear,
    sortState,
    onSortBy,
    sortById,
    sortByDirection,
  };
}
