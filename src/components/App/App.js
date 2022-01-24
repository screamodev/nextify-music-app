import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "../../contexts/PlayerContext";
import AuthorizationPage from "../../pages/AuthorizationPage";
import MyProfilePage from "../../pages/MyProfilePage";
import store from "../../store";
import { AUTH_PAGE, PROFILE_PAGE } from "../../constants/routes";
import "./app.scss";

function App() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <div className="app-wrapper">
          <div className="app-wrapper-content">
            <Routes>
              <Route path={AUTH_PAGE} element={<AuthorizationPage />} />
              <Route path={PROFILE_PAGE} element={<MyProfilePage />} />
            </Routes>
          </div>
        </div>
      </PlayerProvider>
    </Provider>
  );
}

export default App;
