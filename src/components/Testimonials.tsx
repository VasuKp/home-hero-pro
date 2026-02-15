import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/mock-data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground">Real reviews from real customers</p>
        </motion.div>

        <div
          className="relative bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute top-6 left-6 w-10 h-10 text-accent/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" loading="lazy" />
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < t.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <p className="text-foreground text-lg sm:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">"{t.text}"</p>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.service} • {new Date(t.date).toLocaleDateString()}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? "bg-accent" : "bg-muted-foreground/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
