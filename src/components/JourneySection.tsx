import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Rocket, GraduationCap, Code, Brain, Briefcase, Sparkles } from 'lucide-react';

// Milestones in chronological order (will be displayed reversed - current at top)
const milestones = [
  {
    year: '2025',
    title: 'Full-Stack & AI Projects',
    description: 'Built HSER – Human Skill Extinction Radar and Student Saarthi – AI Based Scholarship Portal. Earned certifications from IBM, Google Cloud, and Udemy.',
    tags: ['React', 'FastAPI', 'Flask', 'OpenAI'],
    type: 'Current',
    icon: Sparkles,
  },
  {
    year: '2024',
    title: 'B.Tech Begins at MITS-DU',
    description: 'Started B.Tech in Computer Science and Design at Madhav Institute of Technology and Science (Deemed University), Gwalior. CGPA: 8.38/10.',
    tags: ['B.Tech CS&D', 'MITS Gwalior', '2024-2028'],
    type: 'Education',
    icon: GraduationCap,
  },
  {
    year: '2023',
    title: 'Deep Dive into DSA & Development',
    description: 'Strengthened problem-solving skills with Data Structures & Algorithms. Started exploring web development frameworks and system design concepts.',
    tags: ['DSA', 'System Design', 'OOPS'],
    type: 'Achievement',
    icon: Brain,
  },
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started coding journey with Python and C/C++. Explored programming fundamentals, built small projects, and discovered the passion for software development.',
    tags: ['Python', 'C', 'C++', 'Git'],
    type: 'Education',
    icon: Code,
  },
];

// Professional spacecraft component
const Spacecraft = ({ progress }: { progress: MotionValue<number> }) => {
  const yPercent = useTransform(progress, [0, 1], [0, 100]);
  
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{ 
        top: useTransform(yPercent, (v) => `calc(${v}% - 28px)`),
      }}
    >
      {/* Outer glow */}
      <motion.div 
        className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main spacecraft */}
      <motion.div 
        className="relative"
        animate={{ 
          y: [0, -4, 0, 4, 0],
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Spacecraft body - sleek diamond shape */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Diamond shape container */}
          <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-br from-primary via-primary/80 to-secondary shadow-lg border border-primary/50" />
          
          {/* Inner glow */}
          <div className="absolute inset-1 rotate-45 rounded-md bg-gradient-to-br from-primary/60 to-transparent" />
          
          {/* Center icon */}
          <Rocket className="w-5 h-5 text-primary-foreground relative z-10" />
          
          {/* Trailing particles - going downward */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1"
            animate={{ 
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ 
              duration: 0.3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-primary/80 to-transparent rounded-full" />
          </motion.div>
        </div>
        
        {/* Energy particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: -20 - i * 8 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.3],
              y: [0, 15],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Progress for spacecraft - constrained to timeline area
  const spacecraftProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="journey" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 mb-6"
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">My Journey</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Development</span>{' '}
            <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A chronological voyage through my coding odyssey — <span className="text-primary font-medium">B.Tech CSE (2024-2028)</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Enhanced central line with strong glow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/60 rounded-full" />
            {/* Glow layer 1 */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 via-primary/70 to-primary/40 rounded-full blur-sm" />
            {/* Glow layer 2 */}
            <div className="absolute -inset-2 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/20 rounded-full blur-md" />
            {/* Intense glow layer */}
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-primary/30 to-transparent rounded-full blur-xl" />
            
            {/* Animated pulse effect */}
            <motion.div 
              className="absolute -inset-6 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/20 rounded-full blur-2xl"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Spacecraft that follows scroll */}
          <Spacecraft progress={spacecraftProgress} />

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-20 last:mb-0 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px -20px hsl(var(--primary) / 0.4)' }}
                    className="glass-card rounded-xl p-6 inline-block border-primary/30 hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Year badge - cuboid style */}
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-lg transform translate-x-1 translate-y-1" />
                        <motion.span 
                          className="relative block px-4 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-2xl rounded-lg shadow-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          {milestone.year}
                        </motion.span>
                      </div>
                    </div>

                    {/* Type badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs uppercase tracking-wider font-semibold ${
                      milestone.type === 'Education' ? 'bg-secondary/20 text-secondary border border-secondary/30' : 
                      milestone.type === 'Current' ? 'bg-primary/20 text-primary border border-primary/30' : 
                      'bg-accent/50 text-accent-foreground border border-accent-foreground/20'
                    }`}>
                      <Icon className="w-3 h-3" />
                      {milestone.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mt-3 mb-3 tracking-tight">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      {milestone.tags.map((tag) => (
                        <motion.span 
                          key={tag} 
                          className="skill-badge text-xs font-medium"
                          whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center connector node with enhanced glow */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="relative"
                  >
                    {/* Outer glow rings */}
                    <div className="absolute -inset-6 rounded-full bg-primary/20 blur-xl animate-pulse" />
                    <div className="absolute -inset-4 rounded-full bg-primary/30 blur-lg" />
                    <div className="absolute -inset-2 rounded-full bg-primary/40 blur-md" />
                    
                    {/* Main connector - cuboid style */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/50 rounded-lg transform translate-x-0.5 translate-y-0.5" />
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary via-primary to-secondary border-2 border-background shadow-lg shadow-primary/60 flex items-center justify-center">
                        <Icon className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}

          {/* Timeline end marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0"
          >
            <div className="w-4 h-4 rounded-full bg-primary/50 blur-sm" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
