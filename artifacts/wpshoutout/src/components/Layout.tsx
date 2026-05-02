import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { AudioPlayer } from "./AudioPlayer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <NavBar />
      <main className="flex-1 pb-32">
        {children}
      </main>
      <AudioPlayer />
    </div>
  );
}
