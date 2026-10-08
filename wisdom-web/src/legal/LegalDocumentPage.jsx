import { useEffect, useState } from 'react';
import GetAppLink from '../GetAppLink';
import brandmark from '../assets/brandmark.svg';
import wordmark from '../assets/WISDOM_brandmark.svg';
import { useLocale } from '../i18n/LocaleContext';
import { getCopy } from '../i18n/translations';
import { getWebsiteDocument as getLegalDocument } from './websiteContent';
import { getLegalLocale, LEGAL_LANGUAGES, normalizeLegalLanguage } from './language';
import { LEGAL_ROUTES } from './routes';
import { updatePageMetadata } from '../seo/metadata';
import '../PrivacyPolicy.css';

/* eslint-disable react/prop-types */
const languageToggleLabels = { es: 'ES: cambiar a inglés', en: 'EN: switch to Spanish' };
const relatedDocumentLabels = {
  es: {
    terms: 'Términos y condiciones',
    privacy: 'Política de privacidad',
    bookings: 'Política de reservas',
    cancellation: 'Política de cancelación',
    invoicing: 'Política de facturación',
    premium: 'Política de Wisdom Premium',
    serviceFee: 'Tarifa del servicio',
    faq: 'Preguntas frecuentes',
  },
  en: {
    terms: 'Terms and conditions',
    privacy: 'Privacy policy',
    bookings: 'Booking policy',
    cancellation: 'Cancellation policy',
    invoicing: 'Invoicing policy',
    premium: 'Wisdom Premium policy',
    serviceFee: 'Service fee',
    faq: 'Frequently asked questions',
  },
};

function getRequestedLanguage() {
  if (typeof window === 'undefined') return null;
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested && LEGAL_LANGUAGES.includes(requested.toLowerCase().split(/[-_]/)[0])) return normalizeLegalLanguage(requested);
  return null;
}

function LinkedText({ text }) {
  return text.split(/(hello@wisdomapp\.es)/g).map((part, index) => (
    part === 'hello@wisdomapp.es' ? <a key={index} href={`mailto:${part}`}>{part}</a> : part
  ));
}

function DocumentBlock({ block }) {
  if (block.type === 'divider') return <hr />;
  if (block.type === 'heading') return <h2 className="legal-section-heading" id={block.id}>{block.text}</h2>;
  if (block.type === 'subheading' || block.type === 'question') return <h3>{block.text}</h3>;
  if (block.type === 'footer') return <footer className="privacy-policy-footer">{block.text}</footer>;
  return <p className={block.type === 'list-item' ? 'legal-list-item' : undefined}><LinkedText text={block.text} /></p>;
}

export default function LegalDocumentPage({ documentKey, initialLanguage }) {
  const { locale } = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(() => initialLanguage || getRequestedLanguage());
  const language = selectedLanguage || getLegalLocale();
  const copy = getCopy(language);
  const content = getLegalDocument(language, documentKey);

  useEffect(() => {
    document.title = `${content.title} - Wisdom`;
    updatePageMetadata({ title: document.title, description: content.description || `${content.title}. ${content.lastUpdated}`, language, explicitLanguage: Boolean(selectedLanguage), faqSections: documentKey === 'faq' ? content.sections : undefined });
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    return () => {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    };
  }, [content.title, content.description, content.lastUpdated, content.sections, documentKey, language, locale, selectedLanguage]);

  useEffect(() => {
    document.body.classList.add('privacy-policy-active');
    return () => document.body.classList.remove('privacy-policy-active');
  }, []);

  function changeLanguage() {
    const next = language === 'es' ? 'en' : 'es';
    setSelectedLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <>
      <header className="legal-page-header" lang={language} dir="ltr">
        <a className="legal-page-brandmark" href="/" aria-label="Wisdom">
          <img src={brandmark} alt="" width="280" height="161" />
        </a>
        <a className="legal-page-wordmark" href="/" aria-label="Wisdom">
          <img src={wordmark} alt="WISDOM" width="504" height="91" />
        </a>
        <GetAppLink className="legal-page-download">{copy.header.getApp}</GetAppLink>
      </header>
      <main className="privacy-policy-page" lang={language} dir="ltr">
        <article className="privacy-policy-shell">
          <p className="privacy-policy-kicker">{content.lastUpdated}</p>
          <h1>{content.title}</h1>
          <div className="legal-document-body">
            {documentKey === 'faq' ? content.sections.map((section) => (
              <section key={section.id} id={section.id} className="privacy-policy-section">
                <h2>{section.title}</h2>
                {section.items.map((item) => (
                  <details key={item.id} id={item.id} className="legal-faq-item">
                    <summary>{item.question}</summary>
                    {item.answer.split('\n\n').map((paragraph, index) => <p key={index}><LinkedText text={paragraph} /></p>)}
                  </details>
                ))}
              </section>
            )) : content.blocks.map((block) => <DocumentBlock key={block.id} block={block} />)}
          </div>
          <nav className="legal-related-documents">
            {Object.entries(LEGAL_ROUTES).filter(([, key]) => key !== documentKey && key !== 'invoicingDetails').map(([path, key]) => (
              <a key={key} href={`${path}?lang=${language}`}>{relatedDocumentLabels[language][key]}</a>
            ))}
          </nav>
        </article>
        <button
          type="button"
          className="legal-language-control"
          onClick={changeLanguage}
          aria-label={languageToggleLabels[language]}
        >
          {language.toUpperCase()}
        </button>
      </main>
    </>
  );
}
