export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://buxorofilm.com";

export const SITE_NAME = "BuxoroFilm Studio";
export const SITE_NAME_SHORT = "BuxoroFilm";

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-M00LH6E02H";

export const GSC_VERIFICATION =
  import.meta.env.VITE_GSC_VERIFICATION || "";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SITE_EMAIL = "buxorofilm@gmail.com";
export const SITE_PHONE = "+998 90 123 45 67";
export const SITE_ADDRESS = {
  en: "Bukhara, Uzbekistan",
  ru: "Бухара, Узбекистан"
};

export const SITE_SOCIAL = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  youtube: "https://www.youtube.com/",
  linkedin: "https://www.linkedin.com/"
};
