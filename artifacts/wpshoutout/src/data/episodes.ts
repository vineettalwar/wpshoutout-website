export interface Episode {
  id: string;
  num: number;
  title: string;
  guest: string;
  date: string;
  season: number;
  seasonTitle: string;
  coverImg: string;
  spotifyId?: string;
  episodeUrl?: string;
}

const WCEU2022_COVER =
  "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2024/01/30220919/Sparkle-1.jpg";
const GRAN_CANARIA_COVER =
  "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/21214927/WP-shoutout-season-1-cover.jpg";
const WCEU2019_COVER =
  "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2019/06/29235041/WCEU-Berlin-2019.jpeg";

export const episodesBySeason: Record<number, Episode[]> = {
  9: [
    {
      id: "s9e1",
      num: 1,
      title: "Why WordPress Works",
      guest: "Taeke",
      date: "1 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "4LGEnQMnWtehIjO7fSGklU",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/why-wordpress-works-a-conversation-with-taeke/",
    },
    {
      id: "s9e2",
      num: 2,
      title: "From the Netherlands to Automattic",
      guest: "Niels Lange",
      date: "3 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "3Vk06SAhrlNMbPZbngrZss",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/from-the-netherlands-to-automattic-niels-langes-wordpress-journey/",
    },
    {
      id: "s9e3",
      num: 3,
      title: "WordPress, Career Growth & Leading Technical Teams",
      guest: "Sean Blakely",
      date: "5 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "75TzhlkMhg02lToGZN0Hfz",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/sean-blakely-on-wordpress-career-growth-leading-technical-teams/",
    },
    {
      id: "s9e4",
      num: 4,
      title: "The WordPress Mindset",
      guest: "Takis Bouyouris",
      date: "7 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "6a8z6512lzw4uuTFHVMsZu",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/the-wordpress-mindset-with-takis-bulois/",
    },
    {
      id: "s9e5",
      num: 5,
      title: "Building Better Experiences: Talking UX & WordPress",
      guest: "Evangelia Pappa",
      date: "9 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "1GaDA7nkPG4Hp1YSsEktvK",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/building-better-experiences-talking-ux-wordpress-with-evangelia-pappa/",
    },
    {
      id: "s9e6",
      num: 6,
      title: "Crafting Digital Experiences: A WordPress Story",
      guest: "Pádraig Cullen",
      date: "11 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "0KdDzo26yiWRNZi3gSlSVO",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/crafting-digital-experiences-a-wordpress-story-with-padraig-cullen/",
    },
    {
      id: "s9e7",
      num: 7,
      title: "Open Source, Docs, and the Heart of WordPress",
      guest: "Milana Cap",
      date: "13 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "5Ee0LAF8im94SO5RRmsxH6",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/milana-cap-on-open-source-docs-and-the-heart-of-wordpress/",
    },
    {
      id: "s9e8",
      num: 8,
      title: "Simplifying WordPress Security",
      guest: "Rogier Lankhorst",
      date: "15 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "7pFwYxLmlzxvIcYgLilg9l",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/how-rogier-lankhorst-simplifies-wordpress-security/",
    },
    {
      id: "s9e9",
      num: 9,
      title: "Simplifying Consent & Compliance",
      guest: "Alexander Goller",
      date: "17 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "34mdyohWdgQkb1KY3GFc7c",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/simplifying-consent-compliance-with-alexander-goller/",
    },
    {
      id: "s9e10",
      num: 10,
      title: "Modern Web Performance & Core Contributions",
      guest: "Adam Silverstein",
      date: "19 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "1F4FwsOjrRbpGW4oabYBNq",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/modern-web-performance-core-contributions-a-conversation-with-adam-silverstein/",
    },
    {
      id: "s9e11",
      num: 11,
      title: "The Human Side of Building for the Web",
      guest: "Daugirdas & Justinas (Hostinger)",
      date: "21 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "3zbuMywoFPyo033wJtsOAj",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/the-human-side-of-building-for-the-web-a-conversation-with-dj-and-justin/",
    },
    {
      id: "s9e12",
      num: 12,
      title: "Inside the WordPress Ecosystem",
      guest: "Stefano Minoia & Alicia",
      date: "23 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "0Amq27aAqQWjpiteqdCQ52",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/inside-the-wordpress-ecosystem-with-stefano-minoia-alicia/",
    },
    {
      id: "s9e13",
      num: 13,
      title: "Behind the Scenes of NitroPack",
      guest: "Dean & Simeon",
      date: "25 Jul 2022",
      season: 9,
      seasonTitle: "WC Europe 2022",
      coverImg: WCEU2022_COVER,
      spotifyId: "5jTgXJbNPNLHL97ABawbv2",
      episodeUrl:
        "https://wpshoutout.com/wceu2022/behind-the-scenes-of-nitropack-insights-from-dean-simeon/",
    },
  ],
  8: [
    {
      id: "s8e1",
      num: 1,
      title: "WordPress at Scale with Bernhard Kau",
      guest: "Bernhard Kau",
      date: "Jun 2019",
      season: 8,
      seasonTitle: "WC Europe 2019",
      coverImg: WCEU2019_COVER,
    },
    {
      id: "s8e2",
      num: 2,
      title: "Designing for Millions: A WooCommerce Story",
      guest: "Tammie Lister",
      date: "Jun 2019",
      season: 8,
      seasonTitle: "WC Europe 2019",
      coverImg: WCEU2019_COVER,
    },
    {
      id: "s8e3",
      num: 3,
      title: "Open Source Community & Contribution",
      guest: "Matías Ventura",
      date: "Jun 2019",
      season: 8,
      seasonTitle: "WC Europe 2019",
      coverImg: WCEU2019_COVER,
    },
  ],
  7: [
    {
      id: "s7e1",
      num: 1,
      title: "Growing the WordPress Community in India",
      guest: "Bhavesh Gangani",
      date: "Dec 2018",
      season: 7,
      seasonTitle: "WC Ahmedabad 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/12/29235247/Wordcamp-Ahmedabad-2018.webp",
    },
    {
      id: "s7e2",
      num: 2,
      title: "Building Accessible WordPress Sites",
      guest: "Joe Simpson",
      date: "Dec 2018",
      season: 7,
      seasonTitle: "WC Ahmedabad 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/12/29235247/Wordcamp-Ahmedabad-2018.webp",
    },
  ],
  6: [
    {
      id: "s6e1",
      num: 1,
      title: "Running a Successful WordPress Agency",
      guest: "Ionut Neagu",
      date: "Oct 2018",
      season: 6,
      seasonTitle: "WC Bucharest 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/10/29235422/WC-Buc-2018.jpeg",
    },
    {
      id: "s6e2",
      num: 2,
      title: "The Art of Community Building",
      guest: "Miroslav Glavic",
      date: "Oct 2018",
      season: 6,
      seasonTitle: "WC Bucharest 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/10/29235422/WC-Buc-2018.jpeg",
    },
  ],
  5: [
    {
      id: "s5e1",
      num: 1,
      title: "WordPress Performance Deep Dive",
      guest: "Thierry Muller",
      date: "Sep 2018",
      season: 5,
      seasonTitle: "WC Lausanne 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235548/WCLausanne-2018.jpeg",
    },
    {
      id: "s5e2",
      num: 2,
      title: "The Future of WordPress Themes",
      guest: "Carolina Nymark",
      date: "Sep 2018",
      season: 5,
      seasonTitle: "WC Lausanne 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235548/WCLausanne-2018.jpeg",
    },
  ],
  4: [
    {
      id: "s4e1",
      num: 1,
      title: "WordPress Security in Practice",
      guest: "Jan Reilink",
      date: "Sep 2018",
      season: 4,
      seasonTitle: "WC Würzburg 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235716/Wordcamp-Wurzburg-2018-banner-min.webp",
    },
    {
      id: "s4e2",
      num: 2,
      title: "Building Plugins the Right Way",
      guest: "Carsten Bach",
      date: "Sep 2018",
      season: 4,
      seasonTitle: "WC Würzburg 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235716/Wordcamp-Wurzburg-2018-banner-min.webp",
    },
  ],
  3: [
    {
      id: "s3e1",
      num: 1,
      title: "Teaching WordPress in Eastern Europe",
      guest: "Katarzyna Augustyn",
      date: "Jul 2018",
      season: 3,
      seasonTitle: "WC Poznan 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/07/29235820/WC-Poznan2018.jpeg",
    },
    {
      id: "s3e2",
      num: 2,
      title: "Custom Post Types & the Modern Web",
      guest: "Marcin Skrzypiec",
      date: "Jul 2018",
      season: 3,
      seasonTitle: "WC Poznan 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/07/29235820/WC-Poznan2018.jpeg",
    },
  ],
  2: [
    {
      id: "s2e1",
      num: 1,
      title: "Gutenberg: What It Means for the Web",
      guest: "Morten Rand-Hendriksen",
      date: "Jun 2018",
      season: 2,
      seasonTitle: "WC Europe 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/30000012/WC-EU-Belgrade-2018.jpeg",
    },
    {
      id: "s2e2",
      num: 2,
      title: "Contributing to Core: A First-Timer's Guide",
      guest: "Pascal Birchler",
      date: "Jun 2018",
      season: 2,
      seasonTitle: "WC Europe 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/30000012/WC-EU-Belgrade-2018.jpeg",
    },
    {
      id: "s2e3",
      num: 3,
      title: "Growing a Freelance WordPress Business",
      guest: "Ashutosh Gaur",
      date: "Jun 2018",
      season: 2,
      seasonTitle: "WC Europe 2018",
      coverImg:
        "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/30000012/WC-EU-Belgrade-2018.jpeg",
    },
  ],
  1: [
    {
      id: "s1e1",
      num: 1,
      title: "Episode 1",
      guest: "Rocio Valdivia",
      date: "24 Mar 2018",
      season: 1,
      seasonTitle: "WC Gran Canaria 2018",
      coverImg: GRAN_CANARIA_COVER,
    },
    {
      id: "s1e2",
      num: 2,
      title: "Episode 2",
      guest: "Carlos Mora",
      date: "31 Mar 2018",
      season: 1,
      seasonTitle: "WC Gran Canaria 2018",
      coverImg: GRAN_CANARIA_COVER,
    },
    {
      id: "s1e3",
      num: 3,
      title: "Episode 3",
      guest: "Mario Wolf",
      date: "14 Apr 2018",
      season: 1,
      seasonTitle: "WC Gran Canaria 2018",
      coverImg: GRAN_CANARIA_COVER,
    },
    {
      id: "s1e4",
      num: 4,
      title: "Episode 4",
      guest: "Sven Lehnert",
      date: "21 Apr 2018",
      season: 1,
      seasonTitle: "WC Gran Canaria 2018",
      coverImg: GRAN_CANARIA_COVER,
    },
    {
      id: "s1e5",
      num: 5,
      title: "Episode 5",
      guest: "Fernando Tellado",
      date: "28 Apr 2018",
      season: 1,
      seasonTitle: "WC Gran Canaria 2018",
      coverImg: GRAN_CANARIA_COVER,
    },
  ],
};

export const allEpisodes: Episode[] = Object.keys(episodesBySeason)
  .map(Number)
  .sort((a, b) => b - a)
  .flatMap((seasonId) => episodesBySeason[seasonId]);
