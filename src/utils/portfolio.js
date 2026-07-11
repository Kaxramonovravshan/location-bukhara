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
    cover: locationMedia.poiKalyan.cover,
    gallery: [
      locationMedia.poiKalyan.cover,
      locationMedia.poiKalyan.gallery[0],
      locationMedia.poiKalyan.gallery[1],
      locationMedia.poiKalyan.gallery[2]
    ],
    title: { en: "Eterna", ru: "Eterna" },
    category: { en: "TV Series", ru: "TV сериал" },
    director: "Oleg Pogodin",
    countries: { en: "Russia, Uzbekistan", ru: "Россия, Узбекистан" },
    year: 2023
  },
  {
    id: 2,
    featured: true,
    cover: locationMedia.ark.cover,
    gallery: [
      locationMedia.ark.cover,
      locationMedia.ark.gallery[0],
      locationMedia.ark.gallery[1],
      locationMedia.rooftops.gallery[0]
    ],
    title: { en: "Akeli", ru: "Akeli" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Oleg Pogodin",
    countries: { en: "Russia", ru: "Россия" },
    year: 2022
  },
  {
    id: 3,
    featured: true,
    cover: locationMedia.lyabiHauz.cover,
    gallery: [
      locationMedia.lyabiHauz.cover,
      locationMedia.lyabiHauz.gallery[0],
      locationMedia.lyabiHauz.gallery[1],
      locationMedia.caravanserai.gallery[0]
    ],
    title: { en: "Motherland Awaits", ru: "Родина ждёт" },
    category: { en: "TV Series", ru: "TV сериал" },
    director: "Oleg Pogodin",
    countries: { en: "Russia, Uzbekistan", ru: "Россия, Узбекистан" },
    year: 2003
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
    title: { en: "FIFA World Cup 2022 Commercial", ru: "Реклама ЧМ-2022" },
    category: { en: "Commercial", ru: "Реклама" },
    director: "Oleg Pogodin",
    countries: { en: "Russia", ru: "Россия" },
    year: 2021
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
    title: { en: "The Return of Koran Usman", ru: "Возвращение Коран Usman" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Oleg Pogodin",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    year: 2019
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
    title: {
      en: "Bukhara: A Bridge Between Past and Future",
      ru: "Бухара: мост между прошлым и будущим"
    },
    category: { en: "Documentary", ru: "Документальный фильм" },
    director: "Oleg Pogodin",
    countries: { en: "Uzbekistan", ru: "Узбекистан" },
    year: 2018
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
    title: { en: "Minaret", ru: "Минарет" },
    category: { en: "Short Film", ru: "Короткометражный фильм" },
    director: "Jannat Khashimova",
    countries: { en: "Uzbekistan, France", ru: "Узбекистан, Франция" },
    year: 2017
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
    title: { en: "Citadel", ru: "Цитадель" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Andrey Konchalovsky",
    countries: {
      en: "Russia, Uzbekistan, Italy",
      ru: "Россия, Узбекистан, Италия"
    },
    year: 2018
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
    title: { en: "Lyabi-Hauz Stories", ru: "Истории Ляби-Хауз" },
    category: { en: "Documentary", ru: "Документальный фильм" },
    director: "Rustam Khamdamov",
    countries: { en: "Uzbekistan, Japan", ru: "Узбекистан, Япония" },
    year: 2005
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
    title: { en: "Merchant's Tale", ru: "Сказка купца" },
    category: { en: "TV Series", ru: "TV сериал" },
    director: "Farkhad Makhmudov",
    countries: { en: "Uzbekistan, Turkey", ru: "Узбекистан, Турция" },
    year: 2020
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
    title: { en: "Skyline", ru: "Горизонт" },
    category: { en: "Music Video", ru: "Музыкальный клип" },
    director: "Nilufar Azimova",
    countries: { en: "Uzbekistan, UK", ru: "Узбекистан, Великобритания" },
    year: 2023
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
    title: { en: "Ancient Light", ru: "Древний свет" },
    category: { en: "Feature Film", ru: "Художественный фильм" },
    director: "Ulugbek Khamraev",
    countries: { en: "Uzbekistan, USA", ru: "Узбекистан, США" },
    year: 2021
  }
];

export const featuredProjects = portfolioProjects.filter((p) => p.featured);

export const getProjectServices = (project, language) =>
  project.services?.[language] ||
  project.services?.en ||
  defaultProjectServices[language] ||
  defaultProjectServices.en;
