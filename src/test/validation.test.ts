import { describe, it, expect } from "vitest";
import { BookingFormSchema, LoginSchema, OfferServiceSchema } from "../utils/validation";

describe("Validation Schemas", () => {
  it("validates login role correctly", () => {
    const valid = LoginSchema.safeParse({ role: "customer" });
    expect(valid.success).toBe(true);

    const invalid = LoginSchema.safeParse({ role: "superadmin" });
    expect(invalid.success).toBe(false);
  });

  it("validates offer service schema constraints", () => {
    const valid = OfferServiceSchema.safeParse({
      title: "Full House Painting",
      category: "painting",
      price: 3500,
      unit: "per day",
      description: "Complete interior and exterior emulsion painting with scaffolding.",
      coopId: "coop-1",
    });
    expect(valid.success).toBe(true);

    const invalid = OfferServiceSchema.safeParse({
      title: "Hi",
      category: "",
      price: 10,
      unit: "",
      description: "Short",
      coopId: "",
    });
    expect(invalid.success).toBe(false);
  });
});
