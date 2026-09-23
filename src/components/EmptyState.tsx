import React from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Inbox size={48} className="text-muted" />,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        padding: "48px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        border: "1px dashed var(--border-strong)",
      }}
      role="region"
      aria-label={title}
    >
      <div style={{ marginBottom: "16px", color: "var(--muted)" }}>{icon}</div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-strong)", margin: "0 0 8px 0" }}>
        {title}
      </h3>
      {description && (
        <p style={{ color: "var(--muted)", maxWidth: "400px", margin: "0 0 20px 0", fontSize: "0.95rem" }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction} style={{ padding: "8px 20px" }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
