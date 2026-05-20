import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { User } from 'lucide-react';
import profileImage from '@/assets/vivek-profile.jpeg';

const AboutSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

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
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6"
            >
              <User className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">About Me</span>
            </motion.div>
            
            <h2 className="section-heading mb-8">
              <span className="text-secondary italic">Who is</span>{' '}
              <span className="text-foreground">behind the</span>
              <br />
              <span className="text-gradient">terminal?</span>
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hi, I'm <span className="text-foreground font-medium">Vivek Chaurasiya</span> — a Computer 
              Science and Design undergraduate at Madhav Institute of Technology and Science (MITS-DU), Gwalior.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              I have strong foundations in programming and problem solving. Proficient in{' '}
              <span className="text-primary">C++, Python, and JavaScript</span> with growing experience in 
              full-stack web development and software engineering principles.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              I believe in the intersection of <span className="text-primary">creativity</span> and{' '}
              <span className="text-secondary">logic</span>. Passionate about building scalable applications 
              and exploring artificial intelligence and data-driven systems to solve real-world problems.
            </p>

            <p className="text-foreground italic">
              Currently pursuing B.Tech in CS&D (2024–2028) with a CGPA of 8.38/10.
            </p>

            {/* Quick facts - Cuboid style */}
            {/* Quick facts - Cuboid style */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
              <motion.div 
                className="relative group cursor-pointer h-full"
                whileHover="hover"
                initial="initial"
              >
                <motion.div 
                  className="absolute inset-0 bg-primary/30 rounded-xl" 
                  variants={{
                    initial: { x: 4, y: 4 },
                    hover: { x: 6, y: 6 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div 
                  className="relative h-full flex flex-col justify-center glass-card rounded-xl px-4 py-3 lg:px-5 lg:py-3.5 border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-2xl lg:text-3xl font-display font-bold text-primary leading-none">B.Tech</span>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Computer Science & Design</p>
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative group cursor-pointer h-full"
                whileHover="hover"
                initial="initial"
              >
                <motion.div 
                  className="absolute inset-0 bg-secondary/30 rounded-xl" 
                  variants={{
                    initial: { x: 4, y: 4 },
                    hover: { x: 6, y: 6 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div 
                  className="relative h-full flex flex-col justify-center glass-card rounded-xl px-4 py-3 lg:px-5 lg:py-3.5 border-2 border-secondary/40 bg-gradient-to-br from-secondary/10 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-2xl lg:text-3xl font-display font-bold text-secondary tracking-wide transition-colors leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>2024-2028</span>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Expected Graduation</p>
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative group cursor-pointer col-span-2 sm:col-span-1 h-full"
                whileHover="hover"
                initial="initial"
              >
                <motion.div 
                  className="absolute inset-0 bg-foreground/20 rounded-xl" 
                  variants={{
                    initial: { x: 4, y: 4 },
                    hover: { x: 6, y: 6 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div 
                  className="relative h-full flex flex-col justify-center glass-card rounded-xl px-4 py-3 lg:px-5 lg:py-3.5 border-2 border-foreground/30 bg-gradient-to-br from-foreground/5 to-transparent"
                  variants={{
                    initial: { x: 0, y: 0 },
                    hover: { x: -2, y: -2 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-2xl lg:text-3xl font-display font-bold text-foreground tracking-wide transition-colors leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>8.38</span>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Current CGPA</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="relative cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Photo frame */}
              <motion.div 
                className="relative w-72 md:w-80 aspect-[3/4] rounded-2xl glass-card p-3 border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-2xl"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Vivek Chaurasiya"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Decorative element */}
              <motion.div 
                className="absolute -bottom-4 -left-4 w-full h-full border-2 border-secondary/30 rounded-2xl -z-10" 
                style={{ transform: "translateZ(-20px)" }}
              />

              {/* Pronoun badge */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-secondary/80 backdrop-blur-sm shadow-xl"
                style={{ transform: "translateZ(60px) translateX(-50%)", left: "50%" }}
              >
                <span className="font-display text-lg italic text-secondary-foreground pointer-events-none">He/Him</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
