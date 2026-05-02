import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const SITE_URL = "https://wpshoutout.com";

function extractSlugs(filePath: string): string[] {
  try {
    const src = readFileSync(filePath, "utf-8");
    const out: string[] = [];
    for (const m of src.matchAll(/slug:\s*"([^"]+)"/g)) out.push(m[1]);
    return out;
  } catch {
    return [];
  }
}

function seoFilesPlugin(): Plugin {
  return {
    name: "wpshoutout-seo-files",
    apply: "build",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const seasonSlugs = extractSlugs(
        path.resolve(import.meta.dirname, "src/data/seasons.ts"),
      );
      const blogSlugs = extractSlugs(
        path.resolve(import.meta.dirname, "src/data/blog.ts"),
      );

      const staticPaths = [
        "/",
        "/about",
        "/seasons",
        "/schedule",
        "/join-us",
        "/blog",
        "/contact",
      ];
      const dynamicPaths = [
        ...seasonSlugs.map((s) => `/season/${s}`),
        ...blogSlugs.map((s) => `/blog/${s}`),
      ];
      const all = [...staticPaths, ...dynamicPaths];

      const urls = all
        .map((p) => {
          const priority = p === "/" ? "1.0" : p.includes("/") ? "0.7" : "0.8";
          return `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
        })
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

      const outDir = path.resolve(import.meta.dirname, "dist/public");
      writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
      writeFileSync(path.join(outDir, "robots.txt"), robots);
      console.log(
        `[seo] wrote sitemap.xml (${all.length} urls) and robots.txt`,
      );
    },
  };
}

const rawPort = process.env.PORT;
const isBuild = process.argv.includes("build");

if (!rawPort && !isBuild) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = rawPort ? Number(rawPort) : 5173;

if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

if (!process.env.BASE_PATH && !isBuild) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    seoFilesPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
