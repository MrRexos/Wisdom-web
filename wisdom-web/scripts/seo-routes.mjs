import { SUPPORTED_LOCALES } from '../src/i18n/detectLocale.js';
import { LEGAL_ROUTES } from '../src/legal/routes.js';
import { discoveryPages, discoveryOutputFile } from '../src/discovery/routes.js';

export const publicPaths = ['/', '/app', ...Object.keys(LEGAL_ROUTES), '/data-deletion', '/users'];
export const languagesFor = (path) => path === '/' ? SUPPORTED_LOCALES : Object.hasOwn(LEGAL_ROUTES, path) ? ['es', 'en'] : [];
export const defaultLanguage = (path) => path === '/app' ? 'es' : 'en';
export const outputFile = (path, language) => path === '/' && !language ? 'index.html'
  : path === '/app' && !language ? 'app/index.html'
    : `seo/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}.${language || 'default'}.html`;

export function vercelConfig() {
  return {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    trailingSlash: false,
    redirects: [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/app/index.html', destination: '/app', permanent: true },
    ],
    headers: [
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/images/responsive/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/seo/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/users', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
      { source: '/data-deletion', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
    ],
    rewrites: [...publicPaths.flatMap((path) => [
      ...languagesFor(path).map((language) => path === '/'
        ? { source: `/${language}`, destination: `/${outputFile(path, language)}` }
        : { source: path, has: [{ type: 'query', key: 'lang', value: language }], destination: `/${outputFile(path, language)}` }),
      ...(path === '/' ? [] : [{ source: path, destination: `/${outputFile(path)}` }]),
    ]), ...discoveryPages.map((page) => ({ source: page.path, destination: `/${discoveryOutputFile(page.path)}` }))],
  };
}
