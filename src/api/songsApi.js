import { instance } from "./axiosInstance";

export const getSongs = ({ field, order }) =>
  instance.get(`songs/?_sort=${field}&_order=${order}`);
