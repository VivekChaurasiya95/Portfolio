import { useCallback, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { SplineProps } from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

/**
 * Spline wrapper that prevents zero-size WebGL canvases.
 *
 * react-spline hides its canvas with `display: none` until the scene loads.
 * If the renderer measures the canvas while it is hidden it snapshots a 0x0
 * drawing buffer and keeps rendering into it, spamming
 * "Framebuffer is incomplete: Attachment has zero size" errors. While the
 * scene loads we force the canvas to keep its layout size invisibly (see
 * `.spline-preload` in index.css); once loaded we nudge any
 * window-resize-driven sizing to re-measure real pixels.
 */
export default function SafeSpline({ onLoad, ...rest }: SplineProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(
    (app: Application) => {
      setLoaded(true);
      // Run after React commits the visible canvas so layout has real size.
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
      onLoad?.(app);
    },
    [onLoad],
  );

  return (
    <div className={loaded ? "contents" : "contents spline-preload"}>
      <Spline {...rest} onLoad={handleLoad} />
    </div>
  );
}
