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
  isLoggedIn: false,
};

const onFulfilled = (state, { payload }) => {
  state.userData = payload.user;
  state.isLoggedIn = true;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: onFulfilled,
    [login.fulfilled]: onFulfilled,
  },
});

export default authSlice.reducer;
