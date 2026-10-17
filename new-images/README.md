# New image staging

Place new files only in the existing slug folders:

- `services/<service-slug>/`
- `locations/<location-slug>/`
- `portfolio/`
- `shared/`

Files in this directory are local-only and ignored by Git. Do not place credentials,
manifests, or application source files here. Run the preparation command before any
upload; it creates a separate candidate manifest and never edits the existing
`docs/r2-image-manifest.json`.
