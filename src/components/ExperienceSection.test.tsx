import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceSection from "./ExperienceSection";

// framer-motion's useInView needs IntersectionObserver, which jsdom does not
// provide.
class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

describe("ExperienceSection", () => {
  it("imports without module-evaluation errors (all icons bound)", async () => {
    // The experiences array is evaluated at module scope, so importing the
    // module throws a ReferenceError if any referenced icon (e.g. Briefcase)
    // is missing its import. Regression test for the blank production page
    // caused by "ReferenceError: Briefcase is not defined".
    const mod = await import("./ExperienceSection");
    expect(mod.default).toBeDefined();
  });

  it("renders the professional experience section", () => {
    render(<ExperienceSection />);
    expect(
      screen.getByRole("heading", { name: /professional experience/i }),
    ).toBeInTheDocument();
    // Every experience entry renders a card; spot-check a few, including the
    // GeeksforGeeks entry whose icon is Briefcase.
    expect(screen.getAllByText("GeeksforGeeks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("FlyRank AI").length).toBeGreaterThan(0);
  });
});
