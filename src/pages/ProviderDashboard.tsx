import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Star,
  BriefcaseBusiness,
  TrendingUp,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  IndianRupee,
  ArrowRight,
  Bell,
  CalendarDays,
  Award,
  Users,
} from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import BackButton from "../components/BackButton";
import { providerEarnings, providers, formatINR } from "../data";
import { useToast } from "../useToast";
import { useData } from "../context/useData";

export const ProviderDashboard: React.FC = () => {
  const toast = useToast();
  const me = providers[0];
  const { requests, respondRequest } = useData();

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  function respond(id: string, status: "accepted" | "declined") {
    respondRequest(id, status);
    toast(
      status === "accepted"
        ? "Request accepted. Customer notified."
        : "Request declined politely.",
      status === "accepted" ? "success" : "info"
    );
  }

  return (
    <AppLayout
      role="provider"
      title="Provider Dashboard"
      subtitle={`Welcome back, ${me.name.split(" ")[0]}!`}
    >
      <BackButton />
      <div className="provider-hero">
        <div className="provider-hero-info">
          <div className={`avatar avatar-xl color-${me.color}`}>{me.avatar}</div>
          <div>
            <span className="eyebrow light">VERIFIED PROVIDER</span>
            <h2>{me.name}</h2>
            <p>
              {me.role} · {me.cooperative} · {me.location}
            </p>
            <div className="provider-hero-badges">
              <StatusBadge status="verified" />
              <StatusBadge status="available" />
            </div>
          </div>
        </div>
        <div className="provider-hero-meta">
          <div>
            <Star size={15} fill="currentColor" />
            <strong>{me.rating.toFixed(1)}</strong>
            <span>{me.reviews} reviews</span>
          </div>
          <div>
            <BriefcaseBusiness size={15} />
            <strong>{me.jobs.toLocaleString("en-IN")}</strong>
            <span>jobs done</span>
          </div>
          <Link to="/offer-service" className="btn btn-white btn-sm">
            Manage Listings
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="This Month's Earnings"
          value={providerEarnings.thisMonth}
          hint={providerEarnings.trend}
          color="green"
          icon={Wallet}
        />
        <StatCard
          label="Total Earnings"
          value={providerEarnings.total}
          hint="+₹7,200 this quarter"
          color="blue"
          icon={IndianRupee}
        />
        <StatCard
          label="Pending Requests"
          value={pendingCount}
          hint="Respond within 2h"
          color="orange"
          icon={Bell}
        />
        <StatCard
          label="Active Jobs"
          value={providerEarnings.activeJobs}
          hint="4 this week"
          color="violet"
          icon={CalendarDays}
        />
      </div>

      <div className="dash-grid">
        <div className="dash-main">
          <div className="section-head">
            <div>
              <span className="eyebrow">NEW LEADS</span>
              <h3>Incoming Customer Requests</h3>
            </div>
            <span className="muted-text">Directly from your neighbourhood</span>
          </div>

          <div className="request-list">
            {requests.map((r) => (
              <div className="request-card" key={r.id}>
                <div className="request-icon blue">
                  <Clock size={19} />
                </div>
                <div className="request-info">
                  <div className="request-top">
                    <strong>{r.service}</strong>
                    <span className="mono">{r.id}</span>
                  </div>
                  <span>
                    <Users size={13} /> {r.customer} · {r.date} · {r.time}
                  </span>
                  <span>
                    <MapPin size={13} /> {r.location}
                  </span>
                </div>

                <div className="service-price">
                  <strong>{formatINR(r.price)}</strong>
                  <span>92% payout</span>
                </div>

                {r.status === "pending" ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => respond(r.id, "accepted")}
                    >
                      <CheckCircle2 size={15} /> Accept
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => respond(r.id, "declined")}
                    >
                      <XCircle size={15} /> Decline
                    </button>
                  </div>
                ) : (
                  <StatusBadge status={r.status} />
                )}
              </div>
            ))}
          </div>

          <div className="chart-card card">
            <h3 className="card-title">Weekly Earnings Breakdown</h3>
            <div className="chart-bars">
              {providerEarnings.recent.map((w, i) => (
                <div className="chart-col" key={i}>
                  <span className="chart-value">{w.amount}</span>
                  <div
                    className={`chart-bar color-${w.color}`}
                    style={{ height: `${parseInt(w.amount.replace(/\D/g, "")) / 85}px` }}
                  />
                  <span className="chart-label">{w.label}</span>
                </div>
              ))}
            </div>
            <div className="chart-total">
              <IndianRupee size={20} />
              <strong>{providerEarnings.thisMonth}</strong>
              <span>earned in the last 30 days</span>
            </div>
          </div>
        </div>

        <aside className="dash-side">
          <div className="card">
            <h3 className="card-title">Cooperative Dividend Pool</h3>
            <p className="muted-text">
              As a full cooperative member, you share in platform profits quarterly.
            </p>
            <div className="payout-box">
              <div>
                <span>Q3 Dividend Accrued</span>
                <strong>₹2,450</strong>
              </div>
              <StatusBadge status="confirmed" />
            </div>
            <ul className="score-list">
              <li>
                <span>Attendance rate</span>
                <strong>98.5%</strong>
              </li>
              <li>
                <span>Customer rating</span>
                <strong>4.8 ★</strong>
              </li>
              <li>
                <span>Peer cooperative rank</span>
                <strong>#3 of 42</strong>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default ProviderDashboard;
