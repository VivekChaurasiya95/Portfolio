import { useEffect } from "react";
import Spline from "@splinetool/react-spline";

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
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none md:pointer-events-auto">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 pointer-events-none md:hidden" />
      {/* Wrapper to push the Spline canvas down to cut off the watermark */}
      <div className="absolute inset-x-0 top-0 bottom-[-90px] scale-[1.1] sm:scale-[1.2] md:scale-[1.4] lg:scale-[1.5] transition-transform duration-700">
        <Spline
          scene="/scene.splinecode"
          className="w-full h-full cursor-none pointer-events-none md:pointer-events-auto"
          onLoad={() => {
            const selectors = ['#spline-watermark', '#logo', '#spline-logo', 'a[href*="spline.design"]'];
            selectors.forEach((sel) => {
              document.querySelectorAll(sel).forEach((el) => el.remove());
            });
          }}
        />
      </div>
    </div>
  );
}
