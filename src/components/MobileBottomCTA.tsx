import { Search } from "lucide-react";

export default function MobileBottomCTA() {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3">
      <button
        onClick={scrollToHero}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-accent text-accent-foreground font-semibold"
        aria-label="Book a service"
      >
        <Search className="w-4 h-4" /> Book a Service
      </button>
    </div>
  );
}
