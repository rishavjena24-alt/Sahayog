import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck, ShieldCheck, Users } from "lucide-react";
import { formatINR } from "../data";

interface ProviderCardProps {
  provider: {
    id: number | string;
    name: string;
    role: string;
    avatar: string;
    color: string;
    rating: number;
    verified: boolean;
    about?: string;
    skills?: string[];
    location: string;
    cooperative: string;
    price: number;
    jobs: number;
    experience: string;
    [key: string]: any;
  };
  compact?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, compact }) => {
  return (
    <div className="provider-card" role="article" aria-label={`Provider ${provider.name}`}>
      <div className="provider-card-head">
        <div className={`avatar avatar-lg color-${provider.color}`} aria-hidden="true">
          {provider.avatar}
        </div>

        <div className="provider-card-id">
          <h3>
            {provider.name}
            {provider.verified && <BadgeCheck size={18} className="ok" aria-label="Verified Provider" />}
          </h3>
          <p>{provider.role}</p>
        </div>

        <div className="provider-card-rating" aria-label={`Rating: ${provider.rating.toFixed(1)} stars`}>
          <Star size={15} fill="currentColor" aria-hidden="true" />
          <strong>{provider.rating.toFixed(1)}</strong>
        </div>
      </div>

      {!compact && (
        <>
          <p className="provider-card-about">{provider.about}</p>

          <div className="provider-card-skills">
            {provider.skills?.slice(0, 3).map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>

          <div className="provider-card-meta">
            <span>
              <MapPin size={14} aria-hidden="true" /> {provider.location}
            </span>
            <span>
              <Users size={14} aria-hidden="true" /> {provider.cooperative}
            </span>
            {!provider.verified && (
              <span>
                <ShieldCheck size={14} aria-hidden="true" /> Verification pending
              </span>
            )}
          </div>
        </>
      )}

      <div className="provider-card-foot">
        <div className="service-price">
          <strong>from {formatINR(provider.price)}</strong>
          <span>
            {provider.jobs.toLocaleString("en-IN")} jobs · {provider.experience} exp
          </span>
        </div>

        <Link
          to={`/providers?id=${provider.id}`}
          className="btn btn-outline btn-sm"
          aria-label={`View profile of ${provider.name}`}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProviderCard;
