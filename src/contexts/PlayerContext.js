import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createContext, useMemo } from "react";
import { usePlayer } from "../hooks/usePlayer";

export const PlayerContext = createContext({
  isPlaying: false,
  isPrevDisabled: false,
  isNextDisabled: false,
  currentSong: {},
  setCurrentSong: () => {},
  onPlay: () => {},
  onPause: () => {},
  onPrev: () => {},
  onNext: () => {},
});

export function PlayerProvider({ children }) {
  const songs = useSelector((state) => state.player.songs);
  const {
    isPlaying,
    isPrevDisabled,
    isNextDisabled,
    currentSong,
    setCurrentSong,
    onPlay,
    onPause,
    onPrev,
    onNext,
  } = usePlayer(songs);

  const memoizedValue = useMemo(
    () => ({
      isPlaying,
      isPrevDisabled,
      isNextDisabled,
      currentSong,
      setCurrentSong,
      onPlay,
      onPause,
      onPrev,
      onNext,
    }),
    [isPlaying, currentSong, isPrevDisabled, isNextDisabled]
  );

  return (
    <PlayerContext.Provider value={memoizedValue}>
      {children}
    </PlayerContext.Provider>
  );
}

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
