import { createContext, useContext } from "react";

export interface DataContextType {
  bookings: any[];
  requests: any[];
  loading: boolean;
  cancelBooking: (id: string) => Promise<void>;
  completeBooking: (id: string) => Promise<void>;
  addBooking: (booking: any) => Promise<any>;
  respondRequest: (id: string, status: "accepted" | "declined") => Promise<void>;
  refreshData: () => Promise<void>;
}

export const DataCtx = createContext<DataContextType | null>(null);

export function useData(): DataContextType {
  const ctx = useContext(DataCtx);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
