import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, CalendarCheck } from "lucide-react";

const stats = [
  { icon: Users, label: "Professionals", value: 30000, suffix: "+", display: "30K+" },
  { icon: Star, label: "Average Rating", value: 4.8, suffix: "", display: "4.8", isDecimal: true },
  { icon: CalendarCheck, label: "Bookings Completed", value: 2000000, suffix: "+", display: "2M+" },
];

function AnimatedCounter({ target, isDecimal, suffix }: { target: number; isDecimal?: boolean; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  const display = isDecimal
    ? count.toFixed(1)
    : count >= 1000000
    ? `${(count / 1000000).toFixed(count >= target ? 0 : 1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(count >= target ? 0 : 1)}K`
    : Math.floor(count).toString();

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-primary text-primary-foreground" id="why-choose-us">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose HomeServ</h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">Trusted by millions of customers across the country</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                <AnimatedCounter target={stat.value} isDecimal={stat.isDecimal} suffix={stat.suffix} />
              </div>
              <p className="text-primary-foreground/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
