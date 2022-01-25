import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUp } from "../api/authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    const response = await signUp(userData);
    const { data } = response;

    if (response.status !== 201) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);

const initialState = {
  userData: null,
  isFetching: false,
  isLoggedIn: false,
  isError: false,
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, { payload }) => {
      state.userData = payload.user;
      state.isFetching = false;
      state.isLoggedIn = true;
      state.isError = false;
      localStorage.setItem("token", payload.accessToken);
    },
    [register.rejected]: (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    },
    [register.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export default authSlice.reducer;
