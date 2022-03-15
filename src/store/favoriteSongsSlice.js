import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById, updateUserById } from "../api/userApi";

export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async (userId) => {
    const {
      data: { favoriteSongsIds },
    } = await getUserById(userId);

    return favoriteSongsIds;
  }
);

export const updateFavorites = createAsyncThunk(
  "favorites/updateFavorites",
  async ({ userId, favoriteSongsIds }, thunkAPI) => {
    const {
      data: { favoriteSongsIds: recievedFavoriteSongsIds },
      status,
    } = await updateUserById(userId, { favoriteSongsIds });

    if (status !== 200) {
      return thunkAPI.rejectWithValue(recievedFavoriteSongsIds);
    }

    return recievedFavoriteSongsIds;
  }
);

const initialState = {
  favoriteSongsIds: [],
};

const onFavoritesFulfilled = (state, { payload }) => {
  state.favoriteSongsIds = payload;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  extraReducers: {
    [getFavorites.fulfilled]: onFavoritesFulfilled,
    [updateFavorites.fulfilled]: onFavoritesFulfilled,
  },
});

export default favoritesSlice.reducer;
