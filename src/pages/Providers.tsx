import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  Star,
  MapPin,
  BadgeCheck,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  Languages,
  CalendarCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import BackButton from "../components/BackButton";
import { providers, services, formatINR } from "../data";
import { useToast } from "../useToast";
import { useAuth } from "../context/useAuth";

export const Providers: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const toast = useToast();
  const { user } = useAuth();

  const focusId = params.get("id");

  const categories = useMemo(
    () => [...new Map(providers.map((p) => [p.category, p])).values()] as any[],
    []
  );

  const results = useMemo(() => {
    let list = [...providers];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (onlyVerified) list = list.filter((p) => p.verified);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.about.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, onlyVerified, query]);

  const focus = providers.find((p) => p.id === Number(focusId));
  const effectiveSelected = selected || focus || null;

  function bookProvider(p: any) {
    if (!user) {
      toast("Please login to book this provider.", "info");
      return;
    }
    const svc = services.find((s) => s.category === p.category);
    toast(`Opening booking for ${p.name}…`, "info");
    if (svc) setSelected(p);
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <div className="page-hero slim">
        <div className="page-inner">
          <BackButton className="hero" />
          <span className="eyebrow">PROVIDERS</span>
          <h1>Trusted hands from your neighbourhood</h1>
          <p>
            Every provider is a member of a verified cooperative, background-checked,
            and rated by real customers like you.
          </p>

          <form
            className="page-search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(query.trim());
            }}
          >
            <Search size={20} />
            <input
              placeholder="Search providers by name or skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search providers"
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
            className={cat === "all" ? "cat-tab active" : "cat-tab"}
            onClick={() => setCat("all")}
          >
            All Providers
          </button>
          {categories.map((c) => (
            <button
              className={cat === c.category ? "cat-tab active" : "cat-tab"}
              key={c.category}
              onClick={() => setCat(c.category)}
            >
              {c.category.charAt(0).toUpperCase() + c.category.slice(1)}
            </button>
          ))}
        </div>

        <div className="providers-toolbar">
          <label className="radio-row check">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
            />
            <span>Show verified cooperative members only</span>
          </label>
          <p>
            Showing <strong>{results.length}</strong> providers
          </p>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <Search size={36} />
            <h3>No providers match your search</h3>
            <p>Try searching with another skill or reset your filters.</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setQuery("");
                setCat("all");
                setOnlyVerified(false);
              }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="provider-grid">
            {results.map((p) => (
              <div key={p.id} className="provider-card">
                <div className="provider-card-head">
                  <div className={`avatar avatar-lg color-${p.color}`}>{p.avatar}</div>
                  <div className="provider-card-id">
                    <h3>
                      {p.name}
                      {p.verified && <BadgeCheck size={18} className="ok" />}
                    </h3>
                    <p>{p.role}</p>
                  </div>
                  <div className="provider-card-rating">
                    <Star size={14} fill="currentColor" />
                    <strong>{p.rating.toFixed(1)}</strong>
                  </div>
                </div>

                <p className="provider-card-about">{p.about}</p>

                <div className="provider-card-skills">
                  {p.skills.slice(0, 3).map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="provider-card-meta">
                  <span>
                    <MapPin size={14} /> {p.location}
                  </span>
                  <span>
                    <Users size={14} /> {p.cooperative}
                  </span>
                </div>

                <div className="provider-card-foot">
                  <div className="service-price">
                    <strong>from {formatINR(p.price)}</strong>
                    <span>
                      {p.jobs.toLocaleString("en-IN")} jobs · {p.experience} exp
                    </span>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => setSelected(p)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Provider Details Modal */}
      {effectiveSelected && (
        <Modal
          open={!!effectiveSelected}
          onClose={() => {
            setSelected(null);
            setParams({});
          }}
          title={effectiveSelected.name}
          size="lg"
        >
          <div className="profile-modal">
            <div className="profile-hero">
              <div className={`avatar avatar-xl color-${effectiveSelected.color}`}>
                {effectiveSelected.avatar}
              </div>
              <div className="profile-hero-info">
                <h2>
                  {effectiveSelected.name}
                  {effectiveSelected.verified && <BadgeCheck size={22} className="ok" />}
                </h2>
                <p className="muted-text">
                  {effectiveSelected.role} · {effectiveSelected.cooperative}
                </p>
                <div className="profile-badges">
                  <StatusBadge status="verified" />
                  <StatusBadge status="available" />
                </div>
              </div>

              <div className="profile-score">
                <div className="score-ring">
                  <strong>{effectiveSelected.rating.toFixed(1)}</strong>
                  <small>★</small>
                </div>
                <span>★★★★★</span>
                <small>{effectiveSelected.reviews} reviews</small>
              </div>
            </div>

            <div className="profile-stats">
              <div>
                <BriefcaseBusiness size={20} />
                <strong>{effectiveSelected.jobs.toLocaleString("en-IN")}</strong>
                <span>Jobs Completed</span>
              </div>
              <div>
                <CalendarCheck size={20} />
                <strong>{effectiveSelected.experience}</strong>
                <span>Experience</span>
              </div>
              <div>
                <Award size={20} />
                <strong>99.2%</strong>
                <span>Satisfaction</span>
              </div>
            </div>

            <p className="profile-about">{effectiveSelected.about}</p>

            <div className="profile-sections">
              <div>
                <h4>Skills &amp; Specialisations</h4>
                <div className="chip-wrap">
                  {effectiveSelected.skills.map((s: string) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="verification-box">
                <ShieldCheck size={28} />
                <div>
                  <strong>Cooperative Verified</strong>
                  <p>Aadhaar verified, background cleared and skill certified.</p>
                  <ul className="check-list compact">
                    <li>
                      <CheckCircle2 size={13} className="ok" /> Background check cleared
                    </li>
                    <li>
                      <CheckCircle2 size={13} className="ok" /> Cooperative wage pledge signed
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <Link
                to={`/services?cat=${effectiveSelected.category}`}
                className="btn btn-primary"
                onClick={() => {
                  setSelected(null);
                  setParams({});
                }}
              >
                Book a Service
              </Link>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelected(null);
                  setParams({});
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default Providers;
