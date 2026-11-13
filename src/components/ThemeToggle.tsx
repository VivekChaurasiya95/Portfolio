import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
  };
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11" />;
  }

  const isDark = theme === "dark";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fallback: instant switch when View Transitions are unavailable
    // or the user prefers reduced motion.
    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-muted/70 border border-border/70 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:bg-accent group-hover:text-foreground group-hover:border-border group-hover:shadow-[0_0_14px_hsl(var(--primary)/0.15)]">
        <motion.span
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -120,
            scale: isDark ? 1 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="absolute"
        >
          <Moon className="w-4 h-4 fill-current" />
        </motion.span>
        <motion.span
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 120 : 0,
            scale: isDark ? 0.4 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="absolute"
        >
          <Sun className="w-4 h-4 fill-current" />
        </motion.span>
      </span>
    </motion.button>
  );
}

export default ThemeToggle;
