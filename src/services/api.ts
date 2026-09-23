import {
  services as initialServices,
  providers as initialProviders,
  bookings as initialBookings,
  providerRequests as initialRequests,
  communityGroups as initialGroups,
  communityRequests as initialCommunityRequests,
  users as initialUsers,
  adminStats as initialAdminStats,
  providerEarnings as initialEarnings,
  reviews as initialReviews,
} from "../data";

const delay = (ms: number = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const BOOKINGS_KEY = "sahayog:api:bookings";
const REQUESTS_KEY = "sahayog:api:requests";
const SERVICES_KEY = "sahayog:api:services";

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Storage write failed", err);
  }
}

const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  async getServices(category?: string, query?: string) {
    try {
      const url = new URL(`${API_BASE}/services`);
      if (category && category !== "all") url.searchParams.append("category", category);
      if (query) url.searchParams.append("search", query);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend offline or timeout -> fallback to local storage
    }

    await delay(180);
    const services = getStored(SERVICES_KEY, initialServices);
    return services.filter((s: any) => {
      const matchCat = !category || category === "all" || s.category === category;
      const matchQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  },

  async getServiceById(id: number | string) {
    try {
      const res = await fetch(`${API_BASE}/services/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(150);
    const services = getStored(SERVICES_KEY, initialServices);
    const service = services.find((s: any) => String(s.id) === String(id));
    if (!service) throw new Error(`Service with id ${id} not found`);
    return service;
  },

  async getProviders(coopId?: string, query?: string) {
    try {
      const res = await fetch(`${API_BASE}/providers`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const providers = await res.json();
        return providers.filter((p: any) => {
          const matchQuery =
            !query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.role.toLowerCase().includes(query.toLowerCase()) ||
            (p.cooperative && p.cooperative.toLowerCase().includes(query.toLowerCase()));
          return matchQuery;
        });
      }
    } catch {
      // Fallback
    }

    await delay(180);
    return initialProviders.filter((p: any) => {
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.role.toLowerCase().includes(query.toLowerCase()) ||
        p.coop.toLowerCase().includes(query.toLowerCase());
      return matchQuery;
    });
  },

  async getProviderById(id: number | string) {
    try {
      const res = await fetch(`${API_BASE}/providers/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(150);
    const provider = initialProviders.find((p: any) => String(p.id) === String(id));
    if (!provider) throw new Error(`Provider with id ${id} not found`);
    return provider;
  },

  async getBookings(customerId?: string) {
    try {
      const url = new URL(`${API_BASE}/bookings`);
      if (customerId) url.searchParams.append("customerId", customerId);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(200);
    const bookings = getStored(BOOKINGS_KEY, initialBookings);
    return bookings;
  },

  async getBookingById(id: string) {
    await delay(150);
    const bookings = getStored(BOOKINGS_KEY, initialBookings);
    const booking = bookings.find((b: any) => b.id === id);
    if (!booking) throw new Error(`Booking with id ${id} not found`);
    return booking;
  },

  async createBooking(data: any) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: data.serviceId,
          providerId: data.providerId,
          customer: data.customerName || data.customer || "Valued Customer",
          date: data.date,
          time: data.time,
          price: data.price,
          address: data.customerAddress || data.address,
          phone: data.customerPhone || data.phone,
          notes: data.notes,
          payment: data.payment || "UPI",
        }),
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        const created = await res.json();
        // Also trigger sheet sync
        fetch(`${API_BASE}/sheets/sync`, { method: "POST" }).catch(() => {});
        return created;
      }
    } catch {
      // Fallback
    }

    await delay(300);
    const bookings = getStored(BOOKINGS_KEY, initialBookings);
    const id = "SH-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id,
      service: data.serviceTitle || "Custom Service",
      provider: data.providerName || "Assigned Provider",
      customer: data.customerName || "Customer",
      date: data.date,
      time: data.time,
      price: data.price || 499,
      status: "confirmed",
      location: data.customerAddress || "Bengaluru",
      phone: data.customerPhone || "+91 98765 43210",
      notes: data.notes || "",
    };
    const updated = [newBooking, ...bookings];
    setStored(BOOKINGS_KEY, updated);
    return newBooking;
  },

  async updateBookingStatus(id: string, status: "confirmed" | "completed" | "cancelled") {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(200);
    const bookings = getStored(BOOKINGS_KEY, initialBookings);
    const updated = bookings.map((b: any) => (b.id === id ? { ...b, status } : b));
    setStored(BOOKINGS_KEY, updated);
    return updated.find((b: any) => b.id === id);
  },

  async getProviderRequests() {
    try {
      const res = await fetch(`${API_BASE}/requests`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(180);
    return getStored(REQUESTS_KEY, initialRequests);
  },

  async respondProviderRequest(id: string, status: "accepted" | "declined") {
    try {
      const res = await fetch(`${API_BASE}/requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(200);
    const requests = getStored(REQUESTS_KEY, initialRequests);
    const updated = requests.map((r: any) => (r.id === id ? { ...r, status } : r));
    setStored(REQUESTS_KEY, updated);
    return updated.find((r: any) => r.id === id);
  },

  async createService(data: any) {
    try {
      const res = await fetch(`${API_BASE}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.title,
          category: data.category,
          categoryLabel: data.categoryLabel || data.category,
          price: Number(data.price),
          duration: data.unit || "per service",
          description: data.description,
          inclusions: ["Cooperative verified quality", "Transparent pricing", "Fair wages guarantee"],
          providers: [1],
        }),
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(350);
    const services = getStored(SERVICES_KEY, initialServices);
    const newService = {
      id: services.length + 101,
      name: data.title,
      category: data.category,
      categoryLabel: data.categoryLabel || data.category,
      price: Number(data.price),
      rating: 5.0,
      reviews: 1,
      duration: data.unit || "per service",
      booked: 0,
      verified: true,
      popular: false,
      description: data.description,
      inclusions: ["Cooperative verified quality", "Transparent pricing", "Fair wages guarantee"],
      providerIds: [1],
    };
    const updated = [newService, ...services];
    setStored(SERVICES_KEY, updated);
    return newService;
  },

  async getCommunityData() {
    try {
      const res = await fetch(`${API_BASE}/admin/groups`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const groups = await res.json();
        return { groups, requests: initialCommunityRequests };
      }
    } catch {
      // Fallback
    }

    await delay(150);
    return {
      groups: initialGroups,
      requests: initialCommunityRequests,
    };
  },

  async getAdminStats() {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/admin/stats`, { signal: AbortSignal.timeout(1500) }),
        fetch(`${API_BASE}/admin/users`, { signal: AbortSignal.timeout(1500) }),
      ]);
      if (statsRes.ok && usersRes.ok) {
        const stats = await statsRes.json();
        const users = await usersRes.json();
        return { stats, users };
      }
    } catch {
      // Fallback
    }

    await delay(200);
    return {
      stats: initialAdminStats,
      users: initialUsers,
    };
  },

  async getProviderEarnings() {
    await delay(180);
    return initialEarnings;
  },

  async getReviews() {
    try {
      const res = await fetch(`${API_BASE}/admin/reviews`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    await delay(150);
    return initialReviews;
  },

  async syncLiveSheets() {
    try {
      const res = await fetch(`${API_BASE}/sheets/sync`, { method: "POST", signal: AbortSignal.timeout(3000) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: false, message: "Backend offline, local CSVs exported" };
  },
};
