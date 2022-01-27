import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "../../contexts/PlayerContext";
import AuthorizationPage from "../../pages/AuthorizationPage";
import MyProfilePage from "../../pages/MyProfilePage";
import GuestRoute from "../AuthRoutes/GuestRoute";
import ProtectedRoute from "../AuthRoutes/ProtectedRoute";
import store from "../../store";
import { AUTH_PAGE, MAIN_PAGE } from "../../constants/routes";
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
                <Route path={MAIN_PAGE} element={<MyProfilePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </PlayerProvider>
    </Provider>
  );
}

export default App;
