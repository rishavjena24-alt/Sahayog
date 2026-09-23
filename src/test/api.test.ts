import { describe, it, expect } from "vitest";
import { api } from "../services/api";

describe("API Service Layer", () => {
  it("fetches services with category filtering", async () => {
    const cleaningServices = await api.getServices("cleaning");
    expect(cleaningServices.length).toBeGreaterThan(0);
    expect(cleaningServices.every((s: any) => s.category === "cleaning")).toBe(true);
  });

  it("fetches service by id", async () => {
    const service = await api.getServiceById(1);
    expect(service).toBeDefined();
    expect(service.id).toBe(1);
  });

  it("creates a new booking successfully", async () => {
    const booking = await api.createBooking({
      serviceTitle: "Test Service",
      providerName: "Test Provider",
      customerName: "Test Customer",
      date: "2026-09-25",
      time: "10:00 AM",
      price: 999,
      customerAddress: "Test Address, Bengaluru",
      customerPhone: "+91 9999999999",
    });

    expect(booking.id).toMatch(/^SH-\d+/);
    expect(booking.status).toBe("confirmed");
    expect(booking.price).toBe(999);
  });
});
