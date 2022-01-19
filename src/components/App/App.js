import { Provider } from "react-redux";
import { PlayerProvider } from "../../contexts/PlayerContext";
import store from "../../store";
import AuthorizationPage from "../AuthorizationPage";
import Footer from "../Footer";
import "./app.scss";

function App() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <div className="app-wrapper">
          <div className="app-wrapper-content">
            <AuthorizationPage />
          </div>
          <Footer />
        </div>
      </PlayerProvider>
    </Provider>
  );
}

export default App;
