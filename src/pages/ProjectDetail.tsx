import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ExternalLink, Github, Star, Rocket, Zap } from "lucide-react";
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
        <h1 className="text-2xl sm:text-3xl font-meridian font-semibold text-foreground mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">The project you're looking for doesn't exist.</p>
        <Link to="/" className="btn-outline inline-flex items-center gap-2 min-h-[44px]">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const thumbnails = [project.image, ...(project.gallery ?? [])];

  return (
    <div className="min-h-screen lg:h-dvh bg-background text-foreground flex flex-col max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-4 sm:pt-5 pb-4 sm:pb-5">
      <div className="shrink-0 mb-2 sm:mb-3">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg px-2 -ml-2"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 flex-1 min-h-0 lg:content-center">
        {/* Left Column: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-3 min-h-0"
        >
          {/* Main Image — frame fits the image, no stretched empty space */}
          <div className="w-full rounded-2xl overflow-hidden border border-border bg-card/50 shadow-lg p-2 sm:p-2.5 shrink-0">
            <img
              src={activeImage || project.image}
              alt={project.title}
              className="block w-auto h-auto max-w-full max-h-[36vh] sm:max-h-[42vh] lg:max-h-[56vh] mx-auto object-contain rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          {thumbnails.length > 1 ? (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 shrink-0 scrollbar-hide">
              {thumbnails.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  aria-label={idx === 0 ? "View main screenshot" : `View screenshot ${idx}`}
                  className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] min-w-[44px] ${activeImage === img || (!activeImage && idx === 0) ? 'border-foreground opacity-100' : 'border-border/60 opacity-60 hover:opacity-100 hover:border-muted-foreground'}`}
                >
                  <img src={img} alt={idx === 0 ? "main thumbnail" : `thumbnail ${idx}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-foreground/70">
                <img src={project.image} alt="thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-border bg-muted/30 opacity-70 flex items-center justify-center">
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
          className="lg:col-span-5 flex flex-col min-h-0"
        >
          {/* Featured Tag */}
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2 shrink-0">
            <Star size={13} className="text-muted-foreground" />
            <span className="text-muted-foreground text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <h1
            title={project.title}
            className="text-xl sm:text-2xl font-meridian font-bold tracking-tight text-left text-foreground mb-2 sm:mb-3 leading-snug break-words line-clamp-2 shrink-0"
          >
            {project.title}
          </h1>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4 shrink-0">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full border border-border/70 text-muted-foreground bg-muted/20 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="text-muted-foreground text-[13px] sm:text-sm leading-relaxed mb-3 shrink-0">
            {project.solution}
          </p>

          {/* Highlights */}
          {project.codeHighlights && project.codeHighlights.length > 0 && (
            <div className="mb-3 shrink-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap size={13} className="text-muted-foreground" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground">
                  Highlights
                </span>
              </div>
              <ul className="space-y-1">
                {project.codeHighlights.slice(0, 4).map((point) => (
                  <li key={point} className="flex items-start gap-1.5 text-xs sm:text-sm text-foreground/85">
                    <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="truncate" title={point}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact */}
          <div className="mb-3 sm:mb-4 p-3 rounded-xl bg-card/60 border border-border/40 shrink-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Rocket size={14} className="text-muted-foreground" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground">
                Impact
              </span>
            </div>
            <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed">
              {project.impact}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-auto pt-1 shrink-0">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-foreground font-bold py-2.5 px-5 sm:px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-lg backdrop-blur-xl bg-card/60 dark:bg-white/[0.06] border border-border/50 hover:border-muted-foreground/60 hover:scale-105 text-xs sm:text-sm min-h-[44px]"
              >
                <ExternalLink size={17} strokeWidth={2.5} />
                Live Preview
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-foreground font-bold py-2.5 px-5 sm:px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-lg backdrop-blur-xl bg-card/60 dark:bg-white/[0.06] border border-border/50 hover:border-muted-foreground/60 hover:scale-105 text-xs sm:text-sm min-h-[44px]"
              >
                <Github size={17} />
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
