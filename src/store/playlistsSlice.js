import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPlaylists } from "../api/playlistApi";

export const getPlaylists = createAsyncThunk(
  "playlists/getPlaylists",
  async (userId) => {
    const { data } = await getUserPlaylists(userId);

    return data;
  }
);

const initialState = {
  playlists: [],
};

const onFulfilled = (state, { payload: { playlists } }) => {
  state.playlists = playlists.reverse();
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  extraReducers: {
    [getPlaylists.fulfilled]: onFulfilled,
  },
});

export default playlistsSlice.reducer;
