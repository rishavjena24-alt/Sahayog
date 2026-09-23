import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MapPin,
  BadgeCheck,
  Handshake,
  Megaphone,
  Plus,
  TrendingUp,
  Building2,
  Sparkles,
  CheckCircle2,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import BackButton from "../components/BackButton";
import { communityGroups, communityRequests } from "../data";
import { useToast } from "../useToast";

const impactCards = [
  { icon: Users, value: "500+", label: "Cooperative members" },
  { icon: Building2, value: "25+", label: "Registered cooperatives" },
  { icon: TrendingUp, value: "₹42L", label: "Payouts to members" },
  { icon: IndianRupee, value: "98%", label: "Income stays local" },
];

export const Community: React.FC = () => {
  const [requests, setRequests] = useState(communityRequests);
  const [joined, setJoined] = useState<number[]>([1]);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState<any>(null);
  const [created, setCreated] = useState(false);
  const toast = useToast();

  function joinGroup(id: number) {
    setJoined((j) => (j.includes(id) ? j : [...j, id]));
    const g = communityGroups.find((x) => x.id === id);
    setShowJoin(null);
    toast(`You joined ${g?.name}! Co-op coordinator will reach out.`, "success");
  }

  function registerInterest(reqId: number) {
    setRequests((list) => list.map((r) => (r.id === reqId ? { ...r, status: "filled" } : r)));
    toast("Interest registered. The requester will contact you.", "success");
  }

  function createCoop(e: React.FormEvent) {
    e.preventDefault();
    setCreated(true);
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <div className="page-hero slim">
        <div className="page-inner">
          <BackButton className="hero" />
          <span className="eyebrow">COOPERATIVE COMMUNITY</span>
          <h1>Strength lives in the collective</h1>
          <p>
            Sahayog is owned and energised by cooperatives of local workers.
            Join a group, share community jobs, and grow together.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              <Plus size={17} /> Start a Cooperative
            </button>
            <Link to="/offer-service" className="btn btn-outline">
              Become a Provider
            </Link>
          </div>
        </div>
      </div>

      <div className="page-inner">
        <div className="impact-grid">
          {impactCards.map((c) => {
            const Icon = c.icon;
            return (
              <div className="impact-card" key={c.label}>
                <div className="impact-icon">
                  <Icon size={24} />
                </div>
                <h3>{c.value}</h3>
                <p>{c.label}</p>
              </div>
            );
          })}
        </div>

        <div className="section-heading split" style={{ marginTop: "54px" }}>
          <div>
            <span className="eyebrow">COOPERATIVES</span>
            <h2>Your neighbourhood groups</h2>
            <p>Self-governing collectives of skilled workers across Bengaluru.</p>
          </div>
          <span className="muted-text">{communityGroups.length} active cooperatives</span>
        </div>

        <div className="coop-community-grid">
          {communityGroups.map((g) => (
            <div className="coop-community-card" key={g.id}>
              <div className="coop-community-head">
                <div className="coop-comm-icon">
                  <Handshake size={22} />
                </div>
                <div>
                  <h3>
                    {g.name}
                    {g.verified && <BadgeCheck size={16} className="ok" />}
                  </h3>
                  <p>
                    <MapPin size={13} /> {g.type} · {g.city}
                  </p>
                </div>
              </div>

              <p className="coop-community-about">{g.about}</p>

              <div className="coop-members">
                <Users size={15} />
                <span>
                  <strong>{g.members}</strong> active members
                </span>
              </div>

              <div className="coop-community-foot">
                {joined.includes(g.id) ? (
                  <span className="joined-label">
                    <CheckCircle2 size={16} /> Member
                  </span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowJoin(g)}
                  >
                    Join Cooperative
                  </button>
                )}
                <Link to="/providers" className="btn btn-outline btn-sm">
                  View Members
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="section-heading split">
          <div>
            <span className="eyebrow">GROUP CONTRACTS</span>
            <h2>Bulk &amp; Society Job Board</h2>
            <p>Large projects shared across cooperative teams.</p>
          </div>
        </div>

        <div className="community-req">
          <div className="request-list">
            {requests.map((r) => (
              <div className="request-card wide" key={r.id}>
                <div className="request-icon violet">
                  <Megaphone size={20} />
                </div>
                <div className="request-info">
                  <div className="request-top">
                    <strong>{r.title}</strong>
                    <span className="budget-chip">{r.budget}</span>
                  </div>
                  <span>
                    Posted by <strong>{r.requester}</strong> · {r.posted} · Assigned to{" "}
                    <em>{r.group}</em>
                  </span>
                </div>
                {r.status === "open" ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => registerInterest(r.id)}
                  >
                    Express Interest
                  </button>
                ) : (
                  <span className="filled-label">
                    <CheckCircle2 size={14} /> Contract Filled
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoin && (
        <Modal
          open={!!showJoin}
          onClose={() => setShowJoin(null)}
          title={`Join ${showJoin.name}`}
          size="md"
        >
          <div className="join-modal">
            <div className="coop-comm-icon lg">
              <Handshake size={30} />
            </div>
            <h3>Become a voting member</h3>
            <p>
              Joining <strong>{showJoin.name}</strong> connects you to group contracts,
              free skill certifications, and quarterly profit sharing.
            </p>

            <ul className="check-list" style={{ marginBottom: "20px" }}>
              <li>
                <CheckCircle2 size={16} className="ok" /> Keep 92% of all booking payouts
              </li>
              <li>
                <CheckCircle2 size={16} className="ok" /> Group accident insurance cover
              </li>
              <li>
                <CheckCircle2 size={16} className="ok" /> Voting rights on platform fee decisions
              </li>
            </ul>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn btn-primary btn-block"
                onClick={() => joinGroup(showJoin.id)}
              >
                Confirm Membership
              </button>
              <button className="btn btn-outline" onClick={() => setShowJoin(null)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setCreated(false);
        }}
        title={created ? "Application Received!" : "Start a Cooperative"}
        size="md"
      >
        {created ? (
          <div className="confirm-state">
            <div className="confirm-tick">
              <CheckCircle2 size={44} />
            </div>
            <h3>Charter application submitted!</h3>
            <p>
              Our cooperative development team will contact you within 2 business days
              to assist with formal bylaws and onboarding.
            </p>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                setShowCreate(false);
                setCreated(false);
              }}
              style={{ marginTop: "16px" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={createCoop}>
            <div className="field-block">
              <label className="field-label">Cooperative Name</label>
              <input className="input" placeholder="e.g. Indiranagar Electricians Guild" required />
            </div>
            <div className="field-block">
              <label className="field-label">Primary Sector</label>
              <input className="input" placeholder="e.g. Electrical &amp; Maintenance" required />
            </div>
            <div className="field-block">
              <label className="field-label">Founding Members (minimum 3)</label>
              <input className="input" placeholder="Names of initial organizers" required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: "16px" }}>
              Submit Charter Application
            </button>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default Community;
