// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://ubakel.com',

  // Interim: placeholder case studies and not-yet-built products were removed
  // until real, approved content is ready. Old URLs redirect instead of 404ing.
  redirects: {
    '/work': '/',
    '/work/insurance-claims-platform': '/',
    '/work/grounded-support-agent': '/',
    '/work/invoice-pipeline': '/',
    '/work/pipeline-control-plane': '/',
    '/ar/work': '/ar/',
    '/ar/work/insurance-claims-platform': '/ar/',
    '/ar/work/grounded-support-agent': '/ar/',
    '/ar/work/invoice-pipeline': '/ar/',
    '/ar/work/pipeline-control-plane': '/ar/',
    '/ms/work': '/ms/',
    '/ms/work/insurance-claims-platform': '/ms/',
    '/ms/work/grounded-support-agent': '/ms/',
    '/ms/work/invoice-pipeline': '/ms/',
    '/ms/work/pipeline-control-plane': '/ms/',
    '/products/fluxline': '/products',
    '/products/orchestrate': '/products',
    '/ar/products/fluxline': '/ar/products',
    '/ar/products/orchestrate': '/ar/products',
    '/ms/products/fluxline': '/ms/products',
    '/ms/products/orchestrate': '/ms/products',
  },

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
