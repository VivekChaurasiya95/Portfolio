import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, Sparkles } from "lucide-react";
import Spline from "@splinetool/react-spline";
import StatusWidget from "./StatusWidget";
import FreelanceWidget from "./FreelanceWidget";

import githubIcon from "@/assets/icons/github.png";
import linkedinIcon from "@/assets/icons/linkedin.png";
import xTwitterIcon from "@/assets/icons/x-twitter.png";
import leetcodeIcon from "@/assets/icons/leetcode.png";
import instagramIcon from "@/assets/icons/instagram.png";
import { EMAIL_ADDRESS, SOCIAL_LINKS } from "@/data/siteLinks";

const socialLinks = [
  { icon: githubIcon, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: linkedinIcon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: xTwitterIcon, href: SOCIAL_LINKS.twitter, label: "X" },
  { icon: leetcodeIcon, href: SOCIAL_LINKS.leetcode, label: "LeetCode" },
  { icon: instagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center relative"
          >
            <div 
              className="w-72 h-72 md:w-[350px] md:h-[350px] z-10 mt-[-20px] mb-8 relative overflow-hidden" 
              style={{ filter: "hue-rotate(-100deg) saturate(1.2)" }}
            >
              {/* Scale and translate to push the bottom-right watermark out of bounds */}
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
                  className="group relative w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300"
                  whileHover={{ scale: 1.3 }}
                  aria-label={link.label}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-9 h-9 rounded-lg object-cover"
                    style={
                      link.label === "GitHub"
                        ? { filter: "invert(1)" }
                        : undefined
                    }
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-3 text-center"
        >
          <div className="flex items-center gap-2 font-display text-lg tracking-wide">
            <span className="text-primary font-bold text-xl">&lt;/&gt;</span>
            <span className="text-muted-foreground">Developed by</span>
            <span className="font-semibold text-foreground italic">
              Vivek Chaurasiya
            </span>
          </div>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            © {currentYear} All Rights Reserved
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
