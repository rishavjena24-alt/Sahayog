import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width,
  height,
  style = {},
  circle = false,
}) => {
  const customStyle: React.CSSProperties = {
    ...style,
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
    borderRadius: circle ? "50%" : undefined,
  };

  return <div className={`skeleton ${className}`} style={customStyle} aria-hidden="true" />;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton height="180px" style={{ borderRadius: "12px" }} />
      <Skeleton className="skeleton-title" width="70%" />
      <Skeleton className="skeleton-text" width="90%" />
      <Skeleton className="skeleton-text" width="50%" />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
        <Skeleton width="80px" height="32px" />
        <Skeleton width="100px" height="36px" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="skeleton-card" style={{ gap: "16px" }} aria-hidden="true">
      <Skeleton height="32px" width="100%" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: "16px" }}>
          <Skeleton height="24px" width="20%" />
          <Skeleton height="24px" width="30%" />
          <Skeleton height="24px" width="25%" />
          <Skeleton height="24px" width="25%" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
