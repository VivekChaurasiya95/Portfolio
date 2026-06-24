import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Github, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex flex-col w-full rounded-xl group"
    >
      {/* Animated glowing border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-xl blur-[2px] opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />
      
      {/* Inner card content */}
      <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden rounded-xl border border-primary/20 bg-card hover:border-primary/50 transition-colors duration-300 shadow-xl z-10">
        {/* Mock Thumbnail / Preview */}
        <div className="relative h-56 md:h-72 w-full overflow-hidden bg-background">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card Content Area */}
        <div className="flex-1 flex flex-col p-6 md:p-8">
          <h3 className="text-2xl font-bold font-display text-foreground mb-4">
            {project.title}
          </h3>

          {/* Tech Stack Pills - Matches original website colors */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold tracking-wide bg-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description Section */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
            {project.solution} {project.impact}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <a
              href={project.demo !== "#" ? project.demo : project.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            >
              <ExternalLink size={18} />
              Live
            </a>
            {project.github && (
              <Link
                to={`/project/${project.id}`}
                className="flex-1 flex items-center justify-center gap-2 border border-foreground/20 hover:bg-foreground/10 text-foreground font-medium py-3 rounded-lg transition-all active:scale-95 text-sm uppercase tracking-wider"
              >
                VIEW DETAILS <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredWord, setHoveredWord] = useState<'featured' | 'projects' | null>(null);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Styled Header matching mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-12 gap-6"
        >
          <div 
            className="flex items-center gap-3 md:gap-6 justify-center cursor-default"
            onMouseLeave={() => setHoveredWord(null)}
          >
            {/* Featured */}
            <div 
              className={`relative px-4 transition-all duration-500 ease-out ${
                hoveredWord === 'projects' ? 'opacity-40 blur-[4px]' : 'opacity-100 blur-0'
              }`}
              onMouseEnter={() => setHoveredWord('featured')}
            >
              <AnimatePresence>
                {hoveredWord === 'featured' && (
                  <>
                    <motion.span 
                      layoutId="tl-bracket"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" 
                    />
                    <motion.span 
                      layoutId="br-bracket"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" 
                    />
                  </>
                )}
              </AnimatePresence>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
                Featured
              </h2>
            </div>

            {/* Projects */}
            <div 
              className={`relative px-4 transition-all duration-500 ease-out ${
                hoveredWord === 'featured' ? 'opacity-40 blur-[4px]' : 'opacity-100 blur-0'
              }`}
              onMouseEnter={() => setHoveredWord('projects')}
            >
              <AnimatePresence>
                {hoveredWord === 'projects' && (
                  <>
                    <motion.span 
                      layoutId="tl-bracket"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" 
                    />
                    <motion.span 
                      layoutId="br-bracket"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" 
                    />
                  </>
                )}
              </AnimatePresence>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary tracking-tight">
                Projects
              </h2>
            </div>
          </div>
        </motion.div>

        {/* View All Projects Link */}
        <div className="flex justify-end mb-6 w-full pr-2">
          <a
            href="https://github.com/VivekChaurasiya95"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-foreground transition-colors font-bold text-sm tracking-widest uppercase"
          >
            SEE ALL PROJECTS &rarr;
          </a>
        </div>

        {/* Masonry-Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}

          {/* More Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex flex-col w-full h-full min-h-[400px] rounded-xl group"
          >
            <div className="relative flex-1 flex flex-col items-center justify-center text-center p-8 md:p-12 w-full h-full rounded-xl border border-primary/20 bg-card hover:border-primary/50 transition-colors duration-300 shadow-xl">
              <Github size={64} className="text-foreground/10 mb-6" />
              
              <h3 className="text-3xl font-bold font-display text-foreground mb-6">
                More Projects
              </h3>
              
              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-sm">
                Explore my comprehensive portfolio featuring diverse projects, open-source contributions, and experimental work spanning multiple technologies.
              </p>

              <a
                href="https://github.com/VivekChaurasiya95"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-border bg-muted hover:bg-muted/80 text-foreground font-bold py-3.5 px-6 rounded-lg transition-all active:scale-95 text-sm shadow-md"
              >
                <GitBranch size={18} />
                Explore GitHub Portfolio
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
