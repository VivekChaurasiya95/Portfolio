import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Briefcase, Code2, Sparkles } from 'lucide-react';

type ViewMode = 'recruiter' | 'developer' | 'explorer';

const projects = [
  {
    title: 'AI-Powered Data Pipeline',
    category: 'Backend',
    image: '/placeholder.svg',
    problem: 'Manual data processing was slow and error-prone, limiting analytical capacity.',
    solution: 'Built an automated pipeline using Python and ML models for intelligent data classification.',
    impact: '60% reduction in processing time, 95% accuracy in data categorization.',
    tech: ['Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'FastAPI'],
    architecture: 'Microservices architecture with message queues for async processing. ML models served via REST API.',
    challenges: 'Handling real-time data streams while maintaining model accuracy. Implemented batch processing with Redis caching.',
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
    architecture: 'Component-based architecture with custom hooks for data fetching. WebSocket for real-time updates.',
    challenges: 'Optimizing render performance with large datasets. Used virtualization and memoization techniques.',
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
    architecture: 'Kubernetes-based deployment with auto-scaling. MLflow for experiment tracking and model registry.',
    challenges: 'Ensuring model reproducibility across environments. Implemented containerized inference pipelines.',
    github: 'https://github.com/VivekChaurasiya95',
    demo: '#',
  },
];

const categories = ['All Projects', 'Frontend', 'Backend', '3D/Graphics', 'Systems'];

const viewModes: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'recruiter', label: 'Recruiter', icon: Briefcase },
  { id: 'developer', label: 'Developer', icon: Code2 },
  { id: 'explorer', label: 'Explorer', icon: Sparkles },
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [viewMode, setViewMode] = useState<ViewMode>('recruiter');

  const filteredProjects = activeCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
          <p className="text-primary text-sm mt-2">Click on any project to view full details</p>
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
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View mode selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
            <span className="text-xs text-muted-foreground mr-2">&lt;/&gt; Views:</span>
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  viewMode === mode.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <mode.icon className="w-3.5 h-3.5" />
                {mode.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="project-card"
            >
              {/* Project Image */}
              <div className="aspect-[21/9] bg-muted/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="font-display text-2xl md:text-3xl font-medium italic">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {viewMode === 'recruiter' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="text-xs uppercase tracking-wider text-secondary">Problem</span>
                      </div>
                      <p className="text-muted-foreground">{project.problem}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs uppercase tracking-wider text-primary">Solution</span>
                      </div>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                  </div>
                )}

                {viewMode === 'developer' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-primary mb-2">Architecture</h4>
                      <p className="text-muted-foreground">{project.architecture}</p>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-secondary mb-2">Challenges & Decisions</h4>
                      <p className="text-muted-foreground">{project.challenges}</p>
                    </div>
                  </div>
                )}

                {viewMode === 'explorer' && (
                  <div>
                    <p className="text-muted-foreground">{project.solution}</p>
                    <p className="text-foreground mt-2 font-medium">{project.impact}</p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border/50">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="skill-badge text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
