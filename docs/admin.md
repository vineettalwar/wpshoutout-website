# WP Shoutout — Admin Guide

This guide covers all operational tasks: adding new content, managing API keys, running migrations, and deploying.

---

## Table of Contents

1. [Adding a New Season](#adding-a-new-season)
2. [Adding a New Episode](#adding-a-new-episode)
3. [Adding or Editing Blog Posts](#adding-or-editing-blog-posts)
4. [Updating the Schedule Page](#updating-the-schedule-page)
5. [Rotating the Resend API Key](#rotating-the-resend-api-key)
6. [Database Migrations](#database-migrations)
7. [GitHub Pages Deployment](#github-pages-deployment)
8. [API Server Deployment (Render)](#api-server-deployment-render)

---

## Adding a New Season

1. **Edit `artifacts/wpshoutout/src/data/seasons.ts`**

   Add a new entry to the `seasons` array. The array is ordered from newest (index 0) to oldest. Seasons are identified by their numeric `id` and URL-friendly `slug`.

   ```ts
   {
     id: 10,
     slug: "wc-europe-2024",
     title: "WC Europe 2024",
     location: "Turin, Italy",
     year: 2024,
     img: "/images/seasons/s10-wc-europe-2024.jpg",
     description: "...",
   },
   ```

2. **Add the season cover image** to `artifacts/wpshoutout/public/images/seasons/` (e.g. `s10-wc-europe-2024.jpg`) and reference it as `/images/seasons/s10-wc-europe-2024.jpg` in the `img` field.

3. **Add episodes** for the new season (see next section).

4. **Commit and push** to `main`. The CI/CD pipeline will rebuild and redeploy the frontend automatically. No database migration is needed for adding seasons/episodes — those are static data files.

---

## Adding a New Episode

1. **Edit `artifacts/wpshoutout/src/data/episodes.ts`**

   Add the episode to the `episodesBySeason` record under the correct season key:

   ```ts
   10: [
     {
       id: "s10e1",
       num: 1,
       title: "Building in Public",
       guest: "Jane Doe",
       date: "15 Jun 2024",
       season: 10,
       seasonTitle: "WC Europe 2024",
       coverImg: WCEU2024_COVER,
       spotifyId: "SPOTIFY_TRACK_ID_HERE",
       episodeUrl: "https://wpshoutout.com/wceu2024/building-in-public-jane-doe/",
     },
   ],
   ```

2. **Find the Spotify track ID:** Open the episode on Spotify → Share → Copy Link. The ID is the last segment of the URL: `https://open.spotify.com/episode/TRACK_ID_HERE`.

3. Define a cover image constant near the top of the file (reuse across all episodes in that season), pointing to the committed local asset:
   ```ts
   const WCEU2024_COVER = "/images/seasons/s10-wc-europe-2024.jpg";
   ```

4. **Commit and push** to `main`.

---

## Adding or Editing Blog Posts

Blog posts live in `artifacts/wpshoutout/src/data/blog.ts`. Each post follows this structure:

```ts
{
  id: 1750,                    // Unique numeric ID (use WordPress post ID if from export)
  slug: "my-post-slug",        // URL-friendly slug, must be unique
  title: "Episode Title Here",
  date: "Jun 15, 2024",
  readingTime: "8 min read",
  category: "WCEU 2024",
  img: "/images/blog/ep14.png",   // Thumbnail image — commit to artifacts/wpshoutout/public/images/blog/
  excerpt: "Short summary shown on the blog list page.",
  body: [
    [
      { kind: "q", text: "Question text here?" },
      { kind: "a", text: "Answer text here." },
    ],
    // Each inner array is a Q/A exchange
  ],
}
```

**Tips:**
- Add new posts at the **top** of the `posts` array (newest first).
- `body` is an array of Q/A exchanges. Each exchange is an array of `{ kind: "q" | "a", text: string }` blocks.
- The `img` should be a local path like `/images/blog/ep14.png` — commit the image file to `artifacts/wpshoutout/public/images/blog/` before referencing it.
- After adding, run `pnpm run typecheck` to catch type errors before pushing.

---

## Updating the Schedule Page

The schedule is rendered from static content in `artifacts/wpshoutout/src/pages/Schedule.tsx`. Edit the upcoming event list directly in that file.

For each WordCamp event, add a record with: event name, location, date range, and whether recording is confirmed.

---

## Rotating the Resend API Key

The contact form uses Resend to send emails. If you need to rotate the API key:

### On Replit (development)
1. Go to the Replit workspace → **Secrets** tab
2. Find `RESEND_API_KEY` and update the value
3. The API server will pick up the new key on the next request (no restart needed — the key is read per-request)

### On the API hosting platform (Render / Railway)
1. Log in to [resend.com](https://resend.com) → **API Keys** → Create new key
2. Copy the new key (`re_...`)
3. Go to your hosting platform dashboard → service → **Environment variables**
4. Update `RESEND_API_KEY` with the new value
5. Trigger a redeploy (or wait for the next automatic deploy)
6. Verify the contact form works end-to-end by submitting a test message
7. Delete the old API key from Resend

---

## Database Migrations

### Adding a new table

1. Edit or add a file in `lib/db/src/schema/` following the Drizzle ORM pattern:
   ```ts
   import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
   import { createInsertSchema } from "drizzle-zod";
   import { z } from "zod/v4";

   export const subscribersTable = pgTable("subscribers", {
     id: serial("id").primaryKey(),
     email: text("email").notNull().unique(),
     createdAt: timestamp("created_at").defaultNow().notNull(),
   });

   export const insertSubscriberSchema = createInsertSchema(subscribersTable).omit({ id: true, createdAt: true });
   export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
   export type Subscriber = typeof subscribersTable.$inferSelect;
   ```

2. Export the table from `lib/db/src/schema/index.ts`:
   ```ts
   export * from "./subscribers";
   ```

3. Generate the migration SQL:
   ```bash
   pnpm --filter @workspace/db run generate
   ```

4. Review the generated file in `lib/db/migrations/`. It should only contain `CREATE TABLE` (or `ALTER TABLE`) statements for your changes.

5. Commit the migration file:
   ```bash
   git add lib/db/migrations/
   git commit -m "feat: add subscribers table"
   ```

6. Apply to the target database:
   ```bash
   DATABASE_URL=postgres://... pnpm --filter @workspace/db run migrate
   ```

### Rolling back a migration

Drizzle does not auto-generate rollback SQL. To roll back:
1. Write a new migration that reverses the change (e.g., `DROP TABLE subscribers;`)
2. Run `pnpm --filter @workspace/db run generate --name rollback-subscribers`
3. Edit the generated file to contain the rollback SQL
4. Apply: `pnpm --filter @workspace/db run migrate`

### Applying migrations in production

Migrations are applied automatically via `scripts/post-merge.sh` when code is merged. The script runs:
```bash
pnpm install --frozen-lockfile
pnpm --filter @workspace/db run migrate
```

If you need to apply migrations manually:
```bash
DATABASE_URL=<production-url> pnpm --filter @workspace/db run migrate
```

> **Warning:** Never use `pnpm --filter @workspace/db run push` in production. The push command introspects the live database and can silently drop columns when schema conflicts arise.

---

## GitHub Pages Deployment

The frontend deploys automatically on every push to `main`.

### One-time setup (if starting from scratch)
1. Push the repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Deploy the API server (see next section) and get its public URL
4. Add these secrets under **Settings → Secrets and variables → Actions**:
   - `API_BASE_URL` — full URL of the deployed API server (e.g. `https://wpshoutout-api.onrender.com` or your Replit `.replit.app` URL)
   - `API_DEPLOY_HOOK` — deploy hook URL from your API host (omit if hosting on Replit — the CI job warns but doesn't fail)
5. (Optional) Add the variable `PAGES_BASE_PATH = /` if using a custom domain at root

### Manual deployment trigger
If you need to trigger a deployment without a code push:
1. Go to the GitHub repo → **Actions** → **CI / CD**
2. Click **Run workflow** on the `main` branch

### Checking deployment status
- GitHub Actions runs: **Actions** tab → **CI / CD** workflow
- GitHub Pages URL: **Settings → Pages**

---

## API Server Deployment

### Option A — Replit (recommended, no extra account needed)

The API server is already configured for Replit deployment. The Replit project deploys all artifacts (frontend + API) together.

1. In the Replit workspace, click **Publish** (or use the Deploy button)
2. Choose **Autoscale** — the API server is stateless and well-suited for autoscale
3. After publishing, note the production URL (e.g. `https://wpshoutout.replit.app`)
4. The API is served at `<production-url>/api` — set that base URL in GitHub Actions:
   - `API_BASE_URL` = `https://wpshoutout.replit.app` (no `/api` suffix — the frontend appends `/api/contact` itself)
5. Replit does not provide a deploy hook URL — leave `API_DEPLOY_HOOK` unset in GitHub Actions. The CI job will warn but will not fail, and the API redeploys automatically whenever you publish from Replit.

> **Note:** With Replit hosting, the GitHub Pages frontend (`API_BASE_URL`) points to your Replit production URL for API calls, while static pages are served by GitHub Pages.

### Option B — Render

A `render.yaml` at the repo root defines the Render service configuration. Render detects it automatically when you connect the repo.

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect the GitHub repo
3. Render will detect `render.yaml` and pre-fill the settings. Confirm:
   - **Root Directory:** *(leave blank — must build from repo root for pnpm workspace packages to resolve)*
   - **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run build`
   - **Start command:** `node --enable-source-maps ./artifacts/api-server/dist/index.mjs`
   - **Health Check Path:** `/api/healthz`
4. Set these environment variables in the Render dashboard (the others come from `render.yaml`):
   - `DATABASE_URL=<your-postgres-url>`
   - `RESEND_API_KEY=<your-resend-key>`
5. Note the **Deploy Hook URL** from Settings → Deploy Hook
6. Add that URL as the `API_DEPLOY_HOOK` secret in GitHub Actions
7. Add the service's public URL (e.g. `https://wpshoutout-api.onrender.com`) as the `API_BASE_URL` secret in GitHub Actions

> **Important:** Do NOT set Root Directory to `artifacts/api-server`. The build must run from the repo root so pnpm can resolve workspace packages (`@workspace/api-zod`, `@workspace/db`). Setting a subdirectory root will cause the build to fail with "workspace package not found" errors.

### Rollback an API deployment
- **Replit:** Use checkpoints in the Replit workspace to roll back to a previous version, then republish.
- **Render:** Dashboard → service → **Events** → find a previous successful deploy → click **Rollback to this deploy**.

### Checking API server logs
- **Replit:** Use the deployment logs tab in the Replit workspace, or the **Logs** tab on the published app.
- **Render:** Dashboard → service → **Logs** tab. Logs are in structured JSON (Pino format). Use Render's log filter to search by level: `{"level":50}` for errors.
