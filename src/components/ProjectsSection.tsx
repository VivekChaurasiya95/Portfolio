import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

// Card metadata for the project showcase: live domain + uppercase tagline
const projectMeta: Record<string, { domain: string; tagline: string }> = {
  algofight: {
    domain: "algo.mitsgwalior.in",
    tagline: "REAL-TIME COMPETITIVE CODING ARENA & ELO DUELS",
  },
  skillflare: {
    domain: "skillflare-delta.vercel.app",
    tagline: "YOUR AI-POWERED STUDENT TALENT MARKETPLACE",
  },
  dime: {
    domain: "dime-rishabh.vercel.app",
    tagline: "DATA-DRIVEN STARTUP IDEA VALIDATION & MARKET EVALUATION",
  },
  hser: {
    domain: "hser-project.vercel.app",
    tagline: "HUMAN SKILL EXTINCTION & AUTOMATION VELOCITY RADAR",
  },
  "student-saarthi": {
    domain: "student-saarthi.antideploy.app",
    tagline: "INTELLIGENT MULTI-CRITERIA SCHOLARSHIP PORTAL",
  },
};

const getMeta = (id: string, demo: string) =>
  projectMeta[id] || {
    domain:
      demo !== "#"
        ? demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
        : "github.com",
    tagline: "FULL-STACK ENGINEERING SHOWCASE",
  };

const ProjectsSection = () => {
  const [hoveredWord, setHoveredWord] = useState<'featured' | 'projects' | null>(null);
  const [showAll, setShowAll] = useState(false);

  // HSER stays out of the default view; "View All Projects" reveals everything.
  const visibleProjects = showAll ? projects : projects.filter((project) => project.id !== "hser");

  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        {/* Animated Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mb-8 sm:mb-10 gap-6"
        >
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-6 justify-center cursor-default"
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

              <h2 className="font-meridian text-3xl md:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
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

              <h2 className="font-meridian text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary tracking-tight">
                Projects
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Project card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {visibleProjects.map((project, idx) => {
            const meta = getMeta(project.id, project.demo);
            const shortTitle = project.title
              .split("–")[0]
              .replace("MITS ", "")
              .trim();
            const demoUrl =
              project.demo !== "#" ? project.demo : project.github || "#";
            const featured = false;

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                className={`group relative flex flex-col w-full overflow-hidden rounded-2xl border bg-card dark:bg-[#0b0c11] p-5 sm:p-6 shadow-xl transition-all duration-300 ${
                  featured
                    ? "border-primary/40 hover:border-primary/60"
                    : "border-border/60 hover:border-primary/30"
                }`}
              >
                {/* Title row: project name + open-live-app link */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-sans font-semibold tracking-tight text-primary">
                      {shortTitle}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1.5">
                      {meta.tagline}
                    </p>
                  </div>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${shortTitle}`}
                    className="w-11 h-11 shrink-0 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm group/btn cursor-pointer"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>

                {/* Browser preview */}
                <div className="mt-5 rounded-2xl border border-border/50 bg-[#0a0b10] overflow-hidden">
                  {/* Browser chrome */}
                  <div className="px-3.5 py-2.5 bg-[#12141c] border-b border-white/[0.06] flex items-center gap-2">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* URL Address Bar */}
                    <div className="flex-1 max-w-[240px] sm:max-w-xs mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-[#08090d] border border-white/[0.08] text-[11px] font-mono text-muted-foreground truncate">
                      <Globe className="w-3 h-3 shrink-0 text-primary/70" />
                      <span className="truncate">{meta.domain}</span>
                    </div>

                    {/* Spacer to balance traffic lights */}
                    <div className="w-[42px] shrink-0" />
                  </div>

                  {/* Screenshot -> project details */}
                  <Link
                    to={`/project/${project.id}`}
                    aria-label={`View ${shortTitle} details`}
                    className="block w-full bg-background/80"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="block w-full h-auto"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View all projects toggle */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4 sm:mt-5"
        >
          <a
            href="https://github.com/VivekChaurasiya95"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2.5 min-h-[44px]"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
