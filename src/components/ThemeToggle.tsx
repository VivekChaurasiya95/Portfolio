import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] text-primary overflow-hidden"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : -30,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 fill-current" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 30 : 0,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-amber-500 fill-current" />
      </motion.div>
    </motion.button>
  );
}
