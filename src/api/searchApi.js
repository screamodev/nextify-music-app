import { instance } from "./axiosInstance";

export const searchSongs = (searchInput, sortBy = "", orderBy = "") => {
  return instance.get(
    `songs/?q=${searchInput}&_sort=${sortBy}&_order=${orderBy}`
  );
};
