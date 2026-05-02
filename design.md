# WP Shoutout — Design System

## Philosophy

The site aims for a **dark, premium, editorial** aesthetic inspired by Apple Music and Spotify's player interfaces. The guiding principle is "audio-first, community-centered": the design should feel like a high-end podcast studio, not a typical WordPress blog.

Key design intentions:
- **Dark by default** — the entire site runs in dark mode. No light mode toggle.
- **Typographic hierarchy** — content speaks through font weight and scale, not decorative elements.
- **Restrained color** — a single teal/emerald primary accent against near-black backgrounds.
- **Motion with purpose** — Framer Motion animations reinforce hierarchy, not distract.
- **Audio player always present** — the persistent player bar is the product's signature element.

---

## Color Palette

The palette is defined via Tailwind CSS v4 CSS custom properties in `artifacts/wpshoutout/src/index.css`.

| Role | Token | Value (approx.) |
|---|---|---|
| Background | `--background` | `#0a0a0a` (near-black) |
| Card / surface | `--card` | `#111111` |
| Muted surface | `--muted` | `#1a1a1a` |
| Border | `--border` | `rgba(255,255,255,0.08)` |
| Primary accent | `--primary` | `#1abc9c` (emerald/teal) |
| Secondary accent | `--secondary` | `#16a085` (darker teal) |
| Foreground text | `--foreground` | `#f5f5f5` |
| Muted text | `--muted-foreground` | `#888888` |
| Destructive | `--destructive` | `#e74c3c` |

The primary gradient used in headings and CTAs is:
```css
background: linear-gradient(to bottom-right, var(--primary), var(--secondary));
```

The hero background uses a radial glow:
```css
background: radial-gradient(circle at center, rgba(26,188,156,0.08) 0%, transparent 55%);
```

---

## Typography

Fonts are loaded from Google Fonts:

| Role | Family | Weights | Usage |
|---|---|---|---|
| Body / UI | Inter | 400, 500, 600, 700 | All body copy, labels, navigation |
| Display | Inter (bold) | 700, 800 | Page headings (h1, h2) |
| Mono | System mono | 400 | Badge labels, track IDs, code |

Font size scale follows Tailwind's default: `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px), up to `text-8xl` (96px) for hero headings.

Heading tracking is set tight (`tracking-tight`). The hero h1 uses responsive sizing: `text-5xl md:text-7xl lg:text-8xl`.

---

## Layout Grid

The site uses a container-based layout:

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem; /* md: 0 2rem */
}
```

Most inner content uses `max-w-4xl` (896px) for editorial readability. Season and blog grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-6`.

The **persistent audio player** is fixed at the bottom (`fixed bottom-0 left-0 right-0`) with `z-50` and a `h-20` footprint on desktop, collapsing to a minimal bar on mobile.

Page content adds `pb-24` to avoid being obscured by the player.

---

## Motion & Animation

Animations use **Framer Motion**. All pages share the same enter transition via `PageTransition.tsx`:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
/>
```

Section content uses **staggered children** via `containerVariants` + `itemVariants`:
- Container stagger: `staggerChildren: 0.1`
- Item transition: `duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]`

The audio player uses spring physics for the expand/collapse animation.

---

## Component Conventions

All UI primitives live in `artifacts/wpshoutout/src/components/ui/` and are based on **shadcn/ui** components (Radix UI under the hood).

Custom application components:

| Component | File | Purpose |
|---|---|---|
| `NavBar` | `components/NavBar.tsx` | Sticky top navigation, blur-on-scroll |
| `AudioPlayer` | `components/AudioPlayer.tsx` | Persistent Spotify embed player bar |
| `EpisodeRow` | `components/EpisodeRow.tsx` | Single episode row in season view |
| `Layout` | `components/Layout.tsx` | Page wrapper (NavBar + AudioPlayer + children) |
| `PageTransition` | `components/PageTransition.tsx` | Framer Motion page enter/exit wrapper |

---

## Page-by-Page Intent

### Home (`/`)
Hero section with large headline, radial glow background, and two CTAs ("Explore Seasons", "Meet the Shouters"). Below: featured seasons grid, latest episodes list, about teaser, and a newsletter/join CTA strip. Structured data: `WebSite`, `Organization`, `PodcastSeries`.

### About (`/about`)
Origin story of the show, photo gallery from WordCamp events (images committed in-repo under `public/images/about/`), and a "Shouters" section profiling the hosts. Tone: warm, personal.

### Seasons (`/seasons`)
Grid of all 9 seasons, each card showing season cover image, title, location, year, and episode count. Links to individual season pages.

### Season (`/season/:slug`)
Full season page: hero with cover art, season description, and a scrollable list of episodes via `EpisodeRow`. Each row shows guest name, episode title, date, and a "Play" button that loads the Spotify embed in the audio player bar.

### Schedule (`/schedule`)
Upcoming recording schedule and WordCamp event calendar. Static data for now; intended to be updated each season.

### Join Us (`/join-us`)
Three-column call to action: be a guest, sponsor a season, or join the community. Links to the contact form.

### Blog (`/blog`)
Grid of blog post cards (episode interview transcripts and write-ups). Posts are stored in `src/data/blog.ts` (auto-generated from the WordPress export).

### Blog Post (`/blog/:slug`)
Full Q&A transcript rendered from structured `BlogBlock[][]` data. Progressive Q/A pairs styled with speaker labels.

### Contact (`/contact`)
Contact form (name, email, message) with Zod validation. Submits to `POST /api/contact`. Uses `react-hook-form` + `@hookform/resolvers`.

---

## Inspiration

- **Apple Music** — high-contrast dark surfaces, premium typography, persistent player
- **Spotify** — green/teal accent on black, compact episode rows, embed-first audio
- **Linear** — motion polish, subtle borders, monospace badge labels
- **Vercel** — minimal, confident white-on-black aesthetic adapted to dark-on-dark
