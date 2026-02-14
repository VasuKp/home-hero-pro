import { useState } from "react";
import { X, Calendar, Clock, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Professional } from "@/data/mockData";

interface Props {
  professional: Professional | null;
  open: boolean;
  onClose: () => void;
}

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export default function BookingModal({ professional, open, onClose }: Props) {
  const [form, setForm] = useState({ date: "", time: "", name: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = "Required";
    if (!form.time) e.time = "Select a time";
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    toast.success(`Booking confirmed with ${professional?.name}!`, {
      description: `${form.date} at ${form.time}`,
    });
    setForm({ date: "", time: "", name: "", phone: "" });
    onClose();
  };

  const update = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  if (!professional) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto border border-border"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground">Book Service</h3>
                <p className="text-sm text-muted-foreground">{professional.name} · {professional.service}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                  <Calendar className="w-4 h-4 text-accent" /> Select Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => update("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                  <Clock className="w-4 h-4 text-accent" /> Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      onClick={() => update("time", t)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                        form.time === t
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
              </div>

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                  <User className="w-4 h-4 text-accent" /> Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  placeholder="John Doe"
                  maxLength={100}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                  <Phone className="w-4 h-4 text-accent" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Starting from</p>
                  <p className="text-xl font-bold text-foreground">{professional.price}</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
