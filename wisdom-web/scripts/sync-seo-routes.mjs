import { writeFile } from 'node:fs/promises';
import { vercelConfig } from './seo-routes.mjs';

await writeFile('vercel.json', `${JSON.stringify(vercelConfig(), null, 2)}\n`, 'utf8');
