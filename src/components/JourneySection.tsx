import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Rocket } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: 'The Beginning',
    description: 'Started my coding journey with web fundamentals. Built simple static websites and discovered the joy of creating things from scratch.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    type: 'Education',
  },
  {
    year: '2022',
    title: 'Diving into Programming',
    description: 'Learned Python and C++, started solving competitive programming problems. Discovered my passion for algorithms and data structures.',
    tags: ['Python', 'C++', 'DSA'],
    type: 'Achievement',
  },
  {
    year: '2023',
    title: 'University Journey Begins',
    description: 'Started B.Tech in Computer Science at Madhav Institute of Technology and Science, Gwalior. Began exploring advanced concepts.',
    tags: ['B.Tech', 'MITS Gwalior'],
    type: 'Education',
  },
  {
    year: '2024',
    title: 'AI/ML Deep Dive',
    description: 'Immersed myself in Machine Learning and Data Science. Built multiple projects applying ML to real-world problems.',
    tags: ['TensorFlow', 'PyTorch', 'Data Science'],
    type: 'Achievement',
  },
  {
    year: '2025',
    title: 'Full-Stack & Beyond',
    description: 'Expanded to full-stack development. Building end-to-end applications with modern technologies and deploying production systems.',
    tags: ['React', 'Node.js', 'Cloud'],
    type: 'Current',
  },
];

// Animated spaceship component
const Spaceship = ({ progress }: { progress: MotionValue<number> }) => {
  const yPercent = useTransform(progress, [0, 1], [0, 100]);
  
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{ 
        top: useTransform(yPercent, (v) => `calc(${v}% - 24px)`),
      }}
    >
      {/* Spaceship glow effect */}
      <motion.div 
        className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50 blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Main spaceship */}
      <motion.div 
        className="relative"
        animate={{ 
          y: [0, -8, 0, 8, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Rocket body */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-secondary rounded-full shadow-lg shadow-primary/60" />
          <Rocket className="w-7 h-7 text-primary-foreground relative z-10 rotate-180" />
          
          {/* Engine flame - pointing up since rocket is inverted */}
          <motion.div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-6"
            animate={{ 
              scaleY: [1, 1.8, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="w-full h-10 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-sm" />
            <div className="absolute inset-0 w-3 mx-auto h-12 bg-gradient-to-t from-transparent via-yellow-300 to-white rounded-full blur-[2px]" />
          </motion.div>
        </div>
        
        {/* Particle trail going upward */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: -30 - i * 12 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.2, 0.2],
              y: [0, -30],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-400" />
          </motion.div>
        ))}
        
        {/* Side sparkles */}
        {[-1, 1].map((dir) => (
          <motion.div
            key={dir}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ [dir === -1 ? 'right' : 'left']: -20 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              x: [0, dir * 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: dir === -1 ? 0 : 0.75,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-secondary/80 blur-[1px]" />
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

  // Progress for spaceship - constrained to timeline area
  const spaceshipProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="journey" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header - Enhanced visibility */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">My Journey</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
            <span className="text-foreground">Coding</span>{' '}
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A cinematic voyage through my development odyssey.
            <br />
            <span className="text-primary font-medium">Each checkpoint marks a new horizon conquered.</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Enhanced central line with glow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary to-secondary/20 rounded-full" />
            {/* Glow layer 1 */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-secondary/30 rounded-full blur-sm" />
            {/* Glow layer 2 */}
            <div className="absolute -inset-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent rounded-full blur-md" />
            {/* Intense glow layer */}
            <div className="absolute -inset-2 bg-gradient-to-b from-transparent via-primary/20 to-transparent rounded-full blur-xl" />
            
            {/* Animated pulse effect */}
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-b from-transparent via-primary/30 to-transparent rounded-full blur-2xl"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Spaceship that follows scroll */}
          <Spaceship progress={spaceshipProgress} />

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-20 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 60px -20px hsl(var(--primary) / 0.3)' }}
                  className="glass-card rounded-xl p-6 inline-block border-primary/20 hover:border-primary/40 transition-colors"
                >
                  {/* Year badge */}
                  <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <motion.span 
                      className="text-primary font-display text-3xl font-semibold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {milestone.year}
                    </motion.span>
                  </div>

                  {/* Type badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium ${
                    milestone.type === 'Education' ? 'bg-secondary/20 text-secondary' : 
                    milestone.type === 'Current' ? 'bg-primary/20 text-primary' : 'bg-accent text-accent-foreground'
                  }`}>
                    {milestone.type}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-foreground mt-3 mb-3">
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
                        className="skill-badge text-xs"
                        whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center dot with enhanced glow */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="relative"
                >
                  {/* Outer glow rings */}
                  <div className="absolute -inset-4 rounded-full bg-primary/20 blur-lg animate-pulse" />
                  <div className="absolute -inset-2 rounded-full bg-primary/30 blur-md" />
                  
                  {/* Main dot */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-lg shadow-primary/50" />
                  
                  {/* Inner highlight */}
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/40" />
                </motion.div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
