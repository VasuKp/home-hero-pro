import { useScrollPosition } from "@/hooks/useScrollPosition";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileCTA() {
  const { scrollY } = useScrollPosition();
  const show = scrollY > 600;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3"
        >
          <Link
            to="/search"
            className="block w-full py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-center text-sm active:scale-[0.97] transition-transform"
          >
            Book a Service Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
