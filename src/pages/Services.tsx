import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import { services, categories } from "../data";
import Icon from "../components/Icon";
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "../useToast";

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

export const Services: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("popular");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const toast = useToast();

  const activeCat = params.get("cat") || "all";
  const activeQuery = params.get("q") || "";

  const results = useMemo(() => {
    let list = [...services];

    if (activeCat !== "all") list = list.filter((s) => s.category === activeCat);

    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (min) list = list.filter((s) => s.price >= Number(min));
    if (max) list = list.filter((s) => s.price <= Number(max));
    if (onlyVerified) list = list.filter((s) => s.verified);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.booked - a.booked);
    }

    return list;
  }, [activeCat, activeQuery, min, max, onlyVerified, sort]);

  function applySearch(e: React.FormEvent) {
    e.preventDefault();
    setParams(query ? { q: query } : {});
    if (query) toast(`Showing results for "${query}"`, "info");
  }

  function setCat(cat: string) {
    const next = new URLSearchParams(params);
    if (cat === "all") next.delete("cat");
    else next.set("cat", cat);
    setParams(next);
  }

  function clearFilters() {
    setParams({});
    setQuery("");
    setMin("");
    setMax("");
    setOnlyVerified(false);
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <div className="page-hero slim">
        <div className="page-inner">
          <BackButton className="hero" />
          <span className="eyebrow">SERVICES</span>
          <h1>Find the right professional for the job</h1>
          <p>
            Choose from dozens of cooperative-certified services with fixed, upfront pricing.
          </p>

          <form className="page-search" onSubmit={applySearch}>
            <Search size={20} />
            <input
              placeholder="Search by keyword, task, or trade..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search services"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="page-inner">
        <div className="category-tabs">
          <button
            className={activeCat === "all" ? "cat-tab active" : "cat-tab"}
            onClick={() => setCat("all")}
          >
            All Services
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={activeCat === c.id ? "cat-tab active" : "cat-tab"}
              onClick={() => setCat(c.id)}
            >
              <Icon name={c.id} size={16} />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <div className="browse-layout">
          <aside className="browse-filters">
            <div className="filter-group">
              <h4>Filter by Price</h4>
              <div className="filter-range">
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <span>to</span>
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Sort By</h4>
              {sortOptions.map((opt) => (
                <label key={opt.id} className="radio-row">
                  <input
                    type="radio"
                    name="sort"
                    checked={sort === opt.id}
                    onChange={() => setSort(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <label className="radio-row check">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                />
                <span>Verified listings only</span>
              </label>
            </div>

            <div className="filter-actions">
              <button className="btn btn-outline btn-sm btn-block" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          </aside>

          <main className="browse-main">
            <div className="browse-toolbar">
              <p>
                Showing <strong>{results.length}</strong> services
                {activeCat !== "all" ? ` in ${categories.find((c) => c.id === activeCat)?.label}` : ""}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="empty-state">
                <Search size={36} />
                <h3>No services match your filters</h3>
                <p>Try resetting filters or searching with different terms.</p>
                <button className="btn btn-primary btn-sm" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="service-grid">
                {results.map((svc) => (
                  <ServiceCard key={svc.id} service={svc} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
