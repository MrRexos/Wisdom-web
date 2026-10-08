import { SUPPORTED_LOCALES } from '../i18n/detectLocale.js';

export const DIRECTORY_SLUGS = { es: 'servicios', en: 'services', ca: 'serveis', fr: 'services', pt: 'servicos', de: 'dienstleistungen', it: 'servizi', zh: 'services', ar: 'services', hi: 'services', ja: 'services', ru: 'services' };
export const LANGUAGE_NAMES = { es: 'Español', en: 'English', ca: 'Català', fr: 'Français', pt: 'Português', de: 'Deutsch', it: 'Italiano', zh: '中文', ar: 'العربية', hi: 'हिन्दी', ja: '日本語', ru: 'Русский' };
export const GUIDE_SLUGS = {
  home: { es: 'servicios-a-domicilio', en: 'home-services' },
  cleaning: { es: 'limpieza-a-domicilio', en: 'home-cleaning' },
  trades: { es: 'reparaciones-y-mantenimiento', en: 'repairs-and-maintenance' },
  lessons: { es: 'clases-particulares', en: 'private-lessons' },
  online: { es: 'servicios-online-y-freelancers', en: 'online-services-and-freelancers' },
  professionals: { es: 'ofrecer-servicios-profesionales', en: 'offer-professional-services' },
  wellbeing: { es: 'bienestar-y-entrenamiento', en: 'wellbeing-and-personal-training' },
  pets: { es: 'cuidado-de-mascotas', en: 'pet-care' },
  events: { es: 'profesionales-para-eventos', en: 'event-professionals' },
};
export const directoryPath = (language = 'es') => `/${language}/${DIRECTORY_SLUGS[language] || DIRECTORY_SLUGS.en}`;
export const guidePath = (key, language) => GUIDE_SLUGS[key]?.[language] ? `${directoryPath(language)}/${GUIDE_SLUGS[key][language]}` : null;
export const discoveryPages = [
  ...SUPPORTED_LOCALES.map((language) => ({ path: directoryPath(language), language, key: 'directory' })),
  ...Object.keys(GUIDE_SLUGS).flatMap((key) => ['es', 'en'].map((language) => ({ path: guidePath(key, language), language, key }))),
];
const byPath = new Map(discoveryPages.map((page) => [page.path, page]));
export const getDiscoveryPage = (path) => byPath.get(path);
export const discoveryOutputFile = (path) => `seo/discovery${path}.html`;
export const discoveryAlternates = (key) => discoveryPages.filter((page) => page.key === key);

// IDs ya presentes en el catálogo público. No representan ofertas ni disponibilidad.
export const SERVICE_GROUPS = [
  { key: 'homeMaintenance', guide: 'trades', ids: [1, 2, 3, 5, 6, 8, 151] },
  { key: 'healthWellbeing', guide: 'wellbeing', ids: [31, 32, 34, 35, 36, 37, 54] },
  { key: 'education', guide: 'lessons', ids: [56, 57, 58, 59, 61, 65, 68] },
  { key: 'digitalOnline', guide: 'online', ids: [83, 84, 85, 86, 89, 90, 94, 100, 101] },
  { key: 'events', guide: 'events', ids: [172, 173, 174, 175, 178, 181] },
  { key: 'pets', guide: 'pets', ids: [317, 318] },
];
