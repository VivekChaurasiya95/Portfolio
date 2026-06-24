import React from 'react';
import { motion } from 'framer-motion';

const qualities = [
  "Mentorship",
  "Leadership",
  "Open Source",
  "Problem Solving",
  "Full Stack",
  "AI Enthusiast"
];

const Marquee3D = () => {
  // Duplicate array multiple times for seamless infinite scroll
  const items = [...qualities, ...qualities, ...qualities, ...qualities];

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-12 py-10 flex items-center justify-center bg-transparent pointer-events-none"
         style={{ perspective: "1000px" }}>
      <motion.div 
        className="w-full flex items-center justify-center"
        initial={{ rotateX: 20, rotateZ: -3 }}
        animate={{ rotateX: 20, rotateZ: -3 }}
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          className="flex gap-12 lg:gap-16 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {items.map((item, index) => (
            <span 
              key={index} 
              className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-foreground/20 tracking-wider select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              style={{ transform: "translateZ(0)" }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Marquee3D;
