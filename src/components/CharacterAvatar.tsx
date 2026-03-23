import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import characterImg from '@/assets/avatar-character.png';

const CharacterAvatar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    // Intro animation delay
    const timer = setTimeout(() => setIsVisible(true), 300);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-y-0 right-0 h-screen w-full md:w-[60vw] lg:w-[50vw] xl:w-[45vw] max-w-[900px] pointer-events-none z-0 flex items-center justify-center"
    >
      {/* Ambient glow behind character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary glow - accent color */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isVisible ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 60%)',
          filter: 'blur(50px)',
          x: translateX,
          y: translateY,
        }}
      />

      {/* Character image with all animations */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative pointer-events-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
      >
        {/* Floating animation wrapper */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Rim light / outline glow */}
          <motion.div
            className="absolute -inset-3 rounded-full opacity-0"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Character image */}
          <motion.img
            src={characterImg}
            alt="Vivek Chaurasiya - 3D Avatar"
            className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] object-contain select-none"
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 30px hsl(var(--primary) / 0.5)) drop-shadow(0 0 60px hsl(var(--primary) / 0.2))'
                : 'drop-shadow(0 0 15px hsl(var(--primary) / 0.2)) drop-shadow(0 0 40px rgba(0,0,0,0.3))',
            }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            draggable={false}
          />

          {/* Bottom reflection/shadow */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-6 rounded-full"
            animate={{
              opacity: isHovered ? 0.4 : 0.2,
              scaleX: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles around character */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          initial={{ opacity: 0 }}
          animate={isVisible ? {
            opacity: [0, 0.6, 0],
            y: [0, -40, -80],
            x: [0, (i % 2 === 0 ? 20 : -20), (i % 2 === 0 ? 10 : -10)],
          } : {}}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
          style={{
            left: `${35 + i * 6}%`,
            top: `${50 + (i % 3) * 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default CharacterAvatar;
