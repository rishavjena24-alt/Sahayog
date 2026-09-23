import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

const mockService = {
  id: 1,
  name: "Full Home Deep Cleaning",
  category: "cleaning",
  price: 2499,
  rating: 4.8,
  reviews: 342,
  duration: "4 hours",
  verified: true,
  description: "Complete deep cleaning of whole house.",
};

describe("ServiceCard Component", () => {
  it("renders service name, rating and price correctly", () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockService} />
      </BrowserRouter>
    );

    expect(screen.getByText("Full Home Deep Cleaning")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("₹2,499")).toBeInTheDocument();
    expect(screen.getByText("4 hours")).toBeInTheDocument();
  });
});
