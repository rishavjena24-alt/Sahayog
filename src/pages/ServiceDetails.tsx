import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Star,
  Clock,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Users,
  ChevronRight,
  CalendarDays,
  IndianRupee,
  Lock,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import StatusBadge from "../components/StatusBadge";
import BackButton from "../components/BackButton";
import Modal from "../components/Modal";
import { getService, providers, services, reviews, formatINR } from "../data";
import { useToast } from "../useToast";
import { useAuth } from "../context/useAuth";
import { useData } from "../context/useData";

const slots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:30 PM", "05:30 PM"];

export const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const { addBooking } = useData();

  const service = getService(id);
  const [date, setDate] = useState("2026-09-22");
  const [slot, setSlot] = useState(slots[1]);
  const [showBook, setShowBook] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [newBookingId, setNewBookingId] = useState("");

  if (!service) {
    return (
      <div className="page-wrap">
        <Navbar />
        <div className="page-inner">
          <div className="empty-state">
            <h2>Service not found</h2>
            <button className="btn btn-primary" onClick={() => navigate("/services")}>
              Back to Services
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const providersOf = providers
    .filter((p) => service.providerIds?.includes(p.id))
    .map((p) => ({ ...p, price: service.price }));

  const serviceReviews = reviews.filter((r) => r.service === service.name).slice(0, 2);
  const available = providersOf.filter((p) => p.available);
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  function openBooking() {
    if (!user) {
      toast("Please login to book.", "info");
      navigate("/login", { state: { from: `/services/${id}` } });
      return;
    }
    if (available.length === 0 && providersOf.length === 0) {
      toast("No provider available for this slot right now.", "error");
      return;
    }
    setShowBook(true);
    setConfirmed(false);
  }

  function confirmBooking(e: React.FormEvent) {
    e.preventDefault();
    setNewBookingId("BK-" + (7842 + Math.floor(Math.random() * 90)));
    setConfirmed(true);
  }

  function finish() {
    const provider = available[0] || providersOf[0] || providers[0];
    addBooking({
      id: newBookingId,
      customer: user?.name || "You",
      customerId: "CU-1021",
      providerId: provider?.id,
      serviceId: service.id,
      date,
      time: slot,
      price: service.price,
      status: "confirmed",
      address: "405, 4th Cross, Koramangala, Bengaluru",
      notes: "",
      payment: "UPI",
      rating: null,
    });
    setShowBook(false);
    setConfirmed(false);
    navigate("/bookings");
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <div className="page-hero slim">
        <div className="page-inner">
          <BackButton className="hero" />
          <div className="breadcrumbs">
            <Link to="/services">Services</Link>
            <ChevronRight size={14} />
            <span>{service.categoryLabel}</span>
            <ChevronRight size={14} />
            <span className="current">{service.name}</span>
          </div>

          <div className="detail-head">
            <div>
              <span className="eyebrow light">{service.categoryLabel}</span>
              <h1>{service.name}</h1>
              <div className="detail-rating">
                <Star size={16} fill="currentColor" />
                <strong>{service.rating}</strong>
                <span>({service.reviews} verified reviews)</span>
                <span>·</span>
                <span>{service.booked} bookings completed</span>
              </div>
            </div>

            <div className="detail-price-box">
              <span>COOPERATIVE PRICING</span>
              <strong>{formatINR(service.price)}</strong>
              <small>{service.duration}</small>
            </div>
          </div>

          <div className="detail-meta-row">
            <div className="detail-meta">
              <Clock size={20} />
              <div>
                <strong>{service.duration}</strong>
                <span>Estimated duration</span>
              </div>
            </div>
            <div className="detail-meta">
              <ShieldCheck size={20} />
              <div>
                <strong>30-day Warranty</strong>
                <span>Guaranteed satisfaction</span>
              </div>
            </div>
            <div className="detail-meta">
              <Users size={20} />
              <div>
                <strong>{providersOf.length} Providers</strong>
                <span>Active in Bengaluru</span>
              </div>
            </div>
            <div className="detail-meta">
              <IndianRupee size={20} />
              <div>
                <strong>92% to Worker</strong>
                <span>Fair cooperative share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-inner">
        <div className="detail-layout">
          <div className="detail-main">
            <div className="card">
              <h3 className="card-title">What&apos;s Included</h3>
              <ul className="check-list">
                {service.inclusions.map((item: string, i: number) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="ok" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="card-subtitle">Service Description</h4>
              <p className="detail-desc">{service.description}</p>
            </div>

            <div className="card">
              <h3 className="card-title">Available Providers for this Service</h3>
              <div className="detail-providers">
                {providersOf.map((p) => (
                  <div className="detail-provider" key={p.id}>
                    <div className={`avatar avatar-md color-${p.color}`}>{p.avatar}</div>
                    <div className="detail-provider-info">
                      <h4>
                        {p.name}
                        {p.verified && <BadgeCheck size={16} className="ok" />}
                      </h4>
                      <span>
                        <MapPin size={13} /> {p.location} · {p.cooperative}
                      </span>
                    </div>
                    <div className="detail-provider-meta">
                      <span className="stars-sm">★ {p.rating.toFixed(1)}</span>
                      <StatusBadge status={p.available ? "available" : "unavailable"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {serviceReviews.length > 0 && (
              <div className="card">
                <h3 className="card-title">Customer Feedback</h3>
                <div className="mini-reviews">
                  {serviceReviews.map((r) => (
                    <div className="mini-review" key={r.id}>
                      <p>&ldquo;{r.text}&rdquo;</p>
                      <span className="mini-review-author">
                        {r.name} · {r.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="detail-side">
            <div className="card sticky-card">
              <h3 className="card-title">Book Service</h3>
              <div className="price-break">
                <span>Standard rate</span>
                <strong>{formatINR(service.price)}</strong>
              </div>

              <div className="field-block">
                <label className="field-label">Preferred Date</label>
                <div className="input-box">
                  <CalendarDays size={18} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="field-block">
                <label className="field-label">Preferred Time Slot</label>
                <div className="slot-grid">
                  {slots.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={slot === s ? "slot-btn active" : "slot-btn"}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="total-line">
                <div>
                  <span>Total Amount</span>
                  <small>No hidden charges</small>
                </div>
                <strong>{formatINR(service.price)}</strong>
              </div>

              <button className="btn btn-primary btn-block btn-lg" onClick={openBooking}>
                Book Appointment
              </button>

              <span className="secure-note">
                <Lock size={13} /> Secure booking · Free cancellation
              </span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <div className="section-heading split">
              <div>
                <span className="eyebrow">EXPLORE MORE</span>
                <h2>Other services you might need</h2>
              </div>
              <Link to="/services" className="btn btn-outline btn-sm">
                View All
              </Link>
            </div>
            <div className="service-grid">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        open={showBook}
        onClose={() => setShowBook(false)}
        title={confirmed ? "Booking Placed!" : "Review & Confirm Booking"}
        size="md"
      >
        {confirmed ? (
          <div className="confirm-state">
            <div className="confirm-tick">
              <CheckCircle2 size={44} />
            </div>
            <h3>Your service is confirmed!</h3>
            <p>
              Booking reference <strong>{newBookingId}</strong> has been created.
              The cooperative is assigning your nearest verified provider.
            </p>
            <p className="muted-text">
              Slot: {date} at {slot}
            </p>
            <button className="btn btn-primary btn-block" onClick={finish} style={{ marginTop: "18px" }}>
              View in My Bookings
            </button>
          </div>
        ) : (
          <form onSubmit={confirmBooking}>
            <div className="booking-summary">
              <div className="summary-row">
                <span>Service</span>
                <strong>{service.name}</strong>
              </div>
              <div className="summary-row">
                <span>Date &amp; Time</span>
                <strong>{date} · {slot}</strong>
              </div>
              <div className="summary-row">
                <span>Assigned Cooperative</span>
                <strong>Nari Shakti / Saathi Workers</strong>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <strong className="ok-text">{formatINR(service.price)}</strong>
              </div>
            </div>

            <label className="field-label">Special instructions (optional)</label>
            <textarea
              className="textarea"
              rows={2}
              placeholder="e.g. Landmark, specific requirements..."
            />

            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: "16px" }}>
              Confirm &amp; Place Booking
            </button>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
