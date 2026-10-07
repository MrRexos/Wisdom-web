export const SITE_URL = 'https://www.wisdomapp.es';
export const SHARE_IMAGE = `${SITE_URL}/images/wisdom-app-share-v1.jpg`;
export const OPEN_GRAPH_LOCALES = { en: 'en_US', es: 'es_ES', ca: 'ca_ES', fr: 'fr_FR', pt: 'pt_PT', de: 'de_DE', it: 'it_IT', zh: 'zh_CN', ar: 'ar_SA', hi: 'hi_IN', ja: 'ja_JP', ru: 'ru_RU' };

export function canonicalUrl(pathname, language) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (language && (path === '/' || path === `/${language}`)) return `${SITE_URL}/${language}`;
  return `${SITE_URL}${path}${language ? `?lang=${encodeURIComponent(language)}` : ''}`;
}

export function getHomeMetadata(copy, language) {
  if (language === 'es') {
    return {
      title: 'Servicios a domicilio, limpieza y profesionales | Wisdom',
      description: 'Encuentra y reserva profesionales de limpieza a domicilio, fontanería, clases particulares y más. Compara perfiles, precios y reseñas en Wisdom.',
    };
  }
  return {
    title: `${copy.categories[1]} · ${copy.categories[2]} | Wisdom`,
    description: `${copy.hero.titleLine1} ${copy.hero.titleLine2} ${copy.hero.subtitleLine2}`,
  };
}

export function updatePageMetadata({ title, description, language, explicitLanguage, faqSections }) {
  document.title = title;
  const values = {
    'meta[name="description"]': description,
    'meta[property="og:title"]': title,
    'meta[property="og:description"]': description,
    'meta[property="og:locale"]': OPEN_GRAPH_LOCALES[language],
    'meta[name="twitter:title"]': title,
    'meta[name="twitter:description"]': description,
  };
  for (const [selector, value] of Object.entries(values)) {
    if (value) document.querySelector(selector)?.setAttribute('content', value);
  }
  // La ruta automática conserva su canonical; las traducciones explícitas son estables.
  if (explicitLanguage) {
    const url = canonicalUrl(window.location.pathname, language);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  }
  const script = document.querySelector('script[type="application/ld+json"]');
  if (script) {
    const data = JSON.parse(script.textContent);
    const page = data['@graph']?.find((item) => ['WebPage', 'FAQPage'].includes(item['@type']));
    if (page) {
      const url = document.querySelector('link[rel="canonical"]')?.href;
      Object.assign(page, { name: title, description: description || page.description, inLanguage: language, ...(url ? { url, '@id': `${url}#webpage` } : {}) });
      if (faqSections) page.mainEntity = faqSections.flatMap((section) => section.items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })));
      script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c');
    }
  }
  if (faqSections) document.querySelector('link[rel="alternate"][type="text/markdown"]')?.setAttribute('href', `${SITE_URL}/faq.${language}.md`);
}
