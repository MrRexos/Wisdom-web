export const SUPPORTED_LOCALES = ['en', 'es', 'ca', 'fr', 'pt', 'de', 'it', 'zh', 'ar', 'hi', 'ja', 'ru'];

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
