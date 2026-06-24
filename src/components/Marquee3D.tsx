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
    <div 
      className="relative w-full max-w-[90vw] md:max-w-md lg:max-w-lg mx-auto overflow-hidden mt-6 md:mt-10 py-4 flex items-center justify-center" 
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
      }}
    >
      <motion.div
        className="flex gap-8 lg:gap-12 whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {items.map((item, index) => (
          <span 
            key={index} 
            className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground/90 tracking-wide select-none"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee3D;
