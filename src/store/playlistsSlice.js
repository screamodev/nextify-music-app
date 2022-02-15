import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  songs: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
});

export default playlistsSlice.reducer;
