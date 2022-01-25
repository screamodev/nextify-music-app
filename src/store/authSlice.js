import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../api/authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    const { data, status } = await signUp(userData);

    if (status !== 201) {
      return thunkAPI.rejectWithValue(data);
    }

    localStorage.setItem("token", data.accessToken);
    return data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const { data, status } = await signIn(userData);

    if (status !== 200) {
      return thunkAPI.rejectWithValue(data);
    }

    localStorage.setItem("token", data.accessToken);
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
    },
    [register.rejected]: (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    },
    [register.pending]: (state) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.userData = payload.user;
      state.isFetching = false;
      state.isLoggedIn = true;
      state.isError = false;
    },
    [login.rejected]: (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export default authSlice.reducer;
