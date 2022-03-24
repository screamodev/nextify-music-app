import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "../../contexts/PlayerContext";
import AuthorizationPage from "../../pages/AuthorizationPage";
import MainPage from "../../pages/MainPage";
import SearchPage from "../../pages/SearchPage";
import CreatePlaylistPage from "../../pages/CreatePlaylistPage";
import GuestRoute from "../AuthRoutes/GuestRoute";
import ProtectedRoute from "../AuthRoutes/ProtectedRoute";
import PlaylistPage from "../../pages/PlaylistPage";
import FavoriteSongsPage from "../../pages/FavoriteSongsPage";
import UserProfilePage from "../../pages/UserProfilePage";
import store from "../../store";
import {
  AUTH_PAGE,
  CREATE_PLAYLIST,
  FAVORITE_PAGE,
  MAIN_PAGE,
  PLAYLISTS,
  PROFILE_PAGE,
  SEARCH_PAGE,
} from "../../constants/routes";
import "./app.scss";

function App() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <div className="app-wrapper">
          <div className="app-wrapper-content">
            <Routes>
              <Route element={<GuestRoute />}>
                <Route path={AUTH_PAGE} element={<AuthorizationPage />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path={MAIN_PAGE} element={<MainPage />} />
                <Route path={SEARCH_PAGE} element={<SearchPage />} />
                <Route
                  path={CREATE_PLAYLIST}
                  element={<CreatePlaylistPage />}
                />
                <Route path={`${PLAYLISTS}/:id`} element={<PlaylistPage />} />
                <Route
                  path={`${FAVORITE_PAGE}`}
                  element={<FavoriteSongsPage />}
                />
                <Route path={`${PROFILE_PAGE}`} element={<UserProfilePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </PlayerProvider>
    </Provider>
  );
}

export default App;
