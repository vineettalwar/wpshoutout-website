import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSeo, breadcrumbJsonLd, SITE } from "@/lib/seo";

export default function About() {
  useSeo({
    title: "About",
    description:
      "WP Shoutout is a podcast (previously an online radio show on FireMud FM) powered by WordPress. Learn the story behind the show, our shouters, and our community.",
    path: "/about",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About WP Shoutout",
        url: `${SITE.url}/about`,
        inLanguage: SITE.language,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });
  const gallery = [
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215002/image-5.jpg",
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215014/image-4.jpg",
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215025/image-2.jpg",
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215035/image-3.jpg",
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215048/image-6.jpg",
    "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21215058/image-1.jpg",
  ];

  return (
    <div className="w-full pt-32">
      {/* Header */}
      <section className="container px-4 md:px-8 max-w-4xl mx-auto text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold mb-8"
        >
          Our Story
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-24 h-1 bg-primary mx-auto mb-10"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance"
        >
          We got two words: WP as in WordPress and Shoutout as in… well you get it!
        </motion.p>
      </section>

      {/* Story Content */}
      <section className="container px-4 md:px-8 max-w-3xl mx-auto prose prose-invert prose-lg prose-p:text-muted-foreground prose-headings:font-display prose-headings:text-foreground mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            WP Shoutout is a podcast (Previously an online radio show on FireMud FM) powered by WordPress. WP Shoutout was initially started when FireMud caught pace and we decided to contribute to the community by talking to some prominent and some new members of the community to see how they go about with their work.
          </p>
          <p>
            We intended people to learn from them. WPShoutOut is now evolving into an independent podcast. Being a community project, it needs support.
          </p>
          <div className="my-12 p-8 border-l-4 border-primary bg-card/50 rounded-r-2xl">
            <h3 className="text-2xl font-bold mt-0 mb-4">When we say community, we mean it.</h3>
            <p className="mb-0 text-foreground">
              Come join us and spread all about WordPress live on air by becoming one of our SHOUTERS.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="container px-4 md:px-8 mb-32">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">Community in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl overflow-hidden bg-card ${i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-video md:aspect-auto" : "aspect-square"}`}
            >
              <img
                src={src}
                alt="WP Shoutout community moment"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="container px-4 md:px-8 py-24 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-6">Become a Shouter</h2>
          <p className="text-lg text-muted-foreground mb-10">
            We're building a global network of voices. Ready to share the mic?
          </p>
          <Button asChild size="lg" className="rounded-full h-14 px-10">
            <Link href="/join-us">Join the Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
