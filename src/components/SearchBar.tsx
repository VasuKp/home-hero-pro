import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronDown, LocateFixed } from "lucide-react";
import { cities, servicesSuggestions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function SearchBar({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [errors, setErrors] = useState<{ service?: string; location?: string }>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const suggestRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const debouncedFilter = useCallback((val: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.length > 0) {
        const filtered = servicesSuggestions.filter(s =>
          s.toLowerCase().includes(val.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }, 200);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) setShowSuggestions(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setShowCities(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    toast.promise(
      new Promise<string>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => { resolve("Mumbai"); },
          () => { resolve("Delhi"); }
        );
      }),
      {
        loading: "Detecting location...",
        success: (city) => { setLocation(city as string); return `Location set to ${city}`; },
        error: "Could not detect location",
      }
    );
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!service.trim()) newErrors.service = "Select a service";
    if (!location.trim()) newErrors.location = "Select location";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    navigate(`/search?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`);
  };

  const isHero = variant === "hero";

  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-3 sm:gap-0 w-full",
      isHero
        ? "bg-background/95 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-border/50 max-w-2xl"
        : "bg-background rounded-xl p-2 shadow-md border border-border"
    )}>
      {/* Location */}
      <div className="relative" ref={cityRef}>
        <button
          onClick={() => setShowCities(!showCities)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto",
            "hover:bg-muted text-foreground",
            errors.location && "ring-2 ring-destructive"
          )}
          aria-label="Select location"
        >
          <MapPin className="w-4 h-4 text-destructive shrink-0" />
          <span className="truncate">{location || "Location"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </button>
        {errors.location && <span className="absolute -bottom-5 left-4 text-xs text-destructive">{errors.location}</span>}

        <AnimatePresence>
          {showCities && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="absolute top-full mt-2 left-0 w-56 bg-background rounded-xl shadow-xl border border-border z-50 max-h-64 overflow-auto"
            >
              <button
                onClick={() => { detectLocation(); setShowCities(false); }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-accent hover:bg-muted transition-colors border-b border-border"
              >
                <LocateFixed className="w-4 h-4" /> Detect my location
              </button>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => { setLocation(city); setShowCities(false); setErrors(e => ({ ...e, location: undefined })); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors",
                    location === city && "text-accent font-medium"
                  )}
                >
                  {city}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px bg-border self-stretch my-2" />

      {/* Service input */}
      <div className="relative flex-1" ref={suggestRef}>
        <input
          type="text"
          value={service}
          onChange={e => { setService(e.target.value); debouncedFilter(e.target.value); setErrors(er => ({ ...er, service: undefined })); }}
          onFocus={() => { if (service.length > 0) debouncedFilter(service); }}
          placeholder="Search for a service..."
          className={cn(
            "w-full px-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
            errors.service && "ring-2 ring-destructive rounded-xl"
          )}
          aria-label="Search services"
        />
        {errors.service && <span className="absolute -bottom-5 left-4 text-xs text-destructive">{errors.service}</span>}

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="absolute top-full mt-2 left-0 right-0 bg-background rounded-xl shadow-xl border border-border z-50 max-h-56 overflow-auto"
            >
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setService(s); setShowSuggestions(false); setErrors(er => ({ ...er, service: undefined })); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search button */}
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </div>
  );
}
