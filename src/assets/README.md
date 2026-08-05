# Assets

Static assets used across the site. Reference these from HTML/TS using paths
relative to `src/` (Vite resolves and hashes them automatically on build).

## Structure

- `logos/` — Product/partner logos (Postgres Pro, Infinidat, VAST Data, Hammerspace, Alinom, VisionLabs AI, and the LBR InfoSolutions logo if you replace the inline SVG one).
- `images/` — General page imagery (hero backgrounds, illustrations, photos).
- `icons/` — Standalone icon files, if you need something beyond the inline SVGs already used in components.

## Adding a product logo

1. Drop the file in `src/assets/logos/` (e.g. `postgres-pro.svg` or `postgres-pro.png`).
2. Reference it from `src/data/products.ts` by setting the `logo` field on the matching product, e.g.:

   ```ts
   logo: '/src/assets/logos/postgres-pro.svg',
   ```

3. Update the relevant `<img>` tag (or add one) in the product's page/component to use `product.logo`.

## Naming convention

Use lowercase, hyphenated filenames matching the product `id` in `products.ts`
(e.g. `postgres-pro.svg`, `infinidat.svg`, `vast-data.svg`, `hammerspace.svg`,
`alinom.svg`, `visionlabs-ai.svg`) so they're easy to map programmatically.

## Formats

Prefer SVG for logos (scales cleanly, small file size). Use PNG with a
transparent background only if an SVG isn't available.
