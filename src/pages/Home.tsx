import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  CalendarCheck,
  Star,
  Sparkles,
  Search,
  CalendarDays,
  BadgeCheck,
  Handshake,
  HeartHandshake,
  IndianRupee,
  Wallet,
  TrendingUp,
  Building2,
  Store,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { services, providers, reviews, formatINR, categories } from "../data";
import { categoryIcon } from "../iconMap";
import ServiceCard from "../components/ServiceCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const impactStats = [
  { icon: Users, value: "500+", label: "Local Service Providers" },
  { icon: CalendarCheck, value: "1,200+", label: "Services Completed" },
  { icon: ShieldCheck, value: "98%", label: "Customer Satisfaction" },
  { icon: Handshake, value: "25+", label: "Active Cooperatives" },
];

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    text: "Browse verified local providers and services near you with transparent pricing.",
  },
  {
    icon: CalendarDays,
    title: "Book in Minutes",
    text: "Pick a slot that suits you and confirm your booking with a single tap.",
  },
  {
    icon: BadgeCheck,
    title: "Get It Done",
    text: "A trained, cooperative-backed professional arrives and completes the job.",
  },
  {
    icon: HeartHandshake,
    title: "Grow Together",
    text: "Your booking supports fair wages and strengthens your neighbourhood cooperative.",
  },
];

const coopBenefits = [
  {
    icon: Wallet,
    title: "Fair Earnings",
    color: "blue",
    text: "Providers keep up to 92% of every booking. No commission-hungry middlemen.",
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    color: "green",
    text: "Free upskilling camps, certifications and business loans via partner cooperatives.",
  },
  {
    icon: Building2,
    title: "Community Ownership",
    color: "violet",
    text: "Each cooperative co-owns the platform and shares collective bonuses.",
  },
  {
    icon: Store,
    title: "Local First",
    color: "orange",
    text: "Money stays in your neighbourhood, building resilient local economies.",
  },
];

export const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/services?q=${encodeURIComponent(query.trim())}`);
  }

  const topServices = services.filter((s) => s.popular);
  const topProviders = providers.slice(0, 3);

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={15} /> Empowering Local Communities
            </span>

            <h1>
              Skilled Hands.
              <br />
              <span className="grad-text">Stronger Communities.</span>
            </h1>

            <p className="hero-lead">
              Book trusted household services from cooperative-backed local
              providers — and help your neighbourhood grow with every job.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={20} />
              <input
                placeholder="What service do you need? Try 'cleaning' or 'plumbing'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search services"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>

            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">
                Explore Services <ArrowRight size={18} />
              </Link>
              <Link to="/offer-service" className="btn btn-outline">
                Offer Your Skills
              </Link>
            </div>

            <div className="hero-trust">
              <span>
                <ShieldCheck size={16} className="ok" /> 100% verified providers
              </span>
              <span>
                <IndianRupee size={16} className="ok" /> Fair, upfront pricing
              </span>
              <span>
                <Handshake size={16} className="ok" /> Cooperative backed
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hero-card-head">
                <div className="avatar avatar-md color-green">RK</div>
                <div>
                  <h3>Rekha Kumari</h3>
                  <p>
                    <BadgeCheck size={14} className="ok" /> Nari Shakti Cooperative
                  </p>
                </div>
                <span className="hero-live">
                  <span className="pulse" /> Live in Bengaluru
                </span>
              </div>

              <div className="hero-card-body">
                <div className="hero-job-row">
                  <div className="hero-job-icon">
                    <Sparkles size={20} />
                  </div>
                  <div className="hero-job-info">
                    <span>Full Home Cleaning</span>
                    <small>Today · 10:00 AM · Koramangala</small>
                  </div>
                  <strong>₹2,499</strong>
                </div>

                <div className="hero-job-row">
                  <div className="hero-job-icon green">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="hero-job-info">
                    <span>Customer Rating</span>
                    <small>140+ verified reviews</small>
                  </div>
                  <strong className="star">★ 4.9</strong>
                </div>
              </div>

              <div className="hero-card-foot">
                <div className="hero-stats">
                  <div>
                    <strong>92%</strong>
                    <span>Direct to worker</span>
                  </div>
                  <div>
                    <strong>1,450+</strong>
                    <span>Jobs completed</span>
                  </div>
                </div>
                <Link to="/services/1" className="btn btn-primary btn-sm">
                  Book Now
                </Link>
              </div>
            </div>

            <div className="hero-float-card">
              <Sparkles size={20} />
              <div>
                <span>COOPERATIVE MODEL</span>
                <strong>Fair wages for all</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-section">
        <div className="impact-grid">
          {impactStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="impact-card">
                <div className="impact-icon">
                  <Icon size={24} />
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category Strip */}
      <div className="category-strip">
        {categories.map((c) => {
          const Icon = categoryIcon(c.icon);
          return (
            <Link
              key={c.id}
              to={`/services?cat=${c.id}`}
              className="category-chip"
            >
              <Icon size={18} />
              <span>{c.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Popular Services */}
      <section className="services-section">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">SERVICES</span>
            <h2>Popular in your neighbourhood</h2>
            <p>Direct bookings, fair wages, zero hidden charges.</p>
          </div>
          <Link to="/services" className="btn btn-outline btn-sm">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="service-grid">
          {topServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="how-section">
        <div className="section-heading">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Ethical services, made simple</h2>
          <p>Four easy steps from booking to community impact.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="step-card">
                <span className="step-num">0{i + 1}</span>
                <div className="step-icon">
                  <Icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cooperative Advantage */}
      <section className="coop-section" style={{ marginTop: "80px" }}>
        <div className="section-heading">
          <span className="eyebrow">THE COOPERATIVE ADVANTAGE</span>
          <h2>Why choosing Sahayog changes lives</h2>
          <p>When workers own their platform, everyone wins.</p>
        </div>

        <div className="coop-grid">
          {coopBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="coop-card">
                <div className={`coop-icon ${b.color}`}>
                  <Icon size={22} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Providers */}
      <section className="providers-section">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">VERIFIED PROVIDERS</span>
            <h2>Meet the professionals</h2>
            <p>Trained, background-checked and cooperative certified.</p>
          </div>
          <Link to="/providers" className="btn btn-outline btn-sm">
            Meet All Providers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="provider-grid">
          {topProviders.map((p) => (
            <div key={p.id} className="provider-card">
              <div className="provider-card-head">
                <div className={`avatar avatar-lg color-${p.color}`}>
                  {p.avatar}
                </div>
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

              <div className="provider-card-foot">
                <div className="service-price">
                  <strong>from {formatINR(p.price)}</strong>
                  <span>{p.jobs} jobs · {p.experience}</span>
                </div>
                <Link to={`/providers?id=${p.id}`} className="btn btn-outline btn-sm">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <div className="section-heading">
          <span className="eyebrow">COMMUNITY VOICES</span>
          <h2>Real stories from your neighbours</h2>
          <p>Transparent feedback directly from verified customers.</p>
        </div>

        <div className="reviews-grid">
          {reviews.slice(0, 3).map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-stars">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={15} />
                ))}
              </div>
              <p>&ldquo;{r.text}&rdquo;</p>
              <div className="review-foot">
                <div className="avatar avatar-sm">{r.name[0]}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.service} · {r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="cta-section">
        <div className="cta-box">
          <div>
            <h2>Ready to experience ethical local services?</h2>
            <p>
              Join thousands of households supporting fair wages and skilled
              cooperative members across Bengaluru.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/services" className="btn btn-white btn-lg">
              Book a Service
            </Link>
            <Link to="/offer-service" className="btn btn-ghost-white btn-lg">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
