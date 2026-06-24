import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, LayoutGrid, Star, Rocket } from "lucide-react";
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
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6 md:px-12 lg:px-24">
      {/* Back Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors group"
        >
          <LayoutGrid className="text-muted-foreground group-hover:text-foreground transition-colors" size={20} />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden border border-border bg-card shadow-2xl flex items-center justify-center">
            <img 
              src={activeImage || project.image} 
              alt={project.title} 
              className="w-full h-auto object-contain max-h-[60vh]"
            />
          </div>
          
          {/* Thumbnails */}
          {(project.gallery && project.gallery.length > 0) ? (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveImage(project.image)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === project.image ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'border-transparent hover:border-border'}`}
              >
                 <img src={project.image} alt="main thumbnail" className="w-full h-full object-cover" />
              </button>
              
              {project.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'border-transparent hover:border-border'}`}
                >
                   <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                 <img src={project.image} alt="thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted opacity-70 flex items-center justify-center">
                 <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center px-2">More soon</span>
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
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="text-yellow-500 text-sm font-bold tracking-widest uppercase">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase bg-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="text-muted-foreground text-lg font-medium leading-[1.8] tracking-wide mb-8 space-y-6">
            <p>{project.problem}</p>
            <p>{project.solution}</p>
            <p>{project.architecture}</p>
          </div>

          {/* Impact */}
          <div className="mb-10 p-0">
            <p className="text-foreground/90 text-md leading-relaxed">
              <span className="font-bold inline-flex items-center gap-1.5"><Rocket className="text-secondary" size={18} /> Impact:</span> {project.impact}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4">
            {project.demo !== "#" && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 w-max shadow-lg hover:scale-105 hover:opacity-90 text-lg"
                style={{ background: 'var(--hero-gradient)' }}
              >
                <ExternalLink size={20} strokeWidth={2.5} />
                Live Preview
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
