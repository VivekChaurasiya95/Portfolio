import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, Sparkles, ChevronUp } from "lucide-react";
import Spline from "@splinetool/react-spline";
import StatusWidget from "./StatusWidget";
import FreelanceWidget from "./FreelanceWidget";

import githubIcon from "@/assets/icons/github.png";
import linkedinIcon from "@/assets/icons/linkedin.png";
import xTwitterIcon from "@/assets/icons/x-twitter.png";
import leetcodeIcon from "@/assets/icons/leetcode.svg";
import instagramIcon from "@/assets/icons/instagram.png";
import { EMAIL_ADDRESS, SOCIAL_LINKS } from "@/data/siteLinks";

const socialLinks = [
  { icon: githubIcon, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: linkedinIcon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: xTwitterIcon, href: SOCIAL_LINKS.twitter, label: "X" },
  { icon: leetcodeIcon, href: SOCIAL_LINKS.leetcode, label: "LeetCode" },
  { icon: instagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [splineInView, setSplineInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSplineInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);

    const removeSplineLogo = () => {
      const selectors = [
        '#spline-watermark',
        '#logo',
        '#spline-logo',
        'a[href*="spline.design"]',
        'a[href*="spline"]',
        '[class*="watermark"]',
        '[class*="spline-watermark"]',
      ];

      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.display = 'none';
          el.remove();
        });
      });

      document.querySelectorAll('*').forEach((el) => {
        if (el.shadowRoot) {
          selectors.forEach((sel) => {
            el.shadowRoot?.querySelectorAll(sel).forEach((shadowEl) => {
              (shadowEl as HTMLElement).style.display = 'none';
              shadowEl.remove();
            });
          });
        }
      });
    };

    removeSplineLogo();
    const interval = setInterval(removeSplineLogo, 100);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark") : true;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer ref={footerRef} className="relative z-10 py-12 sm:py-16 border-t border-border/30 bg-gradient-to-t from-background to-card/20 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left flex justify-start w-full"
          >
            <StatusWidget />
          </motion.div>

          {/* Center - Robot 3D + Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center relative"
          >
            {/* Robot 3D Viewport - well framed so head is never cut off */}
            <div
              className="w-[280px] h-[300px] xs:w-[320px] xs:h-[340px] md:w-[360px] md:h-[360px] max-w-full z-10 mb-6 sm:mb-8 relative overflow-hidden transition-all duration-500 rounded-2xl"
              style={{ filter: isDark ? "hue-rotate(-100deg) saturate(1.2)" : "hue-rotate(-100deg) saturate(1.2) brightness(2.5) contrast(0.8)" }}
            >
              {/* Spline canvas positioned so bottom watermark is pushed below overflow-hidden boundary */}
              <div className="absolute inset-x-0 top-0 bottom-[-75px] scale-[1.0] md:scale-[1.05] flex items-center justify-center">
                {splineInView ? (
                  <Spline
                    scene="https://prod.spline.design/GgRpDTredFwgbV5A/scene.splinecode"
                    className="w-full h-full pointer-events-none md:pointer-events-auto"
                    onLoad={() => {
                      const selectors = ['#spline-watermark', '#logo', '#spline-logo', 'a[href*="spline.design"]'];
                      selectors.forEach((sel) => {
                        document.querySelectorAll(sel).forEach((el) => el.remove());
                      });
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin opacity-40" />
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-[0.3em] mb-4 sm:mb-6 font-sans relative z-20">
              Connect
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-full">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 bg-background/50 border border-border/50 shadow-sm dark:shadow-none hover:shadow-md dark:bg-transparent dark:border-transparent min-w-[44px] min-h-[44px]"
                  whileHover={{ scale: 1.15 }}
                  aria-label={link.label}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    width={36}
                    height={36}
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg object-cover transition-transform ${
                      link.label === "GitHub" ? "dark:invert" : ""
                    } ${link.label === "LeetCode" ? "dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" : ""}`}
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Freelancing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end w-full"
          >
            <FreelanceWidget />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6 sm:mb-8" />

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 sm:gap-6">
          <div className="hidden md:block"></div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <div className="flex items-center gap-2 font-sans text-sm sm:text-base tracking-normal">
              <img
                src="/favicon.jpg"
                alt="Vivek portfolio logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-cover"
              />
              <span className="text-muted-foreground font-normal">Developed by</span>
              <span className="font-bold text-white">
                Vivek Chaurasiya
              </span>
            </div>
            <span className="text-muted-foreground font-sans text-[10px] sm:text-xs tracking-widest uppercase">
              © {currentYear} ALL RIGHTS RESERVED
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="min-h-[44px] min-w-[44px] p-2.5 sm:p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm border border-primary/20 flex items-center justify-center gap-2"
              aria-label="Back to top"
            >
              <span className="text-xs sm:text-sm font-medium hidden md:block">Back to top</span>
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
