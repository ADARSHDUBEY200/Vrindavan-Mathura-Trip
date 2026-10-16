# Braj pilgrimage tours website

A multi-page, SEO-focused site for a business planning private pilgrimage trips to Vrindavan, Mathura and the wider Braj region. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your details
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Configuration (`.env.local`)

All brand and contact details come from environment variables. See `.env.example` for the full list.

- **`NEXT_PUBLIC_SITE_URL`** sets the canonical URL. Set it to the live domain before deploying, because it's used for canonical tags, the sitemap, Open Graph and JSON-LD.
- **`NEXT_PUBLIC_BRAND_NAME`** sets the brand shown in the header, titles and schema.
- **`NEXT_PUBLIC_WHATSAPP_NUMBER`** takes digits only, with the country code (e.g. `919876543210`). WhatsApp buttons appear only when it is set.
- **`NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_EMAIL`** appear only when set. No placeholder contact details are ever shown.
- **`NEXT_PUBLIC_ADDRESS_*` and `NEXT_PUBLIC_SOCIAL_*`** are optional.
- **`ENQUIRY_WEBHOOK_URL`** is server-only and optional. When set, each form enquiry is POSTed there as JSON (Zapier, Make, Google Apps Script, a Slack webhook, etc.). Without it, enquiries are only logged on the server, and visitors are asked to send their details on WhatsApp, by email or by phone so that nothing is lost.

`NEXT_PUBLIC_*` values are inlined at build time, so rebuild after changing them.

## Editing content

All text lives in typed files in `src/content/`, so no component changes are needed:

| File | What it holds |
| --- | --- |
| `home.ts` | Hero copy, experiences, circuits, why-us, about, gallery, **testimonials** |
| `destinations.ts` | The four destination pages (Vrindavan, Mathura, Govardhan & Barsana, Braj Yatra) |
| `temples.ts` | Temple pages: history, approximate timings, dress code, tips |
| `packages.ts` | Tour packages. `price` is optional; leave it out to show "Price on request" |
| `festivals.ts` | Festival guides with approximate months |
| `guides.ts` | Travel guide articles |
| `faqs.ts` | FAQ page and home FAQ selection |
| `images.ts` | Photo imports, alt text and credits (Wikimedia Commons) |

Content rules the site is built around:

- **Testimonials:** the section stays hidden until `testimonials` in `home.ts` has entries. Add only real reviews, with the guest's permission.
- **Prices:** only set `price` on a package if you will honour it. An `Offer` is added to the schema only when a price exists.
- **Temple timings:** these are approximate and always shown with a "subject to change" note.
- **Photos:** new photos go in `src/assets/photos/` and are registered in `images.ts` with an accurate credit. The `/image-credits` page is generated from those credits.

## Structure

```
src/
  app/          routes, globals.css (design tokens), sitemap.ts, robots.ts, actions/enquiry.ts
  components/   layout, home, cards, forms, pages, seo, svg, ui
  config/       site.ts — brand, contact (env), navigation
  content/      typed content files
  lib/          seo.ts (buildMetadata), schema.ts (JSON-LD), whatsapp.ts
```

Client components are limited to the header/mobile menu, the gallery lightbox and the enquiry form. Package and temple filters use CSS only (radio inputs plus `:has()`), and every page is prerendered at build time.
