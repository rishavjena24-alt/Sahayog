import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Star,
  Wallet,
  IndianRupee,
  ArrowRight,
  Search,
  Sparkles,
  BadgeCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import ServiceCard from "../components/ServiceCard";
import ProviderCard from "../components/ProviderCard";
import BackButton from "../components/BackButton";
import { services, providers, formatINR } from "../data";
import { useAuth } from "../context/useAuth";
import { useData } from "../context/useData";

export const CustomerDashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings } = useData();

  const myBookings = bookings.filter((b) => b.customer === (user?.name || "Ananya Sharma"));
  const latestBooking = myBookings[0] || bookings[0];
  const completed = myBookings.filter((b) => b.status === "completed").length;
  const recommended = services.slice(0, 3);
  const topProviders = providers.slice(0, 2);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/services?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const firstName = user?.name?.split(" ")[0] || "Ananya";
  const latestSvc = latestBooking ? services.find((s) => s.id === latestBooking.serviceId) : null;
  const latestProvider = latestBooking ? providers.find((p) => p.id === latestBooking.providerId) : null;

  return (
    <AppLayout
      role="customer"
      title="Customer Dashboard"
      subtitle={`Good to see you, ${firstName}! How can we help today?`}
    >
      <BackButton />
      <div className="welcome-banner">
        <div className="welcome-text">
          <span className="eyebrow light">HELLO, {firstName.toUpperCase()}</span>
          <h2>Book a trusted service in minutes</h2>
          <p>
            You have <strong>2 active bookings</strong> and {completed} completed
            in the last 90 days.
          </p>

          <form className="dash-search" onSubmit={submitSearch}>
            <Search size={19} />
            <input
              placeholder="Search for cleaning, plumbing, cooking..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search services"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <div className="welcome-quick">
            <Link to="/services" className="btn btn-white btn-sm">
              Browse Services
            </Link>
            <Link to="/bookings" className="btn btn-ghost-white btn-sm">
              My Bookings
            </Link>
          </div>
        </div>

        <div className="welcome-card">
          <span className="eyebrow light">UPCOMING</span>
          <h3>{latestBooking && latestSvc ? latestSvc.name : latestBooking?.service || "Full Home Cleaning"}</h3>
          <p>
            <CalendarCheck size={15} /> {latestBooking?.date} · {latestBooking?.time}
          </p>
          <p>
            <MapPin size={15} /> {latestBooking?.address || latestBooking?.location || "Koramangala, Bengaluru"}
          </p>
          <div className="welcome-progress">
            <span style={{ width: "34%" }} />
          </div>
          <div className="welcome-card-foot">
            <StatusBadge status={latestBooking?.status || "confirmed"} />
            <Link to={`/bookings/${latestBooking?.id || "BK-7840"}`} className="btn btn-white btn-sm">
              View <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Active Bookings"
          value={myBookings.filter((b) => b.status === "confirmed").length || 2}
          hint="Next: Tomorrow, 10 AM"
          color="blue"
          icon={CalendarCheck}
        />
        <StatCard
          label="Completed Services"
          value={completed || 8}
          hint="100% on-time"
          color="green"
          icon={CheckCircle2}
        />
        <StatCard
          label="Total Spent"
          value={formatINR(myBookings.reduce((s, b) => s + b.price, 0) || 7490)}
          hint="92% to workers"
          color="violet"
          icon={IndianRupee}
        />
        <StatCard
          label="Community Rating"
          value="4.9 ★"
          hint="5 reviews written"
          color="amber"
          icon={Star}
        />
      </div>

      <div className="dash-grid">
        <div className="dash-main">
          <div className="panel">
            <div className="section-head">
              <div>
                <span className="eyebrow">POPULAR NEAR YOU</span>
                <h3 className="card-title">Recommended Services</h3>
              </div>
              <Link to="/services" className="link-muted">
                View all &rarr;
              </Link>
            </div>
            <div className="service-grid">
              {recommended.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-head">
              <div>
                <span className="eyebrow">TOP NEIGHBOURHOOD PROVIDERS</span>
                <h3 className="card-title">Meet Local Cooperative Pros</h3>
              </div>
              <Link to="/providers" className="link-muted">
                View all &rarr;
              </Link>
            </div>
            <div className="provider-grid">
              {topProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
        </div>

        <aside className="dash-side">
          <div className="card coop-banner">
            <span className="eyebrow">COOPERATIVE VALUE</span>
            <h3>Where does your money go?</h3>
            <p>
              Unlike corporate aggregators charging 25-35%, Sahayog cooperatives keep 92%
              with the service professional.
            </p>
            <div className="health-metrics">
              <div className="health-row">
                <span>Worker Share</span>
                <strong>92%</strong>
              </div>
              <div className="health-row">
                <span>Cooperative Pool</span>
                <strong>6%</strong>
              </div>
              <div className="health-row">
                <span>Platform Tech</span>
                <strong>2%</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default CustomerDashboard;
