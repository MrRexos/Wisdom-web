import { useEffect } from 'react';
import officialAppIcon from './assets/official_app_icon.png';
import AppStoreLinks from './AppStoreLinks';
import { getAppDownloadCopy } from './i18n/appDownloadCopy';
import { useLocale } from './i18n/LocaleContext';

export default function AppDownload() {
  const { locale } = useLocale();
  const copy = getAppDownloadCopy(locale);

  useEffect(() => {
    document.title = `${copy.title} | Wisdom`;
  }, [copy.title]);

  useEffect(() => {
    document.body.classList.add('app-download-active');
    return () => document.body.classList.remove('app-download-active');
  }, []);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-white px-6 py-12 text-[#050505]">
      <section className="flex w-full max-w-md flex-col items-center text-center" aria-labelledby="download-title">
        <a href="/" aria-label={copy.back} className="inline-flex rounded-[26px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          <img src={officialAppIcon} alt="Wisdom" width="104" height="104" className="h-[104px] w-[104px]" />
        </a>

        <h1 id="download-title" className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base text-[#4c5563]">
          {copy.description}
        </p>

        <AppStoreLinks />
      </section>
    </main>
  );
}
