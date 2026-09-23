import React, { useState } from "react";
import { Toaster } from "./Toast";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Role } from "../types";

interface AppLayoutProps {
  role?: Role;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ role = "customer", title, subtitle, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar role={role} open={open} onClose={() => setOpen(false)} />

      <div className="app-main">
        <Topbar title={title} subtitle={subtitle} onMenuClick={() => setOpen(true)} />

        <main className="app-content">
          <div className="content-inner">{children}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default AppLayout;
