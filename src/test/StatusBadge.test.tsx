import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "../components/StatusBadge";

describe("StatusBadge Component", () => {
  it("renders confirmed status correctly", () => {
    render(<StatusBadge status="confirmed" />);
    const badge = screen.getByText("Confirmed");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("green");
  });

  it("renders pending status with amber class", () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByText("Pending");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("amber");
  });

  it("renders cancelled status with red class", () => {
    render(<StatusBadge status="cancelled" />);
    const badge = screen.getByText("Cancelled");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("red");
  });
});
