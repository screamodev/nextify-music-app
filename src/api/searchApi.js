import { instance } from "./axiosInstance";

export const searchSongs = (query) => instance.get(`songs/?q=${query}`);
