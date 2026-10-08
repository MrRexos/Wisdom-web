# React + Vite

## Catálogo y guías de servicios

La ampliación de servicios se genera de forma independiente de las páginas que ya
existían. No cambia sus textos, metadatos, componentes, navegación ni estilos.

- Catálogos traducidos a los 12 idiomas de la web, con las 38 categorías públicas:
  `/es/servicios`, `/en/services`, `/ca/serveis`, etc.
- Nueve guías originales, en español e inglés: servicios a domicilio, limpieza,
  reparaciones, clases particulares, online/freelancers, ofrecer servicios,
  bienestar, mascotas y eventos.
- `src/discovery/routes.js` define las rutas, equivalencias entre idiomas y
  categorías; `copy.js` y `guides.js` contienen los textos de las páginas nuevas.
- `src/discovery/server.jsx` renderiza HTML estático. No se envía React ni otro
  JavaScript a estas páginas. El CSS propio se publica con una huella de contenido
  y solo se carga en las nuevas rutas.
- Inter se sirve localmente solo en estas páginas; los WOFF2 originales, su
  procedencia y licencia OFL están en `src/discovery/fonts`. El build funciona
  sin descargar fuentes. El icono optimizado también se genera por separado.
- `scripts/build-discovery.mjs` se ejecuta después del prerenderizado anterior.
  Las nuevas URLs se añaden al sitemap y a los rewrites exactos de Vercel. Tras
  cambiar las rutas, ejecutar `node scripts/sync-seo-routes.mjs` antes del build.
- El build genera 73 documentos HTML y 71 URLs indexables. Las rutas internas
  `/seo/discovery/...` son copias de implementación con `noindex`.

Para respetar la conservación de todas las páginas actuales, no se añaden enlaces
desde ellas. Los catálogos y guías nuevos se enlazan entre sí y se anuncian en el
sitemap. La disponibilidad real y las reservas se consultan en la app; estas
páginas no simulan listados, precios, reseñas ni cobertura por ciudades.

Validación: `npm.cmd run build` y `npm.cmd test`. Las pruebas cubren traducciones,
enlaces y anclas, canonicals/hreflang, datos estructurados y aislamiento de la
aplicación existente. También se puede usar `SEO_BUILD_DIR` con un `--outDir`
alternativo, como en las instrucciones de SEO técnico de este documento.

Después de desplegar, comprobar las rutas públicas nuevas en Vercel y la lectura
de `https://www.wisdomapp.es/sitemap.xml` en Search Console. El preview local no
confirma las reglas reales del proveedor ni el acceso desde Google. Medir por
página, consulta, país e idioma las impresiones, clics y posición; publicar las
páginas no garantiza su indexación o una posición concreta.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Enlace único de descarga

`https://wisdomapp.es/app` redirige a la App Store en iPhone/iPad (incluido Safari
en modo escritorio) y a Google Play en Android. En ordenador o en un dispositivo
no reconocido muestra las dos tiendas y un QR con ese mismo enlace público.
Si el navegador bloquea la redirección, quedan disponibles los enlaces manuales.

Los destinos se definen en `src/appLinks.js`. La ruta también admite `/app/` y
parámetros de campaña, sin utilizarlos para cambiar el destino. La página detecta
el idioma preferido del navegador y dispone de español, catalán, inglés, chino,
árabe, francés y portugués. El árabe se muestra de derecha a izquierda. Esta ruta
no usa la geolocalización ni el idioma guardado por otras páginas; si ninguno de
los idiomas preferidos está disponible, muestra inglés.

El rewrite existente de `vercel.json` sirve esta ruta al entrar directamente.
Para activar el enlace público hay que desplegar esta versión de la web; no
requiere cambios en la app móvil, el backend ni la base de datos.

## SEO técnico

Usar Node 24, como en Vercel. `npm run build` genera la aplicación y prerenderiza
sus componentes reales en HTML estático dentro de `dist`; no necesita navegador,
API, base de datos ni un servidor de renderizado en producción. No ejecutar solo
`vite build` para desplegar: se omitirían el prerenderizado y los archivos SEO.

- `/` conserva la detección del idioma del navegador. `/es`, `/en`, `/ca`, etc.
  fijan una de las doce traducciones existentes y tienen HTML propio, canonical
  y enlaces `hreflang`. Son las URLs que permiten indexar cada idioma de forma estable.
- Las rutas legales conservan `?lang=es` y `?lang=en`; cada variante se sirve con
  su propio HTML. `/faq?lang=es` incluye 129 preguntas (109 originales y 20 sobre
  servicios). El contenido editorial vive en `src/legal/serviceFaq.js`; no editar
  los JSON legales sincronizados para cambiar estas preguntas.
- `robots.txt`, `sitemap.xml` y `faq.es.md` / `faq.en.md` se generan en cada build.
  `public/llms.txt` enlaza las versiones Markdown de la FAQ y las políticas.
  `llms.txt` es una ayuda para herramientas de IA, no una garantía de posicionamiento.
- Los metadatos de cada página incluyen título, descripción, canonical, Open
  Graph, Twitter y JSON-LD. El marcado de la FAQ usa las mismas respuestas visibles;
  no implica que Google vaya a mostrar resultados enriquecidos.
- `/users` y `/data-deletion` siguen disponibles, con `noindex`, fuera del sitemap.
  Las rutas inexistentes ya no se reescriben a la portada: Vercel devuelve 404.
- El cliente carga el JavaScript de cada ruta cuando se necesita. Conserva el
  HTML inicial hasta tener el componente listo y después monta React; no se usa
  hidratación porque las escenas existentes dependen del viewport y del azar.
- Las fuentes mantienen Inter y los mismos pesos; ahora se descubren en el HTML.
  La foto `pro_alone4.png` se convierte a WebP sin pérdida al compilar. Las imágenes
  del teléfono y de las escenas inferiores se cargan de forma diferida.
- Las fotos y capturas usan `srcset` con versiones WebP adaptadas al dispositivo,
  conservando imagen, proporciones y CSS. Las capturas usan calidad 95 y las fotos
  calidad 86. Las variantes llevan huella del original, tamaño y calidad en el
  nombre para permitir caché inmutable. Se guardan en `public/images/responsive`;
  `npm run images:optimize` las regenera al cambiar imágenes (necesita acceso al
  bucket público para actualizar los originales remotos). El build normal usa
  las copias guardadas y no depende de ese bucket.

`scripts/seo-routes.mjs` es la fuente de las reglas de rutas. Después de cambiarlas,
ejecutar `node scripts/sync-seo-routes.mjs` para actualizar `vercel.json`. El build
comprueba que ambos coinciden. No añadir un fallback global a `/`.

### Verificación local

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run preview
```

El preview de `http://127.0.0.1:4173` reproduce las reglas utilizadas por este
proyecto, incluidos idiomas, redirecciones y 404. No es el runtime real de Vercel.
Para otra carpeta: `npm.cmd run build -- --outDir output/playwright/seo-build` y
`npm.cmd run preview -- --outDir output/playwright/seo-build`.
Las pruebas aceptan la variable `SEO_BUILD_DIR` para comprobar esa carpeta.

Las pruebas comprueban los archivos generados, no solo las plantillas: canonicals,
idiomas, sitemap, robots, recursos enlazados, paridad FAQ/JSON-LD/Markdown y píxeles
de la imagen optimizada. Los avisos previos de GSAP sobre `invalidateOnRefresh`
pertenecen a las animaciones existentes y no se modifican con este trabajo.

### Después del despliegue

1. Comprobar `/es`, `/faq?lang=es`, `/app`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`
   y una ruta inexistente en el dominio público. Confirmar HTTP 200, tipos MIME
   correctos y 404 para la inexistente; verificar también las reglas de idioma.
2. En Google Search Console, enviar `https://www.wisdomapp.es/sitemap.xml` e
   inspeccionar `/es` y `/faq?lang=es` para solicitar indexación.
3. Consultar cobertura, consultas e impresiones en Search Console. El SEO técnico
   facilita el rastreo; las primeras posiciones también dependen del contenido,
   la competencia y la autoridad del sitio. No se han modificado ni consultado
   propiedades privadas de Search Console desde este proyecto.
