import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { publicPaths, languagesFor, defaultLanguage, outputFile, vercelConfig } from './seo-routes.mjs';
import { canonicalUrl, SHARE_IMAGE, SITE_URL, OPEN_GRAPH_LOCALES } from '../src/seo/metadata.js';
import sharp from 'sharp';

process.env.NODE_ENV = 'production';
const { build } = await import('vite');
const args = process.argv.slice(2);
const outIndex = args.indexOf('--outDir');
const outDir = resolve(outIndex >= 0 ? args[outIndex + 1] : 'dist');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
if (JSON.stringify(config) !== JSON.stringify(vercelConfig())) {
  throw new Error('vercel.json must match scripts/seo-routes.mjs. Run node scripts/sync-seo-routes.mjs.');
}

await build({ build: { outDir } });
const originalImage = await readFile('public/images/pro_alone4.png');
const optimizedImage = await sharp(originalImage).webp({ lossless: true, effort: 6 }).toBuffer();
await writeFile(resolve(outDir, 'images/pro_alone4.webp'), optimizedImage);
console.log(`Lossless image: ${originalImage.length} → ${optimizedImage.length} bytes.`);
await build({ build: { ssr: 'src/seo/entry-server.jsx', outDir: 'dist-ssr', manifest: false, rollupOptions: { input: 'src/seo/entry-server.jsx' } } });
const { renderPage, structuredData, getWebsiteDocument } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const template = await readFile(resolve(outDir, 'index.html'), 'utf8');
const appTemplate = await readFile(resolve(outDir, 'app/index.html'), 'utf8');
const manifest = JSON.parse(await readFile(resolve(outDir, '.vite/manifest.json'), 'utf8'));
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const indexable = (path) => !['/users', '/data-deletion'].includes(path);
const urls = [];
const emitted = [];

function dependencies(entry, seen = new Set()) {
  if (seen.has(entry)) return [];
  seen.add(entry);
  const chunk = manifest[entry];
  return chunk ? [chunk, ...(chunk.imports || []).flatMap((key) => dependencies(key, seen))] : [];
}

for (const path of publicPaths) {
  for (const explicitLanguage of [null, ...languagesFor(path)]) {
    const language = explicitLanguage || defaultLanguage(path);
    const page = renderPage(path, language);
    const canonical = canonicalUrl(path, explicitLanguage);
    const alternates = languagesFor(path).map((lang) => `<link rel="alternate" hreflang="${lang}" href="${escape(canonicalUrl(path, lang))}" />`);
    if (alternates.length) alternates.push(`<link rel="alternate" hreflang="x-default" href="${escape(canonicalUrl(path))}" />`);
    const entry = path === '/' ? 'src/App.jsx' : path === '/app' ? 'src/AppDownload.jsx' : path === '/users' ? 'src/UsersDashboard.jsx' : path === '/data-deletion' ? 'src/DataDeletion.jsx' : 'src/legal/LegalDocumentPage.jsx';
    const chunks = dependencies(entry);
    const base = path === '/app' ? appTemplate : template;
    const resources = [...new Set(chunks.flatMap((chunk) => [
      ...((chunk.css || []).map((file) => `<link rel="stylesheet" crossorigin href="/${file}" />`)),
      `<link rel="modulepreload" crossorigin href="/${chunk.file}" />`,
    ]))].filter((tag) => !base.includes(tag));
    const seo = [
      `<title>${escape(page.title)}</title>`,
      `<meta name="description" content="${escape(page.description)}" />`,
      `<meta name="robots" content="${indexable(path) ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
      `<link rel="canonical" href="${escape(canonical)}" />`, ...alternates,
      `<link rel="describedby" href="${SITE_URL}/llms.txt" type="text/plain" />`,
      ...(path === '/faq' ? [`<link rel="alternate" type="text/markdown" href="${SITE_URL}/faq.${language}.md" />`] : []),
      '<meta property="og:type" content="website" />', '<meta property="og:site_name" content="Wisdom" />',
      `<meta property="og:locale" content="${OPEN_GRAPH_LOCALES[language]}" />`,
      `<meta property="og:title" content="${escape(page.title)}" />`,
      `<meta property="og:description" content="${escape(page.description)}" />`,
      `<meta property="og:url" content="${escape(canonical)}" />`,
      `<meta property="og:image" content="${SHARE_IMAGE}" />`,
      `<meta property="og:image:secure_url" content="${SHARE_IMAGE}" />`,
      '<meta property="og:image:type" content="image/jpeg" />',
      '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content="Wisdom" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escape(page.title)}" />`,
      `<meta name="twitter:description" content="${escape(page.description)}" />`,
      `<meta name="twitter:image" content="${SHARE_IMAGE}" />`, '<meta name="twitter:image:alt" content="Wisdom" />',
      `<script type="application/ld+json">${JSON.stringify(structuredData(path, language, explicitLanguage, page)).replaceAll('<', '\\u003c')}</script>`,
      ...resources,
    ].join('\n    ');
    const html = base.replace(/<title>[\s\S]*?<\/title>/g, '')
      .replace(/<meta\s+(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '')
      .replace(/<html[^>]*>/, `<html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">`)
      .replace('</head>', `    ${seo}\n  </head>`)
      .replace('<body>', `<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>`)
      .replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>`);
    const file = outputFile(path, explicitLanguage);
    await mkdir(dirname(resolve(outDir, file)), { recursive: true });
    await writeFile(resolve(outDir, file), html, 'utf8');
    emitted.push({ path, language, explicitLanguage, file, canonical, indexable: indexable(path) });
    if (indexable(path)) {
      const links = languagesFor(path).map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(canonicalUrl(path, lang))}"/>`);
      if (links.length) links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${escape(canonicalUrl(path))}"/>`);
      urls.push(`  <url><loc>${escape(canonical)}</loc>${links.join('')}</url>`);
    }
  }
}

await writeFile(resolve(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`, 'utf8');
await writeFile(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');
for (const language of ['es', 'en']) {
  const faq = getWebsiteDocument(language, 'faq');
  const markdown = `# ${faq.title}\n\n${faq.description}\n\n${faq.lastUpdated}\n\n${faq.sections.map((section) => `## ${section.title}\n\n${section.items.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n')}`).join('\n\n')}\n`;
  await writeFile(resolve(outDir, `faq.${language}.md`), markdown, 'utf8');
}
await writeFile(resolve(outDir, '.vite/seo-pages.json'), JSON.stringify(emitted, null, 2), 'utf8');
console.log(`SEO: ${emitted.length} static pages; ${urls.length} canonical sitemap URLs.`);
