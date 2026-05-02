export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  img: string;
  body: string[];
}

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "the-art-of-the-technical-interview",
    title: "The Art of the Technical Interview",
    excerpt:
      "How to extract compelling stories from developers without getting bogged down in code syntax. After nine seasons of live broadcasting, we've learned a thing or two about asking the right questions.",
    date: "Oct 12, 2023",
    readingTime: "5 min read",
    category: "Podcasting",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80",
    body: [
      "After nine seasons of recording live from WordCamps around the world, the single biggest lesson we've learned is this: the best technical interview is rarely about the technology. It's about the human behind the keyboard.",
      "When we sit down with a developer who's just spent three days giving talks on hooks, filters, and performance, the last thing they want to do is recite the same talking points into another microphone. So we don't ask them to. We ask about the project that almost broke them. The first plugin they shipped that taught them something they couldn't unlearn. The conference hallway conversation that changed their career trajectory.",
      "The trick is preparation that doesn't show. We read every blog post, watch every recent talk, and then we throw the script away. The interview becomes a conversation between two people who have done the same kind of homework — and the listener gets to eavesdrop on something that feels real.",
      "There's a structural rhythm we've stumbled into over the years. Open with something specific from their work — never a generic 'tell us about yourself.' Move into the why behind a technical decision. Then pivot to community: who helped them, who they help now. Close with a single piece of advice they'd give their five-years-ago self. Eight times out of ten, that closing question delivers the moment listeners quote back to us months later.",
      "If you're starting your own technical podcast, the gear matters less than you think. Two decent dynamic microphones, a quiet enough corner of the venue, and a willingness to leave silence in the recording when the silence is the answer. The rest is just listening — really listening — and being curious enough to ask the second question instead of the safe one.",
    ],
  },
  {
    id: 2,
    slug: "building-community-across-borders",
    title: "Building Community Across Borders",
    excerpt:
      "What we've learned from attending nine different WordCamps in nine different countries. The WordPress community is more connected — and more diverse — than you might expect.",
    date: "Sep 28, 2023",
    readingTime: "6 min read",
    category: "Community",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Gran Canaria. Belgrade. Poznan. Würzburg. Lausanne. Bucharest. Ahmedabad. Berlin. Porto. Nine WordCamps. Nine cultures. One platform that somehow ties it all together.",
      "When you attend a WordCamp in a city you've never been to, in a language you don't speak, surrounded by people you've never met — and then realize within five minutes that you all know the same plugins, recognize the same speaker names, laugh at the same Gutenberg jokes — you understand something profound about open source. WordPress isn't a CMS. It's a passport.",
      "Each community has its own personality. The Polish WordPressers are fiercely focused on the craft and ship some of the most polished plugins in the directory. The Indian community runs the warmest meetups we've ever attended — there's always chai, always a plate of food being passed your way, always somebody two tables over who 'must introduce you to a friend.' The Swiss community is small, deeply technical, and obsessed with performance. The Spanish community throws the best after-parties, no contest.",
      "But the threads that connect them are stronger than the differences. Every WordCamp we've attended has had three things in common: a contributor day where strangers shipped patches together, a speaker who teared up talking about how WordPress changed their life, and a hallway conversation that rewired somebody's career. That's not a coincidence. That's the soul of the project.",
      "If you're thinking about attending your first WordCamp outside your home country, do it. Pick the city you've always wanted to visit, find the camp closest to that date, and book the flight. The community will take care of the rest. Bring business cards but don't lead with them. Bring questions. Bring time for one more coffee than you planned. That's where the real conference happens.",
    ],
  },
  {
    id: 3,
    slug: "audio-gear-for-the-traveling-broadcaster",
    title: "Audio Gear for the Traveling Broadcaster",
    excerpt:
      "Our minimal viable setup for capturing studio-quality audio in noisy conference halls. Less gear than you think, and more intentionality than you'd expect.",
    date: "Sep 15, 2023",
    readingTime: "4 min read",
    category: "Gear",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    body: [
      "A common question we get from listeners thinking about starting their own podcast: what gear do you actually travel with? The honest answer is — less than you'd think, and absolutely nothing fancy.",
      "Our entire kit fits inside a single small camera bag. Two Shure SM58 dynamic microphones (the workhorse vocal mic that's been on stages for fifty years), a Zoom H6 portable recorder, two short XLR cables, two pop filters, a folding mini boom arm we honestly use about half the time, and a pair of closed-back monitoring headphones. That's it. Total weight under three kilograms.",
      "The dynamic mic choice is intentional. Conference halls are chaotic — coffee carts rattling, sponsor announcements over the PA, a hundred laptop fans running. A condenser mic would pick all of that up. A dynamic mic with a tight cardioid pattern only hears what's six inches in front of it. That single decision rescued our audio quality more than any post-production trick ever could.",
      "We record everything to dual SD cards in the H6 — one as a backup we never delete until the episode ships. Twice in nine seasons we've had a card go bad mid-interview, and twice the backup has saved us. It's a five-dollar lesson we paid for in stress before we learned it.",
      "Beyond the gear, the real trick is the room. We always scout the venue thirty minutes before recording, find the quietest pocket — usually a side hallway, sometimes a stairwell — and set up there. A quiet room with a forty-dollar microphone will always sound better than a loud room with a four-thousand-dollar microphone. Spend your money on a quiet corner, not on more inputs.",
    ],
  },
  {
    id: 4,
    slug: "why-wordpress-needs-more-voices",
    title: "Why WordPress Needs More Voices",
    excerpt:
      "The ecosystem is huge, but the megaphone is often held by a few. It's time to democratize the mic. That's the mission behind WP Shoutout — and it's more relevant now than ever.",
    date: "Aug 30, 2023",
    readingTime: "5 min read",
    category: "Opinion",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80",
    body: [
      "WordPress powers more than forty percent of the web. That number gets quoted so often it's lost some of its weight, but stop and think about it for a second. Two out of every five sites you visit today were built on the same open source project. The reach is staggering.",
      "And yet — when you scan the speaker list at any major WordPress event, when you look at who gets invited on the big podcasts, when you see whose tweets get amplified — the same hundred or so names show up over and over. That's not a criticism of those people. They've earned their seats. But forty percent of the web cannot possibly fit inside one hundred microphones.",
      "Every WordCamp we've attended has been packed with developers, designers, freelancers, agency owners, and contributors who have stories that deserve to be heard — and have never been asked. Maybe English isn't their first language. Maybe they don't tweet. Maybe they ship plugins that solve real problems for real businesses but they've never given a conference talk because nobody told them they should.",
      "That's the entire premise behind WP Shoutout. Show up to the camp. Find the person who's quietly doing the work. Hand them a microphone. Ask them the question they've been waiting for somebody to ask. Then get out of the way and let them talk.",
      "If you're reading this and you've ever thought 'I have something to say but nobody would listen' — we want to listen. The fourth shouter on our team can be you. The next interview we publish could be yours. The community is bigger than the loudest hundred voices, and the project is healthier when more of us are on the mic.",
    ],
  },
];

export const postBySlug: Record<string, BlogPost> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);
