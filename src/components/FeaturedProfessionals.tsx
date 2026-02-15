import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Clock, BarChart3 } from "lucide-react";
import { professionals } from "@/data/mock-data";

export default function FeaturedProfessionals() {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Featured Professionals</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Top-rated experts ready to help you</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionals.map((pro, i) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/professional/${pro.id}`)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img src={pro.image} alt={pro.name} className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                  {pro.verified && (
                    <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-5 h-5 text-accent fill-accent stroke-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{pro.name}</h3>
                  <p className="text-xs text-muted-foreground">{pro.specialty}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" /> Rating
                  </span>
                  <span className="font-semibold text-foreground">{pro.rating}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <BarChart3 className="w-3.5 h-3.5" /> Jobs
                  </span>
                  <span className="font-semibold text-foreground">{pro.jobsCompleted.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> Response
                  </span>
                  <span className="font-semibold text-foreground">{pro.responseTime}</span>
                </div>
              </div>

              {/* Trust score bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Trust Score</span>
                  <span className="font-semibold text-accent">{pro.trustScore}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pro.trustScore}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-sm font-semibold text-accent border border-accent rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
