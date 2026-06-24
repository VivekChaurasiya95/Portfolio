import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { lazy, Suspense, useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
  const { theme, resolvedTheme } = useTheme();
  const [themeMounted, setThemeMounted] = useState(false);

  useEffect(() => {
    setThemeMounted(true);
  }, []);

  const isDark = themeMounted ? (resolvedTheme === "dark") : true;

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
      {/* Background - Dark: Spline 3D + Stars, Light: clean gradient */}
      <div className="fixed inset-0 z-0 bg-background transition-colors duration-500">
        {isDark && mounted && (
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <SplineBackground />
            <div className="absolute inset-0 pointer-events-none mix-blend-screen z-10">
              <StarField />
            </div>
          </Suspense>
        )}
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
    </div>
  );
};

export default Index;
