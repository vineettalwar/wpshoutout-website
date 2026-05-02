import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EpisodeRow } from "@/components/EpisodeRow";
import { seasonBySlug, seasons } from "@/data/seasons";
import { episodesBySeason } from "@/data/episodes";
import NotFound from "@/pages/not-found";

export default function Season() {
  const [, params] = useRoute("/season/:slug");
  const slug = params?.slug ?? "";
  const season = seasonBySlug[slug];

  if (!season) {
    return <NotFound />;
  }

  const episodes = episodesBySeason[season.id] ?? [];

  const currentIndex = seasons.findIndex((s) => s.id === season.id);
  const newer = currentIndex > 0 ? seasons[currentIndex - 1] : null;
  const older =
    currentIndex >= 0 && currentIndex < seasons.length - 1
      ? seasons[currentIndex + 1]
      : null;

  return (
    <div className="w-full pb-32">
      {/* Hero with full-bleed cover image */}
      <div className="relative w-full h-[55vh] min-h-[420px] max-h-[640px] overflow-hidden">
        <img
          src={season.img}
          alt={season.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <div className="relative h-full container px-4 md:px-8 flex flex-col justify-end pb-12">
          <Link
            href="/seasons"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            All Seasons
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-primary/20 border border-primary/40 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
              Season {season.id}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 max-w-4xl">
              {season.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {season.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {season.year}
              </span>
              {episodes.length > 0 && (
                <span className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary" />
                  {episodes.length} episode{episodes.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description */}
      <div className="container px-4 md:px-8 mt-16 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {season.description}
        </motion.p>
      </div>

      {/* Episodes */}
      <div className="container px-4 md:px-8 mt-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Episodes
          </h2>

          {episodes.length > 0 ? (
            <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
              <ol className="space-y-1">
                {episodes.map((ep) => (
                  <EpisodeRow key={ep.id} episode={ep} />
                ))}
              </ol>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
              <p className="text-muted-foreground leading-relaxed">
                Full episode listing coming soon. This season was recorded live
                at {season.title} in {season.location}.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Prev / Next navigation */}
      {(older || newer) && (
        <div className="container px-4 md:px-8 mt-24 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newer ? (
              <Link
                href={`/season/${newer.slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors block"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Next Season
                </p>
                <p className="font-bold font-display text-lg group-hover:text-primary transition-colors">
                  {newer.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {newer.location}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {older ? (
              <Link
                href={`/season/${older.slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors md:text-right block"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Previous Season
                </p>
                <p className="font-bold font-display text-lg group-hover:text-primary transition-colors">
                  {older.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {older.location}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/seasons" asChild>
              <Button
                variant="outline"
                className="rounded-full border-border/50 hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Seasons
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
