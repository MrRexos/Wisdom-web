import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { vercelConfig, languagesFor } from './seo-routes.mjs';
import { getRequestedLocale, SUPPORTED_LOCALES } from '../src/i18n/detectLocale.js';
import { getServiceFaqSections } from '../src/legal/serviceFaq.js';
import { createHash } from 'node:crypto';

const outDir = resolve(process.env.SEO_BUILD_DIR || 'dist');
const pages = JSON.parse(await readFile(resolve(outDir, '.vite/seo-pages.json'), 'utf8'));
const sitemap = await readFile(resolve(outDir, 'sitemap.xml'), 'utf8');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));

test('explicit language URLs remain stable regardless of browser preferences', () => {
  for (const language of SUPPORTED_LOCALES) {
    assert.equal(getRequestedLocale('?utm_source=test', undefined, `/${language}`), language);
    assert.equal(getRequestedLocale(`?lang=${language}`), language);
  }
  assert.equal(getRequestedLocale('?lang=ES-es'), 'es');
  assert.equal(getRequestedLocale('?lang=unknown'), null);
  assert.equal(getRequestedLocale('', undefined, '/unknown'), null);
});

test('every canonical URL is routed to its own HTML and unknown paths have no home fallback', () => {
  assert.deepEqual(config, vercelConfig());
  for (const page of pages) {
    const url = new URL(page.canonical);
    const rule = config.rewrites.find((item) => item.source === url.pathname && (!item.has || item.has.every((condition) => url.searchParams.get(condition.key) === condition.value)));
    if (url.pathname === '/' && !url.search) assert.equal(page.file, 'index.html');
    else assert.equal(rule?.destination, `/${page.file}`, page.canonical);
  }
  assert.ok(config.rewrites.every((rule) => !rule.source.includes('.*')));
});

test('all public pages contain metadata, canonicals, language alternates and usable static content', async () => {
  for (const page of pages) {
    const html = await readFile(resolve(outDir, page.file), 'utf8');
    assert.ok(html.includes(`<html lang="${page.language}"`), page.file);
    assert.equal((html.match(/<title>/g) || []).length, 1, page.file);
    assert.equal((html.match(/name="description"/g) || []).length, 1, page.file);
    assert.ok(!html.includes('undefined'), page.file);
    assert.ok(html.includes(`<link rel="canonical" href="${page.canonical}"`), page.file);
    assert.ok(html.includes(`name="robots" content="${page.indexable ? 'index' : 'noindex'},`), page.file);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data['@graph'][2].url, page.canonical);
    if (page.path !== '/users') {
      assert.equal((html.match(/<h1\b/g) || []).length, 1, page.file);
      assert.ok(html.includes('<main'), page.file);
    }
    for (const locale of languagesFor(page.path)) assert.ok(html.includes(`hreflang="${locale}"`));
    assert.equal(sitemap.includes(`<loc>${page.canonical}</loc>`), page.indexable, page.canonical);
    for (const match of html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"?#]+)"/g)) {
      await access(resolve(outDir, `.${decodeURIComponent(match[1]).replaceAll('&amp;', '&')}`));
    }
    assert.ok(!html.includes('/src/'), page.file);
  }
});

test('FAQ schema and Markdown contain the same 129 visible questions in both languages', async () => {
  for (const language of ['es', 'en']) {
    const page = pages.find((item) => item.path === '/faq' && item.explicitLanguage === language);
    const html = await readFile(resolve(outDir, page.file), 'utf8');
    const markdown = await readFile(resolve(outDir, `faq.${language}.md`), 'utf8');
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const faq = schema['@graph'].find((item) => item['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 129);
    assert.equal((html.match(/<summary>/g) || []).length, faq.mainEntity.length);
    for (const question of faq.mainEntity) {
      assert.ok(markdown.includes(`### ${question.name}\n\n${question.acceptedAnswer.text}`));
    }
    const additions = getServiceFaqSections(language).flatMap((section) => section.items);
    assert.equal(additions.length, 20);
    assert.equal(new Set(additions.map((item) => item.id)).size, 20);
  }
});

test('robots and llms files are real text resources with valid local destinations', async () => {
  const robots = await readFile(resolve(outDir, 'robots.txt'), 'utf8');
  assert.ok(robots.includes('Sitemap: https://www.wisdomapp.es/sitemap.xml'));
  assert.ok(!robots.includes('<html'));
  const llms = await readFile(resolve(outDir, 'llms.txt'), 'utf8');
  assert.ok(llms.startsWith('# Wisdom\n'));
  for (const match of llms.matchAll(/\]\((https:\/\/www\.wisdomapp\.es[^)]+)\)/g)) {
    const url = new URL(match[1]);
    if (pages.some((page) => page.canonical === url.href)) continue;
    await access(resolve(outDir, `.${url.pathname}`));
  }
});

test('optimized photograph preserves all visible pixels and reduces transfer size', async () => {
  const source = await readFile('public/images/pro_alone4.png');
  const result = await readFile(resolve(outDir, 'images/pro_alone4.webp'));
  assert.ok(result.length < source.length);
  const original = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const optimized = await sharp(result).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual(original.info, optimized.info);
  for (let i = 0; i < original.data.length; i += 4) {
    assert.equal(original.data[i + 3], optimized.data[i + 3]);
    if (original.data[i + 3] > 0) assert.ok(original.data.subarray(i, i + 3).equals(optimized.data.subarray(i, i + 3)));
  }
});

test('responsive image candidates exist, preserve aspect ratio and match current local sources', async () => {
  const images = JSON.parse(await readFile('src/seo/responsiveImages.json', 'utf8'));
  for (const [source, image] of Object.entries(images)) {
    if (source.startsWith('/')) {
      const bytes = await readFile(`public${source}`);
      assert.equal(createHash('sha256').update(bytes).digest('hex').slice(0, 16), image.sourceHash, `Run npm run images:optimize after changing ${source}`);
    }
    for (const variant of image.variants) {
      const metadata = await sharp(resolve(outDir, `.${variant.src}`)).metadata();
      assert.equal(metadata.width, variant.width);
      assert.ok(Math.abs(metadata.height - image.height * variant.width / image.width) <= 1);
      assert.ok(metadata.width <= image.width);
    }
  }
});
