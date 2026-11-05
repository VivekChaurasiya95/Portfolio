import React, { useRef, useState, useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  Pause,
  Play,
  Compass,
} from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  role: string;
  org: string;
  badge: string;
  highlight: string;
  icon?: React.ComponentType<{ className?: string }>;
  logo?: string;
  logoBg?: string;
  logoClass?: string;
  iconBg?: string;
  iconColor?: string;
}

const milestones: Milestone[] = [
  {
    id: "01",
    year: "2024",
    role: "B.Tech in Computer Science",
    org: "MITS-DU",
    badge: "Education",
    highlight: "Core foundations in algorithms, data structures & systems design.",
    icon: GraduationCap,
    iconBg: "bg-blue-500/15 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "02",
    year: "2025",
    role: "Full-Stack & AI Systems",
    org: "Independent Projects",
    badge: "Projects",
    highlight: "Architected HSER radar & Student Saarthi AI scholarship portal.",
    icon: Sparkles,
    iconBg: "bg-purple-500/15 border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    id: "03",
    year: "Feb 2026",
    role: "Software Developer Intern",
    org: "ByteEdu",
    badge: "Internship",
    highlight: "Engineered scalable web features & optimized API latency.",
    logo: "/experience-logos/byteedu.png",
    logoBg: "bg-white border-white/30",
  },
  {
    id: "04",
    year: "Apr 2026",
    role: "McKinsey Forward",
    org: "McKinsey & Company",
    badge: "Fellowship",
    highlight: "Executive leadership, digital resilience & strategic thinking.",
    logo: "/experience-logos/mckinsey.png",
    logoBg: "bg-[#00102a] border-sky-500/30",
  },
  {
    id: "05",
    year: "Apr 2026",
    role: "Open Source Contributor",
    org: "Nexus Spring of Code",
    badge: "Open Source",
    highlight: "Resolved architectural issues & enhanced open source docs.",
    logo: "/experience-logos/nsoc.png",
    logoBg: "bg-black border-orange-500/30",
  },
  {
    id: "06",
    year: "May 2026",
    role: "AI Agents Contributor",
    org: "GirlScript Summer of Code",
    badge: "Open Source",
    highlight: "Architected autonomous AI workflows & agent tooling.",
    logo: "/experience-logos/gssoc.png",
    logoBg: "bg-[#181818] border-orange-500/30",
  },
  {
    id: "07",
    year: "May 2026",
    role: "Google Student Ambassador",
    org: "Google & Gemini Campus",
    badge: "Leadership",
    highlight: "Leading campus developer community & Gemini AI workshops.",
    logo: "/experience-logos/gsa-symbol.png",
    logoBg: "bg-white border-white/30",
  },
  {
    id: "08",
    year: "Jun 2026",
    role: "Data Science Intern",
    org: "Decode Labs",
    badge: "Internship",
    highlight: "Developing predictive ML models & automated data pipelines.",
    logo: "/experience-logos/decodelabs.png",
    logoBg: "bg-[#090e1c] border-cyan-500/30",
  },
  {
    id: "09",
    year: "Jun 2026",
    role: "Infosys Virtual Intern",
    org: "Infosys Springboard 7.0",
    badge: "Internship",
    highlight: "Enterprise software engineering, cloud systems & applied AI.",
    logo: "/experience-logos/infosys.png",
    logoBg: "bg-white border-white/30",
  },
  {
    id: "10",
    year: "Jun 2026",
    role: "Campus Mantri",
    org: "GeeksforGeeks",
    badge: "Ambassador",
    highlight: "Official campus lead organizing hackathons & technical contests.",
    logo: "/experience-logos/gfg.png",
    logoBg: "bg-white border-white/30",
  },
  {
    id: "11",
    year: "Jul 2026",
    role: "ML Engineering Intern",
    org: "FlyRank AI",
    badge: "Internship",
    highlight: "Neural ranking models, intelligent search & deep learning pipelines.",
    logo: "/experience-logos/flyrankai.png",
    logoBg: "bg-black border-emerald-500/30",
  },
];

// Non-looping list: begins with B.Tech and ends with FlyRank AI
const JourneySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isResettingRef = useRef(false);

  // Check bounds on scroll
  const updateScrollBounds = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);
    if (!isResettingRef.current) {
      if (el.scrollLeft >= maxScroll - 3) {
        setIsAtEnd(true);
        setIsPaused(true);
      } else {
        setIsAtEnd(false);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Ensure it starts at the beginning (B.Tech in Computer Science)
    el.scrollLeft = 0;
    updateScrollBounds();

    const handleScroll = () => {
      updateScrollBounds();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollBounds);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, []);

  // Smooth forward auto-motion that stops after FlyRank AI
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.7; // smooth pixels per frame

    const step = () => {
      if (
        !isPaused &&
        !isHovered &&
        !isDraggingRef.current &&
        !isResettingRef.current &&
        el
      ) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 2) {
          el.scrollLeft = maxScroll;
          setIsAtEnd(true);
          setIsPaused(true);
          setCanScrollRight(false);
          setCanScrollLeft(true);
          return;
        }
        el.scrollLeft += speed;
      }
      animId = requestAnimationFrame(step);
    };

    if (!isPaused && !isAtEnd) {
      animId = requestAnimationFrame(step);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPaused, isHovered, isAtEnd]);

  // Restart smoothly from B.Tech
  const handleRestart = () => {
    const el = scrollRef.current;
    if (!el) return;
    isResettingRef.current = true;
    setIsAtEnd(false);
    setIsPaused(true);

    el.scrollTo({ left: 0, behavior: "smooth" });

    // Track scroll back to milestone 01 (B.Tech)
    const checkArrival = () => {
      if (!el) {
        isResettingRef.current = false;
        return;
      }
      if (el.scrollLeft <= 5) {
        el.scrollLeft = 0;
        isResettingRef.current = false;
        updateScrollBounds();
        setIsPaused(false);
      } else {
        requestAnimationFrame(checkArrival);
      }
    };
    requestAnimationFrame(checkArrival);
  };

  // Step scroll left or right
  const handleStepScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 300;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // Mouse Drag Support
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
    updateScrollBounds();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    updateScrollBounds();
  };

  return (
    <section
      id="journey"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-background/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Consistent Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-5 backdrop-blur-md">
              <Compass className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono font-medium text-primary uppercase tracking-wider">
                Development Journey
              </span>
            </div>
            <h2 className="section-heading">
              <span className="text-foreground">Development</span>{" "}
              <span className="text-secondary">Timeline</span>
            </h2>
          </div>

          {/* Minimal Controls: Left/Right arrows + Auto Motion or Restart */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={() => handleStepScroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-border/50 bg-card/40 hover:bg-card/80 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
              aria-label="Scroll to previous milestone"
              title="Previous milestone"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <button
              onClick={() => handleStepScroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-border/50 bg-card/40 hover:bg-card/80 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
              aria-label="Scroll to next milestone"
              title="Next milestone"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            {isAtEnd ? (
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 text-xs font-mono text-primary transition-all duration-200 cursor-pointer"
                title="Restart timeline from B.Tech"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                <span>Restart</span>
              </button>
            ) : (
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/50 bg-card/40 hover:bg-card/80 text-xs font-mono text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                title={isPaused ? "Resume auto motion" : "Pause auto motion"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-primary" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Moving</span>
                    <Pause className="w-3.5 h-3.5 text-muted-foreground/60 ml-0.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Linear Motion Track with Dynamic Edge Gradient Masks */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUpOrLeave();
          }}
        >
          {/* Subtle Edge Fade Masks: only visible when there is scrolled overflow */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Horizontally Scrollable Track */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className="flex gap-4 overflow-x-auto py-2 scrollbar-none cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isFirst = index === 0;
              const isLast = index === milestones.length - 1;

              return (
                <div
                  key={item.id}
                  className={`shrink-0 w-[270px] sm:w-[300px] rounded-xl p-4 sm:p-5 bg-card/35 backdrop-blur-sm border transition-all duration-300 flex flex-col justify-between group ${
                    isLast
                      ? "border-emerald-500/40 bg-emerald-500/[0.04] hover:border-emerald-500/60"
                      : isFirst
                      ? "border-primary/40 bg-primary/[0.03] hover:border-primary/60"
                      : "border-border/40 hover:border-primary/40 hover:bg-card/60"
                  }`}
                >
                  {/* Top Bar: Year & Minimal Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-primary/90">
                      {item.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isLast
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                          : "bg-muted/30 border border-border/30 text-muted-foreground"
                      }`}
                    >
                      {isLast ? "Latest Milestone" : item.badge}
                    </span>
                  </div>

                  {/* Identity Row: Full Colorful Logo / Icon + Role + Org */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-sm border transition-transform duration-300 group-hover:scale-105 ${
                        item.logoBg || item.iconBg || "bg-white/[0.08] border-white/10"
                      }`}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.org}
                          className={`w-full h-full object-contain ${item.logoClass || ""}`}
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : Icon ? (
                        <Icon className={`w-5 h-5 ${item.iconColor || "text-primary"}`} />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground leading-snug truncate">
                        {item.role}
                      </h3>
                      <div className="text-xs text-muted-foreground/75 font-medium truncate mt-0.5">
                        {item.org}
                      </div>
                    </div>
                  </div>

                  {/* Minimal 1-Line Highlight */}
                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2 pt-2 border-t border-border/20">
                    {item.highlight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Footer Status Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/60 mt-4 px-1">
          <span>
            {isAtEnd
              ? "Completed • Stopped at FlyRank AI (Latest)"
              : "Hover to pause • Drag or use arrows to navigate"}
          </span>
          <span className="hidden sm:inline">
            11 Milestones • B.Tech (2024) → FlyRank AI (2026)
          </span>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
