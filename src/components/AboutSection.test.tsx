import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

import AboutSection from "./AboutSection";

describe("AboutSection", () => {
  it("renders no 3D canvas", () => {
    const { container } = render(<AboutSection />);
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
  });

  it("keeps the about heading and copy", () => {
    render(<AboutSection />);
    expect(
      screen.getByRole("heading", { name: /who is behind the/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Expected Graduation/)).toBeInTheDocument();
  });
});
