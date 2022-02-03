import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchSongs } from "../api/searchApi";

export const search = createAsyncThunk(
  "search/songs",
  async (query, thunkAPI) => {
    const { data, status } = await searchSongs(query);

    if (status !== 200) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);

const onFulfilled = (state, { payload }) => {
  state.songs = payload;
};

const onRejected = (state) => {
  state.songs = null;
};

const initialState = {
  songs: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [search.fulfilled]: onFulfilled,
    [search.rejected]: onRejected,
  },
});

export default searchSlice.reducer;
