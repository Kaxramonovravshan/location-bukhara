import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const root = path.join(projectRoot, "public", "services");
const outFile = path.join(projectRoot, "src", "utils", "serviceMedia.js");

/** Fixed order matching translations.service.services */
export const SERVICE_SLUGS = [
  "decoration",
  "equipment-supply",
  "location-management",
  "production-support",
  "accommodation",
  "live-props"
];

function sortFiles(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

const mediaBySlug = {};
let totalImg = 0;
let totalVid = 0;

for (const slug of SERVICE_SLUGS) {
  const dir = path.join(root, slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i.test(f))
    .sort(sortFiles);

  const images = files.filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
  const videos = files.filter((f) => /\.(mp4|webm|mov)$/i.test(f));
  totalImg += images.length;
  totalVid += videos.length;

  const imageUrls = images.map((f) => `/services/${slug}/${f}`);
  const videoUrls = videos.map((f) => `/services/${slug}/${f}`);

  mediaBySlug[slug] = {
    ...(slug === "location-management" ? { enabled: false } : {}),
    image: imageUrls[0] || "",
    gallery: [...imageUrls, ...videoUrls],
    ...(slug === "accommodation"
      ? Object.fromEntries(["hotels", "hostels"].map((collection) => {
          const collectionDir = path.join(dir, collection);
          const collectionFiles = fs.existsSync(collectionDir)
            ? fs.readdirSync(collectionDir)
                .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
                .sort(sortFiles)
            : [];
          return [collection, collectionFiles.map((f) => `/services/${slug}/${collection}/${f}`)];
        }))
      : {})
  };
}

const out = `/** Auto-generated from public/services — run: node scripts/generate-service-media.mjs */
export const serviceSlugs = ${JSON.stringify(SERVICE_SLUGS, null, 2)};

export const serviceMediaBySlug = ${JSON.stringify(mediaBySlug, null, 2)};

export const serviceMedia = serviceSlugs.map((slug) => ({
  slug,
  ...serviceMediaBySlug[slug]
}));

export const isServiceVideoSrc = (src) => /\\.(mp4|webm|mov)(\\?|$)/i.test(src || "");
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out);
console.log(`Wrote ${outFile}`);
console.log(`slugs=${SERVICE_SLUGS.length} images=${totalImg} videos=${totalVid}`);
for (const slug of SERVICE_SLUGS) {
  const count = mediaBySlug[slug].gallery.length;
  console.log(`  ${slug}: ${count} media`);
}
