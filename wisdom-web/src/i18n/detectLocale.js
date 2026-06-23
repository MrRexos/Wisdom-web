const LOCALE_STORAGE_KEY = 'wisdom-locale';

export const SUPPORTED_LOCALES = ['en', 'es', 'ca', 'fr', 'pt'];

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO',
  'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ',
]);

const FRENCH_COUNTRIES = new Set(['FR', 'BE', 'LU', 'MC', 'SN', 'CI', 'MA', 'TN', 'DZ']);
const PORTUGUESE_COUNTRIES = new Set(['PT', 'BR', 'AO', 'MZ']);
const CATALAN_COUNTRIES = new Set(['AD']);

const getBrowserLanguage = () => (
  typeof navigator !== 'undefined'
    ? (navigator.language || navigator.languages?.[0] || 'en').toLowerCase()
    : 'en'
);

export const resolveLocaleFromSignals = ({ countryCode, browserLanguage = getBrowserLanguage() } = {}) => {
  const country = countryCode?.toUpperCase();
  const browserLang = browserLanguage.toLowerCase();
  const browserPrimary = browserLang.split('-')[0];

  if (country === 'ES' && (browserLang.startsWith('ca') || browserLang.includes('-es-valencia'))) {
    return 'ca';
  }

  if (country && CATALAN_COUNTRIES.has(country)) return 'ca';
  if (country && SPANISH_COUNTRIES.has(country)) return 'es';
  if (country && FRENCH_COUNTRIES.has(country)) return 'fr';
  if (country && PORTUGUESE_COUNTRIES.has(country)) return 'pt';

  if (SUPPORTED_LOCALES.includes(browserPrimary)) return browserPrimary;

  return 'en';
};

export const getStoredLocale = () => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const storeLocale = (locale) => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
};

export const getInitialLocale = () => (
  getStoredLocale() || resolveLocaleFromSignals()
);

const fetchCountryCode = async () => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch('https://ipapi.co/country_code/', {
      signal: controller.signal,
      headers: { Accept: 'text/plain' },
    });

    if (!response.ok) return null;

    const countryCode = (await response.text()).trim().toUpperCase();
    return countryCode || null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const detectLocale = async () => {
  const stored = getStoredLocale();
  if (stored) return stored;

  const countryCode = await fetchCountryCode();
  const locale = resolveLocaleFromSignals({
    countryCode,
    browserLanguage: getBrowserLanguage(),
  });

  storeLocale(locale);
  return locale;
};
