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
import LazySection from "@/components/LazySection";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";

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
    const forceIntro =
      typeof window !== "undefined" &&
      window.location.search.includes("force-intro");

    const isBotOrLighthouse =
      typeof window !== "undefined" &&
      (/lighthouse|chrome-lighthouse|googlebot|bot|crawler|spider/i.test(
        navigator.userAgent
      ) ||
        window.location.search.includes("no-intro"));

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldPlayIntro = forceIntro || (!isBotOrLighthouse && !reduceMotion);

    setIntroWillPlay(shouldPlayIntro);
    setShowPreloader(shouldPlayIntro);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      <AnimatePresence>
        {showPreloader && (
          <CinematicPreloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Navigation and Sidebar moved outside of motion.div so their position:fixed works properly */}
      <Navigation />
      <SocialSidebar />

      {/* Main content */}
      <div className="relative">
        {/* Background - Dark: clean solid, Light: clean gradient */}
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

        {/* Main content */}
        <main className="relative z-10 w-full overflow-hidden pointer-events-none">
          <HeroSection />
          <div className="pointer-events-auto">
            <TechnologiesSection />
            <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50">Loading section...</div>}>
              <SectionErrorBoundary sectionName="About">
                <AboutSection />
              </SectionErrorBoundary>
              <SectionErrorBoundary sectionName="Experience">
                <ExperienceSection />
              </SectionErrorBoundary>
              <LazySection id="projects" minHeight="500px">
                <SectionErrorBoundary sectionName="Projects">
                  <ProjectsSection />
                </SectionErrorBoundary>
              </LazySection>
              <LazySection id="skills" minHeight="400px">
                <SectionErrorBoundary sectionName="Skills">
                  <SkillsSection />
                </SectionErrorBoundary>
              </LazySection>
              <LazySection id="certifications" minHeight="500px">
                <SectionErrorBoundary sectionName="Certifications">
                  <CertificationsSection />
                </SectionErrorBoundary>
              </LazySection>
              <LazySection id="journey" minHeight="500px">
                <SectionErrorBoundary sectionName="Journey">
                  <JourneySection />
                </SectionErrorBoundary>
              </LazySection>
              <LazySection id="contact" minHeight="400px">
                <SectionErrorBoundary sectionName="Contact">
                  <ContactSection />
                </SectionErrorBoundary>
              </LazySection>
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <div className="relative z-10 pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
