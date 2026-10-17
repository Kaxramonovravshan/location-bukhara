# Incremental R2 image workflow

## 1. Stage files locally

Use the existing service and location slugs:

```text
new-images/services/<service-slug>/<filename>
new-images/services/accommodation/hotels/<filename>
new-images/services/accommodation/hostels/<filename>
new-images/locations/<location-slug>/<filename>
new-images/portfolio/<filename>
new-images/shared/<filename>
```

Current service slugs include `decoration`, `equipment-supply`,
`location-management`, `production-support`, `accommodation`, and `live-props`.

Live Props images can be staged directly under:

```text
new-images/services/live-props/<filename>
```

They will receive the R2 key:

```text
services/live-props/<filename>
```

Accommodation remains one service category, while its staged image collections
are kept separate. Files in the two nested directories produce these R2 keys:

```text
new-images/services/accommodation/hotels/<filename>
  -> services/accommodation/hotels/<filename>
new-images/services/accommodation/hostels/<filename>
  -> services/accommodation/hostels/<filename>
```

Nested directories are currently supported only for `accommodation`; other
service images must remain directly under their service slug directory.

The staging directory is ignored by Git. Existing R2 mappings and frontend
references are not changed by this workflow.

## 2. Prepare a candidate manifest

```bash
npm run prepare:r2-new-images
```

This scans local files, calculates SHA-256 checksums, detects duplicate content,
detects existing R2-key collisions, and writes
`docs/r2-new-images-manifest.json`. It does not upload or modify the existing
`docs/r2-image-manifest.json`.

## 3. Review the exact upload set

```bash
node scripts/upload-r2-images.mjs --manifest=docs/r2-new-images-manifest.json --dry-run
```

Only records marked eligible and pending are listed as upload candidates. Duplicate
and collision records remain documented but are not selected for upload.

## 4. Upload only after approval

```bash
node scripts/upload-r2-images.mjs --manifest=docs/r2-new-images-manifest.json
```

The existing conditional PUT, SHA-256 metadata, post-upload HEAD verification,
retry, conflict handling, and atomic status file behavior remain active. No delete
operation exists in the uploader.

## 5. Connect images to the frontend later

After a reviewed upload, add the exact `r2Key` mappings to the appropriate source
data (`src/utils/serviceMedia.js`, `src/utils/locationMedia.js`, portfolio data, or
the shared mapping in `src/utils/mediaUrl.js`). Do not guess a slug or replace an
existing mapping. Run the normal manifest audit and build before deployment.
