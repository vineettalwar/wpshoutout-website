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

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/wpshoutout run typecheck` — frontend only
- `pnpm --filter @workspace/api-server run typecheck` — API only
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Environment Variables / Secrets

### Replit (development & production)
- `RESEND_API_KEY` — Required for contact form emails (Replit Secret)
- `CONTACT_EMAIL` — Recipient email (default: hello@wpshoutout.com)
- `CONTACT_FROM_EMAIL` — Sender email (default: noreply@wpshoutout.com)

### GitHub Actions
- `API_BASE_URL` *(Secret)* — Full URL of the deployed API server, e.g. `https://wpshoutout.onrender.com`. Without this, the contact form uses a same-origin relative path (works on Replit).
- `API_DEPLOY_HOOK` *(Secret)* — Deploy hook URL from your API hosting provider (Render, Railway, etc.). When set, every merge to `main` automatically redeploys the API server.
- `PAGES_BASE_PATH` *(Variable, optional)* — Override the GitHub Pages base path. Defaults to `/<repo-name>/`. Set to `/` for a custom domain or org/user site at root.

## CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

Runs on every push and PR to `main`.

### CI job (all pushes and PRs)
1. Install with `pnpm install --frozen-lockfile`
2. Type-check frontend and API server
3. Build frontend with resolved `BASE_PATH` and `VITE_API_BASE_URL`
4. Build API server
5. On `main` push: copy `index.html` → `404.html` (SPA route fallback) and upload Pages artifact

### CD — Frontend (merges to `main`)
- Deploys static frontend to **GitHub Pages** automatically via OIDC

### CD — API Server (merges to `main`)
- Calls `API_DEPLOY_HOOK` to trigger a redeploy on Render/Railway/etc.
- If the secret is not set, logs a warning but does not fail the workflow

### One-time GitHub setup
1. **Settings → Pages → Source**: set to **GitHub Actions**
2. Add secret `API_BASE_URL` = your deployed API server URL
3. Add secret `API_DEPLOY_HOOK` = deploy hook URL from your API host (Render/Railway)
4. *(Optional)* Add variable `PAGES_BASE_PATH = /` if using a custom domain at root
5. Push to `main` — both frontend and API deploy automatically from that point on
