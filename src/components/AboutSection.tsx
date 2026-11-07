import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="pt-12 sm:pt-14 md:pt-16 pb-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading mb-6 sm:mb-8 flex flex-col leading-[0.88] sm:leading-[0.90]">
              <span className="text-primary">Who is behind the</span>
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
            <div className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
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
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Computer Science & Design</p>
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
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Expected Graduation</p>
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
                  <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground mt-1 transition-colors group-hover:text-foreground leading-tight">Current CGPA</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
