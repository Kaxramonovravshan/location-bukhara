import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import writeFileAtomic from "write-file-atomic";
import existingManifest from "../docs/r2-image-manifest.json" with { type: "json" };

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stagingRoot = path.join(projectRoot, "new-images");
const outputPath = path.join(projectRoot, "docs", "r2-new-images-manifest.json");
const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const contentTypes = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};
const categoryRoots = new Set(["services", "locations", "portfolio", "shared"]);
const serviceSource = await fs.readFile(path.join(projectRoot, "src", "utils", "serviceMedia.js"), "utf8");
const serviceSlugsMatch = serviceSource.match(/export const serviceSlugs = \[([\s\S]*?)\]/);
const validServices = new Set(serviceSlugsMatch?.[1].match(/"([a-z0-9-]+)"/g)?.map((slug) => slug.slice(1, -1)) || []);
const validLocations = new Map(existingManifest.locations.map((location) => [location.slug, String(location.id)]));

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".gitkeep" || entry.name === "README.md" || entry.name.startsWith(".")) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not allowed in staging: ${absolute}`);
    if (entry.isDirectory()) files.push(...await listFiles(absolute));
    else files.push(absolute);
  }
  return files;
}

function relativeToProject(absolute) {
  return path.relative(projectRoot, absolute).replaceAll(path.sep, "/");
}

function validateAndMap(absolute) {
  const sourcePath = relativeToProject(absolute);
  const parts = sourcePath.split("/");
  const [, root, ...rest] = parts;
  const fileName = rest.at(-1);
  if (!categoryRoots.has(root)) return { sourcePath, error: "File must be under services, locations, portfolio, or shared." };
  if (!fileName || !imagePattern.test(fileName)) return { sourcePath, error: "Unsupported image extension." };
  if (fileName === "." || fileName === ".." || /[\u0000-\u001f\u007f]/.test(fileName)) {
    return { sourcePath, error: "Filename contains unsafe control characters." };
  }

  let category;
  let targetKey;
  let locationId = null;
  let locationSlug = null;
  let serviceSlug = null;
  let serviceCollection = null;
  if (root === "services") {
    if (!validServices.has(rest[0])) return { sourcePath, error: `Unknown service slug or invalid path: ${rest.slice(0, -1).join("/")}` };
    category = "service";
    serviceSlug = rest[0];
    if (serviceSlug === "accommodation") {
      if (rest.length !== 3 || !["hotels", "hostels"].includes(rest[1])) {
        return { sourcePath, error: "Accommodation files must be under new-images/services/accommodation/hotels/ or new-images/services/accommodation/hostels/." };
      }
      serviceCollection = rest[1];
      targetKey = `services/${serviceSlug}/${serviceCollection}/${fileName}`;
    } else {
      if (rest.length !== 2) return { sourcePath, error: `Service files must be directly under new-images/services/${serviceSlug}/.` };
      targetKey = `services/${serviceSlug}/${fileName}`;
    }
  } else if (root === "locations") {
    if (rest.length !== 2 || !validLocations.has(rest[0])) return { sourcePath, error: `Unknown location slug or invalid path: ${rest.slice(0, -1).join("/")}` };
    category = "location";
    locationSlug = rest[0];
    locationId = validLocations.get(locationSlug);
    targetKey = `locations/${locationSlug}/${fileName}`;
  } else if (root === "portfolio") {
    if (rest.length !== 1) return { sourcePath, error: "Portfolio files must be directly under new-images/portfolio/." };
    category = "shared";
    targetKey = `shared/portfolio-posters/${fileName}`;
  } else {
    if (rest.length !== 1) return { sourcePath, error: "Shared files must be directly under new-images/shared/." };
    category = "shared";
    targetKey = `shared/site-assets/${fileName}`;
  }
  return { sourcePath, category, locationId, locationSlug, serviceSlug, serviceCollection, targetKey, fileName };
}

const existingByKey = new Map(existingManifest.images.map((item) => [item.r2Key, item]));
const existingByHash = new Map();
for (const item of existingManifest.images) {
  const matches = existingByHash.get(item.sha256) || [];
  matches.push(item);
  existingByHash.set(item.sha256, matches);
}

const records = [];
const errors = [];
const newByHash = new Map();
const files = await listFiles(stagingRoot);
for (const absolute of files) {
  const mapped = validateAndMap(absolute);
  if (mapped.error) {
    errors.push(mapped);
    continue;
  }
  const buffer = await fs.readFile(absolute);
  const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
  const stat = await fs.stat(absolute);
  const record = {
    manifestId: `new-image-${String(records.length + 1).padStart(4, "0")}`,
    sourcePath: mapped.sourcePath,
    r2Key: mapped.targetKey,
    publicUrl: `${existingManifest.publicBaseUrl}/${mapped.targetKey.split("/").map(encodeURIComponent).join("/")}`,
    category: mapped.category,
    role: mapped.category === "shared" ? "shared" : "gallery",
    locationId: mapped.locationId,
    locationSlug: mapped.locationSlug,
    serviceSlug: mapped.serviceSlug,
    serviceCollection: mapped.serviceCollection,
    status: "pending",
    eligibleForUpload: true,
    sizeBytes: stat.size,
    contentType: contentTypes[path.extname(mapped.fileName).toLowerCase()] || "application/octet-stream",
    sha256
  };

  if (existingByKey.has(record.r2Key)) {
    record.status = "conflict";
    record.eligibleForUpload = false;
    record.conflict = "r2-key-already-exists";
    record.conflictWith = record.r2Key;
  } else if (existingByHash.has(sha256)) {
    record.status = "skipped";
    record.eligibleForUpload = false;
    record.duplicateOf = existingByHash.get(sha256)[0].r2Key;
    record.duplicate = "existing-content-sha256";
  } else if (newByHash.has(sha256)) {
    record.status = "skipped";
    record.eligibleForUpload = false;
    record.duplicateOf = newByHash.get(sha256).r2Key;
    record.duplicate = "staged-content-sha256";
  }
  if (!existingByHash.has(sha256) && !newByHash.has(sha256)) {
    newByHash.set(sha256, record);
  }
  records.push(record);
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  baseManifest: "docs/r2-image-manifest.json",
  bucket: existingManifest.bucket,
  publicBaseUrl: existingManifest.publicBaseUrl,
  safety: {
    incremental: true,
    uploadPerformed: false,
    existingManifestModified: false,
    existingR2ObjectsModified: false,
    localFilesDeleted: false
  },
  summary: {
    stagedFiles: files.length,
    validRecords: records.length,
    eligibleForUpload: records.filter((item) => item.eligibleForUpload).length,
    duplicateFiles: records.filter((item) => item.duplicate).length,
    keyConflicts: records.filter((item) => item.conflict).length,
    invalidFiles: errors.length,
    uploadBytes: records.filter((item) => item.eligibleForUpload).reduce((sum, item) => sum + item.sizeBytes, 0)
  },
  errors,
  images: records
};

await writeFileAtomic(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, { encoding: "utf8" });
console.log(JSON.stringify(manifest.summary, null, 2));
console.log(`Candidate manifest: ${relativeToProject(outputPath)}`);
if (records.some((item) => item.eligibleForUpload)) {
  console.log("Dry-run upload command: node scripts/upload-r2-images.mjs --manifest=docs/r2-new-images-manifest.json --dry-run");
}
