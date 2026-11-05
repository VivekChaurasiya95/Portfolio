import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 sm:p-10 max-w-md w-full text-center border border-border/50 shadow-2xl relative z-10"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
          <Compass className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-meridian font-extrabold text-foreground mb-3 tracking-tight">
          404
        </h1>

        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          Lost in Cyberspace
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground mb-8 leading-relaxed">
          The page or route you are looking for does not exist or has voyaged into another dimension.
        </p>

        <Link
          to="/"
          className="btn-primary inline-flex items-center justify-center gap-2 w-full min-h-[44px] text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          <span>Return to Safety</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
