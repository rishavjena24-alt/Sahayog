import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  Wallet,
  BadgeCheck,
  Award,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { categories } from "../data";

const benefits = [
  { icon: Wallet, title: "Keep 92% of your earnings", text: "Flat pricing, no hidden commission." },
  { icon: Users, title: "Join a local cooperative", text: "Collective safety, training & support." },
  { icon: ShieldCheck, title: "Free skill verification", text: "Aadhaar + skill certification included." },
  { icon: Award, title: "Earn on your terms", text: "Flexible hours, choose your jobs." },
];

export const OfferService: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [coopChoice, setCoopChoice] = useState("existing");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="page-wrap">
        <Navbar />
        <div className="page-inner center-col">
          <div className="success-panel">
            <div className="confirm-tick">
              <CheckCircle2 size={44} />
            </div>
            <span className="eyebrow">APPLICATION RECEIVED</span>
            <h1>Welcome to the fold, provider!</h1>
            <p>
              Your application has been submitted to the{" "}
              <strong>Nari Shakti Cooperative</strong>. Our verification desk will
              call you within <strong>48 hours</strong> for your Aadhaar &amp; skill
              verification.
            </p>
            <div className="success-steps">
              <div>
                <span>1</span>
                <p>
                  Application sent <BadgeCheck size={15} />
                </p>
              </div>
              <div>
                <span>2</span>
                <p>
                  Verification call <em>within 48h</em>
                </p>
              </div>
              <div>
                <span>3</span>
                <p>Profile live on Sahayog</p>
              </div>
            </div>
            <div className="btn-row center" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Continue to Login
              </button>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <div className="page-hero slim">
        <div className="page-inner">
          <BackButton className="hero">Back to home</BackButton>
          <span className="eyebrow">BECOME A PROVIDER</span>
          <h1>Turn your skills into fair income</h1>
          <p>
            Join 500+ cooperative-backed professionals earning on their own terms.
            Verification, training and insurance — all covered.
          </p>
        </div>
      </div>

      <div className="page-inner">
        <div className="offer-grid">
          <div className="offer-benefits">
            <h3>What you get when you join</h3>
            <div className="benefit-list">
              {benefits.map((b) => {
                const IconC = b.icon;
                return (
                  <div className="benefit-item" key={b.title}>
                    <div className="benefit-icon">
                      <IconC size={20} />
                    </div>
                    <div>
                      <strong>{b.title}</strong>
                      <p>{b.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="coop-highlight">
              <div className="avatar avatar-lg color-violet">PR</div>
              <div>
                <strong>Pushpa Rani · Annapurna Cooks Co-op</strong>
                <p>
                  &ldquo;I moved from an aggregator taking 30% to my cooperative where I
                  keep 92%. My monthly earnings went up by ₹12,000.&rdquo;
                </p>
                <span>Joined Sahayog in Jan 2024 · 420 jobs done</span>
              </div>
            </div>

            <div className="trust-strip">
              <span>
                <ShieldCheck size={16} /> Free background verification
              </span>
              <span>
                <CheckCircle2 size={16} /> ₹5L accidental health insurance cover
              </span>
              <span>
                <BadgeCheck size={16} /> Skill upskilling camps every quarter
              </span>
            </div>
          </div>

          <div className="offer-form">
            <h3>Provider Application</h3>
            <p className="muted-text" style={{ marginBottom: "22px" }}>
              Tell us about yourself. Our local cooperative coordinator will guide you.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field-block">
                  <label className="field-label">Full Name</label>
                  <input className="input" placeholder="e.g. Suresh Kumar" required />
                </div>
                <div className="field-block">
                  <label className="field-label">Phone Number (Aadhaar linked)</label>
                  <input className="input" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div className="form-grid">
                <div className="field-block">
                  <label className="field-label">Primary Skill / Trade</label>
                  <select className="input select" required>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field-block">
                  <label className="field-label">Experience</label>
                  <select className="input select">
                    <option>1 – 2 years</option>
                    <option>3 – 5 years</option>
                    <option>5 – 10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>

              <div className="field-block">
                <label className="field-label">Cooperative Affiliation</label>
                <div className="coop-radios">
                  <label
                    className={
                      coopChoice === "existing"
                        ? "coop-radio selected"
                        : "coop-radio"
                    }
                    onClick={() => setCoopChoice("existing")}
                  >
                    <strong>Join an existing cooperative near me (Recommended)</strong>
                    <span>We will assign you to the nearest registered collective in Bengaluru</span>
                  </label>
                  <label
                    className={
                      coopChoice === "bring" ? "coop-radio selected" : "coop-radio"
                    }
                    onClick={() => setCoopChoice("bring")}
                  >
                    <strong>I represent an existing informal group (3+ workers)</strong>
                    <span>Register your group as a new cooperative on Sahayog</span>
                  </label>
                </div>
              </div>

              <div className="payout-note">
                <CheckCircle2 size={18} />
                <p>
                  <strong>No upfront fee.</strong> Verification is completely free of cost.
                  You start earning immediately after your profile verification.
                </p>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OfferService;
