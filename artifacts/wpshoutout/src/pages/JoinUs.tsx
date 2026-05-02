import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Globe, Users, Zap } from "lucide-react";
import { useSeo, breadcrumbJsonLd, SITE } from "@/lib/seo";

export default function JoinUs() {
  useSeo({
    title: "Join Us — Become a Shouter",
    description:
      "Take the mic with WP Shoutout. We're looking for hosts, contributors, and partners across the global WordPress community. Apply to become a Shouter.",
    path: "/join-us",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Join Us — WP Shoutout",
        url: `${SITE.url}/join-us`,
        inLanguage: SITE.language,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Join Us", path: "/join-us" },
      ]),
    ],
  });
  const perks = [
    { icon: Mic, title: "Share the Mic", desc: "Host interviews, guide conversations, and bring your unique voice to the global stage." },
    { icon: Globe, title: "Global Reach", desc: "Connect with the worldwide WordPress community and broadcast from international WordCamps." },
    { icon: Users, title: "Elite Network", desc: "Build relationships with core contributors, plugin founders, and agency owners." },
    { icon: Zap, title: "Full Support", desc: "We provide the platform, the audience, and the technical backing. You bring the energy." },
  ];

  return (
    <div className="w-full pt-32 pb-24">
      {/* Hero */}
      <section className="container px-4 md:px-8 mb-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-mono text-sm tracking-widest mb-6 border border-accent/20">
            OPEN INVITATION
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Take the Mic</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance">
            WPShoutOut community is growing by the day. We would like to have you on-board and add value with your contributions.
          </p>
        </motion.div>
      </section>

      {/* Value Props Grid */}
      <section className="container px-4 md:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 text-primary">
                <perk.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">{perk.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application CTA */}
      <section className="container px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-card to-background border border-border rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to broadcast?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Send us a message with a bit about yourself, your involvement in WordPress, and why you want to be a Shouter.
            </p>
            <Button asChild size="lg" className="rounded-full h-14 px-12 text-lg shadow-[0_0_30px_-5px_var(--color-primary)]">
              <Link href="/contact">Apply Now</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
