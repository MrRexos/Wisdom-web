import { useEffect, useState } from 'react';
import GetAppLink from '../GetAppLink';
import brandmark from '../assets/brandmark.svg';
import wordmark from '../assets/WISDOM_brandmark.svg';
import { useLocale } from '../i18n/LocaleContext';
import { getLegalDocument, LEGAL_LANGUAGES, normalizeLegalLanguage } from './content';
import { LEGAL_ROUTES } from './routes';
import '../PrivacyPolicy.css';

/* eslint-disable react/prop-types */
const languageNames = { es: 'Español', en: 'English', ca: 'Català', fr: 'Français', ar: 'العربية', zh: '中文' };
const languageLabels = { es: 'Idioma', en: 'Language', ca: 'Idioma', fr: 'Langue', ar: 'اللغة', zh: '语言' };

function getRequestedLanguage() {
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested && LEGAL_LANGUAGES.includes(requested.toLowerCase().split(/[-_]/)[0])) return normalizeLegalLanguage(requested);
  const browser = (navigator.language || '').toLowerCase().split('-')[0];
  return browser === 'ar' || browser === 'zh' ? browser : null;
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

export default function LegalDocumentPage({ documentKey }) {
  const { locale } = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(getRequestedLanguage);
  const isEnglishOnly = documentKey === 'terms' || documentKey === 'privacy';
  const language = isEnglishOnly ? 'en' : selectedLanguage || normalizeLegalLanguage(locale);
  const content = getLegalDocument(language, documentKey);

  useEffect(() => {
    document.title = `${content.title} - Wisdom`;
  }, [content.title]);

  useEffect(() => {
    document.body.classList.add('privacy-policy-active');
    return () => document.body.classList.remove('privacy-policy-active');
  }, []);

  function changeLanguage(event) {
    const next = event.target.value;
    setSelectedLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <>
      {isEnglishOnly && (
        <header className="legal-page-header" lang="en">
          <a className="legal-page-brandmark" href="/" aria-label="Wisdom home">
            <img src={brandmark} alt="" width="280" height="161" />
          </a>
          <a className="legal-page-wordmark" href="/" aria-label="Wisdom home">
            <img src={wordmark} alt="WISDOM" width="504" height="91" />
          </a>
          <GetAppLink className="legal-page-download">Get the app</GetAppLink>
        </header>
      )}
      <main className={`privacy-policy-page${isEnglishOnly ? ' privacy-policy-page--primary' : ''}`} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <article className="privacy-policy-shell">
          {!isEnglishOnly && (
            <label className="legal-language-control">
              <span>{languageLabels[language]}</span>
              <select value={language} onChange={changeLanguage}>
                {LEGAL_LANGUAGES.map((key) => <option key={key} value={key}>{languageNames[key]}</option>)}
              </select>
            </label>
          )}
          <p className="privacy-policy-kicker">{content.lastUpdated}</p>
          <h1>{content.title}</h1>
          <div className="legal-document-body">
            {documentKey === 'faq' ? content.sections.map((section) => (
              <section key={section.id} className="privacy-policy-section">
                <h2>{section.title}</h2>
                {section.items.map((item) => (
                  <details key={item.id} className="legal-faq-item">
                    <summary>{item.question}</summary>
                    {item.answer.split('\n\n').map((paragraph, index) => <p key={index}><LinkedText text={paragraph} /></p>)}
                  </details>
                ))}
              </section>
            )) : content.blocks.map((block) => <DocumentBlock key={block.id} block={block} />)}
          </div>
          <nav className="legal-related-documents">
            {Object.entries(LEGAL_ROUTES).filter(([, key]) => key !== documentKey).map(([path, key]) => (
              <a key={key} href={`${path}?lang=${language}`}>{getLegalDocument(language, key).title}</a>
            ))}
          </nav>
        </article>
      </main>
    </>
  );
}
