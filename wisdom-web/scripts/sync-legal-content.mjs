import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';

const source = new URL('../../../Wisdom-repo/Wisdom_expo/languages/legal/', import.meta.url);
const target = new URL('../src/legal/content/', import.meta.url);
const files = ['es.json', 'en.json', 'ca.json', 'fr.json', 'ar.json', 'zh.json', 'index.js', 'source-manifest.json'];
const checkOnly = process.argv.includes('--check');
if (!checkOnly) mkdirSync(target, { recursive: true });
for (const file of files) {
  if (!checkOnly) copyFileSync(new URL(file, source), new URL(file, target));
  assert(readFileSync(new URL(file, source)).equals(readFileSync(new URL(file, target))), `${file}: app/web legal content differs`);
}
console.log(`Legal content ${checkOnly ? 'verified' : 'synchronized'}: six languages, identical app/web copies.`);
