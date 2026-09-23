import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ children = "Back", className = "", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className={`back-btn ${className}`.trim()}
      onClick={handleClick}
      aria-label={typeof children === "string" ? children : "Go back"}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
};

export default BackButton;
