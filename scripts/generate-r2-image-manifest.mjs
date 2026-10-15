import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { ProjectProductData } from "../src/utils/data.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(projectRoot, "docs", "r2-image-manifest.json");
const publicRoot = path.join(projectRoot, "public");
const assetsRoot = path.join(projectRoot, "src", "assets");
const imagePattern = /\.(jpe?g|png|webp|gif|svg)$/i;
const publicUrl = "https://images.buxorofilm.com";

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (entry.name === ".gitkeep") continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(absolute)));
    else if (imagePattern.test(entry.name)) result.push(absolute);
  }
  return result;
}

function rel(absolute) {
  return path.relative(projectRoot, absolute).replaceAll(path.sep, "/");
}

function recordFor(absolute, locations) {
  const sourcePath = rel(absolute);
  const fileName = path.basename(absolute);
  const ext = path.extname(fileName).toLowerCase();
  const location = locations.find((item) => sourcePath.startsWith(`public/locations/${item.slug}/`));

  if (location) {
    return {
      locationId: String(location.id),
      locationSlug: location.slug,
      sourcePath,
      r2Key: `locations/${location.slug}/${fileName}`,
      publicUrl: `${publicUrl}/locations/${location.slug}/${encodeURIComponent(fileName)}`,
      category: "location",
      role: location.imageurl === `/${sourcePath.slice("public".length)}` ? "cover" : "gallery",
      status: "pending"
    };
  }

  if (sourcePath.startsWith("public/services/")) {
    const serviceSlug = sourcePath.split("/")[2];
    return {
      locationId: null,
      locationSlug: null,
      sourcePath,
      r2Key: `services/${serviceSlug}/${fileName}`,
      publicUrl: `${publicUrl}/services/${serviceSlug}/${encodeURIComponent(fileName)}`,
      category: "service",
      serviceSlug,
      role: "gallery",
      status: "pending"
    };
  }

  let sharedPath = "shared/misc";
  if (sourcePath.startsWith("public/posters/")) sharedPath = "shared/portfolio-posters";
  else if (sourcePath.startsWith("public/")) sharedPath = "shared/public-assets";
  else if (sourcePath.startsWith("src/assets/history/")) sharedPath = "shared/history";
  else if (sourcePath.startsWith("src/assets/locations/")) sharedPath = "shared/location-hero";
  else if (sourcePath.startsWith("src/assets/")) sharedPath = "shared/site-assets";

  return {
    locationId: null,
    locationSlug: null,
    sourcePath,
    r2Key: `${sharedPath}/${fileName}`,
    publicUrl: `${publicUrl}/${sharedPath}/${encodeURIComponent(fileName)}`,
    category: "shared",
    role: "shared",
    status: "pending"
  };
}

async function sha256(file) {
  return crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");
}

const locations = ProjectProductData.map(({ id, slug, name, imageurl }) => ({ id, slug, name, imageurl }));
const files = [...(await walk(publicRoot)), ...(await walk(assetsRoot))].sort();
const records = [];
for (const file of files) {
  const record = recordFor(file, locations);
  const stat = await fs.stat(file);
  record.sizeBytes = stat.size;
  record.contentType = contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream";
  record.sha256 = await sha256(file);
  records.push(record);
}
records.forEach((record, index) => {
  record.manifestId = `image-${String(index + 1).padStart(4, "0")}`;
});

const byHash = new Map();
for (const record of records) {
  const same = byHash.get(record.sha256) || [];
  same.push(record.sourcePath);
  byHash.set(record.sha256, same);
}
for (const record of records) {
  const matches = byHash.get(record.sha256);
  if (matches.length > 1 && record.sourcePath !== matches[0]) record.duplicateOf = matches[0];
}

const sourceText = await fs.readFile(path.join(projectRoot, "src", "utils", "portfolio.js"), "utf8");
const referencedPosters = [...sourceText.matchAll(/(?:poster|gallery):\s*["']([^"']+\.(?:webp|png|jpe?g))["']/gi)].map((m) => m[1]);
const existingPosterNames = new Set(records.filter((r) => r.category === "shared" && r.r2Key.startsWith("shared/portfolio-posters/")).map((r) => path.basename(r.sourcePath)));
const missingPortfolioImages = [...new Set(referencedPosters)].filter((name) => !existingPosterNames.has(name));
const knownUsedShared = new Set([
  "public/apple-touch-icon.png",
  "public/favicon-16x16.png",
  "public/favicon-32x32.png",
  "public/icon-512.png",
  "public/og-image.png",
  "public/posters/project-1.webp",
  "public/posters/project-2.webp",
  "src/assets/aliChroiyev.webp",
  "src/assets/history/IMG_9924.webp",
  "src/assets/locationSectionImg-sm.webp",
  "src/assets/locationSectionImg.webp",
  "src/assets/logo.webp"
]);
for (const record of records) {
  record.usedBy = record.category === "location"
    ? ["src/utils/data.js", "src/pages/Location.jsx"]
    : record.category === "service"
      ? ["src/utils/serviceMedia.js", "src/pages/Service.jsx"]
      : knownUsedShared.has(record.sourcePath)
        ? ["application source references"]
        : [];
  if (record.usedBy.length === 0) record.unusedReason = "No source reference found during the project audit.";
}

const unresolved = missingPortfolioImages.map((name) => ({
  type: "missing-referenced-image",
  reference: `public/posters/${name}`,
  referencedBy: "src/utils/portfolio.js",
  note: "Referenced by portfolio data but not present in the repository."
}));

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  bucket: "location-bukhara",
  publicBaseUrl: publicUrl,
  safety: {
    uploadPerformed: false,
    productionUrlsChanged: false,
    localFilesDeleted: false
  },
  locations,
  summary: {
    totalImages: records.length,
    totalBytes: records.reduce((sum, item) => sum + item.sizeBytes, 0),
    locationImages: records.filter((r) => r.category === "location").length,
    serviceImages: records.filter((r) => r.category === "service").length,
    sharedImages: records.filter((r) => r.category === "shared").length,
    duplicateFiles: records.filter((r) => r.duplicateOf).length,
    unusedImages: records.filter((r) => r.usedBy.length === 0).length,
    unresolvedImages: unresolved.length
  },
  images: records,
  unresolved
};

await fs.mkdir(path.dirname(manifestPath), { recursive: true });
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${rel(manifestPath)}`);
console.log(JSON.stringify(manifest.summary, null, 2));
