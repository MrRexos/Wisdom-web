import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppDownload from './AppDownload.jsx';
import { APP_DOWNLOAD_PATH } from './appLinks';
import DataDeletion from './DataDeletion.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import UsersDashboard from './UsersDashboard.jsx';
import { LocaleProvider } from './i18n/LocaleContext.jsx';
import './index.css';

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
          : currentPath === '/privacy'
            ? <PrivacyPolicy />
            : currentPath === '/terms'
              ? <TermsAndConditions />
              : currentPath === '/users'
                ? <UsersDashboard />
                : <App />}
      </LocaleProvider>
    )}
  </StrictMode>,
);
