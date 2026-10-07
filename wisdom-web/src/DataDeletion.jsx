import { useEffect } from 'react';
import { useLocale } from './i18n/LocaleContext';
import { getLegalLocale } from './legal/language';
import { getDataDeletionCopy } from './i18n/dataDeletionCopy';
import './DataDeletion.css';

export default function DataDeletion() {
  const { locale } = useLocale();
  const language = getLegalLocale();
  const copy = getDataDeletionCopy(language);
  useEffect(() => {
    document.title = copy.title;
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    return () => {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    };
  }, [copy.title, language, locale]);

  useEffect(() => {
    document.body.classList.add('data-deletion-active');
    return () => {
      document.body.classList.remove('data-deletion-active');
    };
  }, []);

  return (
    <main className="data-deletion-page" lang={language} dir="ltr">
      <header className="data-deletion-header">
        <h1>{copy.title}</h1>
        <p>
          <span className="label">{copy.developer}</span>
          <span>Oier Hernanz Arroyo</span>
        </p>
        <p>
          <span className="label">{copy.app}</span>
          <span>Wisdom (com.anonymous.Wisdom_expo)</span>
        </p>
      </header>

      <section className="data-deletion-card">
        <h2>{copy.requestTitle}</h2>
        <p>
          {copy.requestBefore}{' '}
          <a href="mailto:wisdom.helpcontact@gmail.com">wisdom.helpcontact@gmail.com</a>{' '}{copy.requestAfter}
        </p>
      </section>

      <section className="data-deletion-card">
        <h2>{copy.deleteTitle}</h2>
        <ul>
          {copy.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="data-deletion-card">
        <h2>{copy.retainTitle}</h2>
        <p>
          {copy.retain}
        </p>
      </section>

      <section className="data-deletion-card">
        <h2>{copy.securityTitle}</h2>
        <p>{copy.security}</p>
      </section>

      <footer className="data-deletion-footer">
        <p>{copy.updated} {new Date().toLocaleDateString(language)}</p>
      </footer>
    </main>
  );
}
