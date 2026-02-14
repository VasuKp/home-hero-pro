import { Star, Shield, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Professional } from "@/data/mockData";

interface Props {
  professional: Professional;
  onBook: (p: Professional) => void;
  index?: number;
}

export default function ProfessionalCard({ professional: p, onBook, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover-lift"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="w-14 h-14 rounded-xl object-cover"
            />
            {p.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-accent-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link to={`/professional/${p.id}`} className="font-semibold text-foreground hover:text-accent transition-colors truncate">
                {p.name}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground truncate">{p.service}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="font-medium text-foreground">{p.rating}</span>
                ({p.reviews})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {p.responseTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting at</span>
            <p className="text-lg font-bold text-foreground">{p.price}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/professional/${p.id}`}
              className="px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1"
            >
              View <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => onBook(p)}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
