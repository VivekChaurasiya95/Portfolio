import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import profileImage from '@/assets/vivek-profile.jpeg';

const AboutSection = () => {
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
              Science student at Madhav Institute of Technology and Science (Deemed University), Gwalior.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              My journey into tech started with curiosity about how things work. Fast forward, and I'm 
              genuinely in love with building intelligent systems — from machine learning models that 
              find patterns in data to web applications that provide seamless user experiences.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              I believe in the intersection of <span className="text-primary">creativity</span> and{' '}
              <span className="text-secondary">logic</span>. Every line of code I write aims to solve 
              real problems while maintaining elegance and efficiency.
            </p>

            <p className="text-foreground italic">
              Currently focused on expanding my expertise in AI/ML engineering while building 
              production-ready applications.
            </p>

            {/* Quick facts - Cuboid style */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-xl transform translate-x-1.5 translate-y-1.5" />
                <div className="relative glass-card rounded-xl p-5 border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent">
                  <span className="text-3xl font-display font-bold text-primary">B.Tech</span>
                  <p className="text-sm text-muted-foreground mt-1">Computer Science</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-xl transform translate-x-1.5 translate-y-1.5" />
                <div className="relative glass-card rounded-xl p-5 border-2 border-secondary/40 bg-gradient-to-br from-secondary/10 to-transparent">
                  <span className="text-3xl font-display font-bold text-secondary tracking-wide" style={{ fontVariantNumeric: 'tabular-nums' }}>2028</span>
                  <p className="text-sm text-muted-foreground mt-1">Expected Graduation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Photo frame */}
              <div className="relative w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-primary/30">
                <img
                  src={profileImage}
                  alt="Vivek Chaurasiya"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-secondary/30 rounded-2xl -z-10" />

              {/* Pronoun badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-secondary/80 backdrop-blur-sm">
                <span className="font-display text-lg italic text-secondary-foreground">He/Him</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
