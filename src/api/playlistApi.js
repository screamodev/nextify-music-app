import { instance } from "./axiosInstance";

export const createPlaylist = (playlist) =>
  instance.post("playlists", playlist);

export const getUserPlaylists = (userId) =>
  instance.get(`users/${userId}/playlists?_sort=date`);

export const addSongToPlaylist = (playListId, playlist) =>
  instance.patch(`playlists/${playListId}`, playlist);

export const getPickedPlaylist = (userId, playlistId) =>
  instance.get(`users/${userId}/playlists?id=${playlistId}`);

export const getSongs = ({ field, order }) =>
  instance.get(`songs/?_sort=${field}&_order=${order}`);

export const editPlaylistInfo = ({ name, description, playlistId }) =>
  instance.patch(`playlists/${playlistId}`, { name, description });

export const deletePlaylist = ({ playlistId }) =>
  instance.delete(`playlists/${playlistId}`);

export const removePlaylistSong = ({ playlistId, songsIds }) =>
  instance.patch(`playlists/${playlistId}`, { songsIds });
