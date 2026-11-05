import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { User } from 'lucide-react';
import profileImage from '@/assets/vivek-profile-new.png';

const AboutSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    mouseX.set(xPos / width - 0.5);
    mouseY.set(yPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="pt-20 sm:pt-28 md:pt-32 pb-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-6 backdrop-blur-md"
            >
              <User className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono font-medium text-primary uppercase tracking-wider">About Me</span>
            </motion.div>

            <h2 className="section-heading mb-6 sm:mb-8 flex flex-col leading-[0.88] sm:leading-[0.90]">
              <span className="text-foreground">Who is behind the</span>
              <span className="text-secondary mt-0.5 sm:mt-1">terminal ?</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
              Hi, I'm <span className="text-foreground font-medium">Vivek Chaurasiya</span> — a Computer
              Science and Design undergraduate at Madhav Institute of Technology and Science (MITS-DU), Gwalior.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
              I have strong foundations in programming and problem solving. Proficient in{' '}
              <span className="text-primary font-medium">C++, Python, and JavaScript</span> with growing experience in
              full-stack web development and software engineering principles.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
              I believe in the intersection of <span className="text-primary font-medium">creativity</span> and{' '}
              <span className="text-secondary font-medium">logic</span>. Passionate about building scalable applications
              and exploring artificial intelligence and data-driven systems to solve real-world problems.
            </p>

            {/* Quick facts - 3D Rectangle style */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
              <motion.div
                className="relative group cursor-pointer"
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/30 rounded-xl"
                  variants={{
                    initial: { x: 3, y: 3 },
                    hover: { x: 5, y: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div
                  className="relative flex flex-col justify-center glass-card rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-base sm:text-xl lg:text-2xl font-meridian font-bold text-primary leading-none whitespace-nowrap">B.Tech</span>
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight truncate">Computer Science & Design</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative group cursor-pointer"
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 bg-secondary/30 rounded-xl"
                  variants={{
                    initial: { x: 3, y: 3 },
                    hover: { x: 5, y: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div
                  className="relative flex flex-col justify-center glass-card rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 border-2 border-secondary/40 bg-gradient-to-br from-secondary/10 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-base sm:text-xl lg:text-2xl font-meridian font-bold text-secondary tracking-normal transition-colors leading-none whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>2024-2028</span>
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight whitespace-nowrap">Expected Graduation</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative group cursor-pointer"
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 bg-foreground/20 rounded-xl"
                  variants={{
                    initial: { x: 3, y: 3 },
                    hover: { x: 5, y: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div
                  className="relative flex flex-col justify-center glass-card rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 border-2 border-foreground/30 bg-gradient-to-br from-foreground/5 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-base sm:text-xl lg:text-2xl font-meridian font-bold text-foreground tracking-normal transition-colors leading-none whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>8.38</span>
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight whitespace-nowrap">Current CGPA</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo with edge glow and floating animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end mt-4 lg:mt-0"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient Backlight Aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/40 blur-[80px]"
              />
            </div>

            <motion.div
              className="relative cursor-pointer max-w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Photo container with responsive max-width to prevent overflow */}
              <motion.div
                className="relative w-full max-w-[240px] xs:max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-[32rem] xl:max-w-[36rem] flex items-center justify-center mx-auto"
                style={{
                  transform: "translateZ(30px)",
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Vivek Chaurasiya"
                  loading="lazy"
                  width={600}
                  height={700}
                  className="w-full h-auto object-contain pointer-events-none transition-all duration-500"
                  style={{
                    filter: "drop-shadow(0 0 14px hsl(var(--primary) / 0.45)) drop-shadow(0 0 32px hsl(var(--primary) / 0.25)) drop-shadow(0 20px 45px rgba(0,0,0,0.65))",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
