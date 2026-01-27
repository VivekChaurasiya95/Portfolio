import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

// Custom LeetCode icon component
const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/VivekChaurasiya95', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/Vivek9589', label: 'X' },
  { icon: LeetCodeIcon, href: 'https://leetcode.com/u/Vivek-Chaurasiya/', label: 'LeetCode' },
  { icon: Instagram, href: 'https://www.instagram.com/v.i.v.e.k_chaurasiya/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:vivekchaurasiya@gmail.com', label: 'Email' },
];

const SocialSidebar = () => {
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 px-4"
    >
      {/* Vertical line at top */}
      <div className="w-px h-12 bg-border mb-4" />

      {/* Social icons */}
      <div className="flex flex-col items-center gap-2">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
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

      {/* Vertical line at bottom */}
      <div className="w-px h-12 bg-border mt-4" />
    </motion.aside>
  );
};

export default SocialSidebar;
