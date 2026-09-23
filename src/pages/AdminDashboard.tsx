import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BriefcaseBusiness,
  CalendarCheck,
  Wrench,
  IndianRupee,
  Star,
  TrendingUp,
  ShieldCheck,
  Building2,
  Search,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import BookingTable from "../components/BookingTable";
import { adminStats, users, providers, services } from "../data";
import { useToast } from "../useToast";
import { useData } from "../context/useData";
import { exportToCSV } from "../utils/csvSync";

const userTabs = [
  { id: "all", label: "All" },
  { id: "customer", label: "Customers" },
  { id: "provider", label: "Providers" },
  { id: "admin", label: "Admins" },
];

export const AdminDashboard: React.FC = () => {
  const [userTab, setUserTab] = useState("all");
  const [userQuery, setUserQuery] = useState("");
  const [providerList, setProviderList] = useState(providers);
  const [inspect, setInspect] = useState<any>(null);
  const toast = useToast();
  const { bookings } = useData();

  const serviceMap = useMemo(() => Object.fromEntries(services.map((s) => [s.id, s])), []);
  const providerMap = useMemo(() => Object.fromEntries(providers.map((p) => [p.id, p])), []);

  const filteredUsers = useMemo(() => {
    let list = [...users];
    if (userTab !== "all") list = list.filter((u) => u.type === userTab);
    if (userQuery.trim()) {
      const q = userQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
      );
    }
    return list;
  }, [userTab, userQuery]);

  function verifyProvider(id: number) {
    setProviderList((list) => list.map((p) => (p.id === id ? { ...p, verified: true } : p)));
    toast("Provider verified & live on the platform.", "success");
  }

  const monthData = [
    { label: "Aug 1", amount: 410 },
    { label: "Aug 8", amount: 370 },
    { label: "Aug 15", amount: 520 },
    { label: "Aug 22", amount: 480 },
    { label: "Aug 29", amount: 610 },
    { label: "Sep 5", amount: 540 },
  ];

  function exportRevenueSheet() {
    const data = providers.map((p) => ({
      "Provider ID": p.id,
      "Worker Name": p.name,
      "Skill/Trade": p.role,
      "Cooperative": p.cooperative,
      "Rating": p.rating,
      "Reviews": p.reviews,
      "Completed Jobs": p.jobs,
      "Base Rate (INR)": p.price,
      "Worker Payout %": "92%",
    }));
    exportToCSV("workers_revenue", data);
    toast("Exported workers_revenue.csv successfully!", "success");
  }

  function exportScheduleSheet() {
    const data = bookings.map((b) => ({
      "Booking ID": b.id,
      "Customer": b.customer,
      "Service ID": b.serviceId,
      "Provider ID": b.providerId,
      "Date": b.date,
      "Time": b.time,
      "Price (INR)": b.price,
      "Provider Share (92%)": Math.round(b.price * 0.92),
      "Status": b.status,
      "Address": b.address,
      "Phone": b.phone,
    }));
    exportToCSV("schedule_bookings", data);
    toast("Exported schedule_bookings.csv successfully!", "success");
  }

  function exportUsersSheet() {
    const data = users.map((u) => ({
      "User ID": u.id,
      "Name": u.name,
      "Role": u.type,
      "Email": u.email,
      "Password": "demo1234",
      "Location": u.location,
      "Joined Date": u.joined,
      "Total Bookings": u.bookings,
    }));
    exportToCSV("user_accounts", data);
    toast("Exported user_accounts.csv successfully!", "success");
  }

  return (
    <AppLayout
      role="admin"
      title="Admin Dashboard"
      subtitle="Platform overview — Bengaluru cluster"
    >
      <BackButton />

      {/* Live Data Sheets & Sync Banner */}
      <div className="card" style={{ marginTop: "14px", padding: "18px 22px", background: "var(--surface)", border: "1.5px solid var(--primary-200)", borderRadius: "var(--radius-lg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--primary-050)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <strong style={{ fontSize: "1.05rem", display: "block" }}>Live Data Sheets &amp; Spreadsheet Sync</strong>
              <span style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                Export updated CSV sheets for Microsoft Excel &amp; Google Sheets (Files stored in <code className="mono">/data_sheets</code>)
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button className="btn btn-outline btn-sm" onClick={exportRevenueSheet}>
              <Download size={14} /> Workers Revenue Sheet
            </button>
            <button className="btn btn-outline btn-sm" onClick={exportScheduleSheet}>
              <Download size={14} /> Schedule &amp; Bookings
            </button>
            <button className="btn btn-primary btn-sm" onClick={exportUsersSheet}>
              <Download size={14} /> User Accounts &amp; Passwords
            </button>
          </div>
        </div>
      </div>

      <div className="admin-alert" style={{ marginTop: "16px" }}>
        <ShieldCheck size={18} />
        <div>
          <strong>3 providers pending verification</strong>
          <span>Review their documents in the Providers section below.</span>
        </div>
        <button className="btn btn-white btn-sm" onClick={() => setUserTab("provider")}>
          Review Now
        </button>
      </div>

      <div className="stat-grid four" style={{ marginTop: "20px" }}>
        <StatCard
          label="Total Users"
          value={adminStats.totalUsers.toLocaleString("en-IN")}
          hint="+18%"
          color="blue"
          icon={Users}
        />
        <StatCard
          label="Active Providers"
          value={adminStats.totalProviders}
          hint="+12 this month"
          color="green"
          icon={BriefcaseBusiness}
        />
        <StatCard
          label="Bookings"
          value={adminStats.totalBookings.toLocaleString("en-IN")}
          hint="+24%"
          color="violet"
          icon={CalendarCheck}
        />
        <StatCard
          label="Total Revenue"
          value={adminStats.revenue}
          hint="+16%"
          color="orange"
          icon={IndianRupee}
        />
      </div>

      <div className="admin-grid" style={{ marginTop: "20px" }}>
        <div className="panel admin-chart-panel">
          <div className="section-head">
            <div>
              <span className="eyebrow">REVENUE</span>
              <h3>Bookings last 6 weeks</h3>
            </div>
            <span className="admin-chip">
              <TrendingUp size={14} /> {adminStats.growth}
            </span>
          </div>

          <div className="area-chart">
            <div className="area-bars">
              {monthData.map((d, i) => (
                <div className="area-col" key={i}>
                  <span className="area-value">{d.amount}</span>
                  <div className="area-bar" style={{ height: `${(d.amount / 650) * 100}%` }} />
                  <span className="area-label">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="area-total">
              <IndianRupee size={20} />
              <strong>{adminStats.revenue}</strong>
              <span>gross bookings processed on platform</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="card-title">Cooperative Health</h3>
          <div className="health-metrics">
            <div className="health-row">
              <span>Member Retention</span>
              <strong>96.4%</strong>
            </div>
            <div className="health-row">
              <span>Avg Provider Rating</span>
              <strong>
                <Star size={14} fill="currentColor" /> {adminStats.avgRating}
              </strong>
            </div>
            <div className="health-row">
              <span>On-time Resolution</span>
              <strong>98.8%</strong>
            </div>
            <div className="health-row">
              <span>Active Cooperatives</span>
              <strong>25</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="panel admin-table-panel" style={{ marginTop: "20px" }}>
        <div className="card-toolbar">
          <div className="tabs">
            {userTabs.map((t) => (
              <button
                key={t.id}
                className={userTab === t.id ? "tab active" : "tab"}
                onClick={() => setUserTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="admin-tools">
            <div className="small-search">
              <Search size={16} />
              <input
                placeholder="Search user..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="booking-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Email</th>
                <th>Location</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="table-user">
                      <div className="avatar avatar-sm">{u.name[0]}</div>
                      <div>
                        <strong>{u.name}</strong>
                        <span className="mono">{u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-tag">{u.type}</span>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.location}</td>
                  <td>{u.joined}</td>
                  <td>
                    <button className="table-link" onClick={() => setInspect(u)}>
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {inspect && (
        <Modal
          open={!!inspect}
          onClose={() => setInspect(null)}
          title={`User: ${inspect.name}`}
          size="md"
        >
          <div className="user-inspect">
            <div className="ui-head">
              <div className="avatar avatar-lg">{inspect.name[0]}</div>
              <div>
                <h3>{inspect.name}</h3>
                <p className="mono">{inspect.id}</p>
              </div>
            </div>

            <div className="ui-rows">
              <div>
                <span>Account Type</span>
                <strong style={{ textTransform: "capitalize" }}>{inspect.type}</strong>
              </div>
              <div>
                <span>Email Address</span>
                <strong>{inspect.email}</strong>
              </div>
              <div>
                <span>Contact Phone</span>
                <strong>{inspect.phone}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{inspect.location}</strong>
              </div>
              <div>
                <span>Member Since</span>
                <strong>{inspect.joined}</strong>
              </div>
              <div>
                <span>Total Bookings</span>
                <strong>{inspect.bookings}</strong>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: "20px" }}
              onClick={() => setInspect(null)}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};

export default AdminDashboard;
