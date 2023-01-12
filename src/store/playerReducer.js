import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addSongs(state, action) {
      state.songs = action.payload;
    },
  },
});

export const { addSongs } = playerSlice.actions;

export default playerSlice.reducer;
