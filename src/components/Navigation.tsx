import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { SOCIAL_LINKS } from "@/data/siteLinks";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isClickScrolling.current) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 150);
        return;
      }

      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    
    // Immediately set active state for snappy animation
    setActiveSection(sectionId);
    
    // Disable scroll spy temporarily while smooth scrolling
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    // Fallback in case scroll event doesn't fire
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 2000);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
            isScrolled
              ? "bg-card/70 backdrop-blur-xl border border-border/40 shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="flex items-center gap-3 text-foreground font-body text-xl tracking-tight group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/favicon.png"
                alt="VC Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="hidden sm:inline font-extrabold text-2xl tracking-tighter">
              vivek
              <span className="text-primary transition-colors duration-300 group-hover:text-cyan-400">
                .
              </span>
              <span className="font-light text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                dev
              </span>
            </span>
          </a>

          {/* Navigation pills */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5 p-1 rounded-xl bg-muted/40 backdrop-blur-sm border border-border/20">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
                        : "text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                        transition={{
                          type: "tween",
                          ease: "circOut",
                          duration: 0.35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Status badge */}
            <a 
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] cursor-pointer hidden sm:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-semibold text-gradient tracking-wide">
                Open to work
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
