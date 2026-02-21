import { motion } from 'framer-motion';

import githubIcon from '@/assets/icons/github.png';
import linkedinIcon from '@/assets/icons/linkedin.png';
import xTwitterIcon from '@/assets/icons/x-twitter.png';
import leetcodeIcon from '@/assets/icons/leetcode.png';
import instagramIcon from '@/assets/icons/instagram.png';
import emailIcon from '@/assets/icons/email.png';

const socialLinks = [
  { icon: githubIcon, href: 'https://github.com/VivekChaurasiya95', label: 'GitHub' },
  { icon: linkedinIcon, href: 'https://www.linkedin.com/in/vivek-chaurasiya-722037315', label: 'LinkedIn' },
  { icon: xTwitterIcon, href: 'https://x.com/Vivek9589', label: 'X' },
  { icon: leetcodeIcon, href: 'https://leetcode.com/u/Vivek-Chaurasiya/', label: 'LeetCode' },
  { icon: instagramIcon, href: 'https://www.instagram.com/v.i.v.e.k_chaurasiya/', label: 'Instagram' },
  { icon: emailIcon, href: 'mailto:vivekchaurasiya@gmail.com', label: 'Email' },
];

const SocialSidebar = () => {
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 px-4"
    >
      <div className="w-px h-12 bg-border mb-4" />

      <div className="flex flex-col items-center gap-3">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.35 }}
            aria-label={link.label}
          >
            <img src={link.icon} alt={link.label} className="w-8 h-8 rounded-full object-cover" />
          </motion.a>
        ))}
      </div>

      <div className="w-px h-12 bg-border mt-4" />
    </motion.aside>
  );
};

export default SocialSidebar;
