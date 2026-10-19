import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';

const before = resolve('output/playwright/seo-geo-before');
const after = resolve('output/playwright/seo-geo-after');
const manifest = JSON.parse(await readFile(resolve(before, '.vite/seo-pages.json'), 'utf8'));
const visibleText = (html) => html.match(/<body\b[^>]*>([\s\S]*)<\/body>/)[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
let exactBodies = 0;
for (const page of manifest) {
  const [original, result] = await Promise.all([before, after].map((dir) => readFile(resolve(dir, page.file), 'utf8')));
  assert.equal(visibleText(result), visibleText(original), page.file);
  if (result.match(/<body\b[^>]*>[\s\S]*<\/body>/)[0] === original.match(/<body\b[^>]*>[\s\S]*<\/body>/)[0]) exactBodies++;
}
const assets = [];
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await collect(path);
    else assets.push(relative(before, path));
  }
}
await collect(resolve(before, 'assets'));
await collect(resolve(before, 'images'));
for (const path of assets) {
  const buffers = await Promise.all([before, after].map((dir) => readFile(resolve(dir, path))));
  assert.ok(buffers[0].equals(buffers[1]), path);
}
const urls = ['/es/sobre-wisdom', '/en/about-wisdom', '/es/servicios', '/faq?lang=es', '/es/sobre-wisdom.md', '/es/servicios.md', '/faq.en.md', '/llms.txt', '/llms-full.txt', '/robots.txt', '/sitemap.xml'];
const responses = [];
for (const path of urls) {
  const response = await fetch(`http://127.0.0.1:4196${path}`);
  assert.equal(response.status, 200, path);
  responses.push({ path, status: response.status, type: response.headers.get('content-type'), canonical: response.headers.get('link') });
  if (path.endsWith('.md')) assert.match(response.headers.get('content-type'), /^text\/markdown; charset=utf-8$/);
}
assert.equal((await fetch('http://127.0.0.1:4196/no-existe-geo')).status, 404);
const agents = ['Mozilla/5.0', 'OAI-SearchBot/1.4', 'PerplexityBot/1.0', 'Claude-SearchBot/1.0', 'Googlebot/2.1', 'bingbot/2.0'];
const contents = [];
for (const agent of agents) {
  const response = await fetch('http://127.0.0.1:4196/es/sobre-wisdom', { headers: { 'User-Agent': agent } });
  assert.equal(response.status, 200);
  contents.push(createHash('sha256').update(await response.text()).digest('hex'));
}
assert.equal(new Set(contents).size, 1);
const report = { existingPagesTextUnchanged: manifest.length, exactBodies, assetsByteIdentical: assets.length, agentsSameHtml: agents, responses, unknownPathStatus: 404 };
await writeFile(resolve('output/playwright/geo-verification-20261019.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 2));
