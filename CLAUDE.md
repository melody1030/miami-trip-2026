# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (hot reload)
- `npm run build` — Production build (outputs to `dist/`)
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build locally
- `node src/scripts/seedFirestore.js` — Seed/reset Firestore with itinerary data

## Architecture

Single-trip Travel Management PWA for a Miami trip (Mar 30–Apr 3, 2026). Two users only (developer + mother). No auth, no multi-trip support.

**Stack:** React 18 (Vite 5) + Tailwind CSS 4 + Firebase Cloud Firestore + lucide-react icons. PWA via vite-plugin-pwa.

### Firestore Schema (flat top-level collections, no nesting)

- `trip/info` — Single document: trip metadata + toolkit (flights, accommodations, emergencyContacts arrays)
- `days/{day-1..day-5}` — Each document has `date`, `dayNumber`, `title`, `heroImage`, and an `items` array (embedded, not subcollection). Items have: `id`, `type` ("attraction"|"restaurant"|"transit"), `title`, `time`, `description`, `address`, `sortOrder`
- `expenses/{auto-id}` — Individual expense documents with `amount`, `currency`, `category`, `paidBy`, `date`

### Key Data Flow

`services/firebase.js` exports `db` (Firestore instance). Hooks in `hooks/useItinerary.js` (`useDays`, `useDayItems`, `useTripInfo`) fetch and cache data. `useDayItems` also exposes `updateItems()` for CRUD on the embedded items array.

### UI Pattern

Mobile-first shell (`max-w-md`, `h-[100dvh]`). Two tabs via react-router-dom: Itinerary (`/`) and Toolkit (`/toolkit`). The Itinerary page composes: top header → DaySelector (circle pills) → DayHero (image card with gradient overlay) → timeline of ItemCards (left time + right card). Tapping a card opens ItemModal (bottom sheet with slide-up animation). Navigate buttons deep-link to Apple Maps (iOS) or Google Maps.

### Design System

Japanese minimalism aesthetic. Fonts: Noto Serif TC (headings/times) + Noto Sans TC (body) loaded via Google Fonts in `index.html`. Color palette: slate grays for most UI, cyan→blue gradient for CTAs. Card types are visually distinguished by icon only (Camera/Utensils/Car from lucide-react), all cards share `bg-slate-50`. All user-facing text is Traditional Chinese.

## Environment

Firebase config is read from `.env` via `import.meta.env.VITE_FIREBASE_*`. Copy `.env.example` to `.env` and fill in values. The seed script (`src/scripts/seedFirestore.js`) has config hardcoded separately — update both if the Firebase project changes.

## Commit Convention

Commit after every meaningful change. Descriptive messages focused on "why" not "what".
