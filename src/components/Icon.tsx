import React from "react";
import { categoryMap } from "../iconMap";

const categoryToIcon: Record<string, string> = {
  cleaning: "Sparkles",
  plumbing: "Wrench",
  electrical: "PlugZap",
  cooking: "CookingPot",
  repairs: "Hammer",
  gardening: "Leaf",
  painting: "Brush",
  tutoring: "BookOpen",
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  [key: string]: any;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, ...rest }) => {
  const resolved = categoryToIcon[name] || name;
  const C = categoryMap[resolved] || categoryMap.Sparkles;
  return <C size={size} {...rest} />;
};

export default Icon;
