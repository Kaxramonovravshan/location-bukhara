const stripLeadingThe = (name) => name.replace(/^The /, "");

export const getLocationImageAlt = (locationName, language, photoNumber) => {
  const name = stripLeadingThe(locationName);

  if (language === "ru") {
    const base = `${name} — локация для съёмок в Бухаре`;
    return photoNumber ? `${base}, фото ${photoNumber}` : base;
  }

  const base = `${name} film location in Bukhara`;
  return photoNumber ? `${base}, photo ${photoNumber}` : base;
};

export const getPortfolioImageAlt = (projectTitle, language, photoNumber) => {
  if (language === "ru") {
    const base = `${projectTitle} — кинопроект в Бухаре`;
    return photoNumber ? `${base}, кадр ${photoNumber}` : base;
  }

  const base = `${projectTitle} film production in Bukhara`;
  return photoNumber ? `${base}, still ${photoNumber}` : base;
};

export const getServiceImageAlt = (serviceTitle, language, photoNumber) => {
  if (language === "ru") {
    const base = `${serviceTitle} — услуга кинопроизводства в Бухаре`;
    return photoNumber ? `${base}, фото ${photoNumber}` : base;
  }

  const base = `${serviceTitle} film production service in Bukhara`;
  return photoNumber ? `${base}, photo ${photoNumber}` : base;
};

export const staticImageAlt = {
  logo: {
    en: "BuxoroFilm Studio logo",
    ru: "Логотип BuxoroFilm Studio"
  },
  history: {
    en: "Historic mosque architecture in Bukhara — cinema heritage of BuxoroFilm Studio",
    ru: "Историческая архитектура мечети в Бухаре — кинематографическое наследие BuxoroFilm Studio"
  },
  producer: {
    en: "Ali Choriyev — executive producer at BuxoroFilm Studio in Bukhara",
    ru: "Али Чориев — исполнительный продюсер BuxoroFilm Studio в Бухаре"
  }
};

export const getStaticImageAlt = (key, language) =>
  staticImageAlt[key]?.[language === "ru" ? "ru" : "en"] ||
  staticImageAlt[key]?.en ||
  "";
