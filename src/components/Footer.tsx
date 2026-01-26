import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            <span>© {currentYear} Vivek Chaurasiya. Built with</span>
            <Heart className="w-4 h-4 text-secondary fill-current" />
            <span>and lots of coffee.</span>
          </motion.div>

          {/* Center - Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xl"
          >
            <span className="text-primary">&lt;/&gt;</span>{' '}
            <span className="text-foreground">vivek</span>
            <span className="text-muted-foreground">.dev</span>
          </motion.div>

          {/* Right - Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/VivekChaurasiya95"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-chaurasiya-722037315"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://leetcode.com/u/Vivek-Chaurasiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LeetCode"
            >
              <Code2 className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
