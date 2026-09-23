import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plus, TrendingUp, CheckCircle2 } from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import BookingCard from "../components/BookingCard";
import BookingTable from "../components/BookingTable";
import BackButton from "../components/BackButton";
import { services, providers, formatINR } from "../data";
import { useToast } from "../useToast";
import { useData } from "../context/useData";
import { SkeletonCard, SkeletonTable } from "../components/Skeleton";
import EmptyState from "../components/EmptyState";

const tabs = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export const Bookings: React.FC = () => {
  const [tab, setTab] = useState("all");
  const { bookings, cancelBooking, loading } = useData();
  const toast = useToast();

  const serviceMap = useMemo(() => Object.fromEntries(services.map((s) => [s.id, s])), []);
  const providerMap = useMemo(() => Object.fromEntries(providers.map((p) => [p.id, p])), []);

  const upcoming = (list: any[]) => list.filter((b) => b.status === "confirmed" || b.status === "pending");
  const completed = (list: any[]) => list.filter((b) => b.status === "completed");
  const cancelled = (list: any[]) => list.filter((b) => b.status === "cancelled");

  const lists: Record<string, any[]> = useMemo(
    () => ({
      all: bookings,
      upcoming: upcoming(bookings),
      completed: completed(bookings),
      cancelled: cancelled(bookings),
    }),
    [bookings]
  );

  const activeList = lists[tab] || lists.all;
  const upcomingCount = lists.upcoming.length;
  const spend = completed(bookings).reduce((s: number, b: any) => s + (Number(b.price) || 0), 0);

  async function handleCancel(id: string) {
    await cancelBooking(id);
    toast(`Booking ${id} cancelled. Refund initiated.`, "info");
  }

  const tableRows = bookings.filter((b) =>
    tab === "all" || b.status === tab || (tab === "upcoming" && (b.status === "confirmed" || b.status === "pending"))
  );

  return (
    <AppLayout
      role="customer"
      title="My Bookings"
      subtitle="Track, manage and review all your services"
    >
      <BackButton />
      <div className="stat-grid">
        <StatCard
          label="Upcoming"
          value={upcomingCount}
          hint="+2 this week"
          color="blue"
          icon={CalendarDays}
        />
        <StatCard
          label="Completed"
          value={completed(bookings).length}
          hint="98% on-time"
          color="green"
          icon={CheckCircle2}
        />
        <StatCard
          label="Total Spent"
          value={formatINR(spend)}
          hint="+8% vs last qtr"
          color="violet"
          icon={TrendingUp}
        />
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <div className="card-toolbar">
          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? "tab active" : "tab"}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                <span className="tab-count">{lists[t.id]?.length || 0}</span>
              </button>
            ))}
          </div>

          <Link to="/services" className="btn btn-primary btn-sm">
            <Plus size={16} /> New Booking
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: "20px" }}>
            <SkeletonTable rows={4} />
          </div>
        ) : activeList.length === 0 ? (
          <EmptyState
            title={`No ${tab !== "all" ? tab : ""} bookings found`}
            description="Ready to schedule a service? Browse verified cooperative providers near you."
            actionLabel="Browse Services"
            onAction={() => window.location.assign("/services")}
          />
        ) : (
          <>
            <div className="booking-cards">
              {activeList.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  service={serviceMap[b.serviceId]}
                  provider={providerMap[b.providerId]}
                  onCancel={handleCancel}
                />
              ))}
            </div>

            <div className="table-block" style={{ marginTop: "32px" }}>
              <h3 className="card-title">Activity Details</h3>
              <BookingTable
                bookings={tableRows}
                serviceMap={serviceMap}
                providerMap={providerMap}
              />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Bookings;
