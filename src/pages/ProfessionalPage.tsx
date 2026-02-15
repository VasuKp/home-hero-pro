import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, BadgeCheck, Clock, BarChart3, MapPin } from "lucide-react";
import { professionals } from "@/data/mock-data";
import Navbar from "@/components/Navbar";

export default function ProfessionalPage() {
  const { id } = useParams();
  const pro = professionals.find((p) => p.id === id);

  if (!pro) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Professional not found</h1>
          <Link to="/" className="text-accent font-medium">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-8 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img src={pro.image} alt={pro.name} className="w-20 h-20 rounded-full object-cover" />
              {pro.verified && <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-accent fill-accent stroke-background" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{pro.name}</h1>
              <p className="text-muted-foreground">{pro.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{pro.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Star, label: "Rating", value: pro.rating.toString() },
              { icon: BarChart3, label: "Jobs Done", value: pro.jobsCompleted.toLocaleString() },
              { icon: Clock, label: "Response", value: pro.responseTime },
              { icon: BadgeCheck, label: "Trust", value: `${pro.trustScore}%` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-muted/50">
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Trust Score</h3>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pro.trustScore}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
            Book This Professional
          </button>
        </motion.div>
      </div>
    </main>
  );
}
