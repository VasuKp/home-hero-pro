import { useState } from "react";
import { motion } from "framer-motion";
import { Star, RotateCcw, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { services } from "@/data/mock-data";
import BookingModal from "@/components/BookingModal";

export default function PersonalizedSection() {
  const { user, bookings } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ name: string; professional?: string } | null>(null);

  if (!user) return null;

  const hasBookings = bookings.length > 0;
  const title = hasBookings ? "Quick Book Again" : "Start Your First Booking";
  const subtitle = hasBookings
    ? "Rebook your favorite services in one tap"
    : "Explore our most popular services near you";

  const handleBook = (serviceName: string, professional?: string) => {
    setSelectedService({ name: serviceName, professional });
    setModalOpen(true);
  };

  return (
    <>
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{title}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{subtitle}</p>
          </motion.div>

          {hasBookings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={booking.serviceImage} alt={booking.serviceName} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{booking.serviceName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {booking.professionalName}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < booking.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-accent">₹{booking.price.toLocaleString()}</span>
                      <button
                        onClick={() => handleBook(booking.serviceName, booking.professionalName)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Book Again
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="text-sm text-muted-foreground">{service.rating} ({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-accent">From ₹{service.price.toLocaleString()}</span>
                      <button
                        onClick={() => handleBook(service.name)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillService={selectedService?.name}
        prefillProfessional={selectedService?.professional}
      />
    </>
  );
}
