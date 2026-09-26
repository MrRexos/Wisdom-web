import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowUpRight } from 'lucide-react';
import WisdomLogo from './assets/wisdomLogo';
import {
  ANDROID_PLAY_STORE_URL,
  APP_DOWNLOAD_URL,
  getDeviceStoreUrl,
  IOS_APP_STORE_URL,
} from './appLinks';
import { getAppDownloadCopy, getAppDownloadLocale } from './i18n/appDownloadCopy';

export default function AppDownload() {
  const [locale] = useState(() => getAppDownloadLocale(navigator));
  const copy = getAppDownloadCopy(locale);
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const [storeUrl] = useState(() => getDeviceStoreUrl(navigator));
  const hasRedirected = useRef(false);

  useEffect(() => {
    document.title = `${copy.title} | Wisdom`;
  }, [copy.title]);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    const previousDirection = document.documentElement.dir;
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;

    return () => {
      document.documentElement.lang = previousLanguage;
      document.documentElement.dir = previousDirection;
    };
  }, [locale, direction]);

  useEffect(() => {
    document.body.classList.add('app-download-active');
    return () => document.body.classList.remove('app-download-active');
  }, []);

  useEffect(() => {
    if (!storeUrl || hasRedirected.current) return;
    hasRedirected.current = true;

    try {
      // Evita volver a redirigir al usuario cuando pulsa Atrás desde la tienda.
      window.location.replace(storeUrl);
    } catch {
      // Los enlaces siguen disponibles si un navegador integrado bloquea la redirección.
    }
  }, [storeUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9F8F8] px-5 py-12 text-[#050505]">
      <section className="w-full max-w-xl rounded-[32px] border border-black/5 bg-white px-6 py-10 text-center shadow-sm sm:px-12" aria-labelledby="download-title">
        <a href="/" aria-label="Wisdom" className="inline-flex rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          <WisdomLogo color="#050505" width={48} height={28} aria-hidden="true" focusable="false" />
        </a>

        <h1 id="download-title" className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base text-[#4c5563]">
          {copy.description}
        </p>

        <div dir="ltr" className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={IOS_APP_STORE_URL} className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            App Store
          </a>
          <a href={ANDROID_PLAY_STORE_URL} className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#111111] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            Google Play
          </a>
        </div>

        {!storeUrl && (
          <div className="mt-8 border-t border-black/5 pt-8">
            <h2 className="text-base font-semibold">{copy.scan}</h2>
            <div className="mx-auto mt-4 w-fit">
              <QRCodeSVG value={APP_DOWNLOAD_URL} size={184} level="M" marginSize={4} title={copy.qrLabel} role="img" aria-label={copy.qrLabel} />
            </div>
          </div>
        )}
      </section>

      <a href="/" dir="ltr" className="mt-6 inline-flex items-center gap-1.5 rounded text-sm text-[#4c5563] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <span dir={direction}>{copy.back}</span>
        <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
      </a>
    </main>
  );
}
