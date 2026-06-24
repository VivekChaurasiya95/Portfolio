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
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark") : true;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-10 py-16 border-t border-border/30 bg-gradient-to-t from-background to-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
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
            <div
              className="w-72 h-72 md:w-[350px] md:h-[350px] z-10 mt-[-20px] mb-8 relative overflow-hidden transition-all duration-500"
              style={{ filter: isDark ? "hue-rotate(-100deg) saturate(1.2)" : "hue-rotate(-100deg) saturate(1.2) brightness(2.5) contrast(0.8)" }}
            >
              <div className="absolute inset-0 scale-[1.2] translate-y-4 md:translate-y-6">
                <Spline scene="https://prod.spline.design/GgRpDTredFwgbV5A/scene.splinecode" className="w-full h-full" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-[0.3em] mb-6 font-display relative z-20">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 bg-background/50 border border-border/50 shadow-sm dark:shadow-none hover:shadow-md dark:bg-transparent dark:border-transparent"
                  whileHover={{ scale: 1.15 }}
                  aria-label={link.label}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className={`w-9 h-9 rounded-lg object-cover transition-transform ${
                      link.label === "GitHub" ? "dark:invert" : ""
                    } ${link.label === "LeetCode" ? "dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" : ""}`}
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
            className="flex flex-col items-center md:items-end w-full"
          >
            <FreelanceWidget />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="hidden md:block"></div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-3 text-center"
          >
            <div className="flex items-center gap-2 font-display text-lg tracking-wide">
              <img
                src="/favicon.jpg"
                alt="Vivek portfolio logo"
                className="w-6 h-6 rounded-sm object-cover"
              />
              <span className="text-muted-foreground">Developed by</span>
              <span className="font-semibold text-foreground italic">
                Vivek Chaurasiya
              </span>
            </div>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              © {currentYear} All Rights Reserved
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
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm border border-primary/20 flex items-center gap-2"
              aria-label="Back to top"
            >
              <span className="text-sm font-medium hidden md:block">Back to top</span>
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
