import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function FinalCTA() {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Book a trusted professional for your home in just a few clicks
          </p>
          <button
            onClick={scrollToHero}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <ArrowUp className="w-5 h-5" /> Find a Service
          </button>
        </motion.div>
      </div>
    </section>
  );
}
