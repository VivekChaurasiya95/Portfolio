import { ReactNode, useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: ReactNode;
  id?: string;
  minHeight?: string;
  rootMargin?: string;
}

export default function LazySection({
  children,
  id,
  minHeight = "400px",
  rootMargin = "800px",
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If URL hash targets this section, render immediately
    if (id && window.location.hash === `#${id}`) {
      setShouldRender(true);
      return;
    }

    const handleHashChange = () => {
      if (id && window.location.hash === `#${id}`) {
        setShouldRender(true);
      }
    };

    const handleLoadSection = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!id || detail === id || detail === "all") {
        setShouldRender(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("load-section", handleLoadSection);

    const el = containerRef.current;
    if (!el) {
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
        window.removeEventListener("load-section", handleLoadSection);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load-section", handleLoadSection);
    };
  }, [id, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id ? `${id}-container` : undefined}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
      className="relative"
    >
      {shouldRender ? (
        children
      ) : (
        <div className="w-full flex items-center justify-center py-20 opacity-0 pointer-events-none" />
      )}
    </div>
  );
}
