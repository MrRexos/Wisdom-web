import { renderToString } from 'react-dom/server';
import App from '../App.jsx';
import AppDownload from '../AppDownload.jsx';
import DataDeletion from '../DataDeletion.jsx';
import LegalDocumentPage from '../legal/LegalDocumentPage.jsx';
import { LEGAL_ROUTES } from '../legal/routes.js';
import { LocaleProvider } from '../i18n/LocaleContext.jsx';
import { SUPPORTED_LOCALES } from '../i18n/detectLocale.js';
import { getCopy } from '../i18n/translations.js';
import { getWebsiteDocument as getLegalDocument } from '../legal/websiteContent.js';
import { getHomeMetadata, SITE_URL, SHARE_IMAGE, canonicalUrl } from './metadata.js';

export { SUPPORTED_LOCALES, LEGAL_ROUTES };
export { getWebsiteDocument } from '../legal/websiteContent.js';

export function renderPage(pathname, language) {
  const copy = getCopy(language);
  let page;
  let metadata;
  let bodyClass = '';
  if (pathname === '/') {
    page = <App />;
    metadata = getHomeMetadata(copy, language);
  } else if (pathname === '/app') {
    page = <AppDownload />;
    bodyClass = 'app-download-active';
    metadata = { title: 'Wisdom: servicios a domicilio', description: 'Encuentra y reserva al profesional que necesitas.' };
  } else if (Object.hasOwn(LEGAL_ROUTES, pathname)) {
    const content = getLegalDocument(language, LEGAL_ROUTES[pathname]);
    page = <LegalDocumentPage documentKey={LEGAL_ROUTES[pathname]} initialLanguage={language} />;
    bodyClass = 'privacy-policy-active';
    metadata = { title: `${content.title} - Wisdom`, description: content.description || `${content.title}. ${content.lastUpdated}` };
  } else if (pathname === '/data-deletion') {
    page = <DataDeletion initialLanguage={language} />;
    bodyClass = 'data-deletion-active';
    metadata = { title: 'Data deletion | Wisdom', description: 'Wisdom account and personal data deletion.' };
  } else {
    metadata = { title: 'Wisdom', description: 'Wisdom' };
  }
  return { html: page ? renderToString(<LocaleProvider initialLocale={language}>{page}</LocaleProvider>) : '', bodyClass, ...metadata };
}

export function structuredData(pathname, language, explicitLanguage, metadata) {
  const url = canonicalUrl(pathname, explicitLanguage ? language : null);
  const organization = {
    '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Wisdom', url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/wisdom-app-icon.webp` },
    sameAs: ['https://www.instagram.com/wisdom__app', 'https://www.tiktok.com/@wisdom_app', 'https://x.com/wisdom_entity'],
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [organization,
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Wisdom', url: `${SITE_URL}/`, publisher: { '@id': organization['@id'] }, inLanguage: SUPPORTED_LOCALES },
      { '@type': pathname === '/faq' ? 'FAQPage' : 'WebPage', '@id': `${url}#webpage`, url, name: metadata.title, description: metadata.description,
        ...(pathname === '/faq' ? { mainEntity: getLegalDocument(language, 'faq').sections.flatMap((section) => section.items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))) } : {}),
        inLanguage: language, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': organization['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', url: SHARE_IMAGE, width: 1200, height: 630 } },
    ],
  };
}
