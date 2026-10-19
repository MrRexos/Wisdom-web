import { SUPPORTED_LOCALES } from '../src/i18n/detectLocale.js';
import { LEGAL_ROUTES } from '../src/legal/routes.js';
import { discoveryPages, discoveryOutputFile } from '../src/discovery/routes.js';
import { SITE_URL } from '../src/seo/metadata.js';

// Solo alias públicos de producción; las URL de otros despliegues conservan su comportamiento.
const productionAliases = [
  'wisdom-web.vercel.app',
  'wisdom-rexos-projects-2036d9c4.vercel.app',
  'wisdom-git-main-rexos-projects-2036d9c4.vercel.app',
];

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
      ...productionAliases.map((hostname) => ({
        source: '/:path*',
        has: [{ type: 'host', value: hostname.replaceAll('.', '\\.') }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      })),
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/app/index.html', destination: '/app', permanent: true },
    ],
    headers: [
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/images/responsive/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/seo/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/users', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
      { source: '/data-deletion', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
      ...[
        ...discoveryPages.map((page) => ({ path: `${page.path}.md`, canonical: `${SITE_URL}${page.path}` })),
        ...['es', 'en'].map((language) => ({ path: `/faq.${language}.md`, canonical: `${SITE_URL}/faq?lang=${language}` })),
      ].map(({ path, canonical }) => ({ source: path, headers: [
        { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
        { key: 'Link', value: `<${canonical}>; rel="canonical"` },
      ] })),
      ...['/llms.txt', '/llms-full.txt'].map((path) => ({ source: path, headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }] })),
    ],
    rewrites: [...publicPaths.flatMap((path) => [
      ...languagesFor(path).map((language) => path === '/'
        ? { source: `/${language}`, destination: `/${outputFile(path, language)}` }
        : { source: path, has: [{ type: 'query', key: 'lang', value: language }], destination: `/${outputFile(path, language)}` }),
      ...(path === '/' ? [] : [{ source: path, destination: `/${outputFile(path)}` }]),
    ]), ...discoveryPages.map((page) => ({ source: page.path, destination: `/${discoveryOutputFile(page.path)}` }))],
  };
}
