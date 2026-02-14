import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { professionals } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Star, Shield, Clock, MapPin, ArrowLeft, Briefcase, CheckCircle } from "lucide-react";

export default function ProfessionalProfile() {
  const { id } = useParams();
  const p = professionals.find(pr => pr.id === id);
  const [modalOpen, setModalOpen] = useState(false);

  if (!p) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="text-xl font-bold text-foreground mb-2">Professional Not Found</h1>
            <Link to="/search" className="text-accent text-sm hover:underline">Browse all professionals</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-8 bg-secondary/30">
        <div className="container-main">
          <Link to="/search" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile */}
            <div className="flex-1">
              <div className="flex items-start gap-5">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover" />
                  {p.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-accent-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground font-display">{p.name}</h1>
                  <p className="text-muted-foreground">{p.service}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" /> {p.rating} ({p.reviews} reviews)</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {p.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {p.responseTime}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {p.experience}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.about}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {p.skills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-accent" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-8 py-4 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-accent">{p.completedJobs.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Jobs Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{p.experience}</p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking card */}
            <div className="md:w-80 shrink-0">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-3xl font-bold text-foreground mb-4">{p.price}</p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Book Now
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Free cancellation up to 4 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <Footer />
      <BookingModal professional={p} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
