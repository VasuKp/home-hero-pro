import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/mock-data";

export default function CategoryBar() {
  const navigate = useNavigate();

  return (
    <section className="relative z-20 -mt-10 px-4">
      <motion.div
        className="max-w-5xl mx-auto bg-background rounded-2xl shadow-xl border border-border p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
              className="flex flex-col items-center gap-1.5 min-w-[72px] px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
              aria-label={`Browse ${cat.name}`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap transition-colors">{cat.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
