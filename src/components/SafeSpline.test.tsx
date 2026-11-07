import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("@splinetool/react-spline", () => ({
  default: (props: { scene: string; onLoad?: (app: unknown) => void }) => (
    <button
      data-testid="mock-spline"
      data-scene={props.scene}
      onClick={() => props.onLoad?.({})}
    />
  ),
}));

import SafeSpline from "./SafeSpline";

describe("SafeSpline", () => {
  it("keeps the preload sizing guard until the scene loads, then nudges a resize", async () => {
    const onResize = vi.fn();
    window.addEventListener("resize", onResize);
    try {
      const onLoad = vi.fn();
      const { container } = render(
        <SafeSpline scene="/scene.splinecode" onLoad={onLoad} />,
      );

      expect(screen.getByTestId("mock-spline")).toHaveAttribute(
        "data-scene",
        "/scene.splinecode",
      );
      expect(container.firstChild).toHaveClass("spline-preload");

      fireEvent.click(screen.getByTestId("mock-spline"));

      expect(onLoad).toHaveBeenCalled();
      expect(container.firstChild).not.toHaveClass("spline-preload");
      await waitFor(() => expect(onResize).toHaveBeenCalled());
    } finally {
      window.removeEventListener("resize", onResize);
    }
  });
});
