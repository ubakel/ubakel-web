# Ubakel — Website

A crisp, engineered light-agency redesign built with **Astro 6** and **Tailwind CSS v4**.
The visual language is drawn from the logo: hard-edged structural beams, hairline blueprint
rules, a monospace utility layer, and a single sharp crimson accent used with restraint.

## Quick start

```sh
npm install      # installs astro, tailwind v4, and lenis (smooth scroll)
npm run dev      # http://localhost:4321
npm run build    # static output → ./dist
npm run preview  # preview the production build
```

> `npm install` is required after unzipping — it pulls in `lenis` (added to dependencies).

## Design tokens

All colour and type tokens live in `src/styles/global.css` under `@theme`:

| Token             | Value     | Use                                   |
| ----------------- | --------- | ------------------------------------- |
| `--color-canvas`  | `#f3f4f6` | Page canvas                           |
| `--color-surface` | `#ffffff` | Cards / containers                    |
| `--color-ink`     | `#0d0d0d` | Headings, hairline borders            |
| `--color-muted`   | `#4b5563` | Body copy, subtext                    |
| `--color-crimson` | `#d90429` | Primary accent / CTAs (used sparingly)|
| `--color-burgundy`| `#6b1a2a` | Secondary depth                       |
| `--color-raisin`  | `#1a0a10` | Footer / dark bands                   |

Fonts: **Space Grotesk** (display) · **Inter** (body) · **JetBrains Mono** (labels/data).

Signature utilities: `.bp-grid` (blueprint lattice), `.crop` (corner registration ticks),
`.eyebrow` (mono label), plus the `<PipelineDiagram />` component.

## Content — single source of truth

Edit these files; every page and the homepage read from them:

- `src/data/site.ts` — contact, WhatsApp, socials, Web3Forms key, nav, tech partners
- `src/data/services.ts` — the 4 services (drives `/services` + `/services/[slug]`)
- `src/data/products.ts` — the 3 products (drives `/products` + `/products/[slug]`)
- `src/data/work.ts` — case studies (drives `/work` + `/work/[slug]` + homepage bento)

## Routing

```
/                     Homepage
/ar/                  Localized homepage (Arabic, RTL)
/services             Services hub
/services/[slug]      Unified service template
/products             Products hub
/products/[slug]      Product template (hero · features · live workflow · CTA)
/work                 Case-study index (bento)
/work/[slug]          Case study (problem/solution · architecture · metrics)
```

## Internationalization

- Configured in `astro.config.mjs` (`en` default unprefixed, `ar` prefixed).
- Strings live in `src/i18n/ui.ts`, translated at **full parity** — Arabic never falls back
  to an untranslated English fragment, which is far more visible/broken in RTL than in
  another LTR language. `src/i18n/utils.ts` provides `getLangFromUrl`, `useTranslations`,
  `localizePath`, and `isRtl`.
- `Layout.astro` sets `<html dir="rtl">` on Arabic pages and loads three additional Arabic
  web fonts (Cairo / IBM Plex Sans Arabic / Noto Kufi Arabic) — appended to the existing
  font stacks as fallbacks, not swapped, so Latin text still renders in the brand fonts and
  only glyphs Latin fonts can't draw fall through. These extra fonts are only requested on
  `/ar/`, so the English site's font payload doesn't grow.
- **RTL correctness, sitewide:** `global.css` neutralizes `tracking-*` and `uppercase`
  under `[dir="rtl"]` (both break Arabic glyph joining), directional icons use the
  `rtl:-scale-x-100` variant, and physical `left-/right-` positioning was replaced with
  logical `start-/end-` throughout the shared chrome (nav, switcher, hero, skip-link). The
  signature `<PipelineDiagram />` mirrors its flow under RTL while keeping labels upright.
- The homepage builds in every locale via `src/pages/[locale]/index.astro`, which derives
  its paths directly from `ui.ts` — add a locale there and it builds automatically.

**Localizing a subpage** (e.g. Work index in Arabic too): add a `[locale]` param to that
page's `getStaticPaths`, e.g. create `src/pages/[locale]/work/index.astro` returning
`[{params:{locale:'ar'}}]`. The `<LanguageSwitcher />` will then resolve to it automatically.
Until then, switching locale on a subpage returns to the localized home (no dead links) —
subpages stay English/LTR, which is why RTL fixes were scoped to the shared homepage chrome.

## Performance & JS budget

Client-side JS is restricted to: **Lenis** smooth scroll, the **language toggler**, and a
**progressively-enhanced contact submit** (the form also POSTs natively with zero JS).
All animation is pure CSS. The mobile menu is CSS-only. `prefers-reduced-motion` disables
motion and Lenis; scroll reveals default to visible where `animation-timeline` is unsupported.

## Contact form

Wired to Web3Forms (key in `src/data/site.ts`). Native `<form action=…>` works without JS;
the enhancement script adds inline success/error states.
