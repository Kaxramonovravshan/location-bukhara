import sharp from "sharp";
import { mkdir } from "fs/promises";

const logoPath = "src/assets/logo.png";
const publicDir = "public";

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 }
];

await mkdir(publicDir, { recursive: true });

for (const { name, size } of sizes) {
  await sharp(logoPath)
    .resize(size, size, { fit: "contain", background: { r: 20, g: 23, b: 28, alpha: 1 } })
    .png()
    .toFile(`${publicDir}/${name}`);
  console.log(`Created ${name}`);
}

await sharp(logoPath)
  .resize(1200, 630, {
    fit: "contain",
    background: { r: 20, g: 23, b: 28, alpha: 1 }
  })
  .png()
  .toFile(`${publicDir}/og-image.png`);

console.log("Created og-image.png");
