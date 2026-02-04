import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Briefcase, Code2, Sparkles, ChevronDown, Check } from 'lucide-react';
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
    image: '/placeholder.svg',
    // Recruiter view
    problem: 'Manual data processing was slow and error-prone, limiting analytical capacity.',
    solution: 'Built an automated pipeline using Python and ML models for intelligent data classification.',
    impact: '60% reduction in processing time, 95% accuracy in data categorization.',
    // Developer view
    tech: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'FastAPI'],
    architecture: 'Microservices architecture with message queues for async processing. ML models served via REST API with Redis caching layer.',
    challenges: 'Handling real-time data streams while maintaining model accuracy. Implemented batch processing with Redis caching and circuit breaker patterns.',
    codeHighlights: ['Custom ETL framework', 'Model versioning system', 'Async job scheduler'],
    // Explorer view
    story: 'This project started as a weekend experiment and grew into a production system serving millions of records.',
    funFact: 'The first version used a Raspberry Pi as the development server!',
    lessonsLearned: 'Sometimes the simplest solution scales the best.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
  },
  {
    title: 'Smart Analytics Dashboard',
    category: 'Frontend',
    image: '/placeholder.svg',
    problem: 'Stakeholders struggled to derive insights from complex datasets.',
    solution: 'Created an interactive dashboard with real-time visualizations and predictive analytics.',
    impact: 'Improved decision-making speed by 40%. Used by 50+ team members daily.',
    tech: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Node.js'],
    architecture: 'Component-based architecture with custom hooks for data fetching. WebSocket for real-time updates with optimistic UI patterns.',
    challenges: 'Optimizing render performance with large datasets. Used virtualization, memoization, and Web Workers for heavy computations.',
    codeHighlights: ['Custom chart library', 'Real-time sync engine', 'Theme system'],
    story: 'Built to solve my own frustration with existing analytics tools that were too slow and clunky.',
    funFact: 'The color scheme was inspired by a sunset I photographed during a hiking trip.',
    lessonsLearned: 'Great UX is invisible - users should focus on insights, not the interface.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
  },
  {
    title: 'ML Model Deployment Platform',
    category: '3D/Graphics',
    image: '/placeholder.svg',
    problem: 'Data scientists lacked tools to deploy and monitor ML models in production.',
    solution: 'Developed a platform for seamless model deployment with monitoring and A/B testing.',
    impact: 'Reduced deployment time from days to hours. Served 1M+ predictions monthly.',
    tech: ['Python', 'Kubernetes', 'MLflow', 'React', 'PostgreSQL'],
    architecture: 'Kubernetes-based deployment with auto-scaling. MLflow for experiment tracking and model registry with shadow deployment support.',
    challenges: 'Ensuring model reproducibility across environments. Implemented containerized inference pipelines with full lineage tracking.',
    codeHighlights: ['Auto-scaling inference', 'Model A/B testing', 'Drift detection'],
    story: 'Born from the pain of manually deploying models at 3 AM before important demos.',
    funFact: 'The platform once caught a critical model bug that would have cost $50K in wrong predictions.',
    lessonsLearned: 'Automation is not optional at scale - it is survival.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
  },
];

const categories = ['All Projects', 'Frontend', 'Backend', '3D/Graphics', 'Systems'];

const viewModes: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'recruiter', label: 'Recruiter View', icon: Briefcase, description: 'Business impact & results' },
  { id: 'developer', label: 'Developer View', icon: Code2, description: 'Technical deep-dive' },
  { id: 'explorer', label: 'Explorer View', icon: Sparkles, description: 'Stories & insights' },
];

const ProjectCard = ({ project, viewMode, index }: { project: typeof projects[0]; viewMode: ViewMode; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="project-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image with parallax effect */}
      <motion.div 
        className="aspect-[21/9] bg-muted/20 relative overflow-hidden"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent z-10"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          animate={{ 
            backgroundPosition: isHovered ? ['0px 0px', '32px 32px'] : '0px 0px'
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-6 z-20"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary mb-2 block font-body">
            {project.category}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-medium italic text-foreground">
            {project.title}
          </h3>
        </motion.div>

        {/* Floating tech badges on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 max-w-[200px] justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {project.tech.slice(0, 3).map((tech, i) => (
                <motion.span 
                  key={tech}
                  className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content with view mode switching */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {viewMode === 'recruiter' && (
            <motion.div
              key="recruiter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-secondary font-medium">Problem</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">Solution</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-green-500 font-medium">Impact</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed font-medium">{project.impact}</p>
              </div>
            </motion.div>
          )}

          {viewMode === 'developer' && (
            <motion.div
              key="developer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-medium flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Architecture
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.architecture}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-secondary mb-3 font-medium">Technical Challenges</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.challenges}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-accent-foreground mb-3 font-medium">Code Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {project.codeHighlights.map((highlight, i) => (
                    <motion.span
                      key={highlight}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1.5 text-xs bg-accent/30 text-accent-foreground rounded-lg border border-accent/50"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative pl-4 border-l-2 border-primary/30">
                <Sparkles className="w-4 h-4 text-primary absolute -left-2 top-0 bg-card" />
                <h4 className="text-sm uppercase tracking-wider text-primary mb-2 font-medium">The Story</h4>
                <p className="text-muted-foreground text-sm leading-relaxed italic">{project.story}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div 
                  className="p-4 rounded-lg bg-secondary/10 border border-secondary/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-xs uppercase tracking-wider text-secondary mb-2 font-medium">Fun Fact ✨</h4>
                  <p className="text-muted-foreground text-sm">{project.funFact}</p>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-lg bg-primary/10 border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-xs uppercase tracking-wider text-primary mb-2 font-medium">Lesson Learned 💡</h4>
                  <p className="text-muted-foreground text-sm">{project.lessonsLearned}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.span 
                key={tech} 
                className="skill-badge text-xs"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">Code</span>
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Demo</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('recruiter');

  const filteredProjects = activeCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const currentViewMode = viewModes.find(m => m.id === viewMode);

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-heading mb-4">
            <span className="text-foreground">Project</span>{' '}
            <span className="text-gradient">Showcase</span>
          </h2>
          <p className="section-subheading max-w-2xl">
            A collection of projects that demonstrate problem-solving, technical skills, and creative solutions.
          </p>
        </motion.div>

        {/* Filters and View Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-12"
        >
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
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

        {/* Projects Grid with stagger animation */}
        <motion.div 
          className="space-y-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                viewMode={viewMode}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
