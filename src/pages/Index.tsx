import StarField from '@/components/StarField';
import CharacterAvatar from '@/components/CharacterAvatar';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import JourneySection from '@/components/JourneySection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background star field */}
      <StarField />
      
      {/* 3D Character Avatar */}
      <CharacterAvatar />
      
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
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
