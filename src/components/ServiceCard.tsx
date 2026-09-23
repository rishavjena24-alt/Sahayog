import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { formatINR } from "../data";
import Icon from "./Icon";

interface ServiceCardProps {
  service: {
    id: number | string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    duration: string;
    verified?: boolean;
    description: string;
    [key: string]: any;
  };
  onBook?: (service: any) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const rating = Number(service.rating) || 0;

  return (
    <div className="service-card" role="article" aria-label={service.name}>
      <div className="service-card-top">
        <div className="service-card-icon" aria-hidden="true">
          <Icon name={service.category} size={26} />
        </div>

        <div className="service-card-rating" aria-label={`Rating: ${rating.toFixed(1)} out of 5 from ${service.reviews} reviews`}>
          <Star size={14} fill="currentColor" aria-hidden="true" />
          <strong>{rating.toFixed(1)}</strong>
          <span>({service.reviews})</span>
          <span className="rating-bars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`rating-bar ${i < rating ? "filled" : ""}`}
              />
            ))}
          </span>
        </div>
      </div>

      <h3 className="service-card-title">
        <Link to={`/services/${service.id}`}>{service.name}</Link>
      </h3>
      <p className="service-card-desc">{service.description}</p>

      <div className="service-card-meta">
        <span className="chip">
          <Clock size={13} aria-hidden="true" /> {service.duration}
        </span>
        <span className="chip">
          {service.verified ? <ShieldCheck size={13} className="ok" aria-hidden="true" /> : <ShieldCheck size={13} aria-hidden="true" />}
          {service.verified ? "Verified" : "New listing"}
        </span>
      </div>

      <div className="service-card-foot">
        <div className="service-price">
          <strong>{formatINR(service.price)}</strong>
          <span>starting</span>
        </div>

        <div className="service-card-actions">
          {onBook ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onBook(service)}
              aria-label={`Book ${service.name}`}
            >
              Book
            </button>
          ) : null}
          <Link
            to={`/services/${service.id}`}
            className="btn btn-outline btn-sm"
            aria-label={`View details for ${service.name}`}
          >
            Details <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
