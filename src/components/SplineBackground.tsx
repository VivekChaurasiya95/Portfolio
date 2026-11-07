import { useEffect } from "react";
import SafeSpline from "./SafeSpline";

const WATERMARK_PHRASE = 'built with spline';

function isWatermarkText(el: Element | null): el is HTMLElement {
  if (!el || !(el instanceof HTMLElement)) return false;
  const text = (el.textContent || '').trim().toLowerCase();
  return text.includes(WATERMARK_PHRASE) && text.length <= WATERMARK_PHRASE.length + 8;
}

// Hides Spline's "Built with Spline" badge by its text instead of markup, so
// watermark DOM changes can't dodge the selector-based removers. Only touches
// subtrees containing nothing but the badge text.
function removeSplineWatermarkByText() {
  document.querySelectorAll('a, div, span').forEach((el) => {
    if (!isWatermarkText(el)) return;
    let node: HTMLElement | null = el;
    for (let i = 0; i < 3 && node; i++) {
      if (!isWatermarkText(node)) break;
      node.style.display = 'none';
      node = node.parentElement;
    }
  });
}

// Rendered inside the About section's visual slot.
export default function SplineBackground() {
  useEffect(() => {
    const removeSplineLogo = () => {
      const selectors = [
        '#spline-watermark',
        '#logo',
        '#spline-logo',
        'a[href*="spline.design"]',
        'a[href*="spline"]',
        '[class*="watermark"]',
        '[class*="spline-watermark"]',
      ];

      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.display = 'none';
          el.remove();
        });
      });

      document.querySelectorAll('*').forEach((el) => {
        if (el.shadowRoot) {
          selectors.forEach((sel) => {
            el.shadowRoot?.querySelectorAll(sel).forEach((shadowEl) => {
              (shadowEl as HTMLElement).style.display = 'none';
              shadowEl.remove();
            });
          });
        }
      });
      removeSplineWatermarkByText();
    };

    removeSplineLogo();
    const interval = setInterval(removeSplineLogo, 100);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
      {/* Wide-canvas reframe: this scene was authored for a wide hero frame with
          the subject right-of-center. Render it wide and shift it left so the
          subject lands centered in this narrower viewport. */}
      <div className="absolute top-0 bottom-0 left-[-123%] w-[225%] scale-[1.15]">
        <SafeSpline
          scene="/scene.splinecode"
          className="w-full h-full cursor-none pointer-events-auto"
          onLoad={() => {
            const selectors = ['#spline-watermark', '#logo', '#spline-logo', 'a[href*="spline.design"]'];
            selectors.forEach((sel) => {
              document.querySelectorAll(sel).forEach((el) => el.remove());
            });
            removeSplineWatermarkByText();
          }}
        />
      </div>
    </div>
  );
}
