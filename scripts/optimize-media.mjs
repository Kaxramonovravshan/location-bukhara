import { execFileSync } from "node:child_process";
import { readdir, stat, rename, unlink, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "src", "assets");

const IMAGE_MAX_WIDTH = 1600;
const JPEG_QUALITY = 76;
const PNG_MAX_WIDTH = 512;

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const fileStat = await stat(filePath);
  if (fileStat.size < 2048) {
    console.log(`REMOVE (corrupt): ${path.relative(rootDir, filePath)}`);
    await unlink(filePath);
    return { before: fileStat.size, after: 0, skipped: true, removed: true };
  }

  const tempPath = `${filePath}.optimized`;
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === ".png") {
      await sharp(filePath)
        .rotate()
        .resize(PNG_MAX_WIDTH, null, { withoutEnlargement: true, fit: "inside" })
        .png({ compressionLevel: 9, palette: true, effort: 10 })
        .toFile(tempPath);
    } else {
      await sharp(filePath)
        .rotate()
        .resize(IMAGE_MAX_WIDTH, null, { withoutEnlargement: true, fit: "inside" })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(tempPath);
    }
  } catch (error) {
    console.log(`REMOVE (invalid image): ${path.relative(rootDir, filePath)}`);
    await unlink(filePath).catch(() => {});
    return { before: fileStat.size, after: 0, skipped: true, removed: true };
  }

  const optimizedStat = await stat(tempPath);

  if (optimizedStat.size >= fileStat.size) {
    await unlink(tempPath);
    console.log(`KEEP: ${path.relative(rootDir, filePath)} (${formatSize(fileStat.size)})`);
    return { before: fileStat.size, after: fileStat.size, skipped: true };
  }

  await rename(tempPath, filePath);
  console.log(
    `IMG: ${path.relative(rootDir, filePath)} ${formatSize(fileStat.size)} -> ${formatSize(optimizedStat.size)}`
  );

  return { before: fileStat.size, after: optimizedStat.size, skipped: false };
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimizeVideo(inputPath, outputPath) {
  if (!ffmpegPath) {
    console.log("SKIP video: ffmpeg-static not available");
    return null;
  }

  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      inputPath,
      "-an",
      "-vcodec",
      "libx264",
      "-crf",
      "30",
      "-preset",
      "fast",
      "-movflags",
      "+faststart",
      "-vf",
      "scale=1280:-2",
      outputPath
    ],
    { stdio: "inherit" }
  );

  const before = (await stat(inputPath)).size;
  const after = (await stat(outputPath)).size;

  await rename(outputPath, inputPath);
  console.log(`VID: mainVideo.mp4 ${formatSize(before)} -> ${formatSize(after)}`);

  return { before, after };
}

async function createHeroPoster(videoPath, posterPath, fallbackImage) {
  if (ffmpegPath) {
    try {
      execFileSync(ffmpegPath, [
        "-y",
        "-ss",
        "00:00:01",
        "-i",
        videoPath,
        "-frames:v",
        "1",
        "-q:v",
        "4",
        "-vf",
        "scale=1280:-2",
        posterPath
      ]);
      await optimizeImage(posterPath);
      console.log(`POSTER: ${path.relative(rootDir, posterPath)}`);
      return;
    } catch {
      console.log("POSTER: ffmpeg frame extract failed, using fallback image");
    }
  }

  await copyFile(fallbackImage, posterPath);
  await optimizeImage(posterPath);
  console.log(`POSTER: copied fallback -> ${path.relative(rootDir, posterPath)}`);
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  const imageFiles = await collectFiles(assetsDir);
  for (const filePath of imageFiles) {
    const result = await optimizeImage(filePath);
    totalBefore += result.before;
    totalAfter += result.after;
  }

  const videoPath = path.join(assetsDir, "mainVideo.mp4");
  const tempVideoPath = path.join(assetsDir, "mainVideo.optimized.mp4");
  const videoResult = await optimizeVideo(videoPath, tempVideoPath);
  if (videoResult) {
    totalBefore += videoResult.before;
    totalAfter += videoResult.after;
  }

  const posterPath = path.join(assetsDir, "hero-poster.jpg");
  const fallbackPoster = path.join(assetsDir, "locations", "rooftops", "cover.jpg");
  await createHeroPoster(videoPath, posterPath, fallbackPoster);

  console.log(`\nTotal images/video saved: ${formatSize(totalBefore - totalAfter)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
