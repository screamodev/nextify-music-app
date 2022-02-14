import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import Player from "./Player";
import "./footer.scss";

function Footer() {
  const { currentSong } = useContext(PlayerContext);

  return <footer className="footer">{currentSong?.id && <Player />}</footer>;
}

export default Footer;
