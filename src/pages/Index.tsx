import StarField from "@/components/StarField";
import RotatingEarth from "@/components/RotatingEarth";
import Navigation from "@/components/Navigation";
import SocialSidebar from "@/components/SocialSidebar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import AboutSection from "@/components/AboutSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background star field */}
      <StarField />

      {/* Rotating 3D Earth */}
      <RotatingEarth />

      {/* Navigation */}
      <Navigation />

      {/* Left social sidebar */}
      <SocialSidebar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <JourneySection />
        <CertificationsSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
