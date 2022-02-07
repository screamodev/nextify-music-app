export const formatTime = (seconds) =>
  Number.isNaN(seconds)
    ? "0:00"
    : (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + seconds;
