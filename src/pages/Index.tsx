import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { lazy, Suspense, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import CinematicPreloader from "@/components/preloader/CinematicPreloader";
import { motion, AnimatePresence } from "framer-motion";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const { theme, resolvedTheme } = useTheme();
  const [themeMounted, setThemeMounted] = useState(false);

  const [showPreloader, setShowPreloader] = useState(true);
  const [introChecked, setIntroChecked] = useState(false);
  const [introWillPlay, setIntroWillPlay] = useState(false);

  useEffect(() => {
    setThemeMounted(true);
  }, []);

  const isDark = themeMounted ? (resolvedTheme === "dark") : true;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPlayIntro = !reduceMotion;

    setIntroWillPlay(shouldPlayIntro);
    setShowPreloader(shouldPlayIntro);
    setIntroChecked(true);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  if (!introChecked) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      <AnimatePresence>
        {showPreloader && (
          <CinematicPreloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Fade in main content when preloader is done */}
      <motion.div
        initial={{ opacity: showPreloader ? 0 : 1, y: showPreloader ? 28 : 0, filter: showPreloader ? "blur(18px)" : "blur(0px)" }}
        animate={{ opacity: showPreloader ? 0 : 1, y: showPreloader ? 28 : 0, filter: showPreloader ? "blur(18px)" : "blur(0px)" }}
        transition={{ duration: introWillPlay ? 0.95 : 0.01, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Background - Dark: Spline 3D + Stars, Light: clean gradient */}
        <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
          {isDark && <div className="absolute inset-0 bg-background" />}
          {!isDark && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#dde8f0]"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 50%, hsla(185, 50%, 80%, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, hsla(220, 50%, 85%, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at 60% 80%, hsla(350, 40%, 90%, 0.2) 0%, transparent 50%)
                `
              }}
            />
          )}
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Left social sidebar */}
        <SocialSidebar />

        {/* Main content */}
        <main className="relative z-10 w-full overflow-hidden pointer-events-none">
          <HeroSection />
          <div className="pointer-events-auto">
            <TechnologiesSection />
            <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50">Loading section...</div>}>
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <SkillsSection />
              <CertificationsSection />
              <JourneySection />
              <ContactSection />
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <div className="relative z-10 pointer-events-auto">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
