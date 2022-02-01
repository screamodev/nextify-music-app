import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../api/authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    const { data, status } = await signUp(userData);

    if (status !== 201) {
      return thunkAPI.rejectWithValue(data);
    }

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

    return data;
  }
);

const onFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.accessToken;
  state.isLoggedIn = true;
};

const onRejected = (state) => {
  state.isLoggedIn = false;
  state.user = null;
  state.token = null;
};

export const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: {
    [register.fulfilled]: onFulfilled,
    [register.rejected]: onRejected,
    [login.fulfilled]: onFulfilled,
    [login.rejected]: onRejected,
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
