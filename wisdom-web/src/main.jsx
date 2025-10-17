import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import DataDeletion from './DataDeletion.jsx';
import './index.css';

const normalizePathname = (pathname) => {
  if (!pathname) return '/';
  const trimmed = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return trimmed || '/';
};

const currentPath = normalizePathname(window.location.pathname);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {currentPath === '/data-deletion' ? <DataDeletion /> : <App />}
  </StrictMode>,
);
