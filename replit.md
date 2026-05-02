# WP Shoutout — Replit Architecture Guide

This file documents Replit-specific architecture, workflows, environment setup, and deployment quirks for the WP Shoutout project. Keep this updated whenever the architecture changes.

---

## Overview

WP Shoutout is a **pnpm workspaces monorepo** running on Replit's Node.js 24 environment. It has three registered artifacts (apps):

| Artifact | Kind | Preview Path | Port | Package |
|---|---|---|---|---|
| WP Shoutout | web | `/` | `8081` (ext `80`) | `@workspace/wpshoutout` |
| API Server | api | `/api` | `8080` (ext `8080`) | `@workspace/api-server` |
| Canvas | design | `/__mockup` | `8082` (ext `3001`) | mockup-sandbox |

All three run simultaneously. Replit's proxy routes traffic from the preview pane to the correct service based on the path prefix.

---

## Monorepo Layout

```
.
├── artifacts/
│   ├── wpshoutout/        # React 19 + Vite 7 + Tailwind CSS v4 frontend
│   ├── api-server/        # Express 5 API server (contact form → Resend)
│   └── mockup-sandbox/    # Design / component preview (Canvas artifact)
├── lib/
│   ├── db/                # Drizzle ORM schema + migration runner
│   ├── api-spec/          # OpenAPI spec (source of truth)
│   ├── api-zod/           # Zod schemas generated from the spec
│   └── api-client-react/  # React Query API client generated from the spec
├── scripts/
│   └── post-merge.sh      # Runs automatically after every task merge
├── docs/
│   └── admin.md           # Admin guide
├── .github/workflows/
│   └── ci-cd.yml          # CI: typecheck + build; CD: Pages + deploy hook
├── .replit                # Replit configuration (ports, workflows, agent stack)
├── pnpm-workspace.yaml    # Workspace definitions + catalog + security settings
├── tsconfig.json          # Root TypeScript project references
└── tsconfig.base.json     # Shared TS compiler options
```

---

## Workflows

Replit workflows are persistent background processes managed by the Replit runtime. Each artifact has its own workflow.

### `artifacts/wpshoutout: web`
**Command:** `BASE_PATH=/ PORT=8081 pnpm --filter @workspace/wpshoutout run dev`

Starts the Vite dev server for the React frontend. Hot module replacement (HMR) is enabled. The server binds to `0.0.0.0:8081`.

**Required env vars:** `BASE_PATH`, `PORT`

### `artifacts/api-server: API Server`
**Command:** `PORT=8080 pnpm --filter @workspace/api-server run dev`

Builds the Express API server with esbuild and starts it. The dev script rebuilds before starting (no watch mode — restart the workflow after code changes to the API).

**Required env vars:** `PORT`, `RESEND_API_KEY` (for contact form emails)

### `artifacts/mockup-sandbox: Component Preview Server`
Design/prototyping sandbox. Not part of the production site.

---

## Secrets (Environment Variables)

Replit Secrets are injected as environment variables at runtime. Go to the **Secrets** tab in the Replit sidebar to manage them.

### Required secrets
| Secret | Used by | Description |
|---|---|---|
| `RESEND_API_KEY` | API Server | Resend API key for sending contact form emails. Get from resend.com → API Keys. |
| `DATABASE_URL` | DB package | PostgreSQL connection string. Only needed when running migrations. |

### Optional / configured defaults
| Variable | Default | Description |
|---|---|---|
| `CONTACT_EMAIL` | `hello@wpshoutout.com` | Recipient for contact form submissions |
| `CONTACT_FROM_EMAIL` | `noreply@wpshoutout.com` | Sender address (must match a verified Resend domain) |

### Frontend env vars (build-time)
These are set at build time via Vite's `import.meta.env`:
| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `""` (same-origin) | Full URL of API server in production. Unset in Replit = same-origin. |
| `BASE_PATH` | `/` | Vite base path. Must match the artifact's preview path. |

---

## Path-Based Routing

Replit's proxy maps each artifact to a path prefix. In development, the frontend (at `/`) and the API server (at `/api`) appear to be on the **same origin** from the browser's perspective — no CORS issues.

How requests flow:
```
Browser → Replit Proxy → localhost:8081  (BASE_PATH=/, frontend)
Browser → Replit Proxy → localhost:8080  (PREFIX=/api, API server)
```

The Express app mounts its router at `/api`:
```ts
app.use("/api", router);
```

The frontend builds API URLs as:
```ts
const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
fetch(`${apiBase}/api/contact`, { ... });
```

In Replit: `apiBase = ""` → `fetch("/api/contact")` → proxy routes to API server. ✓  
In production: `apiBase = "https://api.wpshoutout.com"` → `fetch("https://api.wpshoutout.com/api/contact")`. ✓

---

## TypeScript Project References

The root `tsconfig.json` uses TypeScript project references to typecheck all packages in dependency order. The `lib/` packages are checked first (as they have no dependencies on `artifacts/`), then the artifacts.

```json
// tsconfig.json (root)
{
  "references": [
    { "path": "./lib/api-spec" },
    { "path": "./lib/api-zod" },
    { "path": "./lib/api-client-react" },
    { "path": "./lib/db" }
  ]
}
```

Artifact packages (`artifacts/wpshoutout`, `artifacts/api-server`) are typechecked independently via `pnpm -r --filter "./artifacts/**" run typecheck`.

Run `pnpm run typecheck` at the root to check everything.

---

## Database

The project uses **PostgreSQL** via Drizzle ORM. The `@workspace/db` package exports the Drizzle client and schema.

### Provisioning a database on Replit
1. Go to the **Database** tab in the Replit sidebar (or use the integrations panel)
2. Provision a PostgreSQL database
3. The `DATABASE_URL` secret is automatically populated

### Schema location
`lib/db/src/schema/index.ts` — defines one table: `contact_submissions` (id, name, email, subject, message, created_at). Migration file: `lib/db/migrations/0000_dapper_krista_starr.sql`.

### Migration workflow
```bash
# After editing the schema:
pnpm --filter @workspace/db run generate   # Creates SQL in lib/db/migrations/
pnpm --filter @workspace/db run migrate    # Applies migrations to DATABASE_URL
```

### Dev-only shortcut
```bash
pnpm --filter @workspace/db run push       # Directly syncs schema (no migration files!)
```
> Only use `push` during early local development. Never in CI or production.

---

## CI/CD Pipeline

The pipeline is defined in `.github/workflows/ci-cd.yml` and runs on GitHub.

### Trigger
- Every push to `main`
- Every pull request targeting `main`

### CI job (`validate`)
1. `pnpm install --frozen-lockfile`
2. Typecheck frontend (`@workspace/wpshoutout`)
3. Typecheck API server (`@workspace/api-server`)
4. Build frontend (with `BASE_PATH` and `VITE_API_BASE_URL`)
5. Build API server
6. On `main` push: copy `index.html` → `404.html` (SPA route fallback)
7. Upload Pages artifact

### CD jobs (main push only)
- **deploy-frontend:** Deploys static build to GitHub Pages via OIDC (no stored tokens)
- **deploy-api:** POSTs to `API_DEPLOY_HOOK` secret to trigger API server redeploy on Render/Railway

### GitHub Actions secrets required
| Secret | Description |
|---|---|
| `API_BASE_URL` | Full URL of the deployed API server |
| `API_DEPLOY_HOOK` | Deploy hook URL from hosting provider |

### GitHub Actions variables (optional)
| Variable | Description |
|---|---|
| `PAGES_BASE_PATH` | Override Pages base path (default: `/<repo-name>/`) |

---

## Post-Merge Script

`scripts/post-merge.sh` runs automatically after every task merge in Replit's agent workflow.

```bash
#!/bin/bash
set -e
pnpm install --frozen-lockfile

if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL is not set — skipping database migrations."
else
  pnpm --filter @workspace/db run migrate
fi
```

This ensures:
1. New dependencies from merged tasks are installed
2. Any new database migrations are applied to the development database (skipped gracefully if `DATABASE_URL` is not provisioned yet)

---

## Replit-Specific Quirks

### PORT is required
Both the frontend (Vite) and the API server require `PORT` to be set. They will throw on startup if it's missing. The workflow commands set this explicitly.

### BASE_PATH is required for the frontend
Vite throws if `BASE_PATH` is not set (and it's not a build). The workflow sets `BASE_PATH=/`.

### pnpm minimum release age
`pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` (24 hours). This means newly published npm packages won't install for 24 hours. This is a supply-chain attack defense — do not disable it. If you urgently need a trusted package, add it to `minimumReleaseAgeExclude`.

### esbuild platform overrides
The `pnpm-workspace.yaml` excludes all non-Linux esbuild binaries via `overrides`. Replit runs on Linux x64 only. This keeps `node_modules` small.

### Vite `allowedHosts: true`
The Vite dev server is configured with `allowedHosts: true` and `host: "0.0.0.0"`. This is required because Replit's preview iframe proxies requests from a different origin.

### `@assets` alias
Vite is configured with a `@assets` alias pointing to `../../attached_assets`. This is available in the frontend for any assets that were uploaded via Replit's attachment mechanism. Static production assets should live in `artifacts/wpshoutout/public/` instead.

---

## Deploy Flow Summary

```
Code merge to main
    │
    ├─▶ scripts/post-merge.sh
    │     pnpm install + db migrate
    │
    └─▶ GitHub Actions: CI/CD
          │
          ├─▶ validate: typecheck + build
          │
          ├─▶ deploy-frontend → GitHub Pages
          │     Static files at artifacts/wpshoutout/dist/public/
          │     Deployed via OIDC, no stored deploy token
          │
          └─▶ deploy-api → Render / Railway
                POST to API_DEPLOY_HOOK secret
                Platform pulls latest code and rebuilds
```

---

## Adding a New Artifact

1. Read `.local/skills/artifacts/SKILL.md`
2. Run `listArtifacts()` and `createArtifact(...)` via the code execution sandbox
3. The skill registers the artifact in `artifact.toml` and creates a workflow
4. Add the artifact's port to the `[[ports]]` section in `.replit` if needed
5. Update this file and `README.md` with the new artifact

---

## Useful Commands

```bash
# Full typecheck (all packages)
pnpm run typecheck

# Frontend only
pnpm --filter @workspace/wpshoutout run typecheck

# API server only
pnpm --filter @workspace/api-server run typecheck

# Build frontend (production)
BASE_PATH=/ pnpm --filter @workspace/wpshoutout run build

# Build API server
pnpm --filter @workspace/api-server run build

# Generate DB migrations
pnpm --filter @workspace/db run generate

# Apply DB migrations
DATABASE_URL=postgres://... pnpm --filter @workspace/db run migrate

# Push schema (dev only!)
pnpm --filter @workspace/db run push
```
