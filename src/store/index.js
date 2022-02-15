import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";
import authReducer, { initialState } from "./authSlice";
import playlistsReducer from "./playlistsSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    playlists: playlistsReducer,
  },
  preloadedState: {
    auth: JSON.parse(localStorage.getItem("auth")) || initialState,
  },
});

store.subscribe(() => {
  const { auth } = store.getState();
  localStorage.setItem("auth", JSON.stringify(auth));
});

export default store;
