# Cloudflare R2 image migration preparation

This document describes the prepared, but not executed, migration of project images to the `location-bukhara` Cloudflare R2 bucket.

## Safety status

- R2 upload has not been executed.
- Production image URLs have not been changed.
- Local images have not been deleted, renamed, converted, or compressed.
- No Vercel configuration was changed.
- No credentials were created or added to the repository.

## Audit

The project contains 23 locations, defined in `src/utils/data.js`. Location media is sourced from the corresponding `public/locations/<slug>/` directory and is already assembled by `src/utils/locationMedia.js`.

The generated manifest contains 629 image files with a total size of 85,696,021 bytes (81.73 MiB):

| Category | Files | Proposed prefix |
| --- | ---: | --- |
| Location images | 473 | `locations/<location-slug>/` |
| Service images | 140 | `services/<service-slug>/` |
| Shared/site images | 16 | `shared/<category>/` |

Videos were intentionally excluded from this image migration manifest. The repository contains 11 videos totaling about 194.14 MiB and they need a separate review before any media migration.

## Location-to-image mapping

Each location receives its own R2 prefix. The number below includes all image files in that location's existing folder, preserving the existing filename and extension.

| ID | Slug | Images |
| ---: | --- | ---: |
| 1 | `steppe-landscapes` | 6 |
| 2 | `sand-dunes` | 8 |
| 3 | `varakhsha` | 10 |
| 4 | `forest-landscapes` | 13 |
| 5 | `mountain-landscapes` | 20 |
| 6 | `reservoir` | 24 |
| 7 | `lake` | 22 |
| 8 | `sardoba` | 20 |
| 9 | `madrasahs` | 14 |
| 10 | `desert-tourist-village` | 40 |
| 11 | `old-city` | 20 |
| 12 | `historic-square` | 25 |
| 13 | `emirs-winter-palace` | 36 |
| 14 | `emirs-summer-palace` | 17 |
| 15 | `historic-city-walls` | 7 |
| 16 | `abandoned-swimming-pool` | 4 |
| 17 | `emirs-madrasah` | 22 |
| 18 | `historic-hammam` | 5 |
| 19 | `minaret-grand-mosque` | 17 |
| 20 | `first-trading-dome` | 21 |
| 21 | `second-third-trading-domes` | 50 |
| 22 | `historic-architectural-complex` | 39 |
| 23 | `medieval-zindan` | 33 |

Example keys:

```text
locations/steppe-landscapes/photo_1_2026-07-17_11-24-23.webp
locations/historic-square/photo_1_2026-07-17_11-42-03.webp
```

The manifest records the actual source path, stable location ID/slug, R2 key, public URL, byte size, content type, SHA-256 hash, and pending status for every image.

## Duplicates and unused files

The audit found 10 duplicate image files by SHA-256 content hash. They are retained as separate manifest records because removing or consolidating them would change the existing media set and was not authorized.

Four images have no source reference found during the audit:

- `public/icon-192.png`
- `public/vite.svg`
- `src/assets/history/q.PNG`
- `src/assets/locations/hero-bukhara.png`

These are marked in the manifest for manual review and have not been removed.

The manifest also reports 16 missing portfolio poster references: `project-3.webp` through `project-18.webp` are referenced in `src/utils/portfolio.js` but are not present in `public/posters/`. They are unresolved references, not upload records.

## R2 structure

```text
locations/<existing-location-slug>/<original-filename>
services/<service-slug>/<original-filename>
shared/portfolio-posters/<original-filename>
shared/site-assets/<original-filename>
shared/history/<original-filename>
shared/location-hero/<original-filename>
shared/public-assets/<original-filename>
```

The public base URL is `https://images.buxorofilm.com`. No filename conversion or image compression is performed.

## Manifest generation

Regenerate the audit manifest after an intentional source-media change:

```powershell
node scripts/generate-r2-image-manifest.mjs
```

The output is [docs/r2-image-manifest.json](./r2-image-manifest.json). It is generated from the current source tree and existing location data.

## Upload script

The prepared script uses the Cloudflare R2 S3-compatible API directly with Node's built-in HTTPS and crypto modules. It supports:

- dry-run mode;
- controlled concurrency via `R2_CONCURRENCY`;
- retries via `R2_RETRIES`;
- resume behavior by checking `HeadObject` first;
- no overwrite by default;
- explicit `--force` for reviewed replacement only;
- content-type metadata;
- SHA-256 metadata and post-upload verification;
- atomic resumable status updates in `docs/r2-image-manifest.status.json` only after verification.

Required local variables are documented in `.env.example`:

```text
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_URL
R2_CONCURRENCY
R2_RETRIES
R2_TIMEOUT_MS
```

Credentials must remain in a local `.env` or CI secret store and must never use a `VITE_` prefix. Do not commit them.

## Future commands

After explicit approval and after reviewing the manifest:

```powershell
node scripts/upload-r2-images.mjs --dry-run
node scripts/upload-r2-images.mjs
```

For a single exact manifest record, use its `manifestId`, exact `sourcePath`, or exact `r2Key`:

```powershell
node scripts/upload-r2-images.mjs --dry-run --only=image-0463
node scripts/upload-r2-images.mjs --only=public/locations/steppe-landscapes/photo_1_2026-07-17_11-24-23.webp
```

The selector must match exactly one manifest record; otherwise the command exits without uploading anything.

For a location-scoped upload, use the exact existing location slug. Only records with `category: "location"` and the matching `locationSlug` are selected; already verified `complete`/`skipped` records are excluded:

```powershell
node scripts/upload-r2-images.mjs --dry-run --location=steppe-landscapes
node scripts/upload-r2-images.mjs --location=steppe-landscapes
```

Do not use `--force` unless an existing R2 object was reviewed and intentionally needs replacement:

```powershell
node scripts/upload-r2-images.mjs --force --confirm-overwrite
```

## React integration plan

The later frontend phase should introduce `VITE_R2_PUBLIC_URL=https://images.buxorofilm.com` and a small media URL helper. It should preserve the existing location IDs, slugs, ordering, lazy loading, image dimensions, SEO data, favicon paths, routes, and application behavior. The generated local media mappings should only be changed after the objects have been uploaded and independently validated.

The current preparation intentionally does not modify production image references.

## Validation checklist

1. Review every location prefix in the manifest; verify that each location has only its own files.
2. Confirm the R2 custom domain returns `200` for representative location, service, and shared objects.
3. Run the upload script in `--dry-run` mode.
4. Upload only after explicit approval.
5. Re-run the script to confirm resume/skip behavior.
6. Check object count, content types, and byte sizes against the manifest.
7. Test every location cover and gallery, service gallery, portfolio poster, and shared site image.
8. Test desktop/mobile layout, lazy loading, modal navigation, SEO metadata, and fallback behavior.
9. Only then switch frontend URLs to R2 in a separate reviewed change.

## Rollback

Because the preparation phase does not change production URLs, rollback is simply to leave the frontend unchanged. After a future frontend switch, rollback means reverting the media URL helper/mapping change and redeploying; local media should remain available until the R2 deployment has been verified over time. Do not delete R2 objects or local files as part of the first migration.
