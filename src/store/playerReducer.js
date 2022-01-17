import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [
    {
      id: 1,
      name: "Chrysothamnus Nutt.",
      author: "Demetri",
      url: "https://freemusicarchive.org/track/self-indulgent-is-not-an-insult/download",
    },
  ],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
