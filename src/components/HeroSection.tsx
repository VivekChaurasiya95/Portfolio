import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Github } from "lucide-react";
import IsometricButton from "./IsometricButton";
import { RESUME_URL, SOCIAL_LINKS } from "@/data/siteLinks";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-6 lg:px-20 pointer-events-none relative z-10">
        <div className="max-w-5xl pointer-events-auto">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            {["Developer", "Data Science Enthusiast", "AI/ML Engineer"].map(
              (role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="relative"
                >
                  <span
                    className={`
                  text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold
                  ${i === 0 ? "text-primary" : i === 1 ? "text-secondary" : "text-accent-foreground"}
                `}
                  >
                    {role}
                  </span>
                  {i < 2 && (
                    <span className="ml-3 text-muted-foreground/40 text-xs font-light">
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
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] tracking-[-0.02em] mb-10"
          >
            <span className="block italic font-normal text-foreground/90">
              I Build
            </span>
            <span className="block text-gradient font-bold">Between</span>
            <span className="block">
              <span className="text-secondary italic">Creativity</span>
              <span className="text-muted-foreground/60 font-light"> & </span>
              <span className="text-primary">Logic.</span>
            </span>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-primary to-secondary mb-10"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed font-light tracking-wide"
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
            className="flex flex-wrap gap-6"
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

      {/* Scroll indicator - Mouse icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto z-10"
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
