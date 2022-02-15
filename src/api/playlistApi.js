import { instance } from "./axiosInstance";

export const createPlaylist = (playlist) =>
  instance.post("playlists", playlist);
