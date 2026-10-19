import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { discoveryPages, SERVICE_GROUPS } from '../src/discovery/routes.js';
import { DIRECTORY_COPY } from '../src/discovery/copy.js';
import { SERVICE_GUIDES } from '../src/discovery/guides.js';
import { ABOUT_WISDOM } from '../src/discovery/about.js';
import { renderMarkdown } from '../src/discovery/markdown.js';
import { applicationSchema, organizationSchema, websiteSchema, APPLICATION_ID } from '../src/seo/entity.js';
import { SITE_URL } from '../src/seo/metadata.js';
import { vercelConfig } from './seo-routes.mjs';

const root = resolve(process.env.SEO_BUILD_DIR || 'dist');
const pages = JSON.parse(await readFile(resolve(root, '.vite/seo-pages.json'), 'utf8'));
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const html = new Map(await Promise.all(pages.map(async (page) => [page.canonical, await readFile(resolve(root, page.file), 'utf8')])));
const file = (path) => readFile(resolve(root, `.${path}`), 'utf8');

test('one consistent organization and website identity; app schema only on pages about the app', () => {
  for (const page of pages) {
    const graph = JSON.parse(html.get(page.canonical).match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    assert.deepEqual(graph.find((item) => item['@type'] === 'Organization'), organizationSchema(), page.canonical);
    assert.deepEqual(graph.find((item) => item['@type'] === 'WebSite'), websiteSchema(), page.canonical);
    const aboutApp = ['/', '/app', '/es/sobre-wisdom', '/en/about-wisdom'].includes(page.path);
    const app = graph.filter((item) => item['@type'] === 'MobileApplication');
    assert.equal(app.length, aboutApp ? 1 : 0, page.canonical);
    if (aboutApp) {
      assert.deepEqual(app[0], applicationSchema());
      assert.equal(graph[2].mainEntity['@id'], APPLICATION_ID);
      assert.ok(!('aggregateRating' in app[0] || 'offers' in app[0] || 'review' in app[0]));
    }
  }
});

test('Markdown alternatives contain the same factual content and source language as public pages', async () => {
  for (const page of discoveryPages) {
    const canonical = `${SITE_URL}${page.path}`;
    const markdown = await file(`${page.path}.md`);
    const document = decode(html.get(canonical));
    assert.ok(markdown.includes(`Canonical: ${canonical}\nLanguage: ${page.language}`));
    assert.ok(document.includes(`href="${canonical}.md" type="text/markdown"`));
    assert.equal((markdown.match(/^# /gm) || []).length, 1, canonical);
    let paragraphs;
    if (page.key === 'directory') {
      const copy = DIRECTORY_COPY[page.language];
      paragraphs = ['title', 'intro', 'local', 'online', 'compare', 'pro', 'availability'].map((key) => copy[key]);
      paragraphs.push(...SERVICE_GROUPS.flatMap((group) => group.ids).map((id) => document.match(new RegExp(`id="category-${id}">([^<]+)</li>`))[1]));
    } else if (page.key === 'about') {
      const copy = ABOUT_WISDOM[page.language];
      paragraphs = [copy.title, copy.intro, copy.reviewed, ...copy.sections.flatMap(([, title, text]) => [title, text]), ...copy.questions.flat()];
    } else {
      const copy = SERVICE_GUIDES[page.key][page.language];
      paragraphs = [copy.title, copy.intro, ...copy.sections.flat(), ...copy.checklist, copy.question, copy.answer];
    }
    for (const text of paragraphs) {
      assert.ok(document.includes(text), `${canonical}: visible ${text}`);
      assert.ok(markdown.includes(text), `${canonical}: Markdown ${text}`);
    }
    const rule = vercelConfig().headers.find((item) => item.source === `${page.path}.md`);
    assert.equal(rule.headers.find((item) => item.key === 'Content-Type').value, 'text/markdown; charset=utf-8');
    assert.equal(rule.headers.find((item) => item.key === 'Link').value, `<${canonical}>; rel="canonical"`);
  }
});

test('LLM index and full reference cover all languages and guides with resolvable source links', async () => {
  const index = await file('/llms.txt');
  const full = await file('/llms-full.txt');
  for (const page of discoveryPages) {
    assert.ok(index.includes(`](${SITE_URL}${page.path})`));
    assert.ok(index.includes(`](${SITE_URL}${page.path}.md)`));
    assert.ok(full.includes(await file(`${page.path}.md`)), page.path);
  }
  for (const language of ['es', 'en']) assert.ok(full.includes(await file(`/faq.${language}.md`)));
  for (const markdown of [index, full]) {
    for (const match of markdown.matchAll(/\]\((https:\/\/www\.wisdomapp\.es[^)]+)\)/g)) {
      const url = new URL(match[1]);
      const hash = url.hash;
      url.hash = '';
      if (html.has(url.href)) {
        if (hash) assert.ok(html.get(url.href).includes(`id="${hash.slice(1)}"`), match[1]);
      } else await access(resolve(root, `.${url.pathname}`));
    }
  }
});

test('public content remains crawlable for search and AI crawlers without special hidden versions', async () => {
  assert.equal(await file('/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  for (const page of pages.filter((item) => item.indexable)) {
    assert.ok(!/name="(?:robots|googlebot)"[^>]*content="[^"]*(?:nosnippet|noai|max-snippet:0)/.test(html.get(page.canonical)));
  }
  assert.ok(vercelConfig().rewrites.every((rule) => (rule.has || []).every((condition) => condition.type !== 'header')));
});

test('Markdown serializer retains Unicode, numbered steps and absolute source links', () => {
  const element = createElement('article', null,
    createElement('h1', null, 'Guía: català, español, 中文'),
    createElement('ol', null, ['Uno', 'Dos'].map((text) => createElement('li', { key: text }, text))),
    createElement('a', { href: '/es#servicios' }, 'Guía [ES]'),
    createElement('span', { 'aria-hidden': true }, 'decorative'),
  );
  const markdown = renderMarkdown(element, `${SITE_URL}/es`);
  assert.ok(markdown.includes('# Guía: català, español, 中文'));
  assert.ok(markdown.includes('1. Uno\n2. Dos'));
  assert.ok(markdown.includes(`[Guía \\[ES\\]](${SITE_URL}/es#servicios)`));
  assert.ok(!markdown.includes('decorative'));
});
