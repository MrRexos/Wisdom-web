import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, sep } from 'node:path';
import sharp from 'sharp';

// Se ejecuta al cambiar las imágenes, no durante el deploy: el build funciona offline.
const code = (await Promise.all(['src/App.jsx', 'src/i18n/serviceFamilyData.js'].map((file) => readFile(file, 'utf8')))).join('\n');
const remote = [...new Set(code.match(/https:\/\/storage\.googleapis\.com\/wisdom-images\/[^'"\s]+/g))];
const screens = (await readdir('public/images/how-it-works')).filter((file) => file.endsWith('.webp')).map((file) => `/images/how-it-works/${file}`);
const sources = [...remote, ...screens];
const result = {};
const previous = JSON.parse(await readFile('src/seo/responsiveImages.json', 'utf8').catch(() => '{}'));
await mkdir('public/images/responsive', { recursive: true });
let index = 0;
async function worker() {
  while (index < sources.length) {
    const source = sources[index++];
    let buffer;
    if (source.startsWith('https://')) {
      const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`${response.status}: ${source}`);
      buffer = Buffer.from(await response.arrayBuffer());
    } else {
      buffer = await readFile(`public${source}`);
    }
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 16);
    const metadata = await sharp(buffer).metadata();
    const max = source.includes('search_services') ? 1280 : 960;
    const widths = [...new Set([320, 640, max].map((width) => Math.min(width, metadata.width)))].sort((a, b) => a - b);
    const variants = [];
    for (const width of widths) {
      const quality = source.includes('search_services') || source.includes('how-it-works') ? 95 : 86;
      const file = `/images/responsive/${hash}-${width}-q${quality}.webp`;
      await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6, smartSubsample: true }).toFile(`public${file}`);
      variants.push({ width, src: file });
    }
    result[source] = { sourceHash: hash, width: metadata.width, height: metadata.height, variants };
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await writeFile('src/seo/responsiveImages.json', `${JSON.stringify(Object.fromEntries(Object.entries(result).sort()), null, 2)}\n`, 'utf8');
const kept = new Set(Object.values(result).flatMap((item) => item.variants.map((variant) => variant.src)));
const outputRoot = `${resolve('public/images/responsive')}${sep}`;
for (const old of Object.values(previous).flatMap((item) => item.variants)) {
  const file = resolve(`public${old.src}`);
  if (!kept.has(old.src) && file.startsWith(outputRoot)) await unlink(file).catch((error) => { if (error.code !== 'ENOENT') throw error; });
}
console.log(`Generated responsive images for ${sources.length} sources.`);
