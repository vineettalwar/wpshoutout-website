import { createContext, useContext, useState, ReactNode } from "react";
import type { Episode } from "@/data/episodes";

interface PlayerContextType {
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode | null) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  currentEpisode: null,
  setCurrentEpisode: () => {},
});

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  function handleSetEpisode(episode: Episode | null) {
    setCurrentEpisode(episode);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        setCurrentEpisode: handleSetEpisode,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
