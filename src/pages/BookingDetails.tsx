import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Mail,
  Wrench,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ReceiptText,
  Star,
  Download,
} from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import { getService, getProvider, formatINR } from "../data";
import { useToast } from "../useToast";
import { useData } from "../context/useData";

export const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [cancelOpen, setCancelOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const { bookings, cancelBooking, completeBooking } = useData();

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <AppLayout role="customer" title="Booking Details">
        <div className="empty-state">
          <h2>Booking not found</h2>
          <button className="btn btn-primary" onClick={() => navigate("/bookings")}>
            Back to My Bookings
          </button>
        </div>
      </AppLayout>
    );
  }

  const service = getService(booking.serviceId);
  const provider = getProvider(booking.providerId);

  async function handleCancel() {
    await cancelBooking(booking.id);
    setCancelOpen(false);
    toast("Booking cancelled. Any advance paid will be refunded in 3-5 days.", "info");
  }

  async function confirmDone() {
    await completeBooking(booking.id);
    toast(`Payment of ${formatINR(booking.price)} released. 92% delivered to provider.`, "success");
  }

  function handleRate(stars: number) {
    setRating(stars);
    toast(`Thank you for rating ${stars} stars!`, "success");
  }

  return (
    <AppLayout
      role="customer"
      title="Booking Details"
      subtitle={`Reference ${booking.id}`}
    >
      <BackButton>Back to My Bookings</BackButton>

      <div className="booking-detail-layout" style={{ marginTop: "20px" }}>
        <div className="booking-detail-main">
          <div className="card booking-summary-card">
            <div className="bd-head">
              <div>
                <span className="mono strong">{booking.id}</span>
                <StatusBadge status={booking.status} />
              </div>
              <div className="bd-date">
                <CalendarDays size={16} />
                {booking.date} · {booking.time}
              </div>
            </div>

            <h2>{service?.name || booking.service || "Booked Service"}</h2>
            <p className="muted-text">
              Booked for {booking.customer} · Fixed Cooperative Rate
            </p>

            <div className="bd-summary-grid">
              <div className="bd-item">
                <div className="bd-item-icon blue"><CalendarDays size={18} /></div>
                <div>
                  <span>Scheduled for</span>
                  <strong>{booking.date}</strong>
                </div>
              </div>
              <div className="bd-item">
                <div className="bd-item-icon green"><Clock size={18} /></div>
                <div>
                  <span>Time slot</span>
                  <strong>{booking.time}</strong>
                </div>
              </div>
              <div className="bd-item">
                <div className="bd-item-icon violet"><MapPin size={18} /></div>
                <div>
                  <span>Service address</span>
                  <strong>{booking.address || booking.location || "Indiranagar, Bengaluru"}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bd-actions" style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              {booking.status === "confirmed" && (
                <>
                  <button className="btn btn-primary btn-sm" onClick={confirmDone}>
                    <CheckCircle2 size={16} /> Mark as Completed
                  </button>
                  <button className="btn btn-danger-ghost btn-sm" onClick={() => setCancelOpen(true)}>
                    <XCircle size={16} /> Cancel Booking
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Provider Card */}
          <div className="card" style={{ marginTop: "20px" }}>
            <h3 className="card-title">Assigned Professional</h3>
            <div className="provider-row-card" style={{ border: "none", padding: 0 }}>
              <div className={`avatar avatar-lg color-${provider?.color || "blue"}`}>
                {provider?.avatar || "P"}
              </div>
              <div className="prc-info">
                <h4>{provider?.name || booking.provider || "Local Cooperative Provider"}</h4>
                <p>{provider?.role} · {provider?.cooperative || "Bengaluru Workers Collective"}</p>
                <div className="prc-meta">
                  <span><Phone size={13} /> {booking.phone || "+91 98765 43210"}</span>
                  <span><MapPin size={13} /> {provider?.location || "Bengaluru"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="card" style={{ marginTop: "20px" }}>
            <h3 className="card-title">Rate this Service</h3>
            <p className="muted-text">Your rating helps fellow neighbourhood residents and directly benefits the provider.</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRate(star)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={28}
                    fill={rating && star <= rating ? "#eab308" : "none"}
                    color={rating && star <= rating ? "#eab308" : "var(--muted)"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown Sidebar */}
        <aside className="booking-detail-sidebar">
          <div className="card">
            <h3 className="card-title"><ReceiptText size={18} /> Invoice &amp; Fair Share</h3>
            <div className="invoice-lines" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              <div className="flex-between">
                <span>Base Service Charge</span>
                <strong>{formatINR(booking.price)}</strong>
              </div>
              <div className="flex-between" style={{ color: "var(--green)" }}>
                <span>Provider Share (92%)</span>
                <strong>{formatINR(Math.round(booking.price * 0.92))}</strong>
              </div>
              <div className="flex-between" style={{ color: "var(--muted)" }}>
                <span>Cooperative Pool (8%)</span>
                <strong>{formatINR(Math.round(booking.price * 0.08))}</strong>
              </div>
              <div className="divider" style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
              <div className="flex-between" style={{ fontSize: "1.1rem" }}>
                <strong>Total Amount</strong>
                <strong style={{ color: "var(--primary)" }}>{formatINR(booking.price)}</strong>
              </div>
            </div>

            <button
              className="btn btn-outline btn-block btn-sm"
              style={{ marginTop: "20px" }}
              onClick={() => toast("Invoice downloaded successfully.", "success")}
            >
              <Download size={15} /> Download Invoice (PDF)
            </button>
          </div>
        </aside>
      </div>

      {/* Cancel Modal */}
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel Booking"
        size="sm"
      >
        <p>Are you sure you want to cancel booking <strong>{booking.id}</strong>?</p>
        <p className="muted-text" style={{ fontSize: "0.9rem" }}>
          Full refund will be credited back to your original payment method in 3 to 5 business days.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button className="btn btn-outline btn-sm" onClick={() => setCancelOpen(false)}>
            Keep Booking
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleCancel}>
            Yes, Cancel Booking
          </button>
        </div>
      </Modal>
    </AppLayout>
  );
};

export default BookingDetails;
