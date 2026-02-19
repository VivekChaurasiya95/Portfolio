import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram, Briefcase, Mail, ArrowUpRight } from 'lucide-react';

// Custom X (Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Custom LeetCode icon
const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
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
    href: 'https://x.com/Vivek9589', 
    icon: XIcon, 
    label: 'X',
    color: '#ffffff'
  },
  { 
    href: 'https://leetcode.com/u/Vivek-Chaurasiya/', 
    icon: LeetCodeIcon, 
    label: 'LeetCode',
    color: '#FFA116'
  },
  { 
    href: 'https://www.instagram.com/v.i.v.e.k_chaurasiya/', 
    icon: Instagram, 
    label: 'Instagram',
    color: '#E4405F'
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-16 border-t border-border/30 bg-gradient-to-t from-background to-card/20 backdrop-blur-sm">
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
            <span className="flex items-center gap-1.5 font-display">
              <span className="text-primary font-bold">&lt;/&gt;</span> Developed by <span className="font-semibold text-foreground">Vivek Chaurasiya</span>
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
