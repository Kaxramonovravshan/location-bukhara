import { locationMedia } from "./media.js";

export const defaultProjectServices = {
  en: "Location permits, scripted location scouting, set construction, props supply, accommodation and transportation, cast and extras coordination, production crew support (assistants, set decorators, props assistants), and full on-ground production coordination by our local team.",
  ru: "Разрешения на локации, сценарный скаутинг, строительство декораций, поставка реквизита, размещение и транспорт, координация актёров и массовки, поддержка съёмочной группы (ассистенты, декораторы, помощники по реквизиту) и полная координация производства на месте нашей локальной командой."
};

export const portfolioResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1536, min: 1280 },
    items: 4
  },
  laptop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
};

export const portfolioProjects = [
  {
    id: 1,
    featured: true,
    cover: locationMedia.lyabiHauz.cover,
    gallery: [
      locationMedia.lyabiHauz.cover,
      locationMedia.lyabiHauz.gallery[0],
      locationMedia.lyabiHauz.gallery[1],
      locationMedia.caravanserai.gallery[0]
    ],
    title: { en: "Motherland Awaits", ru: "Родина ждёт" },
    category: { en: "TV Series", ru: "Телесериал" },
    director: "Oleg Pogodin",
    countries: { en: "Russia, Uzbekistan", ru: "Россия, Узбекистан" },
    year: 2003,
    services: {
      en: "Location permits, scripted location scouting, set construction, props supply, accommodation and transportation, cast and extras coordination, production crew support (assistants, set decorators, props assistants), and full on-ground production coordination by our local team.",
      ru: "Разрешения на съёмки, подбор локаций по сценарию, строительство декораций, обеспечение реквизитом, размещение и транспорт, подбор актёров и массовки, обеспечение съёмочной группы (ассистенты, декораторы, реквизиторы), а также полная координация производства на месте нашей локальной командой."
    }
  },
  {
    id: 2,
    featured: true,
    cover: locationMedia.poiKalyan.cover,
    gallery: [
      locationMedia.poiKalyan.cover,
      locationMedia.poiKalyan.gallery[0],
      locationMedia.poiKalyan.gallery[1],
      locationMedia.poiKalyan.gallery[2]
    ],
    title: { en: "Eterna", ru: "Этерна" },
    category: {
      en: "TV Series — Fantasy / Adventure",
      ru: "Телесериал — фэнтези / приключения"
    },
    director: "Sergey Trofimov",
    countries: { en: "Russia, Uzbekistan", ru: "Россия" },
    year: 2022,
    services: {
      en: "Location permits in Bukhara, scripted location scouting, extras coordination, transportation, set construction and art department support (environmental set extensions and on-location art enhancements).",
      ru: "Разрешения на съёмки в Бухаре, подбор локаций по сценарию, координация массовки, транспорт, строительство декораций и художественная доработка локаций (расширение и достройка сетов на месте)."
    }
  },
  {
    id: 3,
    featured: true,
    cover: locationMedia.ark.cover,
    gallery: [
      locationMedia.ark.cover,
      locationMedia.ark.gallery[0],
      locationMedia.ark.gallery[1],
      locationMedia.rooftops.gallery[0]
    ],
    title: { en: "Akeli", ru: "Akeli" },
    category: {
      en: "Feature Film — Action / Drama / Thriller",
      ru: "Полнометражный фильм — боевик / драма / триллер"
    },
    director: "Pranay Meshram",
    countries: { en: "India", ru: "Индия" },
    year: 2023,
    services: {
      en: "Location permits, location management, extras coordination, transportation, props supply and set construction.",
      ru: "Разрешения на съёмки, локационный менеджмент, массовка, транспорт, обеспечение реквизитом и строительство декораций."
    }
  },
  {
    id: 4,
    featured: true,
    cover: locationMedia.kyzylkum.cover,
    gallery: [
      locationMedia.kyzylkum.cover,
      locationMedia.rooftops.gallery[2],
      locationMedia.ark.gallery[0],
      locationMedia.ark.gallery[1]
    ],
    title: { en: "Uncle", ru: "Дядя" },
    category: { en: "Feature Film", ru: "Полнометражный фильм" },
    director: "Rashid Malikov",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    location: { en: "Bukhara, Uzbekistan", ru: "Бухара, Узбекистан" },
    year: 2014,
    services: {
      en: "Scripted location scouting, cast and extras coordination in Bukhara, transportation, set construction and on-location art department enhancements (set extensions).",
      ru: "Подбор локаций по сценарию, координация актёров и массовки в Бухаре, транспорт, строительство декораций и художественная доработка локаций (расширение и достройка сетов на месте)."
    }
  },
  {
    id: 5,
    featured: true,
    cover: locationMedia.rooftops.cover,
    gallery: [
      locationMedia.rooftops.cover,
      locationMedia.rooftops.gallery[0],
      locationMedia.rooftops.gallery[1],
      locationMedia.rooftops.gallery[2]
    ],
    title: { en: "Alisher Navoi", ru: "Алишер Навои" },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "Shohrukh Rasulov",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    year: 2021,
    services: {
      en: "Location coordination, set decoration, props supply and extras coordination.",
      ru: "Координация по локациям, декорации, обеспечение реквизитом, координация массовки."
    }
  },
  {
    id: 6,
    featured: true,
    cover: locationMedia.caravanserai.cover,
    gallery: [
      locationMedia.caravanserai.cover,
      locationMedia.caravanserai.gallery[0],
      locationMedia.caravanserai.gallery[1],
      locationMedia.caravanserai.gallery[2]
    ],
    title: { en: "Ibrat", ru: "Ибрат" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Jahongir Qasimov",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Full local production coordination and organizational support in Bukhara.",
      ru: "Полная координация и организация съёмочного процесса в Бухаре."
    }
  },
  {
    id: 7,
    cover: locationMedia.poiKalyan.gallery[0],
    gallery: [
      locationMedia.poiKalyan.gallery[0],
      locationMedia.poiKalyan.gallery[1],
      locationMedia.poiKalyan.cover,
      locationMedia.poiKalyan.gallery[2]
    ],
    title: { en: "Hayrat", ru: "Хайрат" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Zulfiqar Musakov",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Full local production coordination and organizational support in Bukhara.",
      ru: "Полная координация и организация съёмочного процесса в Бухаре."
    }
  },
  {
    id: 8,
    cover: locationMedia.ark.gallery[0],
    gallery: [
      locationMedia.ark.gallery[0],
      locationMedia.ark.gallery[1],
      locationMedia.ark.cover,
      locationMedia.rooftops.gallery[0]
    ],
    title: { en: "Mukumi", ru: "Мукумий" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "F. Jalolov",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Local production coordination and on-ground organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 9,
    cover: locationMedia.lyabiHauz.gallery[0],
    gallery: [
      locationMedia.lyabiHauz.gallery[0],
      locationMedia.lyabiHauz.gallery[1],
      locationMedia.lyabiHauz.cover,
      locationMedia.caravanserai.gallery[0]
    ],
    title: { en: "Jami and Navoi", ru: "Джами и Навои" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "D. Masaidov",
    countries: { en: "Uzbekistan, Tajikistan", ru: "Узбекистан, Таджикистан" },
    services: {
      en: "Full local production coordination and organizational support in Bukhara.",
      ru: "Полная координация и организация съёмочного процесса в Бухаре."
    }
  },
  {
    id: 10,
    cover: locationMedia.caravanserai.gallery[1],
    gallery: [
      locationMedia.caravanserai.gallery[1],
      locationMedia.caravanserai.gallery[2],
      locationMedia.caravanserai.cover,
      locationMedia.caravanserai.gallery[0]
    ],
    title: { en: "Sun on the Tongue", ru: "Солнце на вкус" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "E. Salavatov",
    countries: { en: "Russia", ru: "Россия" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 11,
    cover: locationMedia.rooftops.gallery[0],
    gallery: [
      locationMedia.rooftops.gallery[0],
      locationMedia.rooftops.gallery[1],
      locationMedia.rooftops.cover,
      locationMedia.rooftops.gallery[2]
    ],
    title: { en: "Survival Game", ru: "Игра на выживание" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "K. Oganesyan",
    countries: { en: "Russia", ru: "Россия" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 12,
    cover: locationMedia.poiKalyan.gallery[2],
    gallery: [
      locationMedia.poiKalyan.gallery[2],
      locationMedia.poiKalyan.gallery[1],
      locationMedia.poiKalyan.cover,
      locationMedia.ark.cover
    ],
    title: {
      en: "Avicenna: Between East and West",
      ru: "Авиценна. Между Востоком и Западом"
    },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "A. Sudilovsky",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 13,
    cover: locationMedia.lyabiHauz.gallery[1],
    gallery: [
      locationMedia.lyabiHauz.gallery[1],
      locationMedia.lyabiHauz.cover,
      locationMedia.lyabiHauz.gallery[0],
      locationMedia.caravanserai.gallery[1]
    ],
    title: { en: "Love Story", ru: "История любви" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "D. Iosifov",
    countries: { en: "Russia", ru: "Россия" },
    services: {
      en: "Local production and location coordination in Bukhara.",
      ru: "Локальная продакшн- и локационная координация в Бухаре."
    }
  },
  {
    id: 14,
    cover: locationMedia.kyzylkum.gallery[0],
    gallery: [
      locationMedia.kyzylkum.gallery[0],
      locationMedia.kyzylkum.gallery[1],
      locationMedia.kyzylkum.cover,
      locationMedia.ark.gallery[1]
    ],
    title: {
      en: "The Adventures of Marco Polo in Uzbekistan",
      ru: "Приключения Марко Поло в Узбекистане"
    },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "A. Vyazigin",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 15,
    cover: locationMedia.kyzylkum.cover,
    gallery: [
      locationMedia.kyzylkum.cover,
      locationMedia.rooftops.gallery[2],
      locationMedia.poiKalyan.cover,
      locationMedia.ark.cover
    ],
    title: {
      en: "FIFA World Cup 2022 Commercial",
      ru: "Рекламный ролик в честь ЧМ 2022"
    },
    category: { en: "Commercial", ru: "Рекламный проект" },
    countries: { en: "Qatar", ru: "Катар" },
    year: 2022,
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 16,
    cover: locationMedia.rooftops.cover,
    gallery: [
      locationMedia.rooftops.cover,
      locationMedia.rooftops.gallery[0],
      locationMedia.rooftops.gallery[1],
      locationMedia.caravanserai.cover
    ],
    title: { en: "The Return of Koran Usman", ru: "Возвращение Корана Усмана" },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "M. Alizoda",
    countries: { en: "United Kingdom", ru: "Великобритания" },
    broadcasters: { en: "BBC / Sevimli TV", ru: "BBC / Sevimli TV" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 17,
    cover: locationMedia.poiKalyan.gallery[1],
    gallery: [
      locationMedia.poiKalyan.gallery[1],
      locationMedia.poiKalyan.cover,
      locationMedia.poiKalyan.gallery[0],
      locationMedia.lyabiHauz.cover
    ],
    title: { en: "Feruz's Dreams", ru: "Мечты Феруза" },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "M. Alizoda",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  },
  {
    id: 18,
    cover: locationMedia.caravanserai.cover,
    gallery: [
      locationMedia.caravanserai.cover,
      locationMedia.caravanserai.gallery[0],
      locationMedia.caravanserai.gallery[1],
      locationMedia.caravanserai.gallery[2]
    ],
    title: {
      en: "Bukhara: A Bridge Between Past and Future",
      ru: "Бухара — мост между прошлым и будущим"
    },
    category: { en: "Documentary Film", ru: "Документальный фильм" },
    director: "M. Alizoda",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    services: {
      en: "Local production coordination and organizational support in Bukhara.",
      ru: "Локальная координация и организационное сопровождение съёмок в Бухаре."
    }
  }
];

export const featuredProjects = portfolioProjects.filter((p) => p.featured);

export const getProjectServices = (project, language) =>
  project.services?.[language] ||
  project.services?.en ||
  defaultProjectServices[language] ||
  defaultProjectServices.en;
