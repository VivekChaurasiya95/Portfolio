import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Star, Rocket } from "lucide-react";
import { projects } from "../data/projects";
import ThemeToggle from "@/components/ThemeToggle";

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
        <h1 className="text-3xl sm:text-4xl font-meridian font-bold text-foreground mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">The project you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2 min-h-[44px]">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 pb-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Top Header Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 sm:mb-12 py-3 px-4 sm:px-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/40 shadow-sm"
      >
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm font-semibold text-primary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={18} />
          <span>Back to Portfolio</span>
        </button>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
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
              className="w-full h-auto object-contain max-h-[50vh] sm:max-h-[60vh] rounded-xl"
            />
          </div>
          
          {/* Thumbnails */}
          {(project.gallery && project.gallery.length > 0) ? (
            <div className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveImage(project.image)}
                aria-label="View main screenshot"
                className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] min-w-[44px] ${activeImage === project.image ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
              >
                 <img src={project.image} alt="main thumbnail" className="w-full h-full object-cover" />
              </button>
              
              {project.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View screenshot ${idx + 1}`}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] min-w-[44px] ${activeImage === img ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                >
                   <img src={img} alt={`thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                 <img src={project.image} alt="thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-border bg-muted/30 opacity-70 flex items-center justify-center">
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
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="text-yellow-500 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-meridian font-extrabold tracking-[-0.04em] text-left text-foreground mb-4 sm:mb-6 leading-tight break-words">
            {project.title}
          </h1>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/30 text-primary text-[11px] sm:text-xs font-bold tracking-widest uppercase bg-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 space-y-4">
            <p>{project.problem}</p>
            <p>{project.solution}</p>
            <p>{project.architecture}</p>
          </div>

          {/* Impact */}
          <div className="mb-8 p-4 rounded-xl bg-card/60 border border-border/40">
            <p className="text-foreground/90 text-xs sm:text-sm md:text-base leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2 text-primary-foreground font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-lg hover:scale-105 hover:opacity-90 text-sm sm:text-base min-h-[44px]"
                style={{ background: 'var(--hero-gradient)' }}
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
                className="inline-flex items-center justify-center gap-2 text-foreground bg-card hover:bg-card/80 border border-border font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-sm hover:scale-105 text-sm sm:text-base min-h-[44px]"
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
