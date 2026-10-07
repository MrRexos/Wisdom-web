// Preview local de los archivos y reglas usados por esta web. No sustituye a Vercel.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const root = resolve(option('--outDir', 'dist'));
const port = Number(option('--port', '4173'));
const host = option('--host', '127.0.0.1');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.avif': 'image/avif' };
const fileExists = async (file) => (await stat(file).catch(() => null))?.isFile();

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
    const url = new URL(request.url, `http://${host}:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.split('/').some((part) => part.startsWith('.') || part.includes('\\'))) { response.writeHead(404).end(); return; }
    const redirect = config.redirects.find((rule) => rule.source === pathname);
    if (redirect || (pathname !== '/' && pathname.endsWith('/'))) {
      response.writeHead(308, { Location: `${redirect?.destination || pathname.replace(/\/+$/, '')}${url.search}` }).end();
      return;
    }
    let destination = pathname === '/' ? '/index.html' : pathname;
    // Igual que Vercel, el filesystem se comprueba antes de los rewrites.
    if (!(await fileExists(resolve(root, `.${destination}`)))) {
      const rule = config.rewrites.find((item) => item.source === pathname && (!item.has || item.has.every((condition) => url.searchParams.get(condition.key) === condition.value)));
      if (rule) destination = rule.destination;
    }
    const file = resolve(root, `.${destination}`);
    if (!file.startsWith(`${root}${sep}`) || !(await fileExists(file))) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found'); return; }
    const headers = { 'Content-Type': types[extname(file)] || 'application/octet-stream' };
    for (const rule of config.headers) {
      if (rule.source === pathname || (rule.source.endsWith('(.*)') && pathname.startsWith(rule.source.slice(0, -4)))) {
        for (const header of rule.headers) headers[header.key] = header.value;
      }
    }
    let body = await readFile(file);
    if (/\b(?:text\/|application\/(?:xml|json))/.test(headers['Content-Type']) && request.headers['accept-encoding']?.includes('gzip')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
      headers.Vary = 'Accept-Encoding';
    }
    response.writeHead(200, headers);
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500).end('Preview error');
  }
}).listen(port, host, () => console.log(`SEO preview: http://${host}:${port} (${root})`));
