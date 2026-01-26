import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Code2 } from 'lucide-react';

const rotatedLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', text: 'linkedin' },
  { label: 'X', href: 'https://x.com/Vivek9589', text: 'x.com' },
  { label: 'GitHub', href: 'https://github.com/VivekChaurasiya95', text: 'github' },
  { label: 'Email', href: 'mailto:vivekchaurasiya@gmail.com', text: 'vivekchaurasiya@gmail.com' },
];

const iconLinks = [
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
      {/* Social icons at top */}
      <div className="flex flex-col items-center gap-2 mb-4">
        {iconLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>

      {/* Vertical line */}
      <div className="w-px h-8 bg-border mb-4" />

      {/* Rotated links - bottom to top */}
      <div className="flex flex-col items-center gap-4">
        {rotatedLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="text-xs text-muted-foreground tracking-widest font-light hover:text-primary transition-colors"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            aria-label={link.label}
          >
            {link.text}
          </motion.a>
        ))}
      </div>

      {/* Vertical line at bottom */}
      <div className="w-px h-12 bg-border mt-4" />
    </motion.aside>
  );
};

export default SocialSidebar;
