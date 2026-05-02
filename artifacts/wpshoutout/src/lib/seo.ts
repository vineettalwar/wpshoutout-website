import { useEffect } from "react";

export const SITE = {
  name: "WP Shoutout",
  url: "https://wpshoutout.com",
  description:
    "The backstage pass to the global WordPress community. Intimate interviews, world travel, real stories — broadcast live from WordCamps around the world.",
  image: "https://wpshoutout.com/opengraph.jpg",
  twitter: "@wpshoutout",
  language: "en",
};

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [k: string]: JsonLdValue };

export type JsonLd = { [k: string]: JsonLdValue };

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLd | JsonLd[];
  noindex?: boolean;
  /** Override the full <title>. By default we append " — WP Shoutout". */
  titleOverride?: string;
}

function upsertMeta(
  attr: "name" | "property",
  key: string,
  value: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function removeMeta(attr: "name" | "property", key: string): void {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo(opts: SeoOptions): void {
  const jsonLdKey = opts.jsonLd ? JSON.stringify(opts.jsonLd) : "";

  useEffect(() => {
    const fullTitle =
      opts.titleOverride ??
      (opts.title === SITE.name ? SITE.name : `${opts.title} — ${SITE.name}`);
    const url = `${SITE.url}${opts.path ?? "/"}`;
    const image = opts.image ?? SITE.image;
    const type = opts.type ?? "website";

    document.title = fullTitle;
    upsertMeta("name", "description", opts.description);
    upsertMeta(
      "name",
      "robots",
      opts.noindex ? "noindex,nofollow" : "index,follow",
    );
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", opts.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", opts.description);
    upsertMeta("name", "twitter:image", image);

    if (opts.publishedTime) {
      upsertMeta("property", "article:published_time", opts.publishedTime);
    } else {
      removeMeta("property", "article:published_time");
    }
    if (opts.modifiedTime) {
      upsertMeta("property", "article:modified_time", opts.modifiedTime);
    } else {
      removeMeta("property", "article:modified_time");
    }

    document.head
      .querySelectorAll('script[data-seo-jsonld="true"]')
      .forEach((s) => s.remove());
    if (opts.jsonLd) {
      const items = Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd];
      for (const item of items) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      }
    }
  }, [
    opts.title,
    opts.titleOverride,
    opts.description,
    opts.path,
    opts.image,
    opts.type,
    opts.publishedTime,
    opts.modifiedTime,
    opts.noindex,
    jsonLdKey,
  ]);
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    sameAs: [
      "https://open.spotify.com/show/3uTVFUiM6sJaVpSfNRD7Sn",
      "https://www.youtube.com/@wpshoutout",
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.language,
  };
}

export function podcastSeriesJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: SITE.image,
    inLanguage: SITE.language,
    webFeed: "https://anchor.fm/s/c5f2d1a8/podcast/rss",
    sameAs: ["https://open.spotify.com/show/3uTVFUiM6sJaVpSfNRD7Sn"],
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function podcastSeasonJsonLd(season: {
  number: number;
  name: string;
  url: string;
  image: string;
  description: string;
  numberOfEpisodes: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeason",
    seasonNumber: season.number,
    name: season.name,
    url: season.url,
    image: season.image,
    description: season.description,
    numberOfEpisodes: season.numberOfEpisodes,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function articleJsonLd(article: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  authorName?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    url: article.url,
    inLanguage: SITE.language,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.svg` },
    },
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.authorName
      ? { author: { "@type": "Person", name: article.authorName } }
      : {}),
  };
}

/**
 * Convert a human-readable date like "Jul 1, 2022" or "1 Jul 2022" to an
 * ISO 8601 date string. Returns undefined if the date can't be parsed.
 */
export function toIsoDate(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}
