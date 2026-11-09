import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Github } from "lucide-react";
import IsometricButton from "./IsometricButton";
import { RESUME_URL, SOCIAL_LINKS } from "@/data/siteLinks";

import profileImage from "@/assets/vivek-profile-new.png";

const HeroSection = () => {


  // Subtle pointer parallax for the portrait (springs keep the motion smooth).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 20 });
  const portraitX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 pb-16 md:pb-0 overflow-hidden"
      onMouseMove={(e) => {
        pointerX.set(e.clientX / window.innerWidth - 0.5);
        pointerY.set(e.clientY / window.innerHeight - 0.5);
      }}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >


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

      {/* Portrait visual — right side on desktop, stacked below text on mobile */}
      <div className="relative z-0 mt-8 sm:mt-10 md:mt-0 w-full md:w-[46%] lg:w-[46%] flex items-center justify-center md:absolute md:inset-y-0 md:right-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center md:h-full"
        >
          <motion.div style={{ x: portraitX, y: portraitY }} className="relative">

            <img
              src={profileImage}
              alt="Vivek Chaurasiya"
              loading="eager"
              width={600}
              height={700}
              draggable={false}
              className="relative w-full max-w-[20rem] sm:w-96 sm:max-w-none md:w-full md:max-w-[500px] lg:max-w-[600px] xl:max-w-[680px] h-auto object-contain pointer-events-none select-none"
            />
          </motion.div>
        </motion.div>
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
