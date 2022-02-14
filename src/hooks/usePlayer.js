import { useState } from "react";

export function usePlayer(songs) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const isPrevDisabled =
    songs.findIndex((song) => song.id === currentSong?.id) === 0;

  const isNextDisabled =
    songs.findIndex((song) => song.id === currentSong?.id) === songs.length - 1;

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  const onPrev = () => {
    songs.forEach((song, index, songList) => {
      if (currentSong?.id === song.id) {
        setCurrentSong(songList[index - 1]);
      }
    });
  };

  const onNext = () => {
    songs.forEach((song, index, songList) => {
      if (currentSong?.id === song.id) {
        setCurrentSong(songList[index + 1]);
      }
    });
  };

  return {
    isPlaying,
    isPrevDisabled,
    isNextDisabled,
    currentSong,
    setCurrentSong,
    onPlay,
    onPause,
    onPrev,
    onNext,
  };
}
