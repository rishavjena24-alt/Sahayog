import React from "react";

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
  hint?: string;
  color?: "blue" | "green" | "amber" | "violet" | "orange" | "pink" | string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon: IconComp, label, value, hint, color = "blue" }) => {
  return (
    <div className={`stat-card ${color}`} role="group" aria-label={`${label}: ${value}`}>
      <div className="stat-icon" aria-hidden="true">
        <IconComp size={22} />
      </div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {hint && <span className="stat-hint">{hint}</span>}
      </div>
    </div>
  );
};

export default StatCard;
