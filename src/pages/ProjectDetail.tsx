import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Star, Rocket } from "lucide-react";
import { projects } from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project by ID
  const project = projects.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Scroll to top and reset image on mount or project change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      setActiveImage(project.image);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl sm:text-3xl font-meridian font-semibold text-primary mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">The project you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2 min-h-[44px]">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 sm:pt-5 pb-6 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="mb-3 sm:mb-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-semibold text-primary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 -ml-2"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Column: Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          {/* Main Image */}
          <div className="w-full rounded-2xl overflow-hidden border border-border bg-card/50 shadow-2xl flex items-center justify-center p-2 sm:p-4">
            <img 
              src={activeImage || project.image} 
              alt={project.title} 
              className="w-full h-auto object-contain max-h-[38vh] sm:max-h-[44vh] rounded-xl"
            />
          </div>
          
          {/* Thumbnails */}
          {(project.gallery && project.gallery.length > 0) ? (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveImage(project.image)}
                aria-label="View main screenshot"
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] min-w-[44px] ${activeImage === project.image ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
              >
                 <img src={project.image} alt="main thumbnail" className="w-full h-full object-cover" />
              </button>
              
              {project.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View screenshot ${idx + 1}`}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] min-w-[44px] ${activeImage === img ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                >
                   <img src={img} alt={`thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                 <img src={project.image} alt="thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-border bg-muted/30 opacity-70 flex items-center justify-center">
                 <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider text-center px-1">More soon</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column: Project Details */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col"
        >
          {/* Featured Tag */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="text-yellow-500 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl md:text-3xl font-meridian font-bold tracking-[-0.04em] text-left text-primary mb-3 sm:mb-4 leading-tight break-words">
            {project.title}
          </h1>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-primary/30 text-primary text-[10px] sm:text-[11px] font-bold tracking-widest uppercase bg-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="text-muted-foreground text-[13px] sm:text-sm leading-relaxed mb-4 sm:mb-5 space-y-3">
            <p>{project.problem}</p>
            <p>{project.solution}</p>
            <p>{project.architecture}</p>
          </div>

          {/* Impact */}
          <div className="mb-4 sm:mb-5 p-3 rounded-xl bg-card/60 border border-border/40">
            <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold inline-flex items-center gap-1.5 text-secondary"><Rocket size={16} /> Impact:</span> {project.impact}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto pt-2">
            {project.demo && project.demo !== "#" && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-foreground font-bold py-2.5 px-5 sm:px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-lg backdrop-blur-xl bg-card/60 dark:bg-white/[0.06] border border-border/50 hover:border-primary/40 hover:scale-105 text-xs sm:text-sm min-h-[44px]"
              >
                <ExternalLink size={18} strokeWidth={2.5} />
                Live Preview
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-foreground font-bold py-2.5 px-5 sm:px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-lg backdrop-blur-xl bg-card/60 dark:bg-white/[0.06] border border-border/50 hover:border-primary/40 hover:scale-105 text-xs sm:text-sm min-h-[44px]"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
