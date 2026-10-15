import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import writeFileAtomic from "write-file-atomic";

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const manifestPath = path.join(projectRoot, "docs", "r2-image-manifest.json");
export const statusPath = path.join(projectRoot, "docs", "r2-image-manifest.status.json");
const args = new Set(process.argv.slice(2));
export const dryRun = args.has("--dry-run");
export const force = args.has("--force");
export const confirmedOverwrite = args.has("--confirm-overwrite");
const onlyInline = process.argv.find((arg) => arg.startsWith("--only="));
const onlyIndex = process.argv.indexOf("--only");
export const onlySelector = onlyInline ? onlyInline.slice("--only=".length) : onlyIndex >= 0 ? process.argv[onlyIndex + 1] : "";
const locationInline = process.argv.find((arg) => arg.startsWith("--location="));
const locationIndex = process.argv.indexOf("--location");
export const locationSelector = locationInline ? locationInline.slice("--location=".length) : locationIndex >= 0 ? process.argv[locationIndex + 1] : "";
export const concurrency = Math.max(1, Number(process.env.R2_CONCURRENCY || 4));
export const retries = Math.max(0, Number(process.env.R2_RETRIES || 3));
export const timeoutMs = Math.max(1000, Number(process.env.R2_TIMEOUT_MS || 60000));

const transientStatusCodes = new Set([408, 425, 429, 500, 502, 503, 504]);
const transientErrorCodes = new Set(["ECONNRESET", "ETIMEDOUT", "EPIPE", "EAI_AGAIN"]);

export function sha256(buffer) { return createHash("sha256").update(buffer).digest("hex"); }
export function isNotFound(error) { return error?.$metadata?.httpStatusCode === 404 || error?.name === "NotFound" || error?.name === "NoSuchKey"; }
export function isPreconditionFailed(error) { return error?.$metadata?.httpStatusCode === 412 || error?.name === "PreconditionFailed"; }
export function isTransient(error) { return transientStatusCodes.has(error?.$metadata?.httpStatusCode) || transientErrorCodes.has(error?.code); }
export function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export async function loadLocalEnv() {
  try {
    const text = await fs.readFile(path.join(projectRoot, ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*(R2_[A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  } catch { /* Shell/CI may provide R2_* variables directly. */ }
}

export function required(name) {
  if (!process.env[name]) throw new Error(`Missing environment variable: ${name}`);
  return process.env[name];
}

export function createR2Client() {
  const accountId = required("R2_ACCOUNT_ID");
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: required("R2_ACCESS_KEY_ID"), secretAccessKey: required("R2_SECRET_ACCESS_KEY") },
    maxAttempts: 1,
    requestHandler: new NodeHttpHandler({ connectionTimeout: Math.min(timeoutMs, 15000), socketTimeout: timeoutMs })
  });
}

export async function sendWithRetry(client, command, label, options = {}) {
  const maxRetries = options.retries ?? retries;
  const wait = options.sleepFn ?? sleep;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try { return await client.send(command); }
    catch (error) {
      lastError = error;
      if (attempt >= maxRetries || !isTransient(error)) {
        const wrapped = new Error(`${label}: ${error.message}`, { cause: error });
        wrapped.name = error.name;
        wrapped.code = error.code;
        wrapped.$metadata = error.$metadata;
        throw wrapped;
      }
      await wait(500 * 2 ** attempt);
    }
  }
  throw lastError;
}

export async function readManifest() { return JSON.parse(await fs.readFile(manifestPath, "utf8")); }
export async function readStatuses() {
  try { return JSON.parse(await fs.readFile(statusPath, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return { schemaVersion: 1, items: {} }; throw error; }
}
export function statusFor(statuses, item) { return statuses.items?.[item.r2Key]?.status || item.status || "pending"; }

export async function writeStatusesAtomic(statuses) {
  await writeFileAtomic(statusPath, `${JSON.stringify(statuses, null, 2)}\n`, { encoding: "utf8" });
}

export function verifyHead(item, head) {
  const metadataHash = head?.Metadata?.sha256;
  if (!metadataHash) return { ok: false, reason: "Existing object has no sha256 metadata." };
  if (metadataHash.toLowerCase() !== item.sha256.toLowerCase()) return { ok: false, reason: "sha256 metadata mismatch." };
  if (Number(head.ContentLength) !== item.sizeBytes) return { ok: false, reason: "Content-Length mismatch." };
  if (head.ContentType && head.ContentType.toLowerCase() !== item.contentType.toLowerCase()) return { ok: false, reason: "Content-Type mismatch." };
  return { ok: true };
}

export async function headExisting(client, bucket, item, options = {}) {
  try {
    const head = await sendWithRetry(client, new HeadObjectCommand({ Bucket: bucket, Key: item.r2Key }), `HEAD ${item.r2Key}`, options);
    return { exists: true, head };
  } catch (error) {
    if (isNotFound(error)) return { exists: false };
    throw error;
  }
}

export async function uploadItem(client, bucket, item, options = {}) {
  const allowOverwrite = options.allowOverwrite ?? (force && confirmedOverwrite);
  const retryOptions = { retries: options.retries ?? retries, sleepFn: options.sleepFn };
  const body = options.body ?? await fs.readFile(path.join(projectRoot, item.sourcePath));
  if (sha256(body).toLowerCase() !== item.sha256.toLowerCase()) return { status: "conflict", reason: "Local file SHA-256 does not match manifest." };
  const existing = await headExisting(client, bucket, item, retryOptions);
  if (existing.exists && !allowOverwrite) {
    const verification = verifyHead(item, existing.head);
    return verification.ok ? { status: "skipped", reason: "Existing object verified." } : { status: "conflict", reason: verification.reason };
  }
  const command = new PutObjectCommand({
    Bucket: bucket, Key: item.r2Key, Body: body, ContentType: item.contentType,
    Metadata: { sha256: item.sha256 }, ...(allowOverwrite ? {} : { IfNoneMatch: "*" })
  });
  try { await sendWithRetry(client, command, `PUT ${item.r2Key}`, retryOptions); }
  catch (error) {
    if (isPreconditionFailed(error) && !allowOverwrite) {
      const raced = await headExisting(client, bucket, item, retryOptions);
      if (raced.exists && verifyHead(item, raced.head).ok) return { status: "skipped", reason: "Concurrent upload verified." };
      return { status: "conflict", reason: "Concurrent upload created an unverified object." };
    }
    throw error;
  }
  const verified = await headExisting(client, bucket, item, retryOptions);
  if (!verified.exists) return { status: "failed", reason: "Uploaded object was not found during verification." };
  const verification = verifyHead(item, verified.head);
  return verification.ok ? { status: "complete", reason: "Uploaded object verified." } : { status: "conflict", reason: `Post-upload verification failed: ${verification.reason}` };
}

async function main() {
  await loadLocalEnv();
  if (force && !confirmedOverwrite) throw new Error("--force requires --confirm-overwrite; no overwrite was performed.");
  const manifest = await readManifest();
  const statuses = await readStatuses();
  const bucket = process.env.R2_BUCKET_NAME || manifest.bucket;
  if (onlySelector && locationSelector) throw new Error("Use either --only or --location, not both.");
  if (onlyIndex >= 0 && (!onlySelector || onlyIndex !== process.argv.lastIndexOf("--only"))) throw new Error("--only requires exactly one selector value.");
  if (locationIndex >= 0 && (!locationSelector || locationIndex !== process.argv.lastIndexOf("--location"))) throw new Error("--location requires exactly one selector value.");
  const selected = onlySelector
    ? manifest.images.filter((item) => [item.manifestId, item.sourcePath, item.r2Key].includes(onlySelector))
    : locationSelector
      ? manifest.images.filter((item) => item.category === "location" && item.locationSlug === locationSelector)
      : manifest.images;
  if (onlySelector && selected.length !== 1) throw new Error(`--only must match exactly one manifestId, sourcePath, or r2Key; matches=${selected.length}.`);
  if (locationSelector && selected.length === 0) throw new Error(`--location matched no location image records: ${locationSelector}`);
  const items = selected.filter((item) => !["complete", "skipped"].includes(statusFor(statuses, item)));
  if (onlySelector && items.length === 0) {
    console.log(`Selected image is already ${statusFor(statuses, selected[0])}; no upload performed.`);
    return;
  }
  const totalBytes = items.reduce((sum, item) => sum + item.sizeBytes, 0);
  console.log(`${dryRun ? "Dry-run" : "Upload"}: ${items.length} image(s), ${totalBytes} bytes (${(totalBytes / 1048576).toFixed(2)} MiB), concurrency=${concurrency}, retries=${retries}, timeout=${timeoutMs}ms`);
  if (dryRun) { for (const item of items) console.log(`[dry-run] ${item.sourcePath} -> ${item.r2Key}`); console.log(`Finished: dry-run=${items.length}, failed=0`); return; }
  const client = createR2Client();
  let next = 0; let completed = 0; let failed = 0; let conflicts = 0; let statusWrite = Promise.resolve();
  const updateStatus = (item, status, reason = "") => {
    statuses.items ??= {};
    statuses.items[item.r2Key] = { status, reason, updatedAt: new Date().toISOString() };
    statusWrite = statusWrite.then(() => writeStatusesAtomic(statuses));
    return statusWrite;
  };
  async function worker() {
    while (next < items.length) {
      const item = items[next++]; await updateStatus(item, "uploading");
      try {
        const result = await uploadItem(client, bucket, item); await updateStatus(item, result.status, result.reason);
        if (result.status === "complete" || result.status === "skipped") completed += 1;
        else if (result.status === "conflict") conflicts += 1;
        else if (result.status === "failed") failed += 1;
        console.log(`[${result.status}] ${item.r2Key}${result.reason ? ` — ${result.reason}` : ""}`);
      } catch (error) { failed += 1; await updateStatus(item, "failed", error.message); console.error(`[failed] ${item.r2Key} — ${error.message}`); }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker)); await statusWrite;
  console.log(`Finished: complete-or-skipped=${completed}, failed=${failed}, conflicts=${conflicts}`);
  if (failed || conflicts) process.exitCode = 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
