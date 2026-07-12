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
    poster: "project-1.webp",
    video: "project-1.mp4",
    gallery: [
      "project-1.webp",
      "project-1-2.webp",
      "project-1-3.webp",
      "project-1-4.webp"
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
    poster: "project-2.webp",
    video: "project-2.mp4",
    gallery: [
      "project-2.webp",
      "project-2-2.webp",
      "project-2-3.webp",
      "project-2-4.webp"
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
    poster: "project-3.webp",
    video: "project-3.mp4",
    gallery: [
      "project-3.webp",
      "project-3-2.webp",
      "project-3-3.webp",
      "project-3-4.webp"
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
    poster: "project-4.webp",
    video: "project-4.mp4",
    gallery: [
      "project-4.webp",
      "project-4-2.webp",
      "project-4-3.webp",
      "project-4-4.webp"
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
    poster: "project-5.webp",
    video: "project-5.mp4",
    gallery: [
      "project-5.webp",
      "project-5-2.webp",
      "project-5-3.webp",
      "project-5-4.webp"
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
    poster: "project-6.webp",
    video: "project-6.mp4",
    gallery: [
      "project-6.webp",
      "project-6-2.webp",
      "project-6-3.webp",
      "project-6-4.webp"
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
    poster: "project-7.webp",
    video: "project-7.mp4",
    gallery: [
      "project-7.webp",
      "project-7-2.webp",
      "project-7-3.webp",
      "project-7-4.webp"
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
    poster: "project-8.webp",
    video: "project-8.mp4",
    gallery: [
      "project-8.webp",
      "project-8-2.webp",
      "project-8-3.webp",
      "project-8-4.webp"
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
    poster: "project-9.webp",
    video: "project-9.mp4",
    gallery: [
      "project-9.webp",
      "project-9-2.webp",
      "project-9-3.webp",
      "project-9-4.webp"
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
    poster: "project-10.webp",
    video: "project-10.mp4",
    gallery: [
      "project-10.webp",
      "project-10-2.webp",
      "project-10-3.webp",
      "project-10-4.webp"
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
    poster: "project-11.webp",
    video: "project-11.mp4",
    gallery: [
      "project-11.webp",
      "project-11-2.webp",
      "project-11-3.webp",
      "project-11-4.webp"
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
    poster: "project-12.webp",
    video: "project-12.mp4",
    gallery: [
      "project-12.webp",
      "project-12-2.webp",
      "project-12-3.webp",
      "project-12-4.webp"
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
    poster: "project-13.webp",
    video: "project-13.mp4",
    gallery: [
      "project-13.webp",
      "project-13-2.webp",
      "project-13-3.webp",
      "project-13-4.webp"
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
    poster: "project-14.webp",
    video: "project-14.mp4",
    gallery: [
      "project-14.webp",
      "project-14-2.webp",
      "project-14-3.webp",
      "project-14-4.webp"
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
    poster: "project-15.webp",
    video: "project-15.mp4",
    gallery: [
      "project-15.webp",
      "project-15-2.webp",
      "project-15-3.webp",
      "project-15-4.webp"
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
    poster: "project-16.webp",
    video: "project-16.mp4",
    gallery: [
      "project-16.webp",
      "project-16-2.webp",
      "project-16-3.webp",
      "project-16-4.webp"
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
    poster: "project-17.webp",
    video: "project-17.mp4",
    gallery: [
      "project-17.webp",
      "project-17-2.webp",
      "project-17-3.webp",
      "project-17-4.webp"
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
    poster: "project-18.webp",
    video: "project-18.mp4",
    gallery: [
      "project-18.webp",
      "project-18-2.webp",
      "project-18-3.webp",
      "project-18-4.webp"
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
