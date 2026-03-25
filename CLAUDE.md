# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (hot reload)
- `npm run build` — Production build (outputs to `dist/`)
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build locally
- `node src/scripts/seedFirestore.js` — Seed/reset Firestore with itinerary data
- `node src/scripts/exportFirestore.js` — Export current Firestore data as JSON (for syncing seed script)
- `npx firebase deploy --only hosting` — Deploy to Firebase Hosting (https://miami-trip0330.web.app)

## Architecture

Single-trip Travel Management PWA named **漫漫 ManMan** for a Miami trip (Mar 30–Apr 3, 2026). Two users only (developer + mother). No auth, no multi-trip support.

**Stack:** React 18 (Vite 5) + Tailwind CSS 4 + Firebase Cloud Firestore + lucide-react icons. PWA via vite-plugin-pwa.

### Firestore Schema (flat top-level collections, no nesting)

- `trip/info` — Single document: trip metadata + toolkit (flights, accommodations arrays)
- `days/{day-1..day-5}` — Each document has `date`, `dayNumber`, `title`, `heroImage`, and an `items` array (embedded, not subcollection). Items have: `id`, `type` ("attraction"|"restaurant"|"transit"), `title`, `time`, `description`, `address`, `sortOrder`
- `expenses/{auto-id}` — Individual expense documents with `amount`, `currency`, `category`, `paidBy`, `date`

### Key Data Flow

`services/firebase.js` exports `db` (Firestore instance) with IndexedDB persistence for offline support. Hooks in `hooks/useItinerary.js` (`useDays`, `useDayItems`, `useTripInfo`) fetch and cache data. `useDayItems` also exposes `updateItems()` for CRUD on the embedded items array. Shared time utilities (`parseTime`, `to24hr`) live in `utils/helpers.js`.

### UI Pattern

Mobile-first shell (`max-w-md`, `h-[100dvh]`), single route (`/`). The scroll container has `id="main-scroll"` — used to scroll-to-top on day change. The Itinerary page composes: top header (with ⋯ button for ToolkitModal) → DaySelector (gradient rounded-square pills) → DayHero (image card) → WeatherStrip (hourly forecast via Open-Meteo API, fetched once on mount) → ItemCards (24hr time above card) → RouteMapCard (Google Maps embed). Tapping a card opens ItemModal (centered pop-up with scale animation via `createPortal`); the close button is overlaid absolutely on the hero image to avoid a white gap at the top. A floating StatusWidget tracks local time and shows current/next destination. The ⋯ button opens ToolkitModal with flight info and hotel details. Navigate buttons deep-link to Apple Maps (iOS) or Google Maps.

### Design System

Japanese minimalism aesthetic. Fonts: Noto Serif TC (headings/times) + Noto Sans TC (body) loaded via Google Fonts in `index.html`. Color palette: slate grays for most UI, cyan→blue gradient for CTAs. Card types are visually distinguished by icon only (Camera/Utensils/Car from lucide-react), all cards share `bg-slate-50`. All user-facing text is Traditional Chinese.

## Environment

Firebase config is read from `.env` via `import.meta.env.VITE_FIREBASE_*`. Copy `.env.example` to `.env` and fill in values. The seed script (`src/scripts/seedFirestore.js`) has config hardcoded separately — update both if the Firebase project changes.

## Deployment

Hosted on Firebase Hosting at https://miami-trip0330.web.app. After code changes: `npm run build` then `npx firebase deploy --only hosting`. Always push to GitHub AND redeploy — `git push` alone does not update the live site.

## Offline Support

Firestore IndexedDB persistence is enabled in `services/firebase.js`. PWA service worker (Workbox via vite-plugin-pwa) caches weather API (StaleWhileRevalidate, 1hr) and Google Fonts (CacheFirst, 1yr). App works offline after first load.

## Commit Convention

Commit after every meaningful change. Descriptive messages focused on "why" not "what". Push to GitHub (`git push`) and redeploy (`npx firebase deploy --only hosting`) after every major change.
