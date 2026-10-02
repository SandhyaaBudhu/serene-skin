# Serene Skin

A complete frontend skincare storefront built with React, Vite, TypeScript, Tailwind CSS, React Router, Lucide, and restrained Framer Motion transitions.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell installations that block unsigned scripts, use `npm.cmd` in place of `npm`.

```sh
npm run build
npm run preview
```

## Routes

- `/` — editorial storefront, essentials, ritual, ingredients, story, journal
- `/shop` — search, category filters, sorting, quick view, wishlist
- `/shop/:id` — four product pages, gallery, sizes, quantities, ingredients, usage
- `/ritual` — three-stage ritual builder, adjustable recommendations, add collection to bag
- `/story` — brand approach and packaging concepts
- `/journal` — filterable editorial index
- `/journal/:slug` — three individual articles

Bag, wishlist, theme, and ritual preferences persist in localStorage. Shop filters persist in the URL. All prices are demonstration USD prices; mini sizes are calculated consistently. Demo shipping is $6, complimentary at $75. Checkout validates local form inputs and shows a confirmation. Nothing is sent to a server; no payment is collected. Newsletter signup is a local demonstration only.

Products, formula notes, packaging, and brand are fictional. There are no medical claims, clinical results, certifications, or invented endorsements. Editorial photographs are curated from Unsplash, stored locally, and have styled error fallbacks.

## Original photography

`public/images/hero-refined.png` and `public/images/products.png` were created with the built-in image generation tool. Optimized WebP versions are used by the app. The product image is a four-panel photographic atlas, presented with proportional CSS crops. All photography and fonts are stored locally. Prompts are recorded in `ASSETS.md`.

## Browser validation

With the development server running:

```sh
npx playwright install chromium
node scripts/verify.mjs
```

The verification covers route rendering, responsive overflow, search, filters, sorting, product options, wishlist persistence, quantities, ritual recommendations, checkout validation and confirmation, theme persistence, and keyboard dismissal. Screenshots are written to `.qa/`.
