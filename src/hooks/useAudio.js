import { useEffect, useRef, useState } from "react";

export function useAudio(currentSong, isPlaying, onPause) {
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audio = useRef(new Audio(currentSong?.url));

  const onLoadedData = () => {
    const { duration } = audio.current;
    setProgress(0);
    setAudioDuration(Math.ceil(duration));
  };

  const onTimeUpdate = () => {
    const { duration = 0, currentTime = 0 } = audio.current;
    setCurrent(Math.ceil(currentTime));
    setProgress(
      Math.ceil((currentTime / (Number.isNaN(duration) ? 1 : duration)) * 100)
    );
  };

  const onEnded = () => {
    onPause();
  };

  useEffect(() => {
    audio.current.src = currentSong?.url;
  }, [currentSong]);

  useEffect(() => {
    if (currentSong?.url) {
      audio.current.addEventListener("loadeddata", onLoadedData);
      audio.current.addEventListener("timeupdate", onTimeUpdate);
      audio.current.addEventListener("ended", onEnded);

      if (isPlaying) {
        audio.current.play().then();
      } else {
        audio.current.pause();
      }
    }

    return () => {
      audio.current.removeEventListener("loadeddata", onLoadedData);
      audio.current.removeEventListener("timeupdate", onTimeUpdate);
      audio.current.removeEventListener("ended", onEnded);
    };
  }, [currentSong, isPlaying]);

  const changeCurrentTime = (value) => {
    const { duration } = audio.current;
    audio.current.currentTime = (duration || 0) * (value / 100);
  };

  const changeVolume = (value) => {
    audio.current.volume = value;
    setVolume(audio.current.volume);
    setIsMuted(!volume);
  };

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
    audio.current.volume = isMuted ? volume : 0;
  };

  return {
    progress,
    current,
    audioDuration,
    volume,
    isMuted,
    changeCurrentTime,
    changeVolume,
    toggleMute,
  };
}
