export const getPosterUrl = (poster) => {
  if (!poster) return "";
  if (poster.startsWith("http") || poster.startsWith("/")) return poster;
  return `/posters/${poster}`;
};

export const getVideoUrl = (video) => {
  if (!video) return "";
  if (video.startsWith("http") || video.startsWith("/")) return video;
  return `/videos/${video}`;
};
