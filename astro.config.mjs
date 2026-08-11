// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://ubakel.com',

  // ── Native i18n routing ────────────────────────────────────────────────
  // English is the default and is served unprefixed (`/`, `/work`, ...).
  // Arabic is prefixed (`/ar/`) and renders right-to-left; Malay is `/ms/`.
  // The <LanguageSwitcher /> moves between them, and Layout.astro emits
  // hreflang alternates, a `dir` attribute per locale, and a lightweight
  // first-visit browser-language redirect.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'ms'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // Deployed to Cloudflare Workers. wrangler.jsonc points `main` at this
  // adapter's server entrypoint, so it must stay in place — every page is
  // prerendered, the Worker just serves them.
  adapter: cloudflare(),
});
