import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const locationsRoot = path.join(projectRoot, "public", "locations");

const imagePaths = [];

for (const entry of fs.readdirSync(locationsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const directory = path.join(locationsRoot, entry.name);
  for (const file of fs.readdirSync(directory)) {
    if (/\.(jpe?g|png)$/i.test(file)) {
      imagePaths.push(path.join(directory, file));
    }
  }
}

let converted = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const sourcePath of imagePaths) {
  const outputPath = sourcePath.replace(/\.(jpe?g|png)$/i, ".webp");
  bytesBefore += fs.statSync(sourcePath).size;

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality: 80, effort: 4, smartSubsample: true })
    .toFile(outputPath);

  bytesAfter += fs.statSync(outputPath).size;
  fs.unlinkSync(sourcePath);
  converted += 1;
}

console.log(
  `Converted ${converted} location images: ${(bytesBefore / 1024 / 1024).toFixed(1)} MB -> ${(bytesAfter / 1024 / 1024).toFixed(1)} MB`
);
