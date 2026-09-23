import React, { useState, useEffect, useCallback } from "react";
import { DataCtx } from "./useData";
import { api } from "../services/api";
import { bookings as seedBookings, providerRequests as seedRequests } from "../data";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<any[]>(seedBookings);
  const [requests, setRequests] = useState<any[]>(seedRequests);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [fetchedBookings, fetchedRequests] = await Promise.all([
        api.getBookings(),
        api.getProviderRequests(),
      ]);
      setBookings(fetchedBookings);
      setRequests(fetchedRequests);
    } catch (err) {
      console.error("Failed to load initial data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  async function cancelBooking(id: string) {
    await api.updateBookingStatus(id, "cancelled");
    setBookings((list) =>
      list.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  }

  async function completeBooking(id: string) {
    await api.updateBookingStatus(id, "completed");
    setBookings((list) =>
      list.map((b) => (b.id === id ? { ...b, status: "completed" } : b))
    );
  }

  async function addBooking(booking: any) {
    const created = await api.createBooking(booking);
    setBookings((list) => [created, ...list]);
    return created;
  }

  async function respondRequest(id: string, status: "accepted" | "declined") {
    await api.respondProviderRequest(id, status);
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <DataCtx.Provider
      value={{
        bookings,
        requests,
        loading,
        cancelBooking,
        completeBooking,
        addBooking,
        respondRequest,
        refreshData,
      }}
    >
      {children}
    </DataCtx.Provider>
  );
};
