export type Role = "customer" | "provider" | "admin";

export type BookingStatus = "confirmed" | "completed" | "cancelled" | "pending";

export type RequestStatus = "pending" | "accepted" | "declined";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
  phone?: string;
  address?: string;
  coop?: string;
  joinedDate?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  providerCount: number;
  image: string;
  featured?: boolean;
  coopSharePercent?: number;
  deliverables?: string[];
}

export interface Provider {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  jobsCompleted: number;
  hourlyRate: number;
  coopName: string;
  coopId: string;
  verified: boolean;
  skills: string[];
  bio: string;
  phone?: string;
  availableDays?: string[];
  location?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  providerAvatar?: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  date: string;
  time: string;
  status: BookingStatus;
  amount: number;
  coopShare: number;
  notes?: string;
  createdAt?: string;
}

export interface ProviderRequest {
  id: string;
  bookingId?: string;
  serviceTitle: string;
  customerName: string;
  customerPhone?: string;
  address: string;
  date: string;
  time: string;
  payout: number;
  coopFee: number;
  status: RequestStatus;
  urgency?: "normal" | "urgent" | "scheduled";
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  serviceTitle?: string;
}

export interface Cooperative {
  id: string;
  name: string;
  district: string;
  membersCount: number;
  foundedYear: number;
  leader: string;
  totalEarningsDistributed: number;
  description: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}
