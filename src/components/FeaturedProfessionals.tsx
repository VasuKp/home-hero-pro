import { useState } from "react";
import { professionals } from "@/data/mockData";
import type { Professional } from "@/data/mockData";
import ProfessionalCard from "./ProfessionalCard";
import BookingModal from "./BookingModal";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

export default function FeaturedProfessionals() {
  const [ref, inView] = useInView(0.1);
  const [selected, setSelected] = useState<Professional | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBook = (p: Professional) => {
    setSelected(p);
    setModalOpen(true);
  };

  return (
    <section id="professionals" className="section-padding" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
            Top-Rated Professionals
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Handpicked experts with verified skills and stellar reviews.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {professionals.map((p, i) => (
            <ProfessionalCard key={p.id} professional={p} onBook={handleBook} index={i} />
          ))}
        </div>
      </div>

      <BookingModal professional={selected} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
