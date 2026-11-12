import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { EMAIL_ADDRESS, SOCIAL_LINKS } from "@/data/siteLinks";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu on Escape key press or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    
    // Immediately set active state for snappy animation
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    
    // Disable scroll spy temporarily while smooth scrolling
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 2000);
    
    // Trigger lazy section loading if needed
    window.dispatchEvent(new CustomEvent("load-section", { detail: sectionId }));

    const element =
      document.getElementById(sectionId) ||
      document.getElementById(`${sectionId}-container`);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-1.5 sm:py-2"
      ref={menuRef}
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl px-2.5 xs:px-3.5 sm:px-6 py-2 sm:py-2.5 transition-all duration-500 bg-card/75 dark:bg-[#08080a]/80 backdrop-blur-xl border border-border/40 shadow-lg">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 text-foreground font-body text-xl tracking-tight group"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/favicon.png"
                alt="VC Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tighter">
              vivek
              <span className="text-primary transition-colors duration-300 group-hover:text-cyan-400">
                .
              </span>
              <span className="font-light text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                dev
              </span>
            </span>
          </a>

          {/* Desktop Navigation — plain text links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm font-sans font-medium tracking-wide ${
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status badge - Desktop */}
            <a 
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] cursor-pointer hidden lg:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide">
                Open to work
              </span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="relative lg:hidden flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-primary transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden mt-2 rounded-2xl bg-card/95 dark:bg-[#0a0c10]/95 backdrop-blur-2xl border border-border/50 shadow-2xl p-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto py-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-sans font-medium transition-all duration-200 active:scale-[0.98] ${
                        isActive
                          ? "bg-primary/15 text-primary font-semibold border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
                          : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/40"}`} />
                        {item.label}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground/40"}`} />
                    </a>
                  );
                })}
              </nav>

              {/* Mobile menu footer with status & quick links */}
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span>Open to work</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted/40 hover:bg-primary/15 hover:text-primary transition-colors text-muted-foreground"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted/40 hover:bg-primary/15 hover:text-primary transition-colors text-muted-foreground"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="p-2 rounded-lg bg-muted/40 hover:bg-primary/15 hover:text-primary transition-colors text-muted-foreground"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navigation;
