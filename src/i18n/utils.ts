// src/i18n/utils.ts
import { ui, defaultLang, languages, rtlLangs, type UiKey } from './ui';

export type Lang = keyof typeof languages;

/** Read the active locale from the URL's first path segment. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

/** True for locales that render right-to-left (currently: Arabic). */
export function isRtl(lang: Lang): boolean {
  return rtlLangs.has(lang);
}

/** Returns a translator that falls back to English for missing keys. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Partial<Record<UiKey, string>>)[key] ?? ui[defaultLang][key];
  };
}

/** Strip a leading locale segment, returning the path as the default locale sees it. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/');
  if (parts[1] && parts[1] in ui && parts[1] !== defaultLang) {
    parts.splice(1, 1);
  }
  const out = parts.join('/') || '/';
  return out.startsWith('/') ? out : `/${out}`;
}

/** Build the URL for `path` under `lang` (default locale is unprefixed). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '' : clean}` || `/${lang}`;
}

// Route prefixes that currently build under every locale (see README's
// "Localizing a subpage" note). Extend this list as more sections gain a
// `[locale]` route — anything not covered here falls back to English rather
// than producing a dead `/ar/...` / `/ms/...` link.
const LOCALIZED_PREFIXES = ['/services', '/work', '/products'];

export function hasLocalizedRoute(base: string): boolean {
  if (base === '/' || base === '') return true;
  return LOCALIZED_PREFIXES.some((p) => base === p || base.startsWith(`${p}/`));
}

/**
 * Like localizePath, but only prefixes the locale for routes that actually
 * have a localized build — everything else falls back to the English URL
 * instead of producing a dead `/ar/...` / `/ms/...` link. Use this for any
 * link a localized page renders (nav, footer, card links, "view all"…).
 */
export function localizeAvailable(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const [base] = clean.split('#');
  if (lang === defaultLang || hasLocalizedRoute(base)) {
    return localizePath(clean, lang);
  }
  return clean;
}

export { languages, defaultLang, rtlLangs };
