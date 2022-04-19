export const isSongPlayingInCurrentSongList = (songList, song) =>
  songList.map(({ id }) => id).includes(song?.id);
