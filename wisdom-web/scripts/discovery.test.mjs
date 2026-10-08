import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { discoveryPages, discoveryAlternates, directoryPath, SERVICE_GROUPS } from '../src/discovery/routes.js';
import { DIRECTORY_COPY } from '../src/discovery/copy.js';
import { SERVICE_GUIDES } from '../src/discovery/guides.js';
import { SUPPORTED_LOCALES } from '../src/i18n/detectLocale.js';

const root = resolve(process.env.SEO_BUILD_DIR || 'dist');
const pages = JSON.parse(await readFile(resolve(root, '.vite/seo-pages.json'), 'utf8'));
const htmlByUrl = new Map(await Promise.all(pages.map(async (page) => [page.canonical, await readFile(resolve(root, page.file), 'utf8')])));
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');

test('all supported locales have genuine translated catalogs and every category is represented once', () => {
  assert.deepEqual(Object.keys(DIRECTORY_COPY).sort(), [...SUPPORTED_LOCALES].sort());
  const ids = SERVICE_GROUPS.flatMap((group) => group.ids);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.length, 38);
  for (const language of SUPPORTED_LOCALES) {
    const html = htmlByUrl.get(`https://www.wisdomapp.es${directoryPath(language)}`);
    const copy = DIRECTORY_COPY[language];
    for (const field of ['intro', 'local', 'online', 'compare', 'pro', 'availability']) assert.ok(decode(html).includes(copy[field]), `${language}: ${field}`);
    for (const id of ids) assert.equal((html.match(new RegExp(`id="category-${id}"`, 'g')) || []).length, 1);
    assert.ok(html.includes(`dir="${language === 'ar' ? 'rtl' : 'ltr'}"`));
  }
});

test('new guides work without JavaScript and do not add browser bundles to existing pages', async () => {
  for (const page of pages) {
    const html = htmlByUrl.get(page.canonical);
    if (page.kind === 'discovery') {
      assert.ok(!/<script(?![^>]*type="application\/ld\+json")/i.test(html), page.canonical);
      assert.ok(html.includes('discovery-'));
      assert.ok(!html.includes('fonts.googleapis.com'));
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(Buffer.byteLength(html) < 60000, 'Static page must stay lightweight');
    } else {
      assert.ok(!html.includes('/assets/discovery-'), page.canonical);
      assert.ok(!html.includes('discovery-shell'), page.canonical);
    }
  }
  for (const [key, guide] of Object.entries(SERVICE_GUIDES)) {
    assert.deepEqual(Object.keys(guide).sort(), ['en', 'es', 'ids']);
    for (const language of ['es', 'en']) {
      const page = discoveryPages.find((item) => item.key === key && item.language === language);
      const html = decode(htmlByUrl.get(`https://www.wisdomapp.es${page.path}`));
      for (const [heading, body] of guide[language].sections) {
        assert.ok(html.includes(heading));
        assert.ok(html.includes(body));
      }
      assert.ok(html.includes(guide[language].answer));
    }
  }
  const manifest = await readFile(resolve(root, '.vite/manifest.json'), 'utf8');
  assert.ok(!manifest.includes('discovery'));
  const directory = htmlByUrl.get(`https://www.wisdomapp.es${directoryPath('es')}`);
  const cssPath = directory.match(/rel="stylesheet" href="([^"]+)"/)[1];
  const css = await readFile(resolve(root, `.${cssPath}`), 'utf8');
  for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
    assert.ok(match[1].startsWith('/assets/discovery-fonts/'));
    const font = await readFile(resolve(root, `.${match[1]}`));
    assert.equal(font.toString('ascii', 0, 4), 'wOF2');
  }
  await access(resolve(root, 'assets/discovery-fonts/OFL.txt'));
});

test('new pages have reciprocal language URLs, self canonicals, complete sitemap entries and no duplicates', () => {
  const canonicals = pages.map((page) => page.canonical);
  assert.equal(new Set(canonicals).size, canonicals.length);
  const titles = new Set();
  for (const page of discoveryPages) {
    const url = `https://www.wisdomapp.es${page.path}`;
    const html = htmlByUrl.get(url);
    const title = html.match(/<title>(.*?)<\/title>/s)[1];
    assert.ok(!titles.has(title), title);
    titles.add(title);
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(html.includes('<meta name="robots" content="index, follow'));
    for (const alternate of discoveryAlternates(page.key)) {
      assert.ok(html.includes(`hreflang="${alternate.language}" href="https://www.wisdomapp.es${alternate.path}"`));
    }
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data['@graph'][2].url, url);
    assert.equal(data['@graph'][2].inLanguage, page.language);
    const breadcrumbs = data['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.itemListElement.at(-1).item, url);
    for (const item of data['@graph'].find((item) => item['@type'] === 'ItemList')?.itemListElement || []) {
      assert.ok(decode(html).includes(item.name));
      assert.ok(html.includes(`id="${new URL(item.url).hash.slice(1)}"`));
    }
    assert.ok(!html.includes('aggregateRating'));
  }
});

test('all new navigation links resolve, including localized categories and in-page anchors', async () => {
  for (const page of pages.filter((item) => item.kind === 'discovery')) {
    const html = htmlByUrl.get(page.canonical);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(decode(match[1]), page.canonical);
      if (url.origin !== 'https://www.wisdomapp.es') continue;
      const hash = url.hash;
      url.hash = '';
      const target = htmlByUrl.get(url.href);
      if (target) {
        if (hash) assert.ok(target.includes(`id="${decodeURIComponent(hash.slice(1))}"`), `${page.canonical} -> ${match[1]}`);
      } else {
        await access(resolve(root, `.${url.pathname}`));
      }
    }
  }
});
