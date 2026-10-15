import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import sourceManifest from "../docs/r2-image-manifest.json" with { type: "json" };

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "public");
const outputRoot = path.join(projectRoot, "artifacts", "r2-location-card-variants");
const manifestPath = path.join(projectRoot, "docs", "r2-location-card-variants-manifest.json");
const widths = [320, 640, 960];

const isImage = (source) => /\.(avif|jpe?g|png|webp)$/i.test(source);

const groupedCardSources = sourceManifest.images
  .filter((item) => item.category === "location" && isImage(item.sourcePath))
  .reduce((groups, item) => {
    const group = groups.get(item.locationSlug) || [];
    if (group.length < 4) group.push(item);
    groups.set(item.locationSlug, group);
    return groups;
  }, new Map())
  .values();
const selectedCardImages = [...groupedCardSources].flatMap((items) => items);

const cardSources = selectedCardImages
  .map((item) => ({
    locationId: item.locationId,
    locationSlug: item.locationSlug,
    source: item.sourcePath.replace(/^public\//, "/")
  }));

const uniqueSources = [...new Map(cardSources.map((item) => [item.source, item])).values()];
const variants = [];

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

for (const item of uniqueSources) {
  const normalizedSource = item.source.replace(/^\//, "");
  const sourcePath = path.join(sourceRoot, normalizedSource);
  const sourceBuffer = await fs.readFile(sourcePath);
  const sourceHash = crypto.createHash("sha256").update(sourceBuffer).digest("hex");
  const sourceName = path.basename(normalizedSource, path.extname(normalizedSource));
  const outputDirectory = path.join(outputRoot, item.locationSlug);
  await fs.mkdir(outputDirectory, { recursive: true });

  for (const width of widths) {
    const fileName = `${sourceName}-w${width}.webp`;
    const localPath = path.join(outputDirectory, fileName);
    await sharp(sourceBuffer)
      .rotate()
      .resize({ width, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 80, effort: 4, smartSubsample: true })
      .toFile(localPath);

    const outputBuffer = await fs.readFile(localPath);
    variants.push({
      manifestId: `location-card-${String(variants.length + 1).padStart(3, "0")}`,
      locationId: item.locationId,
      locationSlug: item.locationSlug,
      sourcePath: `public/${normalizedSource}`,
      sourceSha256: sourceHash,
      width,
      localPath: path.relative(projectRoot, localPath).replaceAll("\\", "/"),
      targetKey: `location-card-variants/${item.locationSlug}/${fileName}`,
      contentType: "image/webp",
      sizeBytes: outputBuffer.length,
      sha256: crypto.createHash("sha256").update(outputBuffer).digest("hex")
    });
  }
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose: "Local-only responsive variants for location catalog cards",
  uploadRequired: true,
  uploadApproved: false,
  sourceImageCount: uniqueSources.length,
  variantCount: variants.length,
  widths,
  variants
};

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(
  `Prepared ${variants.length} local variants for ${uniqueSources.length} location card images.`
);
console.log(`Manifest: ${path.relative(projectRoot, manifestPath)}`);
