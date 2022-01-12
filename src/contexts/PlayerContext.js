import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const PlayerContext = createContext({});

export function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { url } = useSelector(({ player }) => player.songs[0]);
  const player = useRef(new Audio(url));

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);

    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
