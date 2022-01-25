import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
  },
});

export default store;
