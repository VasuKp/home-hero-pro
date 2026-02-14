import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { howItWorks } from "@/data/mockData";

export default function HowItWorks() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="how-it-works" className="section-padding" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">How It Works</h2>
          <p className="text-muted-foreground mt-3">Three simple steps to a happier home.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-border" />

          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative text-center"
            >
              <div className="mx-auto w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-accent/20 transition-colors relative z-10">
                {step.icon}
              </div>
              <span className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                Step {step.step}
              </span>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
