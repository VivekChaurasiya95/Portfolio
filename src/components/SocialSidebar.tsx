import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Code2 } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/VivekChaurasiya95', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', label: 'LinkedIn' },
  { 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), 
    href: 'https://x.com/Vivek9589', 
    label: 'X' 
  },
  { icon: Code2, href: 'https://leetcode.com/u/Vivek-Chaurasiya/', label: 'LeetCode' },
  { icon: Instagram, href: 'https://www.instagram.com/v.i.v.e.k_chaurasiya/', label: 'Instagram' },
];

const SocialSidebar = () => {
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 px-4"
    >
      {/* Email rotated - readable from right side */}
      <div className="mb-6">
        <a 
          href="mailto:vivekchaurasiya@gmail.com"
          className="text-xs text-muted-foreground tracking-widest font-light hover:text-primary transition-colors"
          style={{ writingMode: 'vertical-rl' }}
        >
          vivekchaurasiya@gmail.com
        </a>
      </div>

      {/* Vertical line */}
      <div className="w-px h-12 bg-border mb-4" />

      {/* Social icons */}
      <div className="flex flex-col items-center gap-2">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
    </motion.aside>
  );
};

export default SocialSidebar;
