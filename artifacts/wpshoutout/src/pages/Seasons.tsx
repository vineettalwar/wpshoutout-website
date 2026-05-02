import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { episodesBySeason } from "@/data/episodes";
import type { Episode } from "@/data/episodes";

const seasons = [
  {
    id: 9,
    title: "WC Europe 2022",
    location: "Porto",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2024/01/30220919/Sparkle-1.jpg",
  },
  {
    id: 8,
    title: "WC Europe 2019",
    location: "Berlin",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2019/06/29235041/WCEU-Berlin-2019.jpeg",
  },
  {
    id: 7,
    title: "WC Ahmedabad 2018",
    location: "Ahmedabad",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/12/29235247/Wordcamp-Ahmedabad-2018.webp",
  },
  {
    id: 6,
    title: "WC Bucharest 2018",
    location: "Bucharest",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/10/29235422/WC-Buc-2018.jpeg",
  },
  {
    id: 5,
    title: "WC Lausanne 2018",
    location: "Lausanne",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235548/WCLausanne-2018.jpeg",
  },
  {
    id: 4,
    title: "WC Würzburg 2018",
    location: "Würzburg",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235716/Wordcamp-Wurzburg-2018-banner-min.webp",
  },
  {
    id: 3,
    title: "WC Poznan 2018",
    location: "Poznan",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/07/29235820/WC-Poznan2018.jpeg",
  },
  {
    id: 2,
    title: "WC Europe 2018",
    location: "Belgrade",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/30000012/WC-EU-Belgrade-2018.jpeg",
  },
  {
    id: 1,
    title: "WC Gran Canaria 2018",
    location: "Gran Canaria",
    img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/30000636/Wordcamp-Gran-Canaria-2018.webp",
  },
];

function EpisodeRow({ episode }: { episode: Episode }) {
  const { currentEpisode, setCurrentEpisode } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;

  return (
    <li
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors group ${
        isActive ? "bg-primary/10" : "hover:bg-muted/50"
      } ${episode.spotifyId ? "cursor-pointer" : ""}`}
      onClick={() => episode.spotifyId && setCurrentEpisode(episode)}
      role={episode.spotifyId ? "button" : undefined}
      tabIndex={episode.spotifyId ? 0 : undefined}
      onKeyDown={(e) => {
        if (episode.spotifyId && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setCurrentEpisode(episode);
        }
      }}
    >
      <span
        className={`min-w-[28px] h-7 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {isActive ? <Play className="h-3 w-3 fill-current" /> : episode.num}
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug truncate">
          {episode.guest}
        </p>
        {episode.title && episode.title !== `Episode ${episode.num}` && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {episode.title}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">{episode.date}</p>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {episode.episodeUrl && (
          <a
            href={episode.episodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hidden sm:block"
            title="Open episode page"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {episode.spotifyId ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentEpisode(episode);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
            title="Play on Spotify"
          >
            <Play className="h-3 w-3 fill-current" />
            <span className="hidden sm:inline">{isActive ? "Playing" : "Play"}</span>
          </button>
        ) : (
          <span className="px-2 py-1 rounded-full text-xs text-muted-foreground bg-muted/50 hidden sm:inline-block">
            No audio
          </span>
        )}
      </div>
    </li>
  );
}


function SeasonCard({
  season,
  index,
}: {
  season: (typeof seasons)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const episodes = episodesBySeason[season.id] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50 shadow-lg">
        <img
          src={season.img}
          alt={season.title}
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

      <h3 className="text-2xl font-bold font-display mb-2">{season.title}</h3>
      <p className="text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
        Recorded in {season.location}
      </p>

      <Button
        variant="outline"
        className="w-full rounded-full border-border/50 hover:border-primary hover:text-primary flex items-center justify-center gap-2"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Hide Episodes" : "Browse Episodes"}
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-card rounded-2xl border border-border p-4">
              {episodes.length > 0 ? (
                <>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 px-1">
                    {episodes.length} Episode{episodes.length !== 1 ? "s" : ""}{" "}
                    · {season.title}
                  </p>
                  <ol className="space-y-1">
                    {episodes.map((ep) => (
                      <EpisodeRow key={ep.id} episode={ep} />
                    ))}
                  </ol>
                  {season.id === 9 && (
                    <p className="text-xs text-muted-foreground mt-4 px-1 flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </span>
                      Plays via Spotify — click Play on any episode
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed px-1">
                  Full episode listing coming soon. This season was recorded
                  live at {season.title} in {season.location}.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Seasons() {
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
