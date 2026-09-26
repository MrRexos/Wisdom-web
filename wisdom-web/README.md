# React + Vite

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
parámetros de campaña, sin utilizarlos para cambiar el destino. La página respeta
los cinco idiomas de la web: en, es, ca, fr y pt.

El rewrite existente de `vercel.json` sirve esta ruta al entrar directamente.
Para activar el enlace público hay que desplegar esta versión de la web; no
requiere cambios en la app móvil, el backend ni la base de datos.
