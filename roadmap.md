# WP Shoutout — Roadmap

## Shipped

### Core Website
- [x] 7-page React + Vite static site (Home, About, Seasons, Season, Schedule, Join Us, Blog, Contact)
- [x] Dark premium design inspired by Apple Music / Spotify
- [x] Persistent audio player bar with Spotify episode embeds
- [x] 9 seasons and 30+ episodes catalogued in structured data
- [x] Page transitions with Framer Motion
- [x] NavBar with blur-on-scroll effect
- [x] Mobile-responsive layout

### Content
- [x] 13 full interview transcripts imported from WordPress export (`src/data/blog.ts`)
- [x] All 9 WordCamp seasons with descriptions, cover art, and episode listings
- [x] Episode metadata: guest name, date, Spotify ID, episode URL, season cover image

### SEO & Discoverability
- [x] Per-page `<title>`, `<meta description>`, Open Graph tags
- [x] JSON-LD structured data: `WebSite`, `Organization`, `PodcastSeries`, `BreadcrumbList`
- [x] Auto-generated `sitemap.xml` and `robots.txt` at build time
- [x] Canonical URLs, Open Graph image (`/opengraph.jpg`)
- [x] Twitter Card meta tags

### API Server
- [x] Express 5 API server with `/api/contact` endpoint
- [x] Contact form email via Resend
- [x] Input validation (name min 2 chars, valid email, message min 10 chars)
- [x] Pino structured logging

### CI/CD
- [x] GitHub Actions: typecheck + build on every push and PR
- [x] Automatic deploy to GitHub Pages on `main` push (OIDC, no stored tokens)
- [x] API server deploy via configurable deploy hook (Render/Railway)
- [x] SPA 404 fallback (`index.html` → `404.html`) for client-side routing on GitHub Pages

### Infrastructure
- [x] pnpm workspaces monorepo with shared `@workspace/db`, `@workspace/api-spec`, `@workspace/api-zod`, `@workspace/api-client-react`
- [x] Drizzle ORM schema + versioned SQL migration workflow
- [x] Post-merge script: `pnpm install` + `db migrate`

---

## In Progress

- [ ] Resend domain verification for `@wpshoutout.com` sender address (contact form requires a verified sending domain)
- [ ] API server production deployment (Render / Railway) — deploy hook configured but host not yet provisioned

---

## Near-Term (Next 1–2 Seasons)

### Season 10
- [ ] Record Season 10 at the next WordCamp Europe
- [ ] Add Season 10 episode data to `src/data/episodes.ts`
- [ ] Add Season 10 blog post transcripts to `src/data/blog.ts`
- [ ] Update Schedule page with Season 10 recording dates

### Newsletter
- [ ] Add email newsletter sign-up (Resend Audiences or ConvertKit)
- [ ] Monthly digest of new episodes and WordCamp news

### Search
- [ ] Episode search across all seasons (client-side, Fuse.js or similar)
- [ ] Blog post search

### Player Improvements
- [ ] Episode queue / playlist (play all episodes in a season in order)
- [ ] Episode progress persistence via `localStorage`
- [ ] Mini-player state sync across page navigations

---

## Longer-Term Ideas

### Community Features
- [ ] Guest profiles page: all guests alphabetically with their episode links
- [ ] "WordCamp Map" — interactive world map showing all recording locations
- [ ] Community Slack / Discord invite integration

### Content Expansion
- [ ] Video episodes (YouTube embeds alongside Spotify audio)
- [ ] Transcription search (full-text search through interview content)
- [ ] "Best of" curated playlists across seasons

### CMS / Admin
- [ ] Headless CMS (Sanity or Contentlayer) to manage episodes and blog posts without code changes
- [ ] Admin UI for adding new episodes and seasons
- [ ] Preview deployments for content changes

### Performance
- [ ] Image optimization: convert S3 CDN images to WebP with responsive `srcset`
- [ ] Edge caching for API responses
- [ ] Core Web Vitals monitoring (LCP, CLS, FID)

### Monetization
- [ ] Sponsor page with current season sponsor details
- [ ] "Support the Show" page (Ko-fi or similar)

---

## Won't Do (Explicitly Out of Scope)

- Migrating from Spotify to a self-hosted audio CDN — Spotify embeds are the intended audio source
- Building a full WordPress back-end — content is managed via static TypeScript data files
- Light mode — the dark aesthetic is intentional and part of the brand
