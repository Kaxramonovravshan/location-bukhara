import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const root = path.join(projectRoot, "public", "locations");
const outFile = path.join(projectRoot, "src", "utils", "locationMedia.js");

function sortImages(a, b) {
  const na = parseInt((a.match(/photo_(\d+)/i) || [])[1] || "0", 10);
  const nb = parseInt((b.match(/photo_(\d+)/i) || [])[1] || "0", 10);
  if (na !== nb) return na - nb;
  return a.localeCompare(b, undefined, { numeric: true });
}

const dirs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const media = {};
let totalImg = 0;
let totalVid = 0;

for (const d of dirs) {
  const files = fs
    .readdirSync(path.join(root, d))
    .filter((f) => /\.(jpe?g|png|webp|mp4|webm|mov)$/i.test(f));
  const images = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort(sortImages);
  const videos = files.filter((f) => /\.(mp4|webm|mov)$/i.test(f)).sort();
  totalImg += images.length;
  totalVid += videos.length;
  media[d] = {
    cover: images[0] ? `/locations/${d}/${images[0]}` : "",
    images: images.map((f) => `/locations/${d}/${f}`),
    videos: videos.map((f) => `/locations/${d}/${f}`),
    gallery: [...images, ...videos].map((f) => `/locations/${d}/${f}`)
  };
}

const out = `/** Auto-generated from public/locations — run: node scripts/generate-location-media.mjs */
export const locationMediaBySlug = ${JSON.stringify(media, null, 2)};

export const isVideoSrc = (src) => /\\.(mp4|webm|mov)(\\?|$)/i.test(src || "");
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out);
console.log(`Wrote ${outFile}`);
console.log(`slugs=${Object.keys(media).length} images=${totalImg} videos=${totalVid}`);
for (const [k, v] of Object.entries(media)) {
  if (v.videos.length) console.log(`  ${k}: ${v.videos.length} video(s)`);
}
