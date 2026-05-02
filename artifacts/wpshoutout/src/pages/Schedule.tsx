import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useSeo, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { pub } from "@/lib/assets";

export default function Schedule() {
  useSeo({
    title: "Broadcast Schedule",
    description:
      "WP Shoutout is currently off air and on pause. If you're interested in coverage of an upcoming WordCamp or community event, get in touch with our team.",
    path: "/schedule",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Schedule — WP Shoutout",
        url: `${SITE.url}/schedule`,
        inLanguage: SITE.language,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Schedule", path: "/schedule" },
      ]),
    ],
  });
  return (
    <div className="w-full pt-32 pb-24 min-h-screen flex flex-col">
      <div className="container px-4 md:px-8 flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative"
        >
          <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center border-2 border-border/50 relative z-10">
            <Radio className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="absolute inset-0 rounded-full border border-muted-foreground/20 animate-ping" style={{ animationDuration: '3s' }}></div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold mb-8"
        >
          Currently Off Air
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-2xl"
        >
          Right now, due to the situation in the world, we are also taking a bit of a pause. However, if you are interested in coverage, get in touch with us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-card rounded-3xl p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-2xl font-bold font-display mb-6">What's Next?</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-8 relative group cursor-pointer border border-border">
            <img 
              src={pub("/images/youtube-preview.jpg")} 
              alt="Video Preview" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform shadow-[0_0_30px_-5px_var(--color-primary)]">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-current border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
            <a href="https://www.youtube.com/watch?v=Qg3UeUct_xY" target="_blank" rel="noreferrer" className="absolute inset-0">
              <span className="sr-only">Play Video</span>
            </a>
          </div>

          <Button asChild size="lg" className="rounded-full h-14 px-10">
            <Link href="/contact">Get in touch for coverage</Link>
          </Button>
        </motion.div>

      </div>
    </div>
  );
}
