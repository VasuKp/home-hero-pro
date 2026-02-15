import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { services } from "@/data/mock-data";

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-muted animate-pulse">
      <div className="h-48 rounded-t-2xl bg-muted-foreground/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 rounded bg-muted-foreground/10" />
        <div className="h-3 w-full rounded bg-muted-foreground/10" />
        <div className="h-3 w-1/2 rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
}

export default function PopularServices() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  return (
    <section className="section-padding" id="popular-services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Popular Services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Most booked services by our customers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/search?service=${encodeURIComponent(service.name)}`)}
              className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                {!loaded[service.id] && <SkeletonCard />}
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  onLoad={() => setLoaded((p) => ({ ...p, [service.id]: true }))}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${loaded[service.id] ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span className="text-xs font-semibold text-foreground">{service.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">₹{service.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">{service.duration}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
