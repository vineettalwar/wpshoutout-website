import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border p-4 shadow-2xl">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src="https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21214927/WP-shoutout-season-1-cover.jpg" 
              alt="Currently Playing" 
              className="h-full w-full object-cover opacity-50 grayscale"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold font-display text-foreground">WP Shoutout Livestream</span>
            <span className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
              Currently Off Air
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" disabled>
              <SkipBack className="h-5 w-5 fill-current" />
            </Button>
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-transform" disabled>
              <Play className="h-6 w-6 fill-current ml-1" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" disabled>
              <SkipForward className="h-5 w-5 fill-current" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground w-8 text-right">0:00</span>
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
