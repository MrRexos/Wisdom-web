import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';
import { getBrowserLocale, SUPPORTED_LOCALES } from '../src/i18n/detectLocale.js';
import { getAppDownloadCopy, getAppDownloadLocale } from '../src/i18n/appDownloadCopy.js';
import { getLegalLocale, LEGAL_LANGUAGES } from '../src/legal/language.js';

let server;
let translations;
before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  ({ translations } = await server.ssrLoadModule('/src/i18n/translations.js'));
});
after(async () => { await server?.close(); });

test('uses supported browser preferences in order, including Catalan variants', () => {
  assert.equal(getBrowserLocale({ languages: ['ca-ES-valencia', 'es-ES'], language: 'en-US' }), 'ca');
  assert.equal(getBrowserLocale({ languages: ['sv-SE', 'de-DE', 'en-US'], language: 'fr' }), 'de');
  assert.equal(getBrowserLocale({ languages: ['pt_BR'] }), 'pt');
  assert.equal(getBrowserLocale({ languages: ['zh-Hant-TW'] }), 'zh');
});

test('handles missing and malformed preferences and falls back to English', () => {
  assert.equal(getBrowserLocale({ language: 'FR-ca' }), 'fr');
  assert.equal(getBrowserLocale({ languages: [null, '', 42], language: 'es-MX' }), 'es');
  assert.equal(getBrowserLocale({ languages: 'ca', language: 'it' }), 'it');
  assert.equal(getBrowserLocale({ languages: ['sv-SE'] }), 'en');
  assert.equal(getBrowserLocale({}), 'en');
});

test('country and historical stored language cannot override browser preferences', () => {
  assert.equal(getBrowserLocale({ languages: ['ca'], countryCode: 'US', storedLocale: 'en' }), 'ca');
  assert.equal(getBrowserLocale({ languages: ['en-GB'], countryCode: 'ES', storedLocale: 'es' }), 'en');
});

function leafPaths(value, prefix = '') {
  return Object.entries(value).flatMap(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof item === 'object' ? leafPaths(item, path) : [[path, item]];
  });
}

test('all twelve languages have complete marketing and dashboard dictionaries', () => {
  assert.deepEqual(Object.keys(translations).sort(), [...SUPPORTED_LOCALES].sort());
  const dashboard = JSON.parse(readFileSync(new URL('../src/i18n/dashboardCopy.json', import.meta.url), 'utf8'));
  for (const dictionaries of [translations, dashboard]) {
    const expected = leafPaths(dictionaries.en).map(([path]) => path).sort();
    for (const locale of SUPPORTED_LOCALES) {
      const entries = leafPaths(dictionaries[locale]);
      assert.deepEqual(entries.map(([path]) => path).sort(), expected, locale);
      for (const [path, value] of entries) {
        assert.equal(typeof value, 'string', `${locale}:${path}`);
        assert.ok(value.trim() || path === 'families.forYou.description', `${locale}:${path}`);
        assert.ok(!value.includes('\uFFFD'), `${locale}:${path}`);
      }
    }
  }
});

test('download page and modal use the same languages and browser resolution', () => {
  for (const locale of SUPPORTED_LOCALES) {
    assert.equal(getAppDownloadLocale({ languages: [`${locale}-XX`, 'en'] }), locale);
    const copy = getAppDownloadCopy(locale);
    assert.deepEqual(Object.keys(copy).sort(), ['title', 'description', 'qrLabel', 'back'].sort());
    if (locale !== 'en') assert.notEqual(copy.title, getAppDownloadCopy('en').title);
  }
});

test('legal pages only select Spanish or English, with Spanish for Catalan', () => {
  assert.deepEqual(LEGAL_LANGUAGES, ['es', 'en']);
  assert.equal(getLegalLocale({ languages: ['ca-ES', 'en'] }), 'es');
  assert.equal(getLegalLocale({ languages: ['fr-FR', 'es'] }), 'es');
  assert.equal(getLegalLocale({ languages: ['en', 'es'] }), 'en');
  assert.equal(getLegalLocale({ languages: ['ja'] }), 'en');
});

test('translated steps keep their original IDs, order and screenshots', () => {
  for (const locale of SUPPORTED_LOCALES) {
    for (const mode of ['customers', 'professionals']) {
      const structure = (steps) => steps.map(({ id, screen }) => ({ id, screen }));
      assert.deepEqual(structure(translations[locale].howItWorksFlows[mode]), structure(translations.en.howItWorksFlows[mode]));
      assert.equal(translations[locale].security.features.length, 3);
    }
  }
});
