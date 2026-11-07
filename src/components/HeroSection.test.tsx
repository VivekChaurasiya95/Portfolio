import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import HeroSection from "./HeroSection";

const renderHero = () =>
  render(
    <ThemeProvider attribute="class" defaultTheme="dark">
      <HeroSection />
    </ThemeProvider>,
  );

describe("HeroSection", () => {
  it("renders the portrait visual", () => {
    renderHero();
    const portrait = screen.getByAltText("Vivek Chaurasiya");
    expect(portrait).toBeInTheDocument();
    expect(portrait).toHaveAttribute(
      "src",
      expect.stringContaining("vivek-profile-new"),
    );
  });

  it("keeps the hero headline and calls to action", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /I Build/,
    );
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Check Resume")).toBeInTheDocument();
  });
});
