# WP Shoutout — Decision Log

Running log of important decisions, gotchas, and context that future contributors and agents should know. Newest entries at the top.

---

## 2026-05-02 — Migrations workflow established

**Decision:** Added `pnpm --filter @workspace/db run generate` (creates SQL migration files) and `pnpm --filter @workspace/db run migrate` (applies them). Updated `scripts/post-merge.sh` to use `migrate` instead of `db push`.

**Why:** `drizzle-kit push` is convenient in development but unsafe in production — it diffs the live database schema and can silently drop columns when schema conflicts arise. Migration files checked into git give a clear, reviewable audit trail of every schema change.

**Current state:** The schema (`lib/db/src/schema/index.ts`) defines one table: `contact_submissions` (id, name, email, subject, message, created_at). Migration `lib/db/migrations/0000_dapper_krista_starr.sql` has been generated and checked in. Run `DATABASE_URL=... pnpm --filter @workspace/db run migrate` to apply it to a new database.

---

## 2026-05-02 — Image hosting strategy

**Decision:** All images are committed directly to the repository. No external image hot-links.

**Why:** Task #7 required all site images in-repo for a clean, self-contained, shareable state. Images were downloaded from the original S3 CDN (`s3.ap-south-1.amazonaws.com/static.wpshoutout.com`) and committed to `artifacts/wpshoutout/public/images/`.

**Image locations:**
- Season cover art → `artifacts/wpshoutout/public/images/seasons/`
- Blog post thumbnails → `artifacts/wpshoutout/public/images/blog/`
- About page gallery → `artifacts/wpshoutout/public/images/about/`
- Favicon, opengraph image → `artifacts/wpshoutout/public/`

**Reference pattern:** All image `src` attributes use `pub(path)` from `@/lib/assets` (e.g. `pub("/images/seasons/s9-wceu-2022.jpg")`). The `pub()` helper prepends `import.meta.env.BASE_URL` so images resolve correctly under any Vite base path (e.g. `/wpshoutout-website/` on GitHub Pages project sites).

**Audio policy:**
- Local audio files under 10 MB → commit to `artifacts/wpshoutout/public/audio/`
- Larger audio → document remote URL in this file and reference via `<source src="...">` 

---

## 2026-05-02 — Audio: Spotify embeds

**Decision:** All podcast audio plays via Spotify embeds (`open.spotify.com/embed/episode/:id`). No audio files stored in the repository or a self-hosted CDN.

**Why:**
1. All 30+ episodes are already published on Spotify with stable track IDs.
2. Spotify's embed player provides skip controls, progress bar, and mobile playback for free.
3. Self-hosting audio requires a CDN for global reach and adds significant storage cost.
4. The Spotify embed iframe works reliably cross-browser without any JS audio API complexity.

**Gotcha:** Spotify embeds require a user gesture before playing in most browsers (autoplay policy). The audio player bar respects this — it only loads the embed when the user explicitly clicks Play.

**Spotify ID storage:** `spotifyId` field in `artifacts/wpshoutout/src/data/episodes.ts`. Embed URL pattern: `https://open.spotify.com/embed/episode/{spotifyId}`.

---

## 2026-05-02 — Path-based artifact routing

**Decision:** The Replit monorepo uses path-based routing. The frontend is served at `/` and the API server is served at `/api`. Each artifact gets its own port internally, mapped via Replit's proxy.

**Why:** Replit's environment proxies all requests through a single domain. Path-based routing (`/`, `/api`, `/__mockup`) avoids CORS issues when the frontend talks to the API — they appear to be on the same origin in development.

**Gotcha:** In production (GitHub Pages + Render/Railway), the frontend and API are on different origins. The frontend uses `VITE_API_BASE_URL` at build time to set the API base URL. In Replit dev, this variable is unset so the frontend falls back to `""` (same-origin relative path), which hits the Replit proxy.

**Port assignments:** See `.replit` ports section. Frontend typically binds to `8081` (external `80`) and API to `8080` (external `8080`).

---

## 2026-05-02 — CI/CD: OIDC for GitHub Pages

**Decision:** GitHub Pages deployment uses OIDC (`id-token: write` permission) rather than a stored `GITHUB_TOKEN` or deploy key.

**Why:** OIDC tokens are ephemeral — they cannot be leaked long-term. The `actions/deploy-pages@v4` action handles the OIDC handshake automatically.

**Requirement:** GitHub Pages source must be set to **GitHub Actions** (not a branch). Go to repo **Settings → Pages → Source → GitHub Actions**.

---

## 2026-05-02 — SPA routing on GitHub Pages

**Decision:** At build time, `index.html` is copied to `404.html` in the Pages artifact (`artifacts/wpshoutout/dist/public/`).

**Why:** GitHub Pages serves a 404 for any path it doesn't recognize (e.g., `/seasons`, `/blog/some-post`). By serving `index.html` content from `404.html`, Wouter (the client-side router) intercepts the request in the browser and renders the correct page. This is the standard SPA workaround for GitHub Pages.

**Caveat:** The real HTTP status code for deep links is still 404. This is cosmetic — SEO crawlers see a 404. For proper SPA support, consider serving the frontend from a platform that supports URL rewriting (Cloudflare Pages, Netlify, Vercel).

---

## 2026-05-02 — Content source: WordPress export

**Decision:** Blog post content (`src/data/blog.ts`) was auto-generated from the original wpshoutout.com WordPress export. The file contains 13 full interview transcripts as structured `BlogBlock[][]` data (Q/A pairs).

**Warning:** Do not edit `blog.ts` by hand — it is large (136 KB, 5000+ lines) and was generated by a script. To add new posts, either regenerate from a new WordPress export or append manually at the top following the same data structure.

**Script location:** The generation script was run from `/tmp/gen-blog.js` (not committed). If regeneration is needed, see the WordPress XML export and replicate the parsing logic.

---

## 2026-05-02 — Drizzle config: DATABASE_URL requirement

**Decision:** Updated `lib/db/drizzle.config.ts` to only require `DATABASE_URL` for commands that actually connect to the database (`migrate`, `push`, `studio`). The `generate` command (which only reads schema files) can run without a live database.

**Why:** Requiring `DATABASE_URL` for `generate` broke the CI workflow — you shouldn't need a database to generate SQL migration files from schema definitions.

**Implementation:** Checks `process.argv` for `generate` or `check` and skips the DATABASE_URL guard for those commands.

---

## 2026-04-27 — Monorepo structure

**Decision:** pnpm workspaces with packages under `artifacts/` (apps) and `lib/` (shared libraries). TypeScript project references via `tsconfig.json` at the root.

**Packages:**
- `@workspace/wpshoutout` — frontend
- `@workspace/api-server` — API server
- `@workspace/db` — Drizzle schema + migrations
- `@workspace/api-spec` — OpenAPI spec
- `@workspace/api-zod` — Zod schemas (generated from spec)
- `@workspace/api-client-react` — React Query API client (generated from spec)

**Why:** Shared `@workspace/db` types and `@workspace/api-zod` schemas let the API server and frontend share the same validation logic without code duplication.
