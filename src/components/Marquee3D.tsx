import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

  // Mouse interaction values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Tilted on left side: base rotateY is 25deg (left is further away, right is closer)
  // Mouse movement adds dynamic 3D interaction
  const rotateY = useTransform(springX, [-0.5, 0.5], [15, 35]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    mouseX.set(xPos / rect.width - 0.5);
    mouseY.set(yPos / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-12 py-16 flex items-center justify-center bg-transparent cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="w-full flex items-center justify-center"
        style={{ 
          rotateX, 
          rotateY,
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
              className="pr-12 lg:pr-20 text-4xl md:text-5xl lg:text-7xl font-display font-bold text-secondary/30 tracking-wider select-none hover:text-secondary/60 transition-colors duration-300"
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
