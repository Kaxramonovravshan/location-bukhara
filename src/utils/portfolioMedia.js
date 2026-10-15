import { getR2PosterUrl } from "./mediaUrl.js";

export const getPosterUrl = (poster) => {
  if (!poster) return "";
  return getR2PosterUrl(poster);
};

export const getVideoUrl = (video) => {
  if (!video) return "";
  if (video.startsWith("http") || video.startsWith("/")) return video;
  return `/videos/${video}`;
};
