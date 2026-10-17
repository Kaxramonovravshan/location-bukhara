import { getR2PosterUrl } from "./mediaUrl.js";

// These are the only portfolio image references confirmed by the original
// manifest, the incremental manifest, and the public R2 checks.
const verifiedPortfolioImages = new Set([
  "project-1.webp",
  "project-2.webp",
  "project-3.webp",
  "project-4.webp",
  "project-6.webp",
  "project-7.webp",
  "project-8.webp",
  "project-10.webp",
  "project-12.webp",
  "project-16.webp"
]);

export const isPortfolioImageAvailable = (source) => {
  if (!source) return false;
  const fileName = source.replace(/^\/?(?:posters\/)?/, "");
  return verifiedPortfolioImages.has(fileName);
};

export const getPosterUrl = (poster) => {
  if (!poster) return "";
  return getR2PosterUrl(poster);
};

export const getPortfolioGallery = (project) =>
  (project.gallery?.length ? project.gallery : [project.poster])
    .filter(isPortfolioImageAvailable)
    .map(getPosterUrl);

export const getVideoUrl = (video) => {
  if (!video) return "";
  if (video.startsWith("http") || video.startsWith("/")) return video;
  return `/videos/${video}`;
};
