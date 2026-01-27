import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Github } from 'lucide-react';
import IsometricButton from './IsometricButton';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-5xl">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-xs md:text-sm mb-8 tracking-[0.3em] uppercase font-light"
          >
            Developer • Data Science Enthusiast • AI/ML Engineer
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] tracking-[-0.02em] mb-10"
          >
            <span className="block italic font-normal text-foreground/90">I Build</span>
            <span className="block text-gradient font-bold">
              Between
            </span>
            <span className="block">
              <span className="text-secondary italic">Creativity</span>
              <span className="text-muted-foreground/60 font-light"> & </span>
              <span className="text-primary">Logic.</span>
            </span>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-primary to-secondary mb-10"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed font-light tracking-wide"
          >
            I'm <span className="text-foreground font-medium">Vivek Chaurasiya</span>, a{' '}
            <span className="text-primary font-medium">Computer Science</span> student passionate about 
            building intelligent systems that bridge{' '}
            <span className="text-secondary font-medium">machine learning</span> with elegant user experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            <IsometricButton
              href="https://github.com/yourusername"
              variant="primary"
            >
              <Github className="w-4 h-4" />
              GitHub
            </IsometricButton>
            <IsometricButton
              href="#contact"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Check Resume
              <ArrowRight className="w-4 h-4" />
            </IsometricButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
