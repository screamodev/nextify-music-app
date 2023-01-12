import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPlaylist,
  editPlaylistInfo,
  getUserPlaylists,
  removePlaylistSong,
} from "../api/playlistApi";

export const getPlaylists = createAsyncThunk(
  "playlists/getPlaylists",
  async (userId) => {
    const { data } = await getUserPlaylists(userId);

    return data;
  }
);

export const addPlaylist = createAsyncThunk(
  "playlists/addPlaylist",
  async (playlist, thunkAPI) => {
    const { data, status } = await createPlaylist(playlist);

    if (status !== 201) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);

export const editPlaylist = createAsyncThunk(
  "playlists/editPlaylist",
  async (updatedPlaylist, thunkAPI) => {
    const { data, status } = await editPlaylistInfo(updatedPlaylist);

    if (status !== 200) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);

export const deletePlaylistSong = createAsyncThunk(
  "playlists/deletePlaylistSong",
  async (updatedPlaylist, thunkAPI) => {
    const { data, status } = await removePlaylistSong(updatedPlaylist);

    if (status !== 200) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);

const initialState = {
  playlists: [],
};

const onGetPlaylistsFulfilled = (state, { payload }) => {
  state.playlists = payload;
};

const onAddPlaylistFulfilled = (state, { payload }) => {
  state.playlists.unshift(payload);
};

const updatePlaylistsFulfilled = (state, { payload }) => {
  const updatedPlaylist = state.playlists.findIndex(
    (playlist) => playlist.id === payload.id
  );
  if (updatedPlaylist !== -1) {
    state.playlists[updatedPlaylist] = payload;
  }
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  extraReducers: {
    [getPlaylists.fulfilled]: onGetPlaylistsFulfilled,
    [addPlaylist.fulfilled]: onAddPlaylistFulfilled,
    [editPlaylist.fulfilled]: updatePlaylistsFulfilled,
    [deletePlaylistSong.fulfilled]: updatePlaylistsFulfilled,
  },
});

export default playlistsSlice.reducer;
