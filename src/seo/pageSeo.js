import { SITE_NAME, SITE_URL } from "../config/site";

const pageSeo = {
  "/": {
    en: {
      title: `${SITE_NAME} | Film Production in Bukhara, Uzbekistan`,
      description:
        "BuxoroFilm connects international productions with Bukhara's iconic locations, expert crews, permits, scouting and full on-ground production support.",
      keywords:
        "Bukhara film studio, film production Uzbekistan, location scouting Bukhara, BuxoroFilm, film permits Uzbekistan, production services Bukhara"
    },
    ru: {
      title: `${SITE_NAME} | Кинопроизводство в Бухаре, Узбекистан`,
      description:
        "BuxoroFilm соединяет международные производства с иконичными локациями Бухары, экспертными командами, разрешениями, скаутингом и полной производственной поддержкой на месте.",
      keywords:
        "киностудия Бухара, кинопроизводство Узбекистан, скаутинг локаций Бухара, BuxoroFilm, разрешения на съёмки, продакшн Бухара"
    }
  },
  "/locations": {
    en: {
      title: `Film Locations in Bukhara | ${SITE_NAME}`,
      description:
        "Explore 600+ catalogued filming locations in Bukhara — historic streets, deserts, madrasahs and rooftops with fast permits and local scouting support.",
      keywords:
        "Bukhara film locations, location scouting Uzbekistan, filming locations Bukhara, desert locations, historic architecture film"
    },
    ru: {
      title: `Локации для съёмок в Бухаре | ${SITE_NAME}`,
      description:
        "Более 600 локаций для съёмок в Бухаре — исторические улицы, пустыни, медресе и крыши с быстрым оформлением разрешений и местным скаутингом.",
      keywords:
        "локации Бухара, скаутинг Узбекистан, места для съёмок Бухара, пустынные локации, историческая архитектура кино"
    }
  },
  "/service": {
    en: {
      title: `Film Production Services | ${SITE_NAME}`,
      description:
        "Full production support in Bukhara: decoration, equipment supply, location management, permits, logistics, crew and on-ground coordination.",
      keywords:
        "film production services Bukhara, set construction Uzbekistan, location management, film equipment Bukhara, production support"
    },
    ru: {
      title: `Услуги кинопроизводства | ${SITE_NAME}`,
      description:
        "Полная производственная поддержка в Бухаре: декорации, оборудование, управление локациями, разрешения, логистика, команда и координация на месте.",
      keywords:
        "услуги кинопроизводства Бухара, строительство декораций, локационный менеджмент, кинооборудование, продакшн поддержка"
    }
  },
  "/contact": {
    en: {
      title: `Contact ${SITE_NAME} | Film Production in Bukhara`,
      description:
        "Contact BuxoroFilm for location scouting, permits, production support and international filming in Bukhara, Uzbekistan.",
      keywords:
        "contact BuxoroFilm, film production inquiry Bukhara, location scouting contact, film studio Uzbekistan"
    },
    ru: {
      title: `Контакты ${SITE_NAME} | Кинопроизводство в Бухаре`,
      description:
        "Свяжитесь с BuxoroFilm для скаутинга локаций, разрешений, производственной поддержки и международных съёмок в Бухаре, Узбекистан.",
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
