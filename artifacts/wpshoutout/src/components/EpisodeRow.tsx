import { Play, ExternalLink } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import type { Episode } from "@/data/episodes";

export function EpisodeRow({ episode }: { episode: Episode }) {
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
            <span className="hidden sm:inline">
              {isActive ? "Playing" : "Play"}
            </span>
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
