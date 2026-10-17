const R2_PUBLIC_URL = (import.meta.env.VITE_R2_PUBLIC_URL || "").replace(/\/+$/, "");

const sharedImageKeys = {
  "apple-touch-icon.png": "shared/public-assets/apple-touch-icon.png",
  "favicon-16x16.png": "shared/public-assets/favicon-16x16.png",
  "favicon-32x32.png": "shared/public-assets/favicon-32x32.png",
  "icon-192.png": "shared/public-assets/icon-192.png",
  "icon-512.png": "shared/public-assets/icon-512.png",
  "og-image.png": "shared/public-assets/og-image.png",
  "logo.webp": "shared/site-assets/logo.webp",
  "aliChroiyev.webp": "shared/site-assets/aliChroiyev.webp",
  "history/IMG_9924.webp": "shared/history/IMG_9924.webp",
  "history/q.PNG": "shared/history/q.PNG",
  "locationSectionImg.webp": "shared/site-assets/locationSectionImg.webp",
  "locationSectionImg-sm.webp": "shared/site-assets/locationSectionImg-sm.webp",
  "locations/hero-bukhara.png": "shared/location-hero/hero-bukhara.png",
  "posters/project-1.webp": "shared/portfolio-posters/project-1.webp",
  "posters/project-2.webp": "shared/portfolio-posters/project-2.webp",
  "posters/project-3.webp": "shared/portfolio-posters/project-3.jpg",
  "posters/project-4.webp": "shared/portfolio-posters/project-4.jpg",
  "posters/project-6.webp": "shared/portfolio-posters/project-6.jpg",
  "posters/project-7.webp": "shared/portfolio-posters/project-7.jpg",
  "posters/project-8.webp": "shared/portfolio-posters/project-8.jpg",
  "posters/project-10.webp": "shared/portfolio-posters/project-10.webp",
  "posters/project-12.webp": "shared/portfolio-posters/project-12.jpg",
  "posters/project-16.webp": "shared/portfolio-posters/project-16.jpg"
};

const toPublicUrl = (key) => {
  if (!R2_PUBLIC_URL) return "";
  return `${R2_PUBLIC_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
};

export const getR2ImageUrl = (source) => {
  if (!source || source.startsWith("http")) return source || "";
  const normalized = source.replace(/^\//, "");
  const key = normalized.startsWith("locations/") || normalized.startsWith("services/")
    ? normalized
    : sharedImageKeys[normalized];
  return key ? (toPublicUrl(key) || source) : source;
};

export const getR2SharedImageUrl = (source) => {
  if (!source) return "";
  const normalized = source.replace(/^\//, "");
  const key = normalized.startsWith("shared/") ? normalized : sharedImageKeys[normalized];
  return key ? (toPublicUrl(key) || `/${normalized}`) : source;
};

export const getR2PosterUrl = (poster) => {
  if (!poster) return "";
  if (poster.startsWith("http")) return poster;
  return getR2ImageUrl(poster.startsWith("/posters/") ? poster : `/posters/${poster}`);
};

export { R2_PUBLIC_URL };
