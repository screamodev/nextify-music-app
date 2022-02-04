import { instance } from "./axiosInstance";

export const searchSongs = ({ searchInput, field, order }) => {
  return instance.get(`songs/?q=${searchInput}&_sort=${field}&_order=${order}`);
};
