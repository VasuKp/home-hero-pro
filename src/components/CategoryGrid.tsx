import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/mockData";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  const navigate = useNavigate();
  const [ref, inView] = useInView(0.1);

  return (
    <section id="categories" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
            Browse Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            From quick fixes to full makeovers — find exactly what your home needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => navigate(`/search?service=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Browse ${cat.name} services`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-2xl mb-1 block">{cat.icon}</span>
                <h3 className="text-white font-semibold text-sm md:text-base">{cat.name}</h3>
                <div className="flex items-center gap-1 text-white/60 text-xs mt-1 group-hover:text-accent transition-colors">
                  <span>{cat.serviceCount} services</span>
                  <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
