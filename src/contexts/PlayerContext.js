import { createContext } from "react";
import { useSelector } from "react-redux";
import { usePlayer } from "../hooks/usePlayer";

export const PlayerContext = createContext({
  isPlaying: false,
  progress: 0,
  current: 0,
  audioDuration: 0,
  duration: 0,
  isMuted: false,
  togglePlay: () => {},
  changeCurrentTime: () => {},
  changeVolume: () => {},
  toggleMute: () => {},
});

export function PlayerProvider({ children }) {
  const { url } = useSelector(({ player }) => player.songs[0]);
  const {
    isPlaying,
    progress,
    current,
    audioDuration,
    volume,
    isMuted,
    togglePlay,
    changeCurrentTime,
    changeVolume,
    toggleMute,
  } = usePlayer(url);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        progress,
        current,
        audioDuration,
        volume,
        isMuted,
        togglePlay,
        changeCurrentTime,
        changeVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
