import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "The Art of the Technical Interview",
    excerpt:
      "How to extract compelling stories from developers without getting bogged down in code syntax. After nine seasons of live broadcasting, we've learned a thing or two about asking the right questions.",
    date: "Oct 12, 2023",
    category: "Podcasting",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Building Community Across Borders",
    excerpt:
      "What we've learned from attending nine different WordCamps in nine different countries. The WordPress community is more connected — and more diverse — than you might expect.",
    date: "Sep 28, 2023",
    category: "Community",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Audio Gear for the Traveling Broadcaster",
    excerpt:
      "Our minimal viable setup for capturing studio-quality audio in noisy conference halls. Less gear than you think, and more intentionality than you'd expect.",
    date: "Sep 15, 2023",
    category: "Gear",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Why WordPress Needs More Voices",
    excerpt:
      "The ecosystem is huge, but the megaphone is often held by a few. It's time to democratize the mic. That's the mission behind WP Shoutout — and it's more relevant now than ever.",
    date: "Aug 30, 2023",
    category: "Opinion",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Blog() {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Editorial</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on podcasting, community building, and the global WordPress ecosystem.
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
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-border">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <time>{post.date}</time>
                <span>&bull;</span>
                <span>5 min read</span>
              </div>
              <h2 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
