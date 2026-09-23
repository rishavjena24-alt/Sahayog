import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  Wrench,
  CalendarCheck,
  Handshake,
  Building2,
  BriefcaseBusiness,
  LogOut,
  X,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Role } from "../types";

interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const menuByRole: Record<Role, MenuItem[]> = {
  customer: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Services", path: "/services", icon: Wrench },
    { label: "Providers", path: "/providers", icon: Users },
    { label: "My Bookings", path: "/bookings", icon: CalendarCheck },
    { label: "Community", path: "/community", icon: Handshake },
  ],
  provider: [
    { label: "Provider Dashboard", path: "/provider", icon: LayoutDashboard },
    { label: "Services", path: "/services", icon: Wrench },
    { label: "Bookings", path: "/bookings", icon: CalendarCheck },
    { label: "Offer a Service", path: "/offer-service", icon: BriefcaseBusiness },
    { label: "Community", path: "/community", icon: Handshake },
  ],
  admin: [
    { label: "Admin Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Providers", path: "/providers", icon: Users },
    { label: "Services", path: "/services", icon: Wrench },
    { label: "Bookings", path: "/bookings", icon: CalendarCheck },
    { label: "Community", path: "/community", icon: Building2 },
  ],
};

const roleLabels: Record<Role, string> = {
  customer: "Member",
  provider: "Provider",
  admin: "Administrator",
};

interface SidebarProps {
  role?: Role;
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = "customer", open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const items = menuByRole[role] || menuByRole.customer;
  const initials = user?.initials || "SA";
  const name = user?.name || "Sahayog Member";
  const location = user?.location || "Bengaluru, KA";

  function handleLogout() {
    logout();
    onClose();
    navigate("/");
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} role="presentation" />}
      <aside
        className={`sidebar ${open ? "open" : ""}`}
        aria-label="Sidebar Navigation"
        aria-hidden={!open}
      >
        <div className="sidebar-head">
          <NavLink to="/" className="brand-mini" onClick={onClose}>
            <span className="brand-icon" aria-hidden="true">
              <Handshake size={20} />
            </span>
            <span className="brand-text">
              Sahayog
              <small>{roleLabels[role] || "Member"} workspace</small>
            </span>
          </NavLink>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="avatar" aria-hidden="true">{initials}</div>
          <div>
            <strong>{name}</strong>
            <span>{location}</span>
          </div>
        </div>

        <p className="menu-title">MAIN MENU</p>
        <nav className="menu" aria-label="Sidebar Menu">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={onClose}
              >
                <Icon size={19} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/" className="menu-link" onClick={onClose} end>
            <Home size={19} aria-hidden="true" />
            <span>Public Site</span>
          </NavLink>
          <button className="menu-link link-button" onClick={handleLogout}>
            <LogOut size={19} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
