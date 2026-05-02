import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/lib/seo";

export default function NotFound() {
  useSeo({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
    noindex: true,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,188,156,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-8xl md:text-[10rem] font-display font-bold text-primary/20 leading-none mb-4 select-none">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Looks like this page went off air. Head back to the home studio.
          </p>
          <Button asChild size="lg" className="rounded-full h-14 px-10">
            <Link href="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
