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

  const clear = (e) => {
    e.stopPropagation();
    setSortState(initialSortState);
  };

  return {
    sortState,
    onSortBy,
    clear,
  };
}
