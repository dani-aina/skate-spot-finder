# Kleechat

Kleechat is a web app that helps Sydney skaters find real street spots and skateparks — stairs, rails, ledges, banks, and more — by searchable feature, with a social layer for sharing and tracking your own finds. Built as an UTS x IOD software engineering bootcamp capstone project.

## Features

- **Interactive map** of real Sydney skate spots, with a floating search bar that filters by name, address, description, or feature tag
- **Add a spot** through a guided multi-step flow: guidelines → tap-the-map location picker → details (name, description, address, feature tags, ground condition, kick-out risk) → multiple photo upload → submit
- **Public / Secret visibility** — mark a spot as public (visible to everyone) or secret (visible only to you)
- **Tap-to-view spot details** via a bottom sheet, from either the map or your profile
- **Accounts via Clerk** — email sign up/sign in, plus a guest mode for browsing without an account
- **User profile** — your avatar, name and email, with your own spots split into Public and Secret tabs
- **Photo storage via Cloudinary**, including multiple photos per spot
- Every spot shows who added it, with an avatar and name

## Tech stack

**Frontend:** React (Vite) + Material UI, Google Maps JavaScript API (`@react-google-maps/api`), Clerk React SDK

**Backend:** Node.js + Express, MVC structure (routes / controllers / models)

**Database:** MongoDB with Mongoose

**Auth:** Clerk (prebuilt sign-in/sign-up components, server-side route protection)

**Photo storage:** Cloudinary

**Testing:** Jest + Supertest (API)

## Project structure

```
skate-spot-finder/
├── client/          # React (Vite) frontend
│   └── src/
│       ├── api/         # fetch wrappers for the backend API
│       └── components/  # SpotForm, SpotList, SpotCard, SpotMap, LocationPicker...
└── server/          # Express backend
    └── src/
        ├── config/      # DB connection, Cloudinary config
        ├── controllers/ # request handlers
        ├── middleware/  # auth, error handling, file upload
        ├── models/      # Mongoose schemas
        └── routes/      # Express route definitions
```

## Getting started

### Prerequisites

- Node.js
- A local MongoDB instance running on `mongodb://127.0.0.1:27017`
- Accounts with [Clerk](https://clerk.com), [Cloudinary](https://cloudinary.com), and a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) (Maps JavaScript API enabled)

### 1. Clone the repo

```zsh
git clone https://github.com/dani-aina/skate-spot-finder.git
cd skate-spot-finder
```

### 2. Set up the server

```zsh
cd server
npm install
cp .env.example .env
```

Fill in `.env` with your own MongoDB URI, Clerk keys, and Cloudinary credentials.

```zsh
npm run dev
```

The API runs on `http://localhost:5001` by default.

### 3. Set up the client

In a new terminal:

```zsh
cd client
npm install
cp .env.example .env
```

Fill in `.env` with your Clerk publishable key and Google Maps API key.

```zsh
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Running tests

From the `server` folder:

```zsh
npm test
```

Runs the Jest + Supertest API test suite (health check, spot read endpoints, and auth-protection checks on the mutating spot routes) against a separate local test database, so it never touches real data.

## Future work

A few things that are designed and scoped but intentionally left out of this version, documented here rather than built under time pressure:

- Editing or deleting a spot after it's been created (the backend already supports this — it just isn't wired up to the UI yet)
- Friends/groups, and sharing a secret spot with a specific group rather than keeping it creator-only
- Community pages and in-app chat
- Server-side search/filter and visibility filtering (currently both done client-side)

## Author

Danica Lee — [GitHub](https://github.com/dani-aina)
