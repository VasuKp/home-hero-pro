import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ArrowUp } from "lucide-react";

export default function CTASection() {
  const [ref, inView] = useInView(0.3);

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-primary p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-96 h-96 rounded-full bg-accent -top-20 -right-20" />
            <div className="absolute w-64 h-64 rounded-full bg-accent -bottom-10 -left-10" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Join 50,000+ homeowners who trust us for all their home service needs.
            </p>
            <button
              onClick={scrollToHero}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              <ArrowUp className="w-4 h-4" />
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
