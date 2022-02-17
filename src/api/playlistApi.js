import { instance } from "./axiosInstance";

export const createPlaylist = (playlist) =>
  instance.post("playlists", playlist);

export const getUserPlaylists = (userId) =>
  instance.get(`users/${userId}/playlists?_sort=date`);