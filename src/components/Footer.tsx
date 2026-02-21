import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, Sparkles } from 'lucide-react';

import githubIcon from '@/assets/icons/github.png';
import linkedinIcon from '@/assets/icons/linkedin.png';
import xTwitterIcon from '@/assets/icons/x-twitter.png';
import leetcodeIcon from '@/assets/icons/leetcode.png';
import instagramIcon from '@/assets/icons/instagram.png';

const socialLinks = [
  { icon: githubIcon, href: 'https://github.com/VivekChaurasiya95', label: 'GitHub' },
  { icon: linkedinIcon, href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', label: 'LinkedIn' },
  { icon: xTwitterIcon, href: 'https://x.com/Vivek9589', label: 'X' },
  { icon: leetcodeIcon, href: 'https://leetcode.com/u/Vivek-Chaurasiya/', label: 'LeetCode' },
  { icon: instagramIcon, href: 'https://www.instagram.com/v.i.v.e.k_chaurasiya/', label: 'Instagram' },
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
            <div className="font-display text-2xl font-bold mb-4">
              <span className="text-primary">&lt;/&gt;</span>{' '}
              <span className="text-foreground">vivek</span>
              <span className="text-muted-foreground">.dev</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-body">
              Full-Stack Developer & ML Enthusiast crafting digital experiences with code and creativity.
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-[0.3em] mb-6 font-display">
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
                  <img src={link.icon} alt={link.label} className="w-9 h-9 rounded-lg object-cover" />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Freelancing (Stylish) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 mb-4"
              animate={{ boxShadow: ['0 0 10px hsl(var(--primary)/0.2)', '0 0 20px hsl(var(--primary)/0.4)', '0 0 10px hsl(var(--primary)/0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] font-display">Available for Work</span>
            </motion.div>
            <h3 className="text-xl font-bold text-foreground mb-2 font-display tracking-wide">
              Freelance Services
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto md:ml-auto md:mr-0 font-body leading-relaxed">
              Open for freelance projects in web development, ML solutions, and full-stack applications.
            </p>
            <motion.a
              href="mailto:vivekchaurasiya@example.com"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-display"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Briefcase className="w-4 h-4" />
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
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
            <span className="font-semibold text-foreground italic">Vivek Chaurasiya</span>
          </div>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">© {currentYear} All Rights Reserved</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
