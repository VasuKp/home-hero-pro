import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/mock-data";
import BookingModal from "@/components/BookingModal";

export default function ForYourHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const homeServices = services.slice(0, 4);

  return (
    <>
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">For Your Home</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Essential services to keep your home in perfect shape</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl mb-4">
                  {["🧹", "⚡", "🔧", "❄️"][i]}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{s.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent">₹{s.price.toLocaleString()}</span>
                  <button
                    onClick={() => { setSelected(s.name); setModalOpen(true); }}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    Book Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} prefillService={selected} />
    </>
  );
}
