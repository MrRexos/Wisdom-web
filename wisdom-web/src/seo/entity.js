import { SITE_URL, SITE_NAME, SITE_ALTERNATE_NAMES } from './metadata.js';
import { SUPPORTED_LOCALES } from '../i18n/detectLocale.js';
import { IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from '../appLinks.js';

// Identidad única en todas las páginas. Sin métricas, precios ni cobertura inventados.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APPLICATION_ID = `${SITE_URL}/#app`;
export const OFFICIAL_PROFILES = [
  'https://www.instagram.com/wisdom__app',
  'https://www.tiktok.com/@wisdom_app',
  'https://x.com/wisdom_entity',
];

export function organizationSchema() {
  return {
    '@type': 'Organization', '@id': ORGANIZATION_ID,
    name: SITE_NAME, alternateName: SITE_ALTERNATE_NAMES, url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/wisdom-app-icon.webp` },
    sameAs: OFFICIAL_PROFILES,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite', '@id': WEBSITE_ID,
    name: SITE_NAME, alternateName: SITE_ALTERNATE_NAMES, url: `${SITE_URL}/`,
    publisher: { '@id': ORGANIZATION_ID }, inLanguage: SUPPORTED_LOCALES,
  };
}

export function applicationSchema() {
  return {
    '@type': 'MobileApplication', '@id': APPLICATION_ID,
    name: SITE_NAME, alternateName: SITE_ALTERNATE_NAMES, url: `${SITE_URL}/app`,
    description: 'An app to find, compare, book and pay for services, and offer professional services in person or online.',
    applicationCategory: 'BusinessApplication', operatingSystem: ['Android', 'iOS'],
    installUrl: [IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL],
    sameAs: [IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL],
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: [
      { '@id': `${SITE_URL}/es/sobre-wisdom#webpage` },
      { '@id': `${SITE_URL}/en/about-wisdom#webpage` },
    ],
    image: `${SITE_URL}/images/wisdom-app-icon.webp`,
  };
}
