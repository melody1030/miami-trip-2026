# Miami Trip 2026

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
- **Bottom Sheet Detail** — Tap any card to view details with slide-up modal
- **Travel Toolkit** — Flight info, accommodation, emergency contacts (WIP)
- **Expense Tracker** — Multi-currency budget tracking (WIP)
- **Full CRUD** — Add, edit, delete itinerary items
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

## Design

Japanese minimalism inspired (MUJI-like). Clean white/slate backgrounds, Noto Serif TC for headings, cyan-to-blue gradient for action buttons. Mobile-first layout optimized for phone screens.
