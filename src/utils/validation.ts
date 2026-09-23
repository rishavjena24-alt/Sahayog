import { z } from "zod";

export const LoginSchema = z.object({
  role: z.enum(["customer", "provider", "admin"] as const),
});

export const BookingFormSchema = z.object({
  serviceId: z.string().min(1, "Service selection is required"),
  providerId: z.string().min(1, "Provider selection is required"),
  date: z.string().min(1, "Booking date is required").refine((val) => {
    const chosen = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(chosen.getTime()) && chosen >= today;
  }, "Please select a date today or in the future"),
  time: z.string().min(1, "Time slot is required"),
  customerName: z.string().min(2, "Full name must be at least 2 characters"),
  customerPhone: z.string().regex(/^[0-9+ -]{10,15}$/, "Enter a valid 10-digit phone number"),
  customerAddress: z.string().min(5, "Address must be at least 5 characters long"),
  notes: z.string().optional(),
});

export const OfferServiceSchema = z.object({
  title: z.string().min(3, "Service title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(50, "Minimum price is ₹50").max(50000, "Maximum price is ₹50,000"),
  unit: z.string().min(1, "Billing unit is required (e.g., per visit, per hour)"),
  description: z.string().min(15, "Description must be at least 15 characters"),
  coopId: z.string().min(1, "Cooperative affiliation is required"),
});

export const CommunityPostSchema = z.object({
  title: z.string().min(5, "Discussion title must be at least 5 characters"),
  category: z.string().min(1, "Topic category is required"),
  content: z.string().min(10, "Post content must be at least 10 characters"),
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
export type OfferServiceFormData = z.infer<typeof OfferServiceSchema>;
export type CommunityPostFormData = z.infer<typeof CommunityPostSchema>;
