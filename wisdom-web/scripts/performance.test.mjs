import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';

const outDir = resolve(process.env.SEO_BUILD_DIR || 'dist');
const images = JSON.parse(await readFile('src/seo/performanceImages.json', 'utf8'));

test('responsive app screenshots and icons preserve source resolution and visible pixels', async () => {
  for (const [key, entry] of Object.entries(images)) {
    const source = await readFile(key === 'wisdom-icon' ? 'src/assets/official_app_icon.png' : `public${key}`);
    assert.equal(createHash('sha256').update(source).digest('hex').slice(0, 16), entry.sourceHash, key);
    assert.equal(entry.variants.at(-1).width, entry.width, `${key}: retain original resolution`);
    for (const variant of entry.variants) {
      const original = await sharp(source).resize({ width: variant.width, withoutEnlargement: true })
        .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const optimized = await sharp(resolve(outDir, `.${variant.src}`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      assert.equal(optimized.info.width, original.info.width, variant.src);
      assert.equal(optimized.info.height, original.info.height, variant.src);
      for (let i = 0; i < original.data.length; i += 4) {
        assert.equal(optimized.data[i + 3], original.data[i + 3], `${variant.src}: alpha`);
        if (original.data[i + 3] > 0) {
          assert.equal(optimized.data.readUInt32LE(i), original.data.readUInt32LE(i), `${variant.src}: visible pixel ${i / 4}`);
        }
      }
    }
  }
});

test('home and FAQ use local Inter fonts with all existing weights and valid preload', async () => {
  const fonts = JSON.parse(await readFile('public/assets/inter/sources.json', 'utf8'));
  const css = await readFile(`public/assets/inter/${fonts.cssFile}`, 'utf8');
  for (const weight of [300, 400, 500, 600, 700]) assert.ok(css.includes(`font-weight: ${weight};`));
  assert.ok(!css.includes('https://'));
  for (const font of fonts.fonts) {
    const data = await readFile(resolve(outDir, `assets/inter/${font.file}`));
    assert.equal(data.length, font.bytes);
    assert.ok(font.file.includes(createHash('sha256').update(data).digest('hex').slice(0, 12)));
  }
  const pages = JSON.parse(await readFile(resolve(outDir, '.vite/seo-pages.json'), 'utf8'));
  for (const page of pages.filter((item) => !item.kind)) {
    const html = await readFile(resolve(outDir, page.file), 'utf8');
    assert.ok(!html.includes('fonts.googleapis.com'), page.file);
    assert.ok(html.includes(`<style data-fonts="inter">${css}</style>`), page.file);
    assert.match(html, /rel="preload" href="\/assets\/inter\/inter-[a-f0-9]+\.woff2" as="font"/);
  }
});
