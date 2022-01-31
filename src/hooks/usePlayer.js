import { useEffect, useRef, useState } from "react";

export function usePlayer(url) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audio = useRef(new Audio(url));

  const onLoadedData = () => {
    const { duration } = audio.current;
    setProgress(0);
    setAudioDuration(Math.ceil(duration));
  };

  const onTimeUpdate = () => {
    const { duration, currentTime } = audio.current;
    setCurrent(Math.ceil(currentTime));
    setProgress(Math.ceil((currentTime / duration) * 100));
  };

  const onEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    audio.current.addEventListener("loadeddata", onLoadedData);
    audio.current.addEventListener("timeupdate", onTimeUpdate);
    audio.current.addEventListener("ended", onEnded);

    return () => {
      audio.current.removeEventListener("loadeddata", onLoadedData);
      audio.current.removeEventListener("timeupdate", onTimeUpdate);
      audio.current.removeEventListener("ended", onEnded);
    };
  }, []);

  const changeCurrentTime = (value) => {
    const { duration } = audio.current;
    audio.current.currentTime = (duration || 0) * (value / 100);
  };

  const changeVolume = (value) => {
    audio.current.volume = value;
    setVolume(audio.current.volume);
    setIsMuted(!volume);
  };

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);

    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
  };

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
    audio.current.volume = isMuted ? volume : 0;
  };

  return {
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
  };
}