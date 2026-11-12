import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { lazy, Suspense, useState, useEffect } from "react";

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

const INTRO_PLAYED_KEY = "portfolio-intro-played";

const hasPlayedIntroThisTab = (): boolean => {
  try {
    return (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(INTRO_PLAYED_KEY) === "1"
    );
  } catch {
    return false;
  }
};

const markIntroPlayed = (): void => {
  try {
    window.sessionStorage.setItem(INTRO_PLAYED_KEY, "1");
  } catch {
    // Storage unavailable (e.g. private mode) — intro just plays again.
  }
};

const Index = () => {

  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.location.search.includes("force-intro")) return true;
    return !hasPlayedIntroThisTab();
  });
  const [introChecked, setIntroChecked] = useState(false);
  const [introWillPlay, setIntroWillPlay] = useState(false);


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

    // Play once per tab: sessionStorage survives refreshes but not new tabs.
    const shouldPlayIntro =
      forceIntro ||
      (!hasPlayedIntroThisTab() && !isBotOrLighthouse && !reduceMotion);

    if (shouldPlayIntro) {
      markIntroPlayed();
    }

    setIntroWillPlay(shouldPlayIntro);
    setShowPreloader(shouldPlayIntro);
  }, []);

  const handlePreloaderComplete = () => {
    markIntroPlayed();
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
        {/* Page backdrop */}
        <div className="fixed inset-0 z-0 bg-background transition-colors duration-500" />

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
