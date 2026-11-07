import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionErrorBoundary from "./SectionErrorBoundary";

const Boom = () => {
  throw new Error("boom");
};

describe("SectionErrorBoundary", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when nothing throws", () => {
    render(
      <SectionErrorBoundary sectionName="Experience">
        <p>section content</p>
      </SectionErrorBoundary>,
    );
    expect(screen.getByText("section content")).toBeInTheDocument();
  });

  it("renders a fallback with the section name when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <SectionErrorBoundary sectionName="Experience">
        <Boom />
      </SectionErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The Experience section failed to load.",
    );
    expect(
      screen.getByRole("button", { name: /reload page/i }),
    ).toBeInTheDocument();
  });
});
