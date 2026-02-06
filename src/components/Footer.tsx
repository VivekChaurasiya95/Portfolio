import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Code2, Briefcase, Mail, ArrowUpRight } from 'lucide-react';

// Custom X (Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  { 
    href: 'https://github.com/VivekChaurasiya95', 
    icon: Github, 
    label: 'GitHub',
    color: '#ffffff'
  },
  { 
    href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', 
    icon: Linkedin, 
    label: 'LinkedIn',
    color: '#0A66C2'
  },
  { 
    href: 'https://x.com/yourhandle', 
    icon: XIcon, 
    label: 'X',
    color: '#ffffff'
  },
  { 
    href: 'https://leetcode.com/u/Vivek-Chaurasiya/', 
    icon: Code2, 
    label: 'LeetCode',
    color: '#FFA116'
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/30 bg-gradient-to-t from-background to-card/20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Main Footer Content */}
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
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
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
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-muted/30 border border-border/50 text-muted-foreground transition-all duration-300 hover:border-primary/50"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: `${link.color}15`,
                    }}
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-foreground" />
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Freelancing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Available for Work</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Freelance Services
            </h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs mx-auto md:ml-auto md:mr-0">
              Open for freelance projects in web development, ML solutions, and full-stack applications.
            </p>
            <motion.a
              href="mailto:vivekchaurasiya@example.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Vivek Chaurasiya.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-secondary fill-current" /> and lots of coffee.
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
