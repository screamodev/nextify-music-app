import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export default store;
