import { trustStats } from "@/data/mockData";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

function StatItem({ label, value, suffix, inView }: { label: string; value: number; suffix: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView);
  const display = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K` : count;

  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-accent font-display">
        {display}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function TrustStats() {
  const [ref, inView] = useInView(0.3);

  return (
    <section className="py-16 bg-primary" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {trustStats.map(s => (
            <StatItem key={s.label} {...s} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
