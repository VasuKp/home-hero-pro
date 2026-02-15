import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const bookingSchema = z.object({
  service: z.string().min(1, "Service is required"),
  professional: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, "Invalid phone number"),
});

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillProfessional?: string;
}

export default function BookingModal({ open, onClose, prefillService, prefillProfessional }: BookingModalProps) {
  const [form, setForm] = useState({
    service: prefillService || "",
    professional: prefillProfessional || "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addBooking } = useAuth();

  useEffect(() => {
    if (prefillService) setForm((f) => ({ ...f, service: prefillService }));
    if (prefillProfessional) setForm((f) => ({ ...f, professional: prefillProfessional }));
  }, [prefillService, prefillProfessional]);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    addBooking({
      id: `b${Date.now()}`,
      serviceId: "s1",
      serviceName: form.service,
      serviceImage: "",
      professionalName: form.professional || "Assigned Professional",
      professionalId: "p1",
      date: form.date,
      price: 699,
      rating: 0,
    });

    setLoading(false);
    onClose();
    toast.success("Booking confirmed! 🎉");
    navigate("/confirmation");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Book a Service</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors" aria-label="Close">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {[
              { field: "service", label: "Service", type: "text", placeholder: "e.g. AC Repair" },
              { field: "professional", label: "Professional (optional)", type: "text", placeholder: "Auto-assigned" },
              { field: "date", label: "Date", type: "date", placeholder: "" },
              { field: "time", label: "Time", type: "time", placeholder: "" },
              { field: "name", label: "Your Name", type: "text", placeholder: "Full name" },
              { field: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
            ].map(({ field, label, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[field as keyof typeof form]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-background outline-none transition-colors ${
                    errors[field] ? "border-destructive" : "border-border focus:border-accent"
                  }`}
                />
                {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-semibold disabled:opacity-60 transition-opacity"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
