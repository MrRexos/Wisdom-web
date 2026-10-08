/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components -- Renderer exclusivo del build; no utiliza Fast Refresh. */
import { renderToStaticMarkup } from 'react-dom/server';
import { getCopy } from '../i18n/translations.js';
import { SITE_URL, SHARE_IMAGE } from '../seo/metadata.js';
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL } from '../appLinks.js';
import { DIRECTORY_COPY } from './copy.js';
import { SERVICE_GUIDES } from './guides.js';
import { directoryPath, guidePath, discoveryAlternates, SERVICE_GROUPS, LANGUAGE_NAMES } from './routes.js';

const guideLabels = {
  es: { preparation: 'Antes de reservar', related: 'Otros servicios y guías', categories: 'Categorías relacionadas', policies: 'Reservas y condiciones', faq: 'Una duda habitual' },
  en: { preparation: 'Before you book', related: 'More services and guides', categories: 'Related categories', policies: 'Booking and conditions', faq: 'A common question' },
};

function GuideLinks({ language, exclude }) {
  return <ul className="discovery-guide-list">{Object.entries(SERVICE_GUIDES).filter(([key, translations]) => key !== exclude && translations[language]).map(([key, translations]) => (
    <li key={key}><a href={guidePath(key, language)}>{translations[language].title}<span aria-hidden="true"> ↗</span></a></li>
  ))}</ul>;
}

function Directory({ language, copy, siteCopy }) {
  return <>
    <section id="catalog" className="discovery-section"><h2>{copy.catalog}</h2>
      <div className="discovery-grid">{SERVICE_GROUPS.map((group) => (
        <section key={group.key} className="discovery-card" id={group.key}>
          <h3>{siteCopy.families[group.key]?.name || copy.pets}</h3>
          {siteCopy.families[group.key]?.description && <p>{siteCopy.families[group.key].description}</p>}
          <ul>{group.ids.map((id) => <li key={id} id={`category-${id}`}>{siteCopy.categories[id]}</li>)}</ul>
          {guidePath(group.guide, language) && <a className="discovery-text-link" href={guidePath(group.guide, language)}>{copy.read} <span aria-hidden="true">↗</span></a>}
        </section>
      ))}</div>
    </section>
    <div className="discovery-reading">
      {[['local', copy.localTitle, copy.local], ['online', copy.onlineTitle, copy.online], ['compare', copy.compareTitle, copy.compare], ['professionals', copy.proTitle, copy.pro]].map(([id, title, body]) => <section id={id} className="discovery-section" key={id}><h2>{title}</h2><p>{body}</p></section>)}
      <section id="steps" className="discovery-section"><h2>{copy.steps}</h2><ol className="discovery-steps">{copy.stepItems.map((step) => <li key={step}>{step}</li>)}</ol></section>
      {SERVICE_GUIDES.home[language] && <section className="discovery-section"><h2>{copy.guides}</h2><GuideLinks language={language} /></section>}
    </div>
  </>;
}

function Guide({ guide, page, siteCopy }) {
  const labels = guideLabels[page.language];
  return <div className="discovery-reading">
    <nav className="discovery-toc" aria-label={labels.preparation}><ul>{guide.sections.map(([title], index) => <li key={title}><a href={`#section-${index + 1}`}>{title}</a></li>)}</ul></nav>
    {guide.sections.map(([title, text], index) => <section className="discovery-section" id={`section-${index + 1}`} key={title}><h2>{title}</h2><p>{text}</p></section>)}
    <section className="discovery-section discovery-checklist"><h2>{labels.preparation}</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="discovery-section"><h2>{labels.faq}</h2><details><summary>{guide.question}</summary><p>{guide.answer}</p></details></section>
    <section className="discovery-section"><h2>{labels.categories}</h2><ul className="discovery-tags">{SERVICE_GUIDES[page.key].ids.map((id) => <li key={id}><a href={`${directoryPath(page.language)}#category-${id}`}>{siteCopy.categories[id]}</a></li>)}</ul></section>
    <section className="discovery-section"><h2>{labels.related}</h2><GuideLinks language={page.language} exclude={page.key} /></section>
    <p><a href={`/booking-policy?lang=${page.language}`}>{labels.policies}</a></p>
  </div>;
}

function DiscoveryPage({ page }) {
  const copy = DIRECTORY_COPY[page.language];
  const siteCopy = getCopy(page.language);
  const guide = SERVICE_GUIDES[page.key]?.[page.language];
  const content = guide || copy;
  return <>
    <a className="discovery-skip" href="#main">{content.title}</a>
    <header className="discovery-header">
      <a href={`/${page.language}`} className="discovery-brand" aria-label={`Wisdom · ${copy.home}`}><img src="/images/wisdom-app-icon.webp" width="40" height="40" alt="" /><span>Wisdom</span></a>
      <a className="discovery-button" href="/app">{copy.download}<span aria-hidden="true"> ↗</span></a>
    </header>
    <main id="main" className="discovery-shell">
      <nav className="discovery-breadcrumb" aria-label={copy.home}>
        <a href={`/${page.language}`}>{copy.home}</a><span aria-hidden="true"> / </span>
        {guide ? <><a href={directoryPath(page.language)}>{copy.catalog}</a><span aria-hidden="true"> / </span><span>{content.title}</span></> : <span>{copy.catalog}</span>}
      </nav>
      <article>
        <div className="discovery-hero"><p className="discovery-eyebrow">WISDOM</p><h1>{content.title}</h1><p className="discovery-intro">{content.intro}</p></div>
        {guide ? <Guide guide={guide} page={page} siteCopy={siteCopy} /> : <Directory language={page.language} copy={copy} siteCopy={siteCopy} />}
      </article>
      <aside className="discovery-availability"><p>{copy.availability}</p></aside>
      <div className="discovery-download"><h2>{copy.download}</h2><div><a href={IOS_APP_STORE_URL}>App Store ↗</a><a href={ANDROID_PLAY_STORE_URL}>Google Play ↗</a></div></div>
      <footer className="discovery-footer">
        <nav aria-label={copy.language} className="discovery-languages">{discoveryAlternates(page.key).map((alternate) => <a key={alternate.language} href={alternate.path} hrefLang={alternate.language} lang={alternate.language} aria-current={alternate.language === page.language ? 'page' : undefined}>{LANGUAGE_NAMES[alternate.language]}</a>)}</nav>
        <a href={`/faq?lang=${page.language === 'es' ? 'es' : 'en'}`} lang={page.language === 'es' ? 'es' : 'en'}>{page.language === 'es' ? copy.faq : 'FAQ (English)'}</a>
      </footer>
    </main>
  </>;
}

export function renderDiscoveryPage(page) {
  const content = SERVICE_GUIDES[page.key]?.[page.language] || DIRECTORY_COPY[page.language];
  const url = `${SITE_URL}${page.path}`;
  const organizationId = `${SITE_URL}/#organization`;
  const copy = DIRECTORY_COPY[page.language];
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Wisdom', item: `${SITE_URL}/${page.language}` },
    { '@type': 'ListItem', position: 2, name: copy.title, item: `${SITE_URL}${directoryPath(page.language)}` },
    ...(page.key === 'directory' ? [] : [{ '@type': 'ListItem', position: 3, name: content.title, item: url }]),
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': organizationId, name: 'Wisdom', url: `${SITE_URL}/`, logo: `${SITE_URL}/images/wisdom-app-icon.webp` },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Wisdom', url: `${SITE_URL}/`, publisher: { '@id': organizationId } },
      { '@type': page.key === 'directory' ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: content.title, description: content.description, inLanguage: page.language,
        isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': organizationId }, breadcrumb: { '@id': `${url}#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: SHARE_IMAGE, width: 1200, height: 630 },
        ...(page.key === 'directory' ? { mainEntity: { '@id': `${url}#categories` } } : {}),
      },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: breadcrumbs },
      ...(page.key !== 'directory' ? [] : [{ '@type': 'ItemList', '@id': `${url}#categories`, name: copy.catalog, numberOfItems: SERVICE_GROUPS.flatMap((group) => group.ids).length,
        itemListElement: SERVICE_GROUPS.flatMap((group) => group.ids).map((id, index) => ({ '@type': 'ListItem', position: index + 1, name: getCopy(page.language).categories[id], url: `${url}#category-${id}` })),
      }]),
    ],
  };
  return { title: content.title.includes('Wisdom') ? content.title : `${content.title} | Wisdom`, description: content.description, html: renderToStaticMarkup(<DiscoveryPage page={page} />), schema };
}
