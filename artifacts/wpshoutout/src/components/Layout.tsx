import { ReactNode } from "react";
import { useLocation } from "wouter";
import { NavBar } from "./NavBar";
import { AudioPlayer } from "./AudioPlayer";
import { PageTransition } from "./PageTransition";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <NavBar />
      <main className="flex-1 pb-32 overflow-x-hidden">
        <PageTransition locationKey={location}>
          {children}
        </PageTransition>
      </main>
      <AudioPlayer />
    </div>
  );
}
