import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const seasons = [
  { id: 9, title: "WC Europe 2022", location: "Porto", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2024/01/30220919/Sparkle-1.jpg" },
  { id: 8, title: "WC Europe 2019", location: "Berlin", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2019/06/29235041/WCEU-Berlin-2019.jpeg" },
  { id: 7, title: "WC Ahmedabad 2018", location: "Ahmedabad", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/12/29235247/Wordcamp-Ahmedabad-2018.webp" },
  { id: 6, title: "WC Bucharest 2018", location: "Bucharest", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/10/29235422/WC-Buc-2018.jpeg" },
  { id: 5, title: "WC Lausanne 2018", location: "Lausanne", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235548/WCLausanne-2018.jpeg" },
  { id: 4, title: "WC Würzburg 2018", location: "Würzburg", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/09/29235716/Wordcamp-Wurzburg-2018-banner-min.webp" },
  { id: 3, title: "WC Poznan 2018", location: "Poznan", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/07/29235820/WC-Poznan2018.jpeg" },
  { id: 2, title: "WC Europe 2018", location: "Belgrade", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/06/30000012/WC-EU-Belgrade-2018.jpeg" },
  { id: 1, title: "WC Gran Canaria 2018", location: "Gran Canaria", img: "https://s3.ap-south-1.amazonaws.com/static.wpshoutout.com/media/wp-content/uploads/2018/04/30000636/Wordcamp-Gran-Canaria-2018.webp" },
];

export default function Seasons() {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Archive</h1>
          <p className="text-xl text-muted-foreground">
            Nine seasons of deep dives, backstage stories, and real conversations from WordCamps around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {seasons.map((season, i) => (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50 shadow-lg">
                <img 
                  src={season.img} 
                  alt={season.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-border">
                  Season {season.id}
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">{season.title}</h3>
              <p className="text-muted-foreground mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                Recorded in {season.location}
              </p>
              <Button variant="outline" className="w-full rounded-full border-border/50 hover:border-primary hover:text-primary">
                Explore Season
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
