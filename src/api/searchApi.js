import { instance } from "./axiosInstance";

export const searchSongs = (
  searchInputValue,
  { field, order },
  pageNumber = 1
) =>
  instance.get(
    `songs/?q=${searchInputValue}&_limit=15&_page=${pageNumber}&_sort=${field}&_order=${order}`
  );
