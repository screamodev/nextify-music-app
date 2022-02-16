import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPlaylist, getUserPlaylists } from "../api/playlistApi";

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

const initialState = {
  playlists: [],
};

const onGetPlaylistsFulfilled = (state, { payload: { playlists } }) => {
  state.playlists = playlists.reverse();
};

const onAddPlaylistFulfilled = (state, { payload }) => {
  state.playlists.unshift(payload);
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  extraReducers: {
    [getPlaylists.fulfilled]: onGetPlaylistsFulfilled,
    [addPlaylist.fulfilled]: onAddPlaylistFulfilled,
  },
});

export default playlistsSlice.reducer;
