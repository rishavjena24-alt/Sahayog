import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const NotFound: React.FC = () => {
  return (
    <div className="page-wrap">
      <Navbar />
      <div className="page-inner center-col">
        <div className="empty-state large">
          <div className="notfound-icon">
            <Compass size={40} />
          </div>
          <span className="mono huge">404</span>
          <h1>Page not on this map</h1>
          <p>
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back on track.
          </p>
          <div className="btn-row center" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/services" className="btn btn-outline">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
