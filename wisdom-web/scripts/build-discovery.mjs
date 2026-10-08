import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { discoveryPages, discoveryAlternates, discoveryOutputFile } from '../src/discovery/routes.js';
import { SITE_URL, SHARE_IMAGE, OPEN_GRAPH_LOCALES } from '../src/seo/metadata.js';
import sharp from 'sharp';

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

// Compilación aislada: no añade componentes, estilos ni scripts a páginas existentes.
export async function buildDiscovery({ build, outDir }) {
  const rendererDir = resolve('dist-ssr/discovery');
  await build({ build: { ssr: 'src/discovery/server.jsx', outDir: rendererDir, manifest: false, rollupOptions: { input: 'src/discovery/server.jsx' } } });
  const { renderDiscoveryPage } = await import(pathToFileURL(resolve(rendererDir, 'server.js')).href);
  const fontCss = await readFile('src/discovery/fonts/font-face.css', 'utf8');
  const fontSources = JSON.parse(await readFile('src/discovery/fonts/sources.json', 'utf8'));
  await mkdir(resolve(outDir, 'assets/discovery-fonts'), { recursive: true });
  for (const font of fontSources.fonts) {
    await writeFile(resolve(outDir, `assets/discovery-fonts/${font.file}`), await readFile(`src/discovery/fonts/${font.file}`));
  }
  await writeFile(resolve(outDir, 'assets/discovery-fonts/OFL.txt'), await readFile('src/discovery/fonts/OFL.txt', 'utf8'), 'utf8');
  const latinFont = fontCss.match(/\/\* latin \*\/[\s\S]*?url\(([^)]+)\)/)[1];
  const css = `${fontCss}\n${await readFile('src/discovery/discovery.css', 'utf8')}`;
  const cssFile = `assets/discovery-${createHash('sha256').update(css).digest('hex').slice(0, 12)}.css`;
  await writeFile(resolve(outDir, cssFile), css, 'utf8');
  const icon = await sharp('public/images/wisdom-app-icon.webp').resize(96, 96).webp({ lossless: true }).toBuffer();
  const iconFile = `assets/discovery-icon-${createHash('sha256').update(icon).digest('hex').slice(0, 12)}.webp`;
  await writeFile(resolve(outDir, iconFile), icon);
  const pages = [];
  const urls = [];
  for (const page of discoveryPages) {
    const content = renderDiscoveryPage(page);
    const canonical = `${SITE_URL}${page.path}`;
    const alternatives = discoveryAlternates(page.key).map((alternate) => ({ language: alternate.language, url: `${SITE_URL}${alternate.path}` }));
    alternatives.push({ language: 'x-default', url: alternatives.find((alternate) => alternate.language === 'en').url });
    const html = `<!doctype html>
<html lang="${page.language}" dir="${page.language === 'ar' ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(content.title)}</title>
    <meta name="description" content="${escape(content.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    ${alternatives.map((alternate) => `<link rel="alternate" hreflang="${alternate.language}" href="${alternate.url}" />`).join('\n    ')}
    <link rel="icon" href="/${iconFile}" type="image/webp" />
    <link rel="preload" href="${latinFont}" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/${cssFile}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Wisdom" />
    <meta property="og:locale" content="${OPEN_GRAPH_LOCALES[page.language]}" />
    <meta property="og:title" content="${escape(content.title)}" />
    <meta property="og:description" content="${escape(content.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${SHARE_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(content.title)}" />
    <meta name="twitter:description" content="${escape(content.description)}" />
    <meta name="twitter:image" content="${SHARE_IMAGE}" />
    <script type="application/ld+json">${JSON.stringify(content.schema).replaceAll('<', '\\u003c')}</script>
  </head>
  <body>${content.html.replaceAll('/images/wisdom-app-icon.webp', `/${iconFile}`)}</body>
</html>
`;
    const file = discoveryOutputFile(page.path);
    await mkdir(dirname(resolve(outDir, file)), { recursive: true });
    await writeFile(resolve(outDir, file), html, 'utf8');
    pages.push({ path: page.path, language: page.language, explicitLanguage: null, file, canonical, indexable: true, kind: 'discovery' });
    urls.push(`  <url><loc>${canonical}</loc>${alternatives.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate.language}" href="${alternate.url}"/>`).join('')}</url>`);
  }
  return { pages, urls };
}
