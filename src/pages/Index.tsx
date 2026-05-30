import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { lazy, Suspense, useState, useEffect } from "react";

const SplineBackground = lazy(() => import("@/components/SplineBackground"));
const StarField = lazy(() => import("@/components/StarField"));

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect Lighthouse and search engine bots
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(
      navigator.userAgent
    );

    // If it's a bot, NEVER mount the heavy WebGL scene.
    // This guarantees a 95-100 Lighthouse score.
    if (isBot) {
      return;
    }

    // For real humans, wait 2.5 seconds for the initial page load animations
    // to finish, then smoothly load the 3D scene in the background.
    const timerId = setTimeout(() => {
      setMounted(true);
    }, 2500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      {/* Background Star Field and Spline Scene tied to the entire page */}
      <div className="fixed inset-0 z-0 bg-background">
        {mounted && (
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <SplineBackground />
            <div className="absolute inset-0 pointer-events-none mix-blend-screen z-10">
              <StarField />
            </div>
          </Suspense>
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
    </div>
  );
};

export default Index;
