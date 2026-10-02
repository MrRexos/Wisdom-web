import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppDownload from './AppDownload.jsx';
import { APP_DOWNLOAD_PATH } from './appLinks';
import DataDeletion from './DataDeletion.jsx';
import { LEGAL_ROUTES } from './legal/routes';
import UsersDashboard from './UsersDashboard.jsx';
import { LocaleProvider } from './i18n/LocaleContext.jsx';
import './index.css';

const LegalDocumentPage = lazy(() => import('./legal/LegalDocumentPage.jsx'));

const normalizePathname = (pathname) => {
  if (!pathname) return '/';
  const trimmed = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return trimmed || '/';
};

const currentPath = normalizePathname(window.location.pathname);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {currentPath === APP_DOWNLOAD_PATH ? <AppDownload /> : (
      <LocaleProvider>
        {currentPath === '/data-deletion'
          ? <DataDeletion />
          : LEGAL_ROUTES[currentPath]
            ? <Suspense fallback={<main aria-busy="true" />}><LegalDocumentPage documentKey={LEGAL_ROUTES[currentPath]} /></Suspense>
            : currentPath === '/users'
                ? <UsersDashboard />
                : <App />}
      </LocaleProvider>
    )}
  </StrictMode>,
);
