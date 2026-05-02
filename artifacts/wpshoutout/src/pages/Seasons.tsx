import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { seasons, type Season } from "@/data/seasons";
import { episodesBySeason } from "@/data/episodes";
import { useSeo, breadcrumbJsonLd, SITE } from "@/lib/seo";

function SeasonCard({ season, index }: { season: Season; index: number }) {
  const episodes = episodesBySeason[season.id] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col"
    >
      <Link href={`/season/${season.slug}`} className="block">
        <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50 shadow-lg">
          <img
            src={season.img}
            alt={`${season.title} cover art`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-border">
            Season {season.id}
          </div>
          {episodes.length > 0 && (
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-muted-foreground border border-border">
              {episodes.length} episode{episodes.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
          {season.title}
        </h3>
        <p className="text-muted-foreground mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
          Recorded in {season.location}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          View Season
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function Seasons() {
  useSeo({
    title: "All Seasons",
    description:
      "Nine seasons of deep dives, backstage stories, and real conversations from WordCamps around the world — from Gran Canaria to Porto, Berlin, Lausanne, and beyond.",
    path: "/seasons",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "All Seasons — WP Shoutout",
        url: `${SITE.url}/seasons`,
        description:
          "Browse all nine seasons of WP Shoutout, recorded live at WordCamps across the globe.",
        inLanguage: SITE.language,
        hasPart: seasons.map((s) => ({
          "@type": "PodcastSeason",
          seasonNumber: s.id,
          name: s.title,
          url: `${SITE.url}/season/${s.slug}`,
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Seasons", path: "/seasons" },
      ]),
    ],
  });

  return (
    <div className="w-full pt-32 pb-40">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Archive
          </h1>
          <p className="text-xl text-muted-foreground">
            Nine seasons of deep dives, backstage stories, and real
            conversations from WordCamps around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {seasons.map((season, i) => (
            <SeasonCard key={season.id} season={season} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
