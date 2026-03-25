# 漫漫 ManMan

A minimalist Travel Management PWA for our 2026 Spring Miami trip (Mar 30 – Apr 3).

Built for two users — designed to be senior-friendly with large fonts, high whitespace, and one-tap navigation.

## Tech Stack

- **Frontend:** React 18 + Vite 5 + Tailwind CSS 4
- **Database:** Firebase Cloud Firestore
- **Icons:** lucide-react
- **PWA:** vite-plugin-pwa (installable on mobile Home Screen)
- **Fonts:** Noto Serif TC / Noto Sans TC

## Features

- **Daily Itinerary** — Timeline view with day selector, hero images, and categorized cards (attraction / restaurant / transit)
- **One-Tap Navigation** — Auto deep-links to Apple Maps (iOS) or Google Maps
- **Item Detail Modal** — Tap any card for a centered pop-up with photo, description, notes, and navigate button
- **Travel Toolkit** — Flight info and accommodation details via the ⋯ button
- **Live Status Widget** — Floating widget tracking current/next destination based on local time
- **Weather Strip** — Hourly forecast for each day via Open-Meteo
- **Offline Support** — Works without internet after first load (IndexedDB + PWA service worker)
- **Installable PWA** — Add to home screen with custom icon (漫漫 ManMan)
- **All in Traditional Chinese**

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file and fill in Firebase config
cp .env.example .env

# Seed Firestore with itinerary data
node src/scripts/seedFirestore.js

# Start dev server
npm run dev
```

## Environment Variables

Create a `.env` file from `.env.example`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `node src/scripts/seedFirestore.js` | Seed/reset Firestore data |
| `node src/scripts/exportFirestore.js` | Export current Firestore data as JSON |
| `npx firebase deploy --only hosting` | Deploy to Firebase Hosting |

## Design

Japanese minimalism inspired (MUJI-like). Clean white/slate backgrounds, Noto Serif TC for headings, cyan-to-blue gradient for action buttons. Mobile-first layout optimized for phone screens.
