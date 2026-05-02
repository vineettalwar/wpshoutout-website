import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(26,188,156,0.08)_0%,transparent_55%)]" />
        <div className="container relative z-10 px-4 md:px-8 mt-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm tracking-widest mb-6 border border-primary/20"
            >
              CODE IS POETRY
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight mb-8"
            >
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
                WP Shoutout
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl text-balance"
            >
              The backstage pass to the global WordPress community. Intimate interviews, world travel, real stories.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full h-14 px-8 text-base font-semibold"
              >
                <Link href="/seasons">Explore Seasons</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-base font-semibold border-border hover:bg-card"
              >
                <Link href="/about">Get to Know Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Season 1 Featured Highlight */}
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Where It All Began</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Season 1 set the stage for everything that followed. We sat down with Rocio Valdivia, Carlos Mora, Mario
                Wolf, Sven Lehnert, and Fernando Tellado to capture the heartbeat of the WordPress community live from
                Gran Canaria.
              </p>
              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/seasons">Listen to Season 1</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
              <img
                src="https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21214927/WP-shoutout-season-1-cover.jpg"
                alt="Season 1 Cover"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <h3 className="text-2xl font-bold mb-2">Season 1 Highlight</h3>
                <p className="text-foreground/80">5 Episodes · 2018 · Gran Canaria</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seasons Grid Teaser */}
      <section className="py-32">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Latest from the Road</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Broadcasting live from WordCamp events across the globe.
              </p>
            </div>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0">
              <Link href="/seasons">View All Seasons &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "WC Europe 2022",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2024/01/30220919/Sparkle-1.jpg",
              },
              {
                title: "WC Europe 2019",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2019/06/29235041/WCEU-Berlin-2019.jpeg",
              },
              {
                title: "WC Ahmedabad 2018",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/12/29235247/Wordcamp-Ahmedabad-2018.webp",
              },
              {
                title: "WC Bucharest 2018",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/10/29235422/WC-Buc-2018.jpeg",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-card"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-xl font-bold font-display">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get to Know WP Shoutout */}
      <section className="py-24 bg-card/40 border-y border-border/50">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Get to Know WP Shoutout</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                We got two words: WP as in WordPress and Shoutout as in... well you get it! WP Shoutout is a podcast —
                previously an online radio show on FireMud FM — powered by WordPress.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                WP Shoutout was started to contribute to the community by talking to prominent and emerging members of
                the ecosystem — to see how they go about their work, and to let others learn from them. Being a
                community project, it needs support. Come join us and spread all about WordPress live on air by becoming
                one of our Shouters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full h-14 px-8">
                  <Link href="/about">Our Full Story</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 border-border hover:bg-card">
                  <Link href="/join-us">Become a Shouter</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Shouters Team */}
      <section className="py-24 bg-card">
        <div className="container px-4 md:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-16"
          >
            Meet the Shouters
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Vineet Talwar",
                role: "Partner, Shouter",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/30001636/Vineet_Talwar_bnw.jpg",
              },
              {
                name: "Ashutosh Gaur",
                role: "Shouter Season 2 & 7",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/21215210/ashutosh-team-member-e1648592353311.jpg",
              },
              {
                name: "This could be you!",
                role: "Join the Team",
                img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/21215234/new-team-member.jpg",
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center max-w-[200px]"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-border p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-24 border-y border-border/50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider mb-6 border border-secondary/20">
                WHAT'S NEXT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">WP Shoutout's Next Chapter</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Right now, due to the situation in the world, we are also taking a bit of a pause. However, if you are
                interested in coverage, get in touch with us. The WordPress community keeps building — and so do we.
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-8">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-video bg-card border border-border shadow-xl"
            >
              <a
                href="https://www.youtube.com/watch?v=Qg3UeUct_xY"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full group"
              >
                <img
                  src={`https://img.youtube.com/vi/Qg3UeUct_xY/hqdefault.jpg`}
                  alt="WP Shoutout on YouTube"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Strip */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container relative z-10 px-4 md:px-8 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Want to be part of the show?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              We're always looking for passionate voices in the WordPress community to collaborate, sponsor, or join us
              on air.
            </p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
