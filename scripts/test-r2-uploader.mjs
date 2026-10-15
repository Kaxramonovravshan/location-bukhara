import test from "node:test";
import assert from "node:assert/strict";
import {
  isTransient,
  sendWithRetry,
  verifyHead,
  uploadItem
} from "./upload-r2-images.mjs";

const item = {
  sourcePath: "public/favicon-32x32.png",
  r2Key: "locations/test-location/favicon-32x32.png",
  sha256: "a".repeat(64),
  sizeBytes: 10,
  contentType: "image/png"
};

test("transient errors are retryable and bounded", async () => {
  let calls = 0;
  const client = { send: async () => { calls += 1; if (calls < 3) throw Object.assign(new Error("busy"), { $metadata: { httpStatusCode: 503 } }); return { ok: true }; } };
  const result = await sendWithRetry(client, {}, "test", { retries: 2, sleepFn: async () => {} });
  assert.deepEqual(result, { ok: true });
  assert.equal(calls, 3);
  assert.equal(isTransient({ $metadata: { httpStatusCode: 503 } }), true);
});

test("checksum mismatch is never accepted", () => {
  const result = verifyHead({ ...item, sha256: "b".repeat(64) }, { Metadata: { sha256: "a".repeat(64) }, ContentLength: 10, ContentType: "image/png" });
  assert.equal(result.ok, false);
  assert.match(result.reason, /mismatch/);
});

test("verified existing object is skipped without PUT", async () => {
  let puts = 0;
  const body = Buffer.from("0123456789");
  const hash = (await import("node:crypto")).createHash("sha256").update(body).digest("hex");
  const existingItem = { ...item, sha256: hash };
  const client = { send: async (command) => { if (command.constructor.name === "HeadObjectCommand") return { Metadata: { sha256: existingItem.sha256 }, ContentLength: existingItem.sizeBytes, ContentType: existingItem.contentType }; puts += 1; return {}; } };
  const result = await uploadItem(client, "bucket", existingItem, { body, retries: 0 });
  assert.equal(result.status, "skipped");
  assert.equal(puts, 0);
});

test("existing object without checksum becomes a conflict", async () => {
  const body = Buffer.from("0123456789");
  const hash = (await import("node:crypto")).createHash("sha256").update(body).digest("hex");
  const existingItem = { ...item, sha256: hash };
  const client = { send: async (command) => command.constructor.name === "HeadObjectCommand" ? { ContentLength: 10, ContentType: "image/png" } : {} };
  const result = await uploadItem(client, "bucket", existingItem, { body, retries: 0 });
  assert.equal(result.status, "conflict");
});

test("normal upload sends IfNoneMatch and verifies metadata", async () => {
  const body = Buffer.from("0123456789");
  const hash = (await import("node:crypto")).createHash("sha256").update(body).digest("hex");
  const uploadItemData = { ...item, sha256: hash };
  let putInput;
  let headCalls = 0;
  const client = { send: async (command) => {
    if (command.constructor.name === "HeadObjectCommand") { headCalls += 1; if (headCalls === 1) throw Object.assign(new Error("missing"), { name: "NotFound", $metadata: { httpStatusCode: 404 } }); return { Metadata: { sha256: hash }, ContentLength: body.length, ContentType: "image/png" }; }
    putInput = command.input;
    return {};
  } };
  const result = await uploadItem(client, "bucket", uploadItemData, { body, retries: 0 });
  assert.equal(result.status, "complete");
  assert.equal(putInput.IfNoneMatch, "*");
  assert.equal(putInput.Metadata.sha256, hash);
});

test("412 conflict is verified and skipped, never overwritten", async () => {
  const body = Buffer.from("0123456789");
  const hash = (await import("node:crypto")).createHash("sha256").update(body).digest("hex");
  const uploadItemData = { ...item, sha256: hash };
  let headCalls = 0;
  const client = { send: async (command) => {
    if (command.constructor.name === "HeadObjectCommand") { headCalls += 1; if (headCalls === 1) throw Object.assign(new Error("missing"), { name: "NotFound", $metadata: { httpStatusCode: 404 } }); return { Metadata: { sha256: hash }, ContentLength: body.length, ContentType: "image/png" }; }
    throw Object.assign(new Error("race"), { name: "PreconditionFailed", $metadata: { httpStatusCode: 412 } });
  } };
  const result = await uploadItem(client, "bucket", uploadItemData, { body, retries: 0 });
  assert.equal(result.status, "skipped");
  assert.match(result.reason, /Concurrent/);
});
