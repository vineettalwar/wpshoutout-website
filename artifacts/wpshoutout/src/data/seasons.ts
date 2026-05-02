export interface Season {
  id: number;
  slug: string;
  title: string;
  location: string;
  year: number;
  img: string;
  description: string;
}

export const seasons: Season[] = [
  {
    id: 9,
    slug: "wc-europe-2022",
    title: "WC Europe 2022",
    location: "Porto, Portugal",
    year: 2022,
    img: "/images/seasons/s9-wceu-2022.jpg",
    description:
      "Our biggest season yet — recorded live at WordCamp Europe 2022 in Porto. Thirteen episodes capturing the spirit of the WordPress community as it returned to in-person events. From core contributors to agency leaders, this season is a backstage pass to the people building the open web.",
  },
  {
    id: 8,
    slug: "wc-europe-2019",
    title: "WC Europe 2019",
    location: "Berlin, Germany",
    year: 2019,
    img: "/images/seasons/s8-wceu-2019.jpg",
    description:
      "Recorded live from WordCamp Europe 2019 in Berlin. Three deep conversations with WordPress veterans on scale, design at WooCommerce, and what it really takes to contribute to open source over the long haul.",
  },
  {
    id: 7,
    slug: "wc-ahmedabad-2018",
    title: "WC Ahmedabad 2018",
    location: "Ahmedabad, India",
    year: 2018,
    img: "/images/seasons/s7-wc-ahmedabad-2018.webp",
    description:
      "WP Shoutout went home for this season — recorded at WordCamp Ahmedabad 2018, the energy capital of India's WordPress community. Two episodes on growing local communities and building sites that work for everyone.",
  },
  {
    id: 6,
    slug: "wc-bucharest-2018",
    title: "WC Bucharest 2018",
    location: "Bucharest, Romania",
    year: 2018,
    img: "/images/seasons/s6-wc-bucharest-2018.jpg",
    description:
      "Recorded at WordCamp Bucharest 2018. The Romanian WordPress scene is small but mighty — these conversations dig into what it takes to run an agency and build a community from the ground up.",
  },
  {
    id: 5,
    slug: "wc-lausanne-2018",
    title: "WC Lausanne 2018",
    location: "Lausanne, Switzerland",
    year: 2018,
    img: "/images/seasons/s5-wc-lausanne-2018.jpg",
    description:
      "Recorded live from WordCamp Lausanne 2018 on the shores of Lake Geneva. Two technical conversations on performance and the future of WordPress themes — perfect for developers who care about the craft.",
  },
  {
    id: 4,
    slug: "wc-wuerzburg-2018",
    title: "WC Würzburg 2018",
    location: "Würzburg, Germany",
    year: 2018,
    img: "/images/seasons/s4-wc-wuerzburg-2018.webp",
    description:
      "WordCamp Würzburg 2018 brought together the German WordPress community in one of its most beautiful baroque cities. Two episodes on security in practice and writing plugins that don't break the web.",
  },
  {
    id: 3,
    slug: "wc-poznan-2018",
    title: "WC Poznan 2018",
    location: "Poznan, Poland",
    year: 2018,
    img: "/images/seasons/s3-wc-poznan-2018.jpg",
    description:
      "Recorded live at WordCamp Poznan 2018, our first stop in the Polish WordPress community. Two conversations on teaching the next generation and getting the most out of custom post types.",
  },
  {
    id: 2,
    slug: "wc-europe-2018",
    title: "WC Europe 2018",
    location: "Belgrade, Serbia",
    year: 2018,
    img: "/images/seasons/s2-wc-europe-2018.jpg",
    description:
      "Our second season, recorded live at WordCamp Europe 2018 in Belgrade. Three legendary conversations on Gutenberg, contributing to core, and what it really means to make a living building WordPress sites.",
  },
  {
    id: 1,
    slug: "wc-gran-canaria-2018",
    title: "WC Gran Canaria 2018",
    location: "Gran Canaria, Spain",
    year: 2018,
    img: "/images/seasons/s1-wc-gran-canaria-2018.webp",
    description:
      "The first season of WP Shoutout kicked off when our shouter Vineet Talwar interviewed live from WordCamp Gran Canaria, held from 23rd to 25th February 2018. Five episodes that started a movement.",
  },
];

export const seasonBySlug: Record<string, Season> = Object.fromEntries(
  seasons.map((s) => [s.slug, s]),
);

export const seasonById: Record<number, Season> = Object.fromEntries(
  seasons.map((s) => [s.id, s]),
);
