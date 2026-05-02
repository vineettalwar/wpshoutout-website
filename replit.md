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

### Replit (development & production)
- `RESEND_API_KEY` — Required for contact form emails (Replit Secret)
- `CONTACT_EMAIL` — Recipient email (default: hello@wpshoutout.com)
- `CONTACT_FROM_EMAIL` — Sender email (default: noreply@wpshoutout.com)

### GitHub Actions (for CI/CD pipeline)
- `API_BASE_URL` *(GitHub Secret)* — Full URL of the deployed Replit API server, e.g. `https://wpshoutout.replit.app`. Without this, the contact form falls back to a same-origin relative path (works on Replit, not on GitHub Pages).
- `PAGES_BASE_PATH` *(GitHub Variable, optional)* — Override the base path for GitHub Pages. Defaults to `/<repo-name>/`. Set to `/` if using a custom domain or org/user site at root.

## CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml` runs on every push and PR to `main`:

**CI job** (all pushes and PRs):
- Installs dependencies with `pnpm install --frozen-lockfile`
- Type-checks both the frontend and API server
- Builds the frontend with the correct `BASE_PATH` and `VITE_API_BASE_URL`
- Builds the API server

**CD job** (merges to `main` only):
- Copies `index.html` → `404.html` for SPA client-side route fallback on GitHub Pages
- Deploys the built static frontend to GitHub Pages automatically via OIDC (no stored tokens needed)

### GitHub Pages Setup (one-time)

1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Add a repository secret `API_BASE_URL` pointing to your deployed Replit API server URL
4. *(Optional)* Add a repository variable `PAGES_BASE_PATH` if using a custom domain or root path
5. Push any commit to `main` — the workflow handles the rest

The deployed site will be at `https://<org>.github.io/<repo>/` (or your custom domain).

### API Server Deployment

The API server (Express + Resend contact endpoint) is deployed via Replit's **Publish** button. After publishing, copy the `.replit.app` URL and set it as the `API_BASE_URL` GitHub secret so the GitHub Pages frontend can reach it.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
