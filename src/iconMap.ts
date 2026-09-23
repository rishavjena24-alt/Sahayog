import {
  Sparkles,
  Wrench,
  PlugZap,
  CookingPot,
  Hammer,
  Leaf,
  Brush,
  BookOpen,
  LucideIcon,
} from "lucide-react";

export const categoryMap: Record<string, LucideIcon> = {
  Sparkles,
  Wrench,
  PlugZap,
  CookingPot,
  Hammer,
  Leaf,
  Brush,
  BookOpen,
};

export const categoryIcon = (name: string): LucideIcon => categoryMap[name] || Sparkles;
