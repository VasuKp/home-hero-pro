import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { professionals } from "@/data/mockData";
import type { Professional } from "@/data/mockData";
import ProfessionalCard from "@/components/ProfessionalCard";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { SlidersHorizontal, ArrowLeft } from "lucide-react";

export default function Search() {
  const [params] = useSearchParams();
  const serviceQ = params.get("service") || "";
  const locationQ = params.get("location") || "";

  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Professional | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const results = useMemo(() => {
    let list = professionals.filter(p => {
      const matchService = !serviceQ || p.service.toLowerCase().includes(serviceQ.toLowerCase()) || p.category.toLowerCase().includes(serviceQ.toLowerCase().replace(/\s+/g, "-"));
      const matchLocation = !locationQ || p.location.toLowerCase().includes(locationQ.toLowerCase());
      const matchVerified = !verifiedOnly || p.verified;
      const matchRating = p.rating >= minRating;
      return matchService && matchLocation && matchVerified && matchRating;
    });
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.priceNum - b.priceNum);
    return list;
  }, [serviceQ, locationQ, sortBy, verifiedOnly, minRating]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-8 bg-secondary/30">
        <div className="container-main">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-display">
            {serviceQ ? `Results for "${serviceQ}"` : "All Services"}
            {locationQ && <span className="text-muted-foreground font-normal text-lg"> in {locationQ}</span>}
          </h1>
          <SearchBar variant="page" />
        </div>
      </div>

      <div className="container-main flex-1 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">{results.length} professional{results.length !== 1 ? "s" : ""} found</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-background outline-none"
              aria-label="Sort by"
            >
              <option value="rating">Top Rated</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 shrink-0`}>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-5 sticky top-24">
              <h3 className="font-semibold text-sm text-foreground">Filters</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={e => setVerifiedOnly(e.target.checked)}
                  className="rounded accent-accent"
                />
                <span className="text-sm text-foreground">Verified Only</span>
              </label>
              <div>
                <p className="text-sm text-foreground mb-2">Minimum Rating</p>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        minRating === r ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {results.map((p, i) => (
                  <ProfessionalCard
                    key={p.id}
                    professional={p}
                    onBook={pr => { setSelected(pr); setModalOpen(true); }}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal professional={selected} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
