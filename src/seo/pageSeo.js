import { SITE_URL } from "../config/site";

const pageSeo = {
  "/": {
    en: {
      title: "BuxoroFilm Studio | Film Production in Bukhara, Uzbekistan",
      description:
        "Professional film production services in Bukhara, Uzbekistan. Movies, documentaries, commercials and location management.",
      keywords:
        "Bukhara film studio, film production Uzbekistan, documentaries Bukhara, commercials Uzbekistan, location management Bukhara, BuxoroFilm"
    },
    ru: {
      title: "BuxoroFilm Studio | Кинопроизводство в Бухаре, Узбекистан",
      description:
        "Профессиональные услуги кинопроизводства в Бухаре, Узбекистан. Художественные фильмы, документальное кино, реклама и локационный менеджмент.",
      keywords:
        "киностудия Бухара, кинопроизводство Узбекистан, документальное кино Бухара, реклама Узбекистан, локационный менеджмент, BuxoroFilm"
    }
  },
  "/locations": {
    en: {
      title: "Film Locations in Bukhara | BuxoroFilm Studio",
      description:
        "Discover historical film locations in Bukhara including Ark Fortress, Lyabi Hauz, Poi Kalyan and many more.",
      keywords:
        "Bukhara film locations, Ark Fortress filming, Lyabi Hauz location, Poi Kalyan Bukhara, historical film locations Uzbekistan"
    },
    ru: {
      title: "Локации для съёмок в Бухаре | BuxoroFilm Studio",
      description:
        "Откройте исторические локации для съёмок в Бухаре, включая крепость Арк, Ляби-Хауз, Poi-Kalyan и многие другие.",
      keywords:
        "локации Бухара, съёмки у крепости Арк, Ляби-Хауз, Poi-Kalyan, исторические локации Узбекистан"
    }
  },
  "/service": {
    en: {
      title: "Film Production Services | BuxoroFilm",
      description:
        "Full film production support in Bukhara — decoration, equipment supply, location management, permits, logistics and on-ground coordination.",
      keywords:
        "film production services Bukhara, set construction Uzbekistan, location management, film equipment, production support BuxoroFilm"
    },
    ru: {
      title: "Услуги кинопроизводства | BuxoroFilm",
      description:
        "Полная поддержка кинопроизводства в Бухаре — декорации, оборудование, управление локациями, разрешения, логистика и координация на месте.",
      keywords:
        "услуги кинопроизводства Бухара, строительство декораций, локационный менеджмент, кинооборудование, продакшн поддержка BuxoroFilm"
    }
  },
  "/contact": {
    en: {
      title: "Contact BuxoroFilm Studio | Film Production in Bukhara",
      description:
        "Get in touch with BuxoroFilm for film production, location scouting, permits and production support in Bukhara, Uzbekistan.",
      keywords:
        "contact BuxoroFilm, film production inquiry Bukhara, location scouting contact, film studio Uzbekistan"
    },
    ru: {
      title: "Контакты BuxoroFilm Studio | Кинопроизводство в Бухаре",
      description:
        "Свяжитесь с BuxoroFilm для кинопроизводства, скаутинга локаций, разрешений и производственной поддержки в Бухаре, Узбекистан.",
      keywords:
        "контакты BuxoroFilm, заявка на съёмки Бухара, скаутинг локаций, киностудия Узбекистан"
    }
  }
};

export const getPageSeo = (pathname, language = "en") => {
  const normalizedPath = pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  const lang = language === "ru" ? "ru" : "en";
  const seo = pageSeo[normalizedPath]?.[lang] || pageSeo["/"][lang];

  return {
    ...seo,
    canonical: `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`,
    path: normalizedPath
  };
};
