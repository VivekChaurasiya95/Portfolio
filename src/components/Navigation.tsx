import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// Animated mascot component - cute space alien
const NavMascot = () => (
  <motion.div
    layoutId="nav-mascot"
    className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
    transition={{ 
      type: "tween",
      duration: 0.15,
      ease: "easeOut"
    }}
  >
    <motion.div 
      className="relative"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 w-10 h-10 rounded-full bg-primary/30 blur-md" />
      
      {/* Main body - rounded alien head */}
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg border-2 border-primary/50">
        {/* Eyes container */}
        <div className="flex gap-2 -mt-0.5">
          {/* Left eye */}
          <motion.div 
            className="w-2.5 h-3 rounded-full bg-background flex items-center justify-center"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-0.5" />
          </motion.div>
          {/* Right eye */}
          <motion.div 
            className="w-2.5 h-3 rounded-full bg-background flex items-center justify-center"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-0.5" />
          </motion.div>
        </div>
      </div>
      
      {/* Antenna */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-primary/70 rounded-full">
        <motion.div 
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
      
      {/* Pointer/connector to nav */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary" />
    </motion.div>
  </motion.div>
);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleClick(e, '#home')}
          className="flex items-center gap-2 text-foreground font-display text-xl tracking-tight"
        >
          <span className="text-primary">&lt;/&gt;</span>
          <span className="hidden sm:inline">vivek<span className="text-muted-foreground">.dev</span></span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`nav-link relative ${isActive ? 'active' : ''}`}
                >
                  {isActive && <NavMascot />}
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">Open to work</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
