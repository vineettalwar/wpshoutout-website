import { useState, useEffect } from "react";
import { Play, SkipBack, SkipForward, Volume2, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { allEpisodes } from "@/data/episodes";

export function AudioPlayer() {
  const { currentEpisode, setCurrentEpisode } = usePlayer();
  const [spotifyKey, setSpotifyKey] = useState(0);

  const currentIndex = currentEpisode
    ? allEpisodes.findIndex((e) => e.id === currentEpisode.id)
    : -1;

  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < allEpisodes.length - 1
      ? allEpisodes[currentIndex + 1]
      : null;

  useEffect(() => {
    if (currentEpisode) {
      setSpotifyKey((k) => k + 1);
    }
  }, [currentEpisode?.id]);

  if (!currentEpisode) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border p-4 shadow-2xl">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21214927/WP-shoutout-season-1-cover.jpg"
                alt="WP Shoutout"
                className="h-full w-full object-cover opacity-50 grayscale"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold font-display text-foreground">
                WP Shoutout
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40"></span>
                Select an episode to start listening
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                disabled
              >
                <SkipBack className="h-5 w-5 fill-current" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full bg-foreground/10 text-foreground/30"
                disabled
              >
                <Play className="h-6 w-6 fill-current ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                disabled
              >
                <SkipForward className="h-5 w-5 fill-current" />
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-muted-foreground w-8 text-right">
                0:00
              </span>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-0 bg-primary"></div>
              </div>
              <span className="text-xs text-muted-foreground w-8">0:00</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-2 w-1/3">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl">
      {currentEpisode.spotifyId && (
        <div className="w-full">
          <iframe
            key={spotifyKey}
            src={`https://open.spotify.com/embed/episode/${currentEpisode.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            style={{ border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`${currentEpisode.title} — ${currentEpisode.guest}`}
          />
        </div>
      )}

      {!currentEpisode.spotifyId && (
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={currentEpisode.coverImg}
                alt={currentEpisode.seasonTitle}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold font-display text-foreground truncate">
                {currentEpisode.guest}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentEpisode.seasonTitle} · Ep. {currentEpisode.num}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                disabled={!prevEpisode}
                onClick={() => prevEpisode && setCurrentEpisode(prevEpisode)}
              >
                <SkipBack className="h-5 w-5 fill-current" />
              </Button>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted/50 text-muted-foreground text-xs text-center px-1">
                No audio
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                disabled={!nextEpisode}
                onClick={() => nextEpisode && setCurrentEpisode(nextEpisode)}
              >
                <SkipForward className="h-5 w-5 fill-current" />
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
            {currentEpisode.episodeUrl && (
              <a
                href={currentEpisode.episodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary flex items-center gap-1 hover:underline"
              >
                Listen on site <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setCurrentEpisode(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentEpisode.spotifyId && (
        <div className="container mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0">
              <img
                src={currentEpisode.coverImg}
                alt={currentEpisode.seasonTitle}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {currentEpisode.guest}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentEpisode.seasonTitle} · Ep. {currentEpisode.num}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              disabled={!prevEpisode}
              onClick={() => prevEpisode && setCurrentEpisode(prevEpisode)}
              title="Previous episode"
            >
              <SkipBack className="h-4 w-4 fill-current" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              disabled={!nextEpisode}
              onClick={() => nextEpisode && setCurrentEpisode(nextEpisode)}
              title="Next episode"
            >
              <SkipForward className="h-4 w-4 fill-current" />
            </Button>
            {currentEpisode.episodeUrl && (
              <a
                href={currentEpisode.episodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                title="Open episode page"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setCurrentEpisode(null)}
              title="Close player"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
