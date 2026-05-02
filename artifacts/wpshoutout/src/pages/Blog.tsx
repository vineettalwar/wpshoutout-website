import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/blog";
import { useSeo, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { pub } from "@/lib/assets";

export default function Blog() {
  useSeo({
    title: "Interviews — WordCamp Europe 2022",
    description:
      "Read the full transcripts from our WordCamp Europe 2022 conversations — thirteen long-form interviews with the people building the open web.",
    path: "/blog",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "WP Shoutout Interviews",
        url: `${SITE.url}/blog`,
        description:
          "Long-form interviews with members of the global WordPress community.",
        inLanguage: SITE.language,
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE.url}/blog/${p.slug}`,
          image: p.img,
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Interviews", path: "/blog" },
      ]),
    ],
  });

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Interviews
          </h1>
          <p className="text-xl text-muted-foreground">
            Read the full transcripts from our WordCamp Europe 2022
            conversations — thirteen interviews with the people building the
            open web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50">
                  <img
                    src={pub(post.img)}
                    alt={post.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-border">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <time>{post.date}</time>
                  <span>&bull;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read Interview
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
