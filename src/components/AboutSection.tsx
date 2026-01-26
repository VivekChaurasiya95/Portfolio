import { motion } from 'framer-motion';
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
            <h2 className="section-heading mb-8">
              <span className="text-secondary italic">Who is</span>{' '}
              <span className="text-foreground">behind the</span>
              <br />
              <span className="text-foreground">terminal?</span>
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

            {/* Quick facts */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="glass-card rounded-lg p-4">
                <span className="text-3xl font-display text-primary">B.Tech</span>
                <p className="text-sm text-muted-foreground mt-1">Computer Science</p>
              </div>
              <div className="glass-card rounded-lg p-4">
                <span className="text-3xl font-display text-secondary">2027</span>
                <p className="text-sm text-muted-foreground mt-1">Expected Graduation</p>
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
