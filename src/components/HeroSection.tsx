import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { locations, serviceSuggestions } from "@/data/mock-data";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const [location, setLocation] = useState("Mirpur");
  const [locOpen, setLocOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 0) {
        const filtered = serviceSuggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }, 250);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter a service");
      inputRef.current?.focus();
      return;
    }
    navigate(`/search?service=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Modern home interior" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-24 pb-32 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your <span className="italic text-accent">Personal</span> Assistant
        </motion.h1>
        <motion.p
          className="text-white/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Book trusted home services at your doorstep
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={`flex items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden transition-all ${error ? "ring-2 ring-destructive" : "ring-0 focus-within:ring-2 focus-within:ring-accent/50"}`}>
            {/* Location */}
            <div className="relative">
              <button
                onClick={() => setLocOpen(!locOpen)}
                className="flex items-center gap-2 h-full px-4 sm:px-5 border-r border-border text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Select location"
              >
                <MapPin className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm font-medium hidden sm:inline">{location}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {locOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 w-44 bg-popover border border-border rounded-xl shadow-lg z-50 py-1 max-h-60 overflow-y-auto"
                  >
                    {locations.map((loc) => (
                      <li key={loc}>
                        <button
                          onClick={() => { setLocation(loc); setLocOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${loc === location ? "text-accent font-semibold" : "text-foreground"}`}
                        >
                          {loc}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Service input */}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search for a service..."
                className="w-full h-14 px-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
                aria-label="Search services"
              />
              <AnimatePresence>
                {showSuggestions && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg z-50 py-1 max-h-48 overflow-y-auto"
                  >
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button
                          onMouseDown={() => { setQuery(s); setShowSuggestions(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="px-6 sm:px-8 bg-accent text-accent-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          {error && <p className="text-destructive text-sm mt-2 text-left pl-2">{error}</p>}
        </motion.div>
      </div>
    </section>
  );
}
