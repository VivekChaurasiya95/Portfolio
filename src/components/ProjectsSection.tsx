import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Github,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Workflow,
  Globe,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Code2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

// Project metadata enrichments for the hybrid modern card view
const projectMeta: Record<
  string,
  {
    domain: string;
    tagline: string;
    badge: string;
    highlight: string;
    specs: { label: string; value: string }[];
    pipeline: string[];
  }
> = {
  skillflare: {
    domain: "skillflare-delta.vercel.app",
    tagline: "YOUR AI-POWERED STUDENT TALENT MARKETPLACE",
    badge: "Full-Stack Collaboration",
    highlight:
      "Role-based full-stack architecture with real-time Socket.IO chat, gamified progression, and contextual Ollama AI mentorship.",
    specs: [
      { label: "COLLABORATION ENGINE", value: "3 Core Roles" },
      { label: "SIGNAL TELEMETRY", value: "Socket.IO Events" },
      { label: "AI ASSISTANT", value: "Buddy AI (Ollama)" },
    ],
    pipeline: ["Task Publication", "Peer Contribution", "AI Mentorship"],
  },
  dime: {
    domain: "dime-rishabh.vercel.app",
    tagline: "DATA-DRIVEN STARTUP IDEA VALIDATION & MARKET EVALUATION",
    badge: "AI Market Analytics",
    highlight:
      "Automated market intelligence scoring combining live app review pain points with dynamic opportunity risk matrices.",
    specs: [
      { label: "VALIDATION ENGINE", value: "OpenAI Analytics" },
      { label: "MARKET SIGNALS", value: "Live Store Review Data" },
      { label: "ARCHITECTURE", value: "Next.js + Supabase" },
    ],
    pipeline: ["Idea Ingestion", "Signal Extraction", "Opportunity Score"],
  },
  hser: {
    domain: "hser-project.vercel.app",
    tagline: "HUMAN SKILL EXTINCTION & AUTOMATION VELOCITY RADAR",
    badge: "Predictive Intelligence",
    highlight:
      "Mathematical risk formulation modeling automation velocity, tool growth metrics, and skill half-life across 50+ IT domains.",
    specs: [
      { label: "RISK ENGINE", value: "FastAPI Predictive Model" },
      { label: "DATA SIGNALS", value: "50+ IT Skills" },
      { label: "METRICS VECTORS", value: "3 Key Risk Indices" },
    ],
    pipeline: ["Skill Ingestion", "Velocity Model", "Extinction Index"],
  },
  "student-saarthi": {
    domain: "student-saarthi.ai",
    tagline: "INTELLIGENT MULTI-CRITERIA SCHOLARSHIP PORTAL",
    badge: "AI Recommendation",
    highlight:
      "Multi-criteria filtering algorithm pairing academic profile vectors with active grants, featuring automated SMS/Email alerts.",
    specs: [
      { label: "MATCHING ENGINE", value: "OpenAI Recommender" },
      { label: "CRITERIA FILTERS", value: "5+ Dynamic Vectors" },
      { label: "DISPATCH ALERTS", value: "Email & SMS Webhooks" },
    ],
    pipeline: ["Profile Ingestion", "Vector Filtering", "Opportunity Alert"],
  },
};

// Slide variants for smooth horizontal motion
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
      filter: { duration: 0.25 },
    },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
      filter: { duration: 0.2 },
    },
  }),
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredWord, setHoveredWord] = useState<'featured' | 'projects' | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Total slides: 4 projects + 1 "More Projects" slide
  const totalSlides = projects.length + 1;

  const navigateTo = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isMoreProjectsSlide = activeIndex === projects.length;
  const currentProject = !isMoreProjectsSlide ? projects[activeIndex] : null;

  const currentMeta = currentProject
    ? projectMeta[currentProject.id] || {
        domain: currentProject.demo !== "#"
          ? currentProject.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
          : "github.com",
        tagline: "FULL-STACK ENGINEERING SHOWCASE",
        badge: currentProject.category || "Full-Stack",
        highlight: currentProject.impact,
        specs: [
          { label: "CATEGORY", value: currentProject.category },
          { label: "TECH", value: currentProject.tech[0] || "TypeScript" },
          { label: "STATUS", value: "Production Ready" },
        ],
        pipeline: ["Architecture", "Implementation", "Deployment"],
      }
    : null;

  const targetUrl = currentProject
    ? currentProject.demo !== "#"
      ? currentProject.demo
      : currentProject.github || "#"
    : "https://github.com/VivekChaurasiya95";

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">

        {/* Styled Header matching mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-8 sm:mb-12 gap-6"
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

              <h2 className="font-meridian text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
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

              <h2 className="font-meridian text-4xl md:text-5xl lg:text-6xl font-bold text-secondary tracking-tight">
                Projects
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Navigation Bar: Tabs + Counter + Arrows */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Project Switcher Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-card/60 dark:bg-[#0c0d12]/80 border border-primary/20 backdrop-blur-md overflow-x-auto max-w-full scrollbar-none">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => navigateTo(idx)}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive ? "text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectPill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/85 rounded-xl shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    />
                  )}
                  <span className="relative z-10 font-mono text-[11px] opacity-80">
                    0{idx + 1}
                  </span>
                  <span className="relative z-10 hidden xs:inline">
                    {proj.title.split("–")[0].replace("MITS ", "").trim()}
                  </span>
                </button>
              );
            })}

            {/* Tab for More Projects */}
            <button
              onClick={() => navigateTo(projects.length)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isMoreProjectsSlide ? "text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isMoreProjectsSlide && (
                <motion.div
                  layoutId="activeProjectPill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/85 rounded-xl shadow-[0_0_15px_hsl(var(--secondary)/0.4)]"
                />
              )}
              <Github className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">More</span>
            </button>
          </div>

          {/* Stepper Controls & Counter */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="font-mono text-xs text-muted-foreground font-bold tracking-widest">
              <span className="text-primary font-extrabold text-sm">0{activeIndex + 1}</span> / 0{totalSlides}
            </span>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 text-foreground flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-glow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 text-foreground flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-glow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View All on GitHub Link */}
            <a
              href="https://github.com/VivekChaurasiya95"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-foreground tracking-wider uppercase ml-2 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Horizontal Motion Stage (Single Card In-View with Smooth Horizontal Transitions) */}
        <div className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[560px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {!isMoreProjectsSlide && currentProject && currentMeta ? (
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 80 || velocity.x > 350) {
                    handlePrev();
                  } else if (offset.x < -80 || velocity.x < -350) {
                    handleNext();
                  }
                }}
                className="relative flex flex-col w-full rounded-2xl sm:rounded-3xl group cursor-grab active:cursor-grabbing"
              >
                {/* Ambient glowing border effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-2xl sm:rounded-3xl blur-[2px] opacity-40 group-hover:opacity-100 transition duration-500" />

                {/* Main Card Surface */}
                <div className="relative flex-1 flex flex-col w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/20 bg-card/85 dark:bg-[#0b0c11]/90 backdrop-blur-xl p-5 sm:p-7 md:p-8 lg:p-9 shadow-2xl z-10 transition-all duration-300 group-hover:border-primary/45">
                  
                  {/* Top Header Row (Blends Image 1 & Image 2) */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/50">
                    <div>
                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                          <Sparkles className="w-3 h-3 text-primary" />
                          FEATURED PROJECT
                        </span>
                        <span className="px-3 py-1 rounded-full bg-card/80 border border-border/70 text-muted-foreground text-[10px] sm:text-xs font-medium">
                          {currentMeta.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary/5 border border-primary/25 font-mono text-[11px] font-bold text-primary">
                          #0{activeIndex + 1}
                        </span>
                        {currentProject.demo !== "#" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-meridian tracking-tight text-foreground">
                        {currentProject.title}
                      </h3>

                      {/* Tagline from Image 1 */}
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mt-1">
                        {currentMeta.tagline}
                      </p>
                    </div>

                    {/* Top-Right Circular Quick Action Button (from Image 1) */}
                    <div className="flex items-center self-end sm:self-start">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${currentProject.title}`}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm group/btn cursor-pointer"
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Main Body - 2-Column Split (from Image 2) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 items-start">
                    
                    {/* Left Column: Solution, Highlight, Tech, Action Buttons */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-5">
                      {/* The Solution & Purpose Card */}
                      <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/60">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>THE SOLUTION &amp; PURPOSE</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {currentProject.problem} {currentProject.solution}
                        </p>
                      </div>

                      {/* Technical Highlight Callout Box */}
                      <div className="p-3.5 sm:p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_hsl(var(--primary))]" />
                        <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                          <strong className="text-primary font-bold">Technical Highlight:</strong>{" "}
                          {currentMeta.highlight}
                        </p>
                      </div>

                      {/* Technologies & Architecture Pills */}
                      <div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                          TECHNOLOGIES &amp; ARCHITECTURE
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {currentProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-background/70 border border-border/80 text-foreground/90 hover:border-primary/40 hover:text-primary transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground font-bold py-3 px-5 rounded-xl transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.35)] active:scale-95 text-xs sm:text-sm uppercase tracking-wider min-h-[44px]"
                        >
                          <ExternalLink size={16} />
                          Launch Live App
                        </a>
                        <Link
                          to={`/project/${currentProject.id}`}
                          className="flex-1 flex items-center justify-center gap-2 border border-border/80 hover:bg-background/80 text-foreground font-semibold py-3 px-5 rounded-xl transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-wider min-h-[44px]"
                        >
                          View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Browser Frame Mockup, Specs, and Data Flow */}
                    <div className="lg:col-span-6 flex flex-col space-y-4">
                      
                      {/* Browser Window Mockup (from Image 1 & Image 2) */}
                      <div className="rounded-xl sm:rounded-2xl border border-primary/25 bg-[#0a0b10] overflow-hidden shadow-2xl relative group/browser">
                        {/* Browser Window Title Bar */}
                        <div className="px-3.5 py-2.5 bg-[#12141c] border-b border-white/[0.06] flex items-center justify-between gap-2">
                          {/* Traffic lights */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>

                          {/* URL Address Bar */}
                          <div className="flex-1 max-w-[240px] sm:max-w-xs mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-[#08090d] border border-white/[0.08] text-[11px] font-mono text-muted-foreground truncate">
                            <Globe className="w-3 h-3 shrink-0 text-primary/70" />
                            <span className="truncate">{currentMeta.domain}</span>
                          </div>

                          {/* Status indicator */}
                          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="hidden sm:inline">LIVE</span>
                          </div>
                        </div>

                        {/* Viewport Image Preview */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background/80">
                          <img
                            src={currentProject.image}
                            alt={currentProject.title}
                            loading="lazy"
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/browser:scale-105"
                          />

                          {/* Subtle Interactive Preview Overlay on Hover */}
                          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <a
                              href={targetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                            >
                              <ExternalLink size={14} />
                              Interactive Preview
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* 3 Architecture / Metric Specs (from Image 2) */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                        {currentMeta.specs.map((spec, i) => (
                          <div
                            key={i}
                            className="p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/60 flex flex-col justify-center"
                          >
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                              {spec.label}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Data Flow Execution Model Stepper (from Image 2) */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-background/40 border border-border/50">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          <Workflow className="w-3.5 h-3.5 text-primary" />
                          <span>DATA FLOW EXECUTION MODEL</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                          {currentMeta.pipeline.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                              <span className="flex-1 truncate text-center py-1.5 px-2 rounded-md bg-background/80 border border-border/60 text-foreground font-medium">
                                {step}
                              </span>
                              {idx < currentMeta.pipeline.length - 1 && (
                                <span className="text-primary/70 shrink-0 font-bold">&rarr;</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Slide 5: More Open-Source Projects Card matching the same high-end layout */
              <motion.div
                key="more-projects"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 80 || velocity.x > 350) {
                    handlePrev();
                  } else if (offset.x < -80 || velocity.x < -350) {
                    handleNext();
                  }
                }}
                className="relative flex flex-col w-full rounded-2xl sm:rounded-3xl group cursor-grab active:cursor-grabbing"
              >
                {/* Ambient glowing border effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-secondary/30 via-primary/20 to-secondary/30 rounded-2xl sm:rounded-3xl blur-[2px] opacity-40 group-hover:opacity-100 transition duration-500" />

                {/* Main Card Surface */}
                <div className="relative flex-1 flex flex-col w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-secondary/30 bg-card/85 dark:bg-[#0b0c11]/90 backdrop-blur-xl p-5 sm:p-7 md:p-8 lg:p-9 shadow-2xl z-10 transition-all duration-300 group-hover:border-secondary/50">
                  
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/50">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/35 text-secondary text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                          <Github className="w-3 h-3 text-secondary" />
                          OPEN-SOURCE ECOSYSTEM
                        </span>
                        <span className="px-3 py-1 rounded-full bg-card/80 border border-border/70 text-muted-foreground text-[10px] sm:text-xs font-medium">
                          Community &amp; Research
                        </span>
                        <span className="px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 font-mono text-[11px] font-bold text-secondary">
                          #05
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-meridian tracking-tight text-foreground">
                        More Open-Source &amp; AI Explorations
                      </h3>

                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mt-1">
                        EXPLORE COMPREHENSIVE REPOSITORIES, ALGORITHMS &amp; BENCHMARKS
                      </p>
                    </div>

                    <div className="flex items-center self-end sm:self-start">
                      <a
                        href="https://github.com/VivekChaurasiya95"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Vivek's GitHub"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-secondary/30 bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm group/btn cursor-pointer"
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Main Body - 2-Column Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 items-start">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-5">
                      <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/60">
                        <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          <span>EXPANDING THE CODEBASE</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Beyond featured applications, I maintain open-source toolkits, computer vision prototypes, NLP experiments, and algorithm implementations designed for modular scalability and community adoption.
                        </p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0 shadow-[0_0_8px_hsl(var(--secondary))]" />
                        <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                          <strong className="text-secondary font-bold">Code Philosophy:</strong>{" "}
                          Clean documentation, test coverage, semantic versioning, and developer experience are first-class citizens in every repo.
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                          EXPLORATION DOMAINS
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {["Computer Vision", "LLM Agents", "Deep Learning", "FastAPI Microservices", "PyTorch", "Docker", "Algorithms"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-background/70 border border-border/80 text-foreground/90 hover:border-secondary/40 hover:text-secondary transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href="https://github.com/VivekChaurasiya95"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-secondary to-secondary/85 text-secondary-foreground font-bold py-3 px-6 rounded-xl transition-all hover:shadow-[0_0_20px_hsl(var(--secondary)/0.35)] active:scale-95 text-xs sm:text-sm uppercase tracking-wider min-h-[44px]"
                        >
                          <GitBranch size={16} />
                          Explore GitHub Portfolio
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Terminal Window Mockup */}
                    <div className="lg:col-span-6 flex flex-col space-y-4">
                      
                      {/* Terminal Window Mockup */}
                      <div className="rounded-xl sm:rounded-2xl border border-secondary/25 bg-[#0a0b10] overflow-hidden shadow-2xl relative">
                        <div className="px-3.5 py-2.5 bg-[#12141c] border-b border-white/[0.06] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>

                          <div className="flex-1 max-w-[240px] sm:max-w-xs mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-[#08090d] border border-white/[0.08] text-[11px] font-mono text-muted-foreground truncate">
                            <Terminal className="w-3 h-3 shrink-0 text-secondary" />
                            <span>github.com/VivekChaurasiya95</span>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] font-mono text-secondary">
                            <Code2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Interactive Terminal View */}
                        <div className="p-4 sm:p-5 font-mono text-xs text-muted-foreground leading-relaxed bg-[#08090d]/95 space-y-2 min-h-[180px] sm:min-h-[220px]">
                          <p className="text-primary">
                            <span className="text-secondary">$</span> git profile --summary
                          </p>
                          <p className="text-foreground/90 pl-3">
                            &gt; Active Repositories: 25+ across AI &amp; Full-Stack
                          </p>
                          <p className="text-foreground/90 pl-3">
                            &gt; Primary Focus: Intelligent Agents, ML Models, Next.js
                          </p>
                          <p className="text-foreground/90 pl-3">
                            &gt; Code Cadence: Continuous Open-Source Iterations
                          </p>
                          <div className="pt-2 pl-3 flex items-center gap-2 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>System Status: All systems building &amp; verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Spec Chips */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/60 flex flex-col justify-center">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                            REPOSITORIES
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                            25+ Projects
                          </span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/60 flex flex-col justify-center">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                            COMMUNITY
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                            Open Source
                          </span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/60 flex flex-col justify-center">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                            LICENSES
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                            MIT / Apache
                          </span>
                        </div>
                      </div>

                      {/* Pipeline */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-background/40 border border-border/50">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          <Workflow className="w-3.5 h-3.5 text-secondary" />
                          <span>DEVELOPMENT LIFECYCLE</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                          {["Idea Prototyping", "Integration Tests", "Open Source Release"].map((step, idx, arr) => (
                            <div key={idx} className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                              <span className="flex-1 truncate text-center py-1.5 px-2 rounded-md bg-background/80 border border-border/60 text-foreground font-medium">
                                {step}
                              </span>
                              {idx < arr.length - 1 && (
                                <span className="text-secondary/70 shrink-0 font-bold">&rarr;</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Horizontal Pagination Indicator Bar */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
