import React from "react";

interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmed", cls: "green" },
  pending: { label: "Pending", cls: "amber" },
  completed: { label: "Completed", cls: "blue" },
  cancelled: { label: "Cancelled", cls: "red" },
  open: { label: "Open", cls: "blue" },
  filled: { label: "Filled", cls: "green" },
  active: { label: "Active", cls: "green" },
  verified: { label: "Verified", cls: "green" },
  unverified: { label: "Unverified", cls: "red" },
  available: { label: "Available", cls: "green" },
  unavailable: { label: "Unavailable", cls: "red" },
  declined: { label: "Declined", cls: "red" },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = statusMap[status?.toLowerCase()] || { label: status, cls: "gray" };
  return <span className={`status-badge ${s.cls}`}>{s.label}</span>;
};

export default StatusBadge;
