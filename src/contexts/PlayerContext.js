import { createContext } from "react";
import { useSelector } from "react-redux";
import { usePlayer } from "../hooks/usePlayer";

export const PlayerContext = createContext({
  isPlaying: false,
  progress: 0,
  current: 0,
  audioDuration: 0,
  togglePlay: () => {},
  changeCurrentTime: () => {},
});

export function PlayerProvider({ children }) {
  const { url } = useSelector(({ player }) => player.songs[0]);
  const {
    isPlaying,
    progress,
    current,
    audioDuration,
    togglePlay,
    changeCurrentTime,
  } = usePlayer(url);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        progress,
        current,
        audioDuration,
        togglePlay,
        changeCurrentTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
