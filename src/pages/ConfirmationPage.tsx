import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Your service has been booked successfully. Our professional will reach out to you shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Browse More
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
