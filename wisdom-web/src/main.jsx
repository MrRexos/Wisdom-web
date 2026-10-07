import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { APP_DOWNLOAD_PATH } from './appLinks';
import { LEGAL_ROUTES } from './legal/routes';
import { LocaleProvider } from './i18n/LocaleContext.jsx';
import { SUPPORTED_LOCALES } from './i18n/detectLocale';
import './index.css';

const requestedPath = window.location.pathname.replace(/\/+$/, '') || '/';
const currentPath = SUPPORTED_LOCALES.some((locale) => requestedPath === `/${locale}`) ? '/' : requestedPath;

async function start() {
  let page;
  if (currentPath === APP_DOWNLOAD_PATH) {
    const { default: AppDownload } = await import('./AppDownload.jsx');
    page = <AppDownload />;
  } else if (currentPath === '/data-deletion') {
    const { default: DataDeletion } = await import('./DataDeletion.jsx');
    page = <DataDeletion />;
  } else if (Object.hasOwn(LEGAL_ROUTES, currentPath)) {
    const { default: LegalDocumentPage } = await import('./legal/LegalDocumentPage.jsx');
    page = <LegalDocumentPage documentKey={LEGAL_ROUTES[currentPath]} />;
  } else if (currentPath === '/users') {
    const { default: UsersDashboard } = await import('./UsersDashboard.jsx');
    page = <UsersDashboard />;
  } else if (currentPath === '/') {
    const { default: App } = await import('./App.jsx');
    page = <App />;
  } else {
    return;
  }

  // Conserva el HTML prerenderizado hasta cargar la ruta. El montaje normal mantiene
  // las animaciones aleatorias y el diseño según viewport sin errores de hidratación.
  createRoot(document.getElementById('root')).render(
    <StrictMode><LocaleProvider>{page}</LocaleProvider></StrictMode>,
  );
}

start().catch((error) => {
  // El contenido estático sigue disponible si falla la descarga de un chunk.
  console.error('Unable to start Wisdom', error);
});
