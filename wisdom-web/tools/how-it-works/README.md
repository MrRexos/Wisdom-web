# How Wisdom works — screenshot sources

Eight English, light-theme illustrations exported from HTML ports of existing
Expo screens. All people, listings, bookings, reviews, addresses, messages and
amounts are fictional. No API, account or database is used.

The production site uses `public/images/how-it-works/{step}.png`. Each file is
1125 × 2436 pixels, rendered at 3× from a 375 × 812 point viewport with an iOS
status bar and home indicator. The existing website phone supplies its frame.
The screenshots remain in English for every website locale.

The screen fits the opening of `phone.png` with a single proportional mask on
desktop and mobile: x=34, y=24 and width=334 on the 400 × 772 frame. Its 375:812
aspect ratio preserves the whole screenshot. Elliptical CSS radius percentages
produce circular corners (about 47 frame pixels) instead of the old fixed
desktop radius and vertically stretched mobile corners. The animated images
remain clipped by this same mask during transitions.

## Screen mapping

All paths below are relative to `Wisdom-repo/Wisdom_expo`.

| Step | Source screen and visible state |
| --- | --- |
| Search | `screens/home/HomeScreen.js`, `components/home/HomeDiscoveryContent.js`, `HomeServiceCard.js` and `HomeFamilyCard.js`; populated discovery feed |
| Choose | `screens/home/ServiceProfileScreen.js`; customer viewing Emma's service |
| Reserve | `screens/booking/BookingScreen.js`; date, address and payment method selected |
| Relax | `screens/chat/ConversationScreen.js`; customer and professional discussing the booking |
| Publish | `screens/professional/ListingsProScreen.js`; two published services |
| Manage | `screens/professional/TodayProScreen.js`; active client bookings |
| Deliver | `screens/booking/BookingDetailsScreen.js`, professional view; service in progress with the finish action |
| Earn | `screens/professional/WalletProScreen.js`; total earnings and the actual wallet menu |

`screens.jsx` and `screens.css` translate the visible JSX/NativeWind layouts,
spacing, light-theme palette, typography and English labels into static HTML.
The Inter font files and default avatar are copied from the app. Client avatars
without a photo use the app's initials fallback. The wallet intentionally keeps
the original sparse layout; there are no invented charts or wallet functions.

These are source-based HTML recreations, not native-device captures. Browser
font rasterization, system-font fallback and web SVG icons can differ slightly
from iOS. A pixel-for-pixel comparison against an installed iOS build has not
been performed. Recheck these ports when the source screens change.

## Preview and export

Start Vite from the web project:

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5186 --strictPort
```

Open `/tools/how-it-works/index.html` for the contact sheet or append
`?screen=search` (or another step) for one screen. This development entry is not
included in the production build.

Run `node tools/how-it-works/export.mjs` with `playwright` and `sharp` resolvable
through Node. A local Chrome installation is required. In Codex, the bundled
runtime's `node_modules` directory can be supplied through `NODE_PATH`; no new
app runtime dependency is required. Override `WISDOM_SCREENSHOT_URL` to use
another local Vite port.

The exporter waits for fonts and image decoding, checks the viewport, fails on
browser errors, produces lossless PNG assets and saves PNG originals, a contact
sheet and size metadata under `output/playwright/how-it-works/` (gitignored).

## Generated photography

Generated with the built-in Imagegen tool on 2026-10-07. Final local photos:
`assets/cleaning.jpg`, `assets/training.jpg`, `assets/room.jpg`. `assets/emma.jpg`
is a crop of the fictional cleaning professional. JPEG conversion and crops
were performed with Sharp. The prompts are recorded in `image-prompts.md`.
