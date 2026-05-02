import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { posts, postBySlug } from "@/data/blog";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = postBySlug[slug];

  if (!post) {
    return <NotFound />;
  }

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="w-full pb-32">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[360px] max-h-[560px] overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/75 to-background" />

        <div className="relative h-full container px-4 md:px-8 flex flex-col justify-end pb-12 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            All Interviews
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-primary/20 border border-primary/40 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {post.readingTime}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <article className="container px-4 md:px-8 mt-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Intro */}
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl px-6 py-5 mb-12">
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Q&A sections */}
          <div className="space-y-12">
            {post.body.map((section, sectionIdx) => (
              <section
                key={sectionIdx}
                className={
                  sectionIdx % 2 === 1
                    ? "bg-card border border-border rounded-2xl p-6 md:p-8"
                    : ""
                }
              >
                <div className="space-y-5">
                  {section.map((block, i) =>
                    block.kind === "q" ? (
                      <p
                        key={i}
                        className="text-lg md:text-xl font-semibold text-foreground leading-snug pt-4 first:pt-0"
                      >
                        <span className="text-primary mr-2">Q.</span>
                        {block.text}
                      </p>
                    ) : (
                      <p
                        key={i}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
                      >
                        {block.text}
                      </p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      </article>

      {/* Other posts */}
      {others.length > 0 && (
        <div className="container px-4 md:px-8 mt-24 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
            Keep Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors block"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={other.img}
                    alt={other.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2">
                    {other.category}
                  </p>
                  <h3 className="font-bold font-display text-lg group-hover:text-primary transition-colors leading-snug">
                    {other.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" asChild>
              <Button
                variant="outline"
                className="rounded-full border-border/50 hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Interviews
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
