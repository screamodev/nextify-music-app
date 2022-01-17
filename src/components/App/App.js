import { Provider } from "react-redux";
import { PlayerProvider } from "../../contexts/PlayerContext";
import store from "../../store";
import Footer from "../Footer";
import "./app.scss";

function App() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <div className="app">
          <section className="main-container" />
          <Footer />
        </div>
      </PlayerProvider>
    </Provider>
  );
}

export default App;
