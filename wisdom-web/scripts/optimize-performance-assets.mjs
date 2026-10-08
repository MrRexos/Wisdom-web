// Generar una vez al actualizar los originales; el build no necesita la red.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const output = 'public/images/responsive';
await mkdir(output, { recursive: true });
const manifest = {};
const screens = (await readdir('public/images/how-it-works')).filter((file) => file.endsWith('.png'));
const sources = screens.map((file) => [`/images/how-it-works/${file}`, `public/images/how-it-works/${file}`, [400, 800, 1125]]);
sources.push(['wisdom-icon', 'src/assets/official_app_icon.png', [64, 128, 256, 512, 1000]]);
for (const [key, path, widths] of sources) {
  const source = await readFile(path);
  const { width, height } = await sharp(source).metadata();
  const hash = createHash('sha256').update(source).digest('hex').slice(0, 16);
  const variants = [];
  for (const size of [...new Set(widths.map((value) => Math.min(value, width)))]) {
    const src = `/images/responsive/${hash}-${size}-lossless.webp`;
    // Sin pérdidas de compresión, incluso en la versión a resolución original.
    await sharp(source).resize({ width: size, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 }).toFile(`public${src}`);
    variants.push({ width: size, src });
  }
  manifest[key] = { sourceHash: hash, width, height, variants };
}
await writeFile('src/seo/performanceImages.json', `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated lossless variants for ${sources.length} assets; pro_alone remains untouched.`);
