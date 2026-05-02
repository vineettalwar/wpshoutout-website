# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Project: WP Shoutout

Premium WordPress podcast website — a React + Vite static frontend with an Express API backend.

- **Frontend** (`artifacts/wpshoutout`): 7-page React app (Home, About, Seasons, Schedule, Join Us, Blog, Contact). Dark premium design inspired by Apple Music / Spotify. Persistent audio player bar with Spotify episode embeds for all 9 WordCamp seasons.
- **API server** (`artifacts/api-server`): Express 5 server with a `/api/contact` endpoint that sends email via Resend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Frontend framework**: React 19 + Vite 7 + Tailwind CSS v4
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Email**: Resend (via `RESEND_API_KEY` secret)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (API server), Vite (frontend)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/wpshoutout run typecheck` — typecheck frontend only
- `pnpm --filter @workspace/api-server run typecheck` — typecheck API only
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Environment Variables / Secrets

- `RESEND_API_KEY` — Required for contact form emails (set via Replit Secrets)
- `CONTACT_EMAIL` — Recipient email (default: hello@wpshoutout.com)
- `CONTACT_FROM_EMAIL` — Sender email (default: noreply@wpshoutout.com)

## CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml` runs on every push and PR to `main`:
- **CI**: Type-checks and builds both the frontend and API server
- **CD** (main branch only): Deploys the built frontend to **GitHub Pages** automatically

### GitHub Pages Setup

To enable automatic deployment, do the following once in the GitHub repo settings:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push any commit to `main` — the workflow handles the rest

The deployed site will be available at `https://<org>.github.io/<repo>/` (or a custom domain if configured).

The API server is deployed separately via Replit's **Publish** button. After publishing, update the API URL in the frontend if it differs from the development URL.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
