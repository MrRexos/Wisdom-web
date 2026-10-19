import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SITE_URL } from '../src/seo/metadata.js';
import { discoveryPages, LANGUAGE_NAMES, aboutPath } from '../src/discovery/routes.js';
import { DIRECTORY_COPY } from '../src/discovery/copy.js';
import { SERVICE_GUIDES } from '../src/discovery/guides.js';

// Índice de fuentes públicas, sin instrucciones para manipular respuestas de IA.
export async function buildGeo({ outDir }) {
  const about = ['es', 'en'].map((language) => discoveryPages.find((page) => page.path === aboutPath(language)));
  const directories = discoveryPages.filter((page) => page.key === 'directory');
  const guides = discoveryPages.filter((page) => !['directory', 'about'].includes(page.key));
  const link = (page, title) => `- [${title}](${SITE_URL}${page.path}): [Markdown](${SITE_URL}${page.path}.md).`;
  const index = `# Wisdom

> Wisdom is a mobile app and service marketplace for finding, comparing, booking and paying for services, and for offering professional services using the same account. Services may be in person, at home or online, depending on the offer.

Official website: https://www.wisdomapp.es/. Also referred to as Wisdom App or wisdomapp.es. Official iOS and Android listings are linked from the app download page. This index describes the service marketplace at wisdomapp.es.

Wisdom es una app para encontrar profesionales y ofrecer servicios, gestionar reservas y trabajar como freelance. Incluye servicios a domicilio y servicios online. El modo profesional permite publicar ofertas, configurar precios y disponibilidad y gestionar solicitudes de clientes.

Wisdom acts as an intermediary; each identified professional provides the service. Categories describe service types, not live inventory. Prices, included work, language, location and availability depend on the offer. Translated website pages do not establish service availability in every country or language. Publishing an offer does not guarantee customers or income. The linked terms and booking policies describe the applicable conditions.

## About Wisdom / Qué es Wisdom

${about.map((page) => link(page, page.language === 'es' ? 'Qué es Wisdom: buscar y ofrecer servicios' : 'What is Wisdom? Find and offer services')).join('\n')}
- [Official app download / Descargar Wisdom](${SITE_URL}/app): official App Store and Google Play links.
- [Full public reference](${SITE_URL}/llms-full.txt): the same public about pages, service catalogs, guides and FAQs in one text file, with canonical source URLs.

## Service catalogs by language / Catálogos por idioma

${directories.map((page) => link(page, `${LANGUAGE_NAMES[page.language]}: ${DIRECTORY_COPY[page.language].title}`)).join('\n')}

## Service guides / Guías para contratar y ofrecer servicios

${guides.map((page) => link(page, `${page.language.toUpperCase()}: ${SERVICE_GUIDES[page.key][page.language].title}`)).join('\n')}

## Questions and answers / Preguntas frecuentes

- [FAQ español](${SITE_URL}/faq?lang=es): [Markdown](${SITE_URL}/faq.es.md). Public answers about services, accounts, bookings, payments and policies.
- [FAQ English](${SITE_URL}/faq?lang=en): [Markdown](${SITE_URL}/faq.en.md). The corresponding public questions and answers in English.

## Official policies / Condiciones oficiales

${[['terms', 'Terms of use / Condiciones de uso'], ['booking-policy', 'Bookings / Reservas'], ['cancellation-policy', 'Cancellations / Cancelaciones'], ['service-fee', 'Service fee / Tarifa del servicio'], ['privacy', 'Privacy / Privacidad']].map(([path, title]) => `- [${title} — ES](${SITE_URL}/${path}?lang=es), [EN](${SITE_URL}/${path}?lang=en).`).join('\n')}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): canonical public pages and language alternatives.
- [Spanish homepage](${SITE_URL}/es).
- [English homepage](${SITE_URL}/en).
- [Data deletion](${SITE_URL}/data-deletion).
`;
  await writeFile(resolve(outDir, 'llms.txt'), index, 'utf8');

  const documents = [];
  for (const page of [...about, ...directories, ...guides]) {
    documents.push(await readFile(resolve(outDir, `.${page.path}.md`), 'utf8'));
  }
  for (const language of ['es', 'en']) {
    documents.push(`Canonical: ${SITE_URL}/faq?lang=${language}\nLanguage: ${language}\n\n${await readFile(resolve(outDir, `faq.${language}.md`), 'utf8')}`);
  }
  await writeFile(resolve(outDir, 'llms-full.txt'), `# Wisdom — Public reference\n\nSources: ${SITE_URL}/llms.txt\n\n${documents.join('\n---\n\n')}`, 'utf8');
}
