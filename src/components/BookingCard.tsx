import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatINR } from "../data";
import StatusBadge from "./StatusBadge";

interface BookingCardProps {
  booking: {
    id: string;
    status: string;
    customer?: string;
    date: string;
    time: string;
    address?: string;
    price: number;
    [key: string]: any;
  };
  onCancel?: (id: string) => void;
  service?: { name: string };
  provider?: { name: string };
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel, service, provider }) => {
  return (
    <div className="booking-card" role="article" aria-label={`Booking ${booking.id}`}>
      <div className="booking-card-top">
        <StatusBadge status={booking.status} />
        <span className="booking-id">{booking.id}</span>
      </div>

      <h3 style={{ margin: "4px 0" }}>{service ? service.name : `Booking ${booking.id}`}</h3>
      <p className="booking-provider">
        with <strong>{provider ? provider.name : booking.customer}</strong>
      </p>

      <div className="booking-card-meta">
        <span>
          <Calendar size={14} aria-hidden="true" /> {booking.date} · {booking.time}
        </span>
        {booking.address && (
          <span className="truncate">
            <MapPin size={14} aria-hidden="true" /> {booking.address}
          </span>
        )}
      </div>

      <div className="booking-card-foot">
        <strong className="price">{formatINR(booking.price)}</strong>
        <div className="booking-card-actions">
          {onCancel && booking.status !== "cancelled" && booking.status !== "completed" && (
            <button
              className="btn btn-danger-ghost btn-sm"
              onClick={() => onCancel(booking.id)}
              aria-label={`Cancel booking ${booking.id}`}
            >
              Cancel
            </button>
          )}
          <Link
            to={`/bookings/${booking.id}`}
            className="btn btn-outline btn-sm"
            aria-label={`View booking ${booking.id}`}
          >
            View <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
