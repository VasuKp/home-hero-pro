import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Filter, ArrowLeft, Search } from "lucide-react";
import { services } from "@/data/mock-data";
import Navbar from "@/components/Navbar";
import BookingModal from "@/components/BookingModal";

export default function SearchPage() {
  const [params] = useSearchParams();
  const serviceQuery = params.get("service") || "";
  const locationQuery = params.get("location") || "";
  const categoryQuery = params.get("category") || "";

  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc">("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const filtered = useMemo(() => {
    let result = [...services];
    const q = (serviceQuery || categoryQuery).toLowerCase();
    if (q) {
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      );
    }
    if (ratingFilter) result = result.filter((s) => s.rating >= 4);
    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });
    return result;
  }, [serviceQuery, categoryQuery, sortBy, ratingFilter]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {serviceQuery || categoryQuery ? `Results for "${serviceQuery || categoryQuery}"` : "All Services"}
            </h1>
            {locationQuery && <p className="text-sm text-muted-foreground">in {locationQuery}</p>}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-5 sticky top-24">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={ratingFilter} onChange={(e) => setRatingFilter(e.target.checked)} className="rounded accent-accent" />
                  <span className="text-sm text-foreground">Rating 4+</span>
                </label>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Sort by</p>
                {([["rating", "Top Rated"], ["price-asc", "Price: Low to High"], ["price-desc", "Price: High to Low"]] as const).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer mb-1.5">
                    <input type="radio" name="sort" checked={sortBy === val} onChange={() => setSortBy(val)} className="accent-accent" />
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span className="text-sm text-muted-foreground">{filtered.length} results</span>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 text-sm text-accent font-medium">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">Try a different search term or browse our categories</p>
                <Link to="/" className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold">
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-44 overflow-hidden">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{s.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                          <span className="text-sm font-medium text-foreground">{s.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-accent">₹{s.price.toLocaleString()}</span>
                        <button
                          onClick={() => { setSelectedService(s.name); setModalOpen(true); }}
                          className="px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} prefillService={selectedService} />
    </main>
  );
}
