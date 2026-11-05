import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Github } from "lucide-react";
import IsometricButton from "./IsometricButton";
import { RESUME_URL, SOCIAL_LINKS } from "@/data/siteLinks";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SplineBackground = lazy(() => import("@/components/SplineBackground"));

const HeroSection = () => {
  const [showSpline, setShowSpline] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(
      navigator.userAgent,
    );

    if (isBot) return;

    // On mobile devices, use lightweight CSS starfield/ambient lighting for fluid 60fps performance
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const timerId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setShowSpline(true));
      } else {
        setShowSpline(true);
      }
    }, 1500);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background — dark mode: Spline 3D + stars | light mode: gradient orbs */}
      {isDark ? (
        showSpline && (
          <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <div className="absolute inset-0 z-0">
              <SplineBackground />
            </div>
          </Suspense>
        )
      ) : (
        /* Light mode background — beautiful gradient orbs, no Spline */
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50/60" />
          {/* Large soft primary teal orb – right side */}
          <div
            className="absolute rounded-full blur-[130px] opacity-25"
            style={{
              width: "60vw",
              height: "60vw",
              top: "-15%",
              right: "-10%",
              background: "radial-gradient(circle, hsl(185 60% 55%), transparent 70%)",
            }}
          />
          {/* Secondary rose/mauve orb – bottom left */}
          <div
            className="absolute rounded-full blur-[100px] opacity-20"
            style={{
              width: "45vw",
              height: "45vw",
              bottom: "-5%",
              left: "-8%",
              background: "radial-gradient(circle, hsl(350 45% 70%), transparent 70%)",
            }}
          />
          {/* Subtle dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(220 25% 15%) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pointer-events-none relative z-10">
        <div className="max-w-5xl pointer-events-auto">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            {["Developer", "Data Science Enthusiast", "AI/ML Engineer"].map(
              (role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="inline-flex items-center"
                >
                  <span
                    className={`
                  text-[9px] xs:text-[10px] sm:text-xs tracking-wider sm:tracking-[0.22em] uppercase font-semibold
                  ${i === 0 ? "text-primary" : i === 1 ? "text-secondary" : "text-accent-foreground"}
                `}
                  >
                    {role}
                  </span>
                  {i < 2 && (
                    <span className="ml-2 sm:ml-3 text-muted-foreground/40 text-xs font-light">
                      ✦
                    </span>
                  )}
                </motion.span>
              ),
            )}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-medium leading-[1.08] sm:leading-[1.04] tracking-[-0.01em] mb-6 sm:mb-10 text-left"
          >
            <span className="block font-serif italic font-normal text-foreground">
              I Build
            </span>
            <span className="block font-serif font-bold text-gradient">
              Between
            </span>
            <span className="block font-serif mt-1">
              <span className="relative inline-block text-secondary italic font-semibold">
                Creativity
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-secondary pointer-events-none"
                  viewBox="0 0 250 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 3 11 C 35 6, 95 5, 175 7 C 205 8, 230 9, 248 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 16 16 C 55 12, 115 10, 185 12 C 210 13, 230 14, 238 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 32 11 L 16 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-muted-foreground/60 font-light mx-2 sm:mx-3"> & </span>
              <span className="text-primary font-bold">Logic</span>
            </span>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-primary to-secondary mb-6 sm:mb-10"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm xs:text-base md:text-lg text-muted-foreground max-w-xl mb-8 sm:mb-12 leading-relaxed font-light tracking-wide"
          >
            I'm{" "}
            <span className="text-foreground font-medium">
              Vivek Chaurasiya
            </span>
            , a{" "}
            <span className="text-primary font-medium">
              Computer Science & Design
            </span>{" "}
            undergraduate at MITS-DU, Gwalior. Passionate about building
            scalable applications and exploring{" "}
            <span className="text-secondary font-medium">
              AI & data-driven systems
            </span>{" "}
            to solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <IsometricButton href={SOCIAL_LINKS.github} variant="primary">
              <Github className="w-4 h-4" />
              GitHub
            </IsometricButton>
            <IsometricButton
              href={RESUME_URL}
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                window.open(RESUME_URL, "_blank");
              }}
            >
              Check Resume
              <ArrowRight className="w-4 h-4" />
            </IsometricButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 sm:gap-3 pointer-events-auto z-10"
      >
        <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </div>
        <motion.span
          className="text-xs text-muted-foreground tracking-wider uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
