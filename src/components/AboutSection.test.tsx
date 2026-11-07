import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("./SplineBackground", () => ({
  default: () => <div data-testid="mock-spline-background" />,
}));

class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

import AboutSection from "./AboutSection";

describe("AboutSection", () => {
  it("renders the Spline visual instead of the portrait", async () => {
    render(<AboutSection />);
    expect(
      await screen.findByTestId("mock-spline-background"),
    ).toBeInTheDocument();
    expect(screen.queryByAltText("Vivek Chaurasiya")).not.toBeInTheDocument();
  });

  it("keeps the about heading and copy", () => {
    render(<AboutSection />);
    expect(
      screen.getByRole("heading", { name: /who is behind the/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Expected Graduation/)).toBeInTheDocument();
  });
});
