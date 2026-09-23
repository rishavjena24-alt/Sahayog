import React from "react";
import { Link } from "react-router-dom";
import { Handshake, MapPin, Mail, Phone, Globe, Share2, MessageCircle, IndianRupee, ShieldCheck, Users, Wrench } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "For Customers", to: "/services" },
      { label: "For Providers", to: "/offer-service" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", to: "/" },
      { label: "Cancellation Policy", to: "/bookings" },
      { label: "Provider Verification", to: "/providers" },
      { label: "Report an Issue", to: "/" },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="navbar-brand">
            <span className="brand-icon" aria-hidden="true">
              <Handshake size={20} />
            </span>
            <span className="brand-text brand-invert">
              Sahayog
              <small>Together We Work. Together We Grow.</small>
            </span>
          </div>
          <p className="footer-desc">
            India&apos;s first cooperative gig-services platform connecting neighbourhoods with trusted local skilled workers.
          </p>
          <div className="footer-socials" aria-label="Social links">
            <span aria-label="Global Web"><Globe size={16} /></span>
            <span aria-label="Share"><Share2 size={16} /></span>
            <span aria-label="Community Chat"><MessageCircle size={16} /></span>
            <span aria-label="Email Support"><Mail size={16} /></span>
          </div>
        </div>

        {columns.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((l) => (
              <Link key={l.label} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-col">
          <h4>Trusted &amp; Transparent</h4>
          <div className="footer-trust">
            <span><ShieldCheck size={15} aria-hidden="true" /> Verified providers</span>
            <span><Users size={15} aria-hidden="true" /> 500+ cooperative members</span>
            <span><IndianRupee size={15} aria-hidden="true" /> Fair pricing, no middlemen</span>
            <span><Wrench size={15} aria-hidden="true" /> Quality guarantees</span>
          </div>
          <p className="footer-contact"><MapPin size={15} aria-hidden="true" /> Bengaluru, Karnataka, India</p>
          <p className="footer-contact"><Mail size={15} aria-hidden="true" /> hello@sahayog.in</p>
          <p className="footer-contact"><Phone size={15} aria-hidden="true" /> 1800-SAH-AYOG</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Sahayog Cooperative Pvt. Ltd. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
