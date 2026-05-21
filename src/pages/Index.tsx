import StarField from "@/components/StarField";
import Navigation from "@/components/Navigation";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplineBackground from "@/components/SplineBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      {/* Background Star Field and Spline Scene tied to the entire page */}
      <div className="fixed inset-0 z-0 bg-background">
        <SplineBackground />
        <div className="absolute inset-0 pointer-events-none mix-blend-screen z-10">
          <StarField />
        </div>
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
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <JourneySection />
          <ContactSection />
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
