import { locationMediaBySlug } from "./locationMedia.js";

const makeLocation = (id, slug, en, ru) => {
  const media = locationMediaBySlug[slug] || { cover: "", gallery: [], images: [] };
  return {
    id,
    slug,
    imageurl: media.cover || "",
    gallery: media.gallery || [],
    images: media.images || [],
    videos: media.videos || [],
    name: { en, ru }
  };
};

export const ProjectProductData = [
  makeLocation(1, "steppe-landscapes", "Steppe Landscapes", "Степные ландшафты"),
  makeLocation(2, "sand-dunes", "Sand Dunes", "Песчаные барханы"),
  makeLocation(3, "varakhsha", "Varakhsha Archaeological Site", "Варахша"),
  makeLocation(4, "forest-landscapes", "Forest Landscapes", "Лесные локации"),
  makeLocation(5, "mountain-landscapes", "Mountain Landscapes", "Горные ландшафты"),
  makeLocation(6, "reservoir", "Reservoir", "Водохранилище"),
  makeLocation(7, "lake", "Lake", "Озеро"),
  makeLocation(8, "sardoba", "Sardoba Water Reservoir", "Сардоба"),
  makeLocation(9, "madrasahs", "Madrasahs", "Медресе"),
  makeLocation(10, "desert-tourist-village", "Desert Tourist Village", "Туристический город среди степи"),
  makeLocation(11, "old-city", "Old City", "Старый город"),
  makeLocation(12, "historic-square", "Historic Square", "Историческая площадь"),
  makeLocation(13, "emirs-winter-palace", "Emir’s Winter Palace", "Зимний дворец эмира"),
  makeLocation(14, "emirs-summer-palace", "Emir’s Summer Palace", "Летний дворец эмира"),
  makeLocation(15, "historic-city-walls", "Historic City Walls", "Городские стены"),
  makeLocation(16, "abandoned-swimming-pool", "Abandoned Swimming Pool", "Пустой бассейн"),
  makeLocation(17, "emirs-madrasah", "Emir’s Madrasah", "Медресе Эмира"),
  makeLocation(18, "historic-hammam", "Historic Hammam", "Исторический хаммам"),
  makeLocation(19, "minaret-grand-mosque", "Minaret & Grand Mosque", "Минарет и Большая мечеть"),
  makeLocation(20, "first-trading-dome", "First Trading Dome", "Первый торговый купол"),
  makeLocation(21, "second-third-trading-domes", "Second & Third Trading Domes", "Второй и третий торговые купола"),
  makeLocation(22, "historic-architectural-complex", "Historic Architectural Complex", "Исторический комплекс"),
  makeLocation(23, "medieval-zindan", "Medieval Fortress Prison (Zindan)", "Средневековый зиндан")
];
