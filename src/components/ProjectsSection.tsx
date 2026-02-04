import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Briefcase, Code2, Sparkles, ChevronDown, Check, ArrowRight, Zap, Target, Lightbulb } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ViewMode = 'recruiter' | 'developer' | 'explorer';

const projects = [
  {
    title: 'AI-Powered Data Pipeline',
    category: 'Backend',
    color: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
    problem: 'Manual data processing was slow and error-prone, limiting analytical capacity.',
    solution: 'Built an automated pipeline using Python and ML models for intelligent data classification.',
    impact: '60% reduction in processing time, 95% accuracy in data categorization.',
    tech: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'FastAPI'],
    architecture: 'Microservices architecture with message queues for async processing. ML models served via REST API with Redis caching layer.',
    challenges: 'Handling real-time data streams while maintaining model accuracy. Implemented batch processing with Redis caching.',
    codeHighlights: ['Custom ETL framework', 'Model versioning system', 'Async job scheduler'],
    story: 'This project started as a weekend experiment and grew into a production system serving millions of records.',
    funFact: 'The first version used a Raspberry Pi as the development server!',
    lessonsLearned: 'Sometimes the simplest solution scales the best.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
    stats: { users: '50K+', uptime: '99.9%', speed: '3x faster' },
  },
  {
    title: 'Smart Analytics Dashboard',
    category: 'Frontend',
    color: 'from-violet-500 to-purple-600',
    accentColor: 'violet',
    problem: 'Stakeholders struggled to derive insights from complex datasets.',
    solution: 'Created an interactive dashboard with real-time visualizations and predictive analytics.',
    impact: 'Improved decision-making speed by 40%. Used by 50+ team members daily.',
    tech: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Node.js'],
    architecture: 'Component-based architecture with custom hooks for data fetching. WebSocket for real-time updates.',
    challenges: 'Optimizing render performance with large datasets. Used virtualization and memoization techniques.',
    codeHighlights: ['Custom chart library', 'Real-time sync engine', 'Theme system'],
    story: 'Built to solve my own frustration with existing analytics tools that were too slow and clunky.',
    funFact: 'The color scheme was inspired by a sunset I photographed during a hiking trip.',
    lessonsLearned: 'Great UX is invisible - users should focus on insights, not the interface.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
    stats: { users: '500+', charts: '25 types', speed: 'Real-time' },
  },
  {
    title: 'ML Model Deployment Platform',
    category: 'MLOps',
    color: 'from-orange-500 to-rose-600',
    accentColor: 'orange',
    problem: 'Data scientists lacked tools to deploy and monitor ML models in production.',
    solution: 'Developed a platform for seamless model deployment with monitoring and A/B testing.',
    impact: 'Reduced deployment time from days to hours. Served 1M+ predictions monthly.',
    tech: ['Python', 'Kubernetes', 'MLflow', 'React', 'PostgreSQL'],
    architecture: 'Kubernetes-based deployment with auto-scaling. MLflow for experiment tracking and model registry.',
    challenges: 'Ensuring model reproducibility across environments. Implemented containerized inference pipelines.',
    codeHighlights: ['Auto-scaling inference', 'Model A/B testing', 'Drift detection'],
    story: 'Born from the pain of manually deploying models at 3 AM before important demos.',
    funFact: 'The platform once caught a critical model bug that would have cost $50K in wrong predictions.',
    lessonsLearned: 'Automation is not optional at scale - it is survival.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
    stats: { models: '100+', predictions: '1M+/mo', accuracy: '99.2%' },
  },
];

const categories = ['All Projects', 'Frontend', 'Backend', 'MLOps', 'Systems'];

const viewModes: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'recruiter', label: 'Recruiter View', icon: Briefcase, description: 'Business impact & results' },
  { id: 'developer', label: 'Developer View', icon: Code2, description: 'Technical deep-dive' },
  { id: 'explorer', label: 'Explorer View', icon: Sparkles, description: 'Stories & insights' },
];

const RollerCoasterCard = ({ 
  project, 
  viewMode, 
  index, 
  totalProjects 
}: { 
  project: typeof projects[0]; 
  viewMode: ViewMode; 
  index: number;
  totalProjects: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Roller coaster wave effect - different phase for each card
  const phase = (index / totalProjects) * Math.PI * 2;
  
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [100, -20, 0, -20, -100]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [index % 2 === 0 ? -50 : 50, 0, index % 2 === 0 ? 30 : -30, 0, index % 2 === 0 ? -30 : 30]
  );
  
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [index % 2 === 0 ? -5 : 5, -2, 0, 2, index % 2 === 0 ? 5 : -5]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.85, 0.95, 1, 0.95, 0.85]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.3, 1, 1, 1, 0.3]
  );

  // Smooth springs for natural movement
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: springY,
        x: springX,
        rotateZ: springRotate,
        scale: springScale,
        opacity,
      }}
      className="relative"
    >
      <motion.article
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          boxShadow: '0 25px 80px -20px rgba(0,0,0,0.5), 0 0 60px -15px hsl(var(--primary) / 0.3)',
          borderColor: 'hsl(var(--primary) / 0.5)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Gradient overlay background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5`} />
        
        {/* Animated mesh gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: isHovered 
              ? [
                  `radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
                  `radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
                  `radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
                ]
              : `radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)`
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Card content layout */}
        <div className="relative grid lg:grid-cols-[1fr,1.5fr] gap-0">
          {/* Left side - Visual */}
          <div className="relative p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[400px]">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-medium w-fit`}
            >
              <Zap className="w-3 h-3" />
              {project.category}
            </motion.div>

            {/* Title and stats */}
            <div className="mt-auto">
              <motion.h3 
                className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight"
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              
              {/* Stats row */}
              <div className="flex flex-wrap gap-4">
                {Object.entries(project.stats).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div 
              className={`absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-r ${project.color} rounded-full blur-[80px] opacity-20`}
              animate={{ 
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? 0.4 : 0.2,
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />
          </div>

          {/* Right side - Content */}
          <div className="relative p-8 border-l border-border/30 bg-background/20">
            <AnimatePresence mode="wait">
              {viewMode === 'recruiter' && (
                <motion.div
                  key="recruiter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid gap-4">
                    <motion.div 
                      className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--secondary) / 0.5)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-secondary" />
                        <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Problem</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.5)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-xs uppercase tracking-wider text-primary font-semibold">Solution</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                      whileHover={{ scale: 1.02, borderColor: 'rgba(34, 197, 94, 0.5)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span className="text-xs uppercase tracking-wider text-green-500 font-semibold">Impact</span>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed font-medium">{project.impact}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {viewMode === 'developer' && (
                <motion.div
                  key="developer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Architecture
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed p-3 rounded-lg bg-muted/20 border border-border/30">
                      {project.architecture}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-secondary mb-3 font-semibold">Technical Challenges</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.challenges}</p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-accent-foreground mb-3 font-semibold">Code Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.codeHighlights.map((highlight, i) => (
                        <motion.span
                          key={highlight}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-3 py-1.5 text-xs bg-accent/20 text-accent-foreground rounded-lg border border-accent/30 font-mono"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {viewMode === 'explorer' && (
                <motion.div
                  key="explorer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="relative pl-4 border-l-2 border-primary/40">
                    <Sparkles className="w-4 h-4 text-primary absolute -left-2 top-0 bg-card" />
                    <h4 className="text-sm uppercase tracking-wider text-primary mb-2 font-semibold">The Story</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">{project.story}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div 
                      className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20"
                      whileHover={{ scale: 1.03, rotate: 1 }}
                    >
                      <h4 className="text-xs uppercase tracking-wider text-violet-400 mb-2 font-semibold">Fun Fact ✨</h4>
                      <p className="text-muted-foreground text-sm">{project.funFact}</p>
                    </motion.div>
                    <motion.div 
                      className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20"
                      whileHover={{ scale: 1.03, rotate: -1 }}
                    >
                      <h4 className="text-xs uppercase tracking-wider text-amber-400 mb-2 font-semibold">Lesson Learned 💡</h4>
                      <p className="text-muted-foreground text-sm">{project.lessonsLearned}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tech stack & Links */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <motion.span 
                      key={tech}
                      className="px-2.5 py-1 text-xs bg-muted/40 text-muted-foreground rounded-md border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.color} text-white text-sm font-medium`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                    <ArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator line */}
        <motion.div 
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.color}`}
          style={{ 
            width: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
          }}
        />
      </motion.article>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('recruiter');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const currentViewMode = viewModes.find(m => m.id === viewMode);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            Featured Work
          </motion.span>
          <h2 className="section-heading mb-4">
            <span className="text-foreground">Project</span>{' '}
            <span className="text-gradient">Showcase</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Scroll through my roller coaster of projects — each one a unique adventure in problem-solving and creativity.
          </p>
        </motion.div>

        {/* Filters and View Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-16"
        >
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* View mode dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card/80 border border-border/50 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentViewMode && (
                  <>
                    <currentViewMode.icon className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <span className="text-sm font-medium text-foreground block">{currentViewMode.label}</span>
                      <span className="text-xs text-muted-foreground">{currentViewMode.description}</span>
                    </div>
                  </>
                )}
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-2" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 bg-card border border-border/50 backdrop-blur-xl"
            >
              {viewModes.map((mode) => (
                <DropdownMenuItem
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <mode.icon className={`w-5 h-5 ${viewMode === mode.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1">
                    <span className={`text-sm font-medium block ${viewMode === mode.id ? 'text-primary' : 'text-foreground'}`}>
                      {mode.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{mode.description}</span>
                  </div>
                  {viewMode === mode.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Projects with roller coaster effect */}
        <div className="space-y-24">
          {filteredProjects.map((project, index) => (
            <RollerCoasterCard 
              key={project.title} 
              project={project} 
              viewMode={viewMode}
              index={index}
              totalProjects={filteredProjects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
