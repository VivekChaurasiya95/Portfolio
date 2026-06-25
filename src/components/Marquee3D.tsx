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
  // Duplicate array 4 times to ensure seamless infinite scroll at 50% translation
  const items = [...qualities, ...qualities, ...qualities, ...qualities];

  return (
    <div 
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-4 py-6 flex items-center justify-center backdrop-blur-md bg-background/40"
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        className="w-full flex items-center justify-center"
        style={{ 
          rotateX: 0, 
          rotateY: 25,
          rotateZ: -1, // slight angle for dynamic feel
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {items.map((item, index) => (
            <span 
              key={index} 
              className="pr-12 lg:pr-20 text-3xl md:text-4xl lg:text-6xl font-display font-bold text-secondary/30 tracking-wider select-none hover:text-secondary/60 transition-colors duration-300"
              style={{ 
                transform: "translateZ(0)",
                textShadow: "0 0 20px rgba(157,42,44,0.15)"
              }}
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
