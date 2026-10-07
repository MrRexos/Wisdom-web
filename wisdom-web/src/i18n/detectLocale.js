export const SUPPORTED_LOCALES = ['en', 'es', 'ca', 'fr', 'pt', 'de', 'it', 'zh', 'ar', 'hi', 'ja', 'ru'];

// Las URLs explícitas permiten rastrear cada traducción sin depender del navegador.
export function getRequestedLocale(search = '', supportedLocales = SUPPORTED_LOCALES, pathname = '') {
  const pathLocale = pathname.match(/^\/([a-z]{2})\/?$/)?.[1];
  const locale = pathLocale || new URLSearchParams(search).get('lang')?.toLowerCase().split(/[-_]/)[0];
  return supportedLocales.includes(locale) ? locale : null;
}

export function getBrowserLocale(
  device = typeof navigator === 'undefined' ? {} : navigator,
  supportedLocales = SUPPORTED_LOCALES,
) {
  const preferences = [
    ...(Array.isArray(device.languages) ? device.languages : []),
    device.language,
  ];

  for (const preference of preferences) {
    if (typeof preference !== 'string') continue;
    const language = preference.trim().toLowerCase().split(/[-_]/)[0];
    if (supportedLocales.includes(language)) return language;
  }

  return 'en';
}
