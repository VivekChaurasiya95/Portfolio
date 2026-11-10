import { describe, it, expect, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import path from "node:path";
import { allCertifications } from "@/data/certifications";

class MockIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

import CertificationsSection from "./CertificationsSection";

const LOOP_COPIES = 3;

describe("folio certifications data", () => {
  it("has at least 9 unique items with required fields", () => {
    expect(allCertifications.length).toBeGreaterThanOrEqual(9);
    const titles = allCertifications.map((c) => c.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const cert of allCertifications) {
      expect(cert.title).toBeTruthy();
      expect(cert.issuer).toBeTruthy();
      expect(cert.image).toMatch(/^\//);
      expect(cert.credentialUrl).toMatch(/^https?:\/\//);
      expect(cert.skills.length).toBeGreaterThan(0);
    }
  });
});

describe("CertificationsSection", () => {
  it("renders the counter with the item total", () => {
    render(<CertificationsSection />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(
      screen.getByText(String(allCertifications.length).padStart(2, "0")),
    ).toBeInTheDocument();
  });

  it("renders every title once per loop copy", () => {
    render(<CertificationsSection />);
    expect(screen.getAllByText("DevSprint")).toHaveLength(LOOP_COPIES);
    expect(screen.getAllByText("Intro to AI")).toHaveLength(LOOP_COPIES);
    expect(screen.getAllByText("Computer Vision 101")).toHaveLength(
      LOOP_COPIES,
    );
  });

  it("renders one image slot per loop copy", () => {
    const { container } = render(<CertificationsSection />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(allCertifications.length * LOOP_COPIES);
    expect(imgs[0].getAttribute("src")).toMatch(/^\//);
    expect(
      container.querySelector("#certifications"),
    ).not.toBeNull();
  });

  it("renders the My Certifications section heading", () => {
    render(<CertificationsSection />);
    expect(
      screen.getByRole("heading", { name: "My Certifications" }),
    ).toBeInTheDocument();
  });

  it("renders a fallback tile behind every image slot", () => {
    const { container } = render(<CertificationsSection />);
    const fallbacks = container.querySelectorAll("[data-slot-fallback]");
    expect(fallbacks).toHaveLength(allCertifications.length * LOOP_COPIES);
  });

  it("collapses faded-out credit subtitles so titles use full row width", async () => {
    const { container, unmount } = render(<CertificationsSection />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    try {
      const subs = Array.from(
        container.querySelectorAll("[data-reel-subtitle]"),
      );
      expect(subs).toHaveLength(allCertifications.length * LOOP_COPIES);
      const collapsed = subs.filter(
        (el) => (el as HTMLElement).style.display === "none",
      );
      // Only the active row keeps its subtitle in layout; every faded
      // credit collapses so invisible text never truncates the title.
      expect(collapsed).toHaveLength(subs.length - 1);
    } finally {
      unmount();
    }
  });

  it("lets vertical swipes scroll the page, captures horizontal swipes for the reel", () => {
    const { container, unmount } = render(<CertificationsSection />);
    try {
      const section = container.querySelector("#certifications");
      if (!(section instanceof HTMLElement)) {
        throw new Error("missing #certifications section");
      }

      const touchEvent = (
        type: "touchstart" | "touchmove",
        x: number,
        y: number,
      ) => {
        const ev = new Event(type, { bubbles: true, cancelable: true });
        (
          ev as unknown as {
            touches: Array<{ clientX: number; clientY: number }>;
          }
        ).touches = [{ clientX: x, clientY: y }];
        return ev;
      };

      // Vertical swipe: never captured, the page keeps scrolling.
      section.dispatchEvent(touchEvent("touchstart", 180, 400));
      const vMove = touchEvent("touchmove", 180, 300);
      section.dispatchEvent(vMove);
      expect(vMove.defaultPrevented).toBe(false);
      const vMove2 = touchEvent("touchmove", 180, 200);
      section.dispatchEvent(vMove2);
      expect(vMove2.defaultPrevented).toBe(false);

      // Horizontal swipe: captured to drive the reel.
      section.dispatchEvent(touchEvent("touchstart", 200, 400));
      const hMove = touchEvent("touchmove", 100, 405);
      section.dispatchEvent(hMove);
      expect(hMove.defaultPrevented).toBe(true);

      // Sub-threshold jitter: ignored, nothing captured.
      section.dispatchEvent(touchEvent("touchstart", 200, 400));
      const jitter = touchEvent("touchmove", 197, 402);
      section.dispatchEvent(jitter);
      expect(jitter.defaultPrevented).toBe(false);
    } finally {
      unmount();
    }
  });

  it("shows a mobile swipe hint under the heading", () => {
    render(<CertificationsSection />);
    expect(
      screen.getByText("Swipe to browse · Tap to open"),
    ).toBeInTheDocument();
  });
});

describe("certificate image assets", () => {
  it("every certificate image resolves to a file in public/", () => {
    for (const cert of allCertifications) {
      const filePath = path.resolve(
        process.cwd(),
        "public",
        decodeURIComponent(cert.image).replace(/^\//, ""),
      );
      expect(
        existsSync(filePath),
        `missing image asset for "${cert.title}": ${cert.image}`,
      ).toBe(true);
    }
  });
});
