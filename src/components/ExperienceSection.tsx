import { useEffect, useState, useRef, type ElementType } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  Terminal,
  Code2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Medal,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { createPortal } from "react-dom";
import { SOCIAL_LINKS } from "@/data/siteLinks";

const resolveLogoCandidates = (baseName: string) => [
  `/experience-logos/${baseName}.png`,
  `/experience-logos/${baseName}.jpg`,
  `/experience-logos/${baseName}.jpeg`,
  `/experience-logos/${baseName}.webp`,
  `/experience-logos/${baseName}.svg`,
];

const linkedinExperienceUrl = `${SOCIAL_LINKS.linkedin}/details/experience/`;
const defaultProofPreview = "/placeholder.svg";

type ExperienceProof = {
  title?: string;
  type?:
    | "Offer Letter"
    | "Completion Certificate"
    | "Badge"
    | "Recognition"
    | "Document";
  image: string;
  description?: string;
};

type ExperienceProofInput = ExperienceProof | string;

type ExperienceItem = {
  id: number;
  role: string | string[];
  company: string;
  location: string;
  duration: string;
  description: string;
  detailSummary: string;
  achievements: string[];
  technologies: string[];
  proofs?: ExperienceProofInput[];
  logo: string[];
  icon: ElementType;
  color: string;
  glow: string;
  logoStyle?: string;
  status?: "Completed" | "Active";
};

const normalizeProof = (
  proof: ExperienceProofInput,
  index: number,
): Required<ExperienceProof> => {
  if (typeof proof === "string") {
    return {
      image: proof,
      title: `Proof ${index + 1}`,
      type: "Document",
      description: "Supporting document/image for this experience.",
    };
  }

  return {
    image: proof.image,
    title: proof.title || `Proof ${index + 1}`,
    type: proof.type || "Document",
    description:
      proof.description || "Supporting document/image for this experience.",
  };
};

const experiences = [
  {
    id: 0,
    role: "Google Student Ambassador",
    company: "Google",
    location: "Remote",
    duration: "May 2026 - Present",
    description:
      "Google Student Ambassador (GID: 8155) — representing Gemini and Google on campus, building a community of student leaders and innovators.",
    detailSummary:
      "Serving as the face of Gemini on campus, driving impact, building connections, and taking on challenges to represent the brand.",
    achievements: [
      "Official Google Student Ambassador representing Gemini on campus.",
      "Building connections across a nationwide student leader community.",
      "Driving impact through Google and Gemini technologies.",
    ],
    technologies: [
      "Gemini",
      "Google Cloud",
      "Leadership",
      "Community Building",
    ],
    proofs: [
      {
        title: "GSA Announcement",
        type: "Recognition",
        image: "/experience-proofs/gsa-poster.jpg",
        description:
          "Official Google Student Ambassador Announcement with GID: 8155.",
      },
      {
        title: "Welcome Email",
        type: "Offer Letter",
        image: "/experience-proofs/gsa-email.png",
        description: "Official welcome email from The Gemini Program Team.",
      },
      {
        title: "#TeamGemini",
        type: "Badge",
        image: "/experience-proofs/gsa-team.png",
        description: "Official Team Gemini and GSA badge.",
      },
    ],
    logo: resolveLogoCandidates("gsa"),
    logoStyle: "object-contain object-center p-2",
    icon: Medal,
    color: "from-blue-500/80 to-red-500/80",
    glow: "shadow-[0_0_50px_-12px_rgba(66,133,244,0.6)]",
    status: "Active",
  },
  {
    id: 1,
    role: "Virtual Intern",
    company: "Infosys Springboard",
    location: "Remote",
    duration: "May 2026 - Present",
    description:
      "Selected for the Infosys Springboard Virtual Internship 7.0 after completing prerequisite courses and video-proctored assessments.",
    detailSummary:
      "Shortlisted for the virtual internship program and focusing on enhancing skills through a wide range of courses available on Infosys Springboard.",
    achievements: [
      "Successfully completed prerequisite courses and video-proctored assessments.",
      "Selected for the Infosys Springboard Virtual Internship 7.0.",
    ],
    technologies: ["Software Engineering", "Infosys Springboard"],
    proofs: [
      {
        title: "Shortlisted Email",
        type: "Offer Letter",
        image: "/experience-proofs/springboard.png",
        description:
          "Official selection email from Infosys Springboard for Virtual Internship 7.0.",
      },
    ],
    logo: resolveLogoCandidates("infosys"),
    logoStyle: "object-contain object-center p-2",
    icon: Terminal,
    color: "from-blue-600/80 to-indigo-500/80",
    glow: "shadow-[0_0_50px_-12px_rgba(37,99,235,0.6)]",
    status: "Active",
  },
  {
    id: 2,
    role: "Software Developer Intern",
    company: "ByteEdu",
    location: "Remote",
    duration: "Feb 2026 - May 2026",
    description:
      "Contributed to production-ready web features, improved UI quality, and supported full-stack delivery in a remote engineering setup.",
    detailSummary:
      "Worked across frontend and backend responsibilities with focus on clean delivery, implementation quality, and practical feature ownership.",
    achievements: [
      "Built responsive interfaces in React and Tailwind CSS for user-facing modules.",
      "Improved API integration flow and reduced UI-level data handling issues.",
      "Collaborated with team members on feature rollouts, testing, and iterative fixes.",
    ],
    technologies: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    proofs: [
      {
        title: "Internship Offer Letter",
        type: "Offer Letter",
        image: "/experience-proofs/byteedu-offer-letter.png",
        description: "Official internship selection and joining confirmation.",
      },
      {
        title: "Delivery/Contribution Badge",
        type: "Badge",
        image: "/experience-proofs/byteedu-badge.png",
        description: "Badge highlighting contribution and execution quality.",
      },
    ],
    logo: resolveLogoCandidates("byteedu"),
    icon: Terminal,
    color: "from-blue-500/80 to-cyan-400/80",
    glow: "shadow-[0_0_50px_-12px_rgba(6,182,212,0.6)]",
    status: "Completed",
  },
  {
    id: 3,
    role: ["Open Source", "AI / Agents"],
    company: "GirlScript Summer of Code",
    location: "Remote",
    duration: "May 2026 - Present",
    description:
      "Selected as an Open Source and AI/Agents contributor, collaborating with distributed teams on real-world repositories.",
    detailSummary:
      "Contributing to OSS issues, fixes, and collaboration workflows in the AI/Agents track with emphasis on practical impact.",
    achievements: [
      "Contributed fixes and improvements across AI-focused open-source projects.",
      "Enhanced documentation and onboarding clarity for faster contributor ramp-up.",
      "Participated in reviews and issue triage with maintainers and peers.",
    ],
    technologies: ["Open Source", "AI", "Agents", "Git"],
    proofs: [
      {
        title: "Selection Confirmation",
        type: "Recognition",
        image: "/experience-proofs/gssoc-selection.png",
        description:
          "Proof of contributor selection in the open-source program.",
      },
      {
        title: "Contribution Badge",
        type: "Badge",
        image: "/experience-proofs/gssoc-badge.png",
        description: "Program badge representing AI/Agents contribution track.",
      },
      {
        title: "Completion Certificate",
        type: "Completion Certificate",
        image: "/experience-proofs/gssoc-certificate.png",
        description:
          "Certificate of successful completion of the open-source program.",
      },
    ],
    logo: resolveLogoCandidates("gssoc"),
    icon: Sparkles,
    color: "from-orange-500/80 to-yellow-500/80",
    glow: "shadow-[0_0_50px_-12px_rgba(249,115,22,0.6)]",
    status: "Active",
  },
  {
    id: 4,
    role: "Contributor",
    company: "Nexus Spring of Code",
    location: "Remote",
    duration: "Apr 2026 - Present",
    description:
      "Active contributor in a community coding program, delivering feature enhancements and practical fixes in collaborative repositories.",
    detailSummary:
      "Focused on community-driven development, feature refinement, and peer-reviewed improvements in active repositories.",
    achievements: [
      "Implemented reusable UI components for community web applications.",
      "Contributed through code reviews and structured peer feedback cycles.",
      "Strengthened practical development skills across modern JavaScript stacks.",
    ],
    technologies: ["JavaScript", "React", "Open Source"],
    proofs: [
      {
        title: "Program Acceptance",
        type: "Recognition",
        image: "/experience-proofs/nsoc-acceptance.png",
        description: "Acknowledgement of contributor participation in program.",
      },
      {
        title: "Contribution Badge",
        type: "Badge",
        image: "/experience-proofs/nsoc-badge.png",
        description:
          "Contributor badge for active issue resolution and features.",
      },
      {
        title: "Completion Certificate",
        type: "Completion Certificate",
        image: "/experience-proofs/nsoc-certificate.png",
        description:
          "Certificate of successful completion of the open-source program.",
      },
    ],
    logo: resolveLogoCandidates("nsoc"),
    icon: Code2,
    color: "from-emerald-400/80 to-teal-500/80",
    glow: "shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)]",
    status: "Active",
  },
  {
    id: 5,
    role: "Program Participant",
    company: "McKinsey Forward'26",
    location: "Online",
    duration: "April - June 2026",
    description:
      "Completed McKinsey Forward to strengthen problem solving, communication, and leadership.",
    detailSummary:
      "A structured professional development experience covering strategic thinking, communication, and leadership capabilities.",
    achievements: [
      "Built a structured approach to decision-making.",
      "Improved professional communication frameworks.",
      "Applied leadership principles in practical scenarios.",
    ],
    technologies: ["Problem Solving", "Communication", "Leadership"],
    proofs: [
      {
        title: "Program Enrollment / Acceptance",
        type: "Recognition",
        image: "/experience-proofs/mckinsey-acceptance.png",
        description: "Enrollment or acceptance confirmation for the program.",
      },
      {
        title: "Learning Milestone Badge",
        type: "Badge",
        image: "/experience-proofs/mckinsey-badge.png",
        description: "Badge earned through curriculum milestone completion.",
      },
    ],
    logo: resolveLogoCandidates("mckinsey"),
    icon: GraduationCap,
    color: "from-sky-500/80 to-indigo-500/80",
    glow: "shadow-[0_0_50px_-12px_rgba(59,130,246,0.55)]",
    status: "Active",
  },
] satisfies ExperienceItem[];

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [selectedProofIndex, setSelectedProofIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const angle = 360 / experiences.length;
  const radius = Math.max(
    400,
    400 / Math.tan(Math.PI / experiences.length) + 50,
  );
  const containerZ = 400 - radius;

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));

  const openExperienceDetail = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setSelectedProofIndex(0);
  };

  const selectedProofs = selectedExperience
    ? (selectedExperience.proofs ?? []).map((proof, idx) =>
        normalizeProof(proof, idx),
      )
    : [];

  useEffect(() => {
    if (!selectedExperience) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [selectedExperience]);

  useEffect(() => {
    if (!selectedExperience) return;
    if (selectedProofs.length === 0) {
      if (selectedProofIndex !== 0) setSelectedProofIndex(0);
      return;
    }
    if (selectedProofIndex >= selectedProofs.length) {
      setSelectedProofIndex(0);
    }
  }, [selectedExperience, selectedProofIndex, selectedProofs.length]);

  const detailModal = (
    <AnimatePresence>
      {selectedExperience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center md:p-6"
          onClick={() => setSelectedExperience(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:h-[85vh] md:max-w-6xl overflow-hidden md:rounded-[2.5rem] border border-border/50 bg-background/95 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row group/modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Theme-Aligned Glow Background inside Modal */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedExperience(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 md:right-6 md:top-6 z-50 rounded-full bg-background/80 p-2.5 text-muted-foreground hover:text-foreground hover:bg-background transition-all backdrop-blur-md border border-border/50 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Image Showcase & Gallery (No Scrollbars) */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full relative bg-muted/20 border-b md:border-b-0 md:border-r border-border/50 flex flex-col z-10 overflow-hidden">
              <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProofIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={
                      selectedProofs[selectedProofIndex]?.image ||
                      defaultProofPreview
                    }
                    alt={selectedProofs[selectedProofIndex]?.title || "Proof"}
                    className="absolute inset-4 md:inset-8 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] h-[calc(100%-2rem)] md:h-[calc(100%-4rem)] object-contain rounded-2xl drop-shadow-2xl ring-1 ring-border/50 mx-auto my-auto"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        defaultProofPreview;
                    }}
                  />
                </AnimatePresence>

                {/* Arrow Navigation */}
                {selectedProofs.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProofIndex((prev) =>
                          prev === 0 ? selectedProofs.length - 1 : prev - 1,
                        );
                      }}
                      aria-label="Previous image"
                      className="absolute left-2 md:left-6 z-20 p-2 rounded-full bg-background/60 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border/50 shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProofIndex(
                          (prev) => (prev + 1) % selectedProofs.length,
                        );
                      }}
                      aria-label="Next image"
                      className="absolute right-2 md:right-6 z-20 p-2 rounded-full bg-background/60 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border/50 shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Proof Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 transform translate-y-2 opacity-0 group-hover/modal:translate-y-0 group-hover/modal:opacity-100 transition-all duration-500 shadow-xl z-30">
                  <h4 className="text-foreground font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    {selectedProofs[selectedProofIndex]?.title ||
                      "Document Preview"}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {selectedProofs[selectedProofIndex]?.description ||
                      "Supporting document for this experience."}
                  </p>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {selectedProofs.length > 1 && (
                <div className="h-28 md:h-32 bg-background/60 backdrop-blur-lg border-t border-border/50 p-4 flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {selectedProofs.map((proof, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedProofIndex(idx)}
                      aria-label={`View ${proof.title}`}
                      className={`relative shrink-0 h-full aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 border ${
                        selectedProofIndex === idx
                          ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-100 opacity-100"
                          : "border-border/30 opacity-50 hover:opacity-100 hover:scale-95"
                      }`}
                    >
                      <img
                        src={proof.image}
                        alt={proof.title}
                        loading="lazy"
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            defaultProofPreview;
                        }}
                      />
                      {selectedProofIndex === idx && (
                        <motion.div
                          layoutId="active-thumbnail"
                          className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Content Details */}
            <div className="w-full md:w-1/2 h-[55vh] md:h-full p-6 md:p-10 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent z-10">
              {/* Header Info */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 shrink-0 rounded-2xl p-0.5 bg-gradient-to-br ${selectedExperience.color} shadow-lg`}
                >
                  <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center p-1.5 border border-border/50">
                    <img
                      src={selectedExperience.logo[0]}
                      alt="logo"
                      loading="lazy"
                      width={64}
                      height={64}
                      className={"w-full h-full object-contain "}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          defaultProofPreview;
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-1 tracking-tight">
                    {selectedExperience.company}
                  </h3>
                  <p className="text-primary font-medium tracking-wide">
                    {Array.isArray(selectedExperience.role)
                      ? selectedExperience.role.join(" • ")
                      : selectedExperience.role}
                  </p>
                </div>
              </div>

              {/* Meta Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedExperience.status && (
                  <div
                    className={`flex items-center gap-1.5 border rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide ${
                      selectedExperience.status === "Completed"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    {selectedExperience.status === "Completed" ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                    {selectedExperience.status}
                  </div>
                )}
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary">
                  <Calendar className="w-4 h-4" />
                  {selectedExperience.duration}
                </div>
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary">
                  <MapPin className="w-4 h-4" />
                  {selectedExperience.location}
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed mb-8">
                <p>{selectedExperience.detailSummary}</p>
                <p>{selectedExperience.description}</p>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-primary" />
                  Key Achievements
                </h4>
                <div className="space-y-4">
                  {selectedExperience.achievements.map((achievement, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      key={i}
                      className="flex gap-3 bg-card/50 border border-border/50 rounded-2xl p-4 shadow-sm hover:bg-card/80 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 bg-gradient-to-br ${selectedExperience.color} shrink-0`}
                      />
                      <p className="text-foreground/90 text-sm leading-relaxed">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-card border border-border/50 text-foreground hover:bg-card/80 hover:scale-105 transition-all shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-6 border-t border-border/50">
                <a
                  href={linkedinExperienceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground py-4 text-sm font-bold transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Profile on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section
        id="experience"
        className="py-24 relative overflow-hidden"
        style={{ position: "relative" }}
        ref={containerRef}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-50 mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-md">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Experience
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
              <span className="text-foreground">Professional</span>{" "}
              <span className="text-gradient">
                Experience
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Interact with the 3D space. Navigate through my professional roles
              below.
            </p>
          </motion.div>

          <div className="flex justify-end mt-4 mb-1 w-full pr-2">
            <a
              href={linkedinExperienceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-foreground transition-colors font-bold text-sm tracking-widest uppercase"
            >
              VIEW ALL EXPERIENCES &rarr;
            </a>
          </div>

          <div className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center perspective-[1200px] -mt-3">
            <motion.div
              className="w-full max-w-3xl h-[450px] md:h-[500px] relative preserve-3d"
              animate={{ rotateY: activeIndex * -angle, z: containerZ }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 1,
              }}
            >
              {experiences.map((exp, index) => {
                const currentAngle = angle * index;
                const isActive = index === activeIndex;
                const Icon = exp.icon;

                return (
                  <div
                    key={exp.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotateY(${currentAngle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isActive ? 1 : 0.8,
                        filter: isActive ? "blur(0px)" : "blur(4px)",
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-[90vw] max-w-[800px] h-full rounded-[2rem] border border-white/10 ${isActive ? exp.glow : ""} p-8 md:p-10 overflow-hidden flex flex-col justify-center relative bg-card/60 backdrop-blur-xl cursor-pointer`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${exp.color} rounded-full blur-[80px] opacity-30 mix-blend-screen pointer-events-none`}
                      />

                      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start h-full">
                        <div className="w-full md:w-1/3 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
                          <div
                            className={`w-24 h-24 rounded-[1.8rem] flex items-center justify-center bg-gradient-to-br ${exp.color} p-[1.5px] shadow-[0_0_25px_rgba(56,189,248,0.25)]`}
                          >
                            <div className="w-full h-full rounded-[1.65rem] bg-background/95 border border-white/10 flex items-center justify-center backdrop-blur-md overflow-hidden">
                              <img
                                src={exp.logo[0]}
                                alt={`${exp.company} logo`}
                                loading="lazy"
                                width={96}
                                height={96}
                                className={`w-full h-full ${exp.logoStyle || "object-cover object-center scale-[1.06]"}`}
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  const currentSrc =
                                    target.getAttribute("src") || "";
                                  const nextIndex =
                                    exp.logo.findIndex(
                                      (candidate) => candidate === currentSrc,
                                    ) + 1;
                                  if (
                                    nextIndex > 0 &&
                                    nextIndex < exp.logo.length
                                  ) {
                                    target.setAttribute(
                                      "src",
                                      exp.logo[nextIndex],
                                    );
                                    return;
                                  }
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement | null;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                              />
                              <span className="hidden w-full h-full items-center justify-center">
                                <Icon className="w-10 h-10 text-white" />
                              </span>
                            </div>
                          </div>

                          <div>
                            <h3
                              className={`font-semibold text-foreground tracking-tight leading-[1.15] mb-2 [text-wrap:balance] ${
                                exp.company.length > 20
                                  ? "text-[1.75rem] md:text-[1.95rem] leading-[1.1]"
                                  : "text-3xl md:text-[2.1rem]"
                              }`}
                            >
                              {exp.company}
                            </h3>
                            <div
                              className={`inline-block -ml-1 px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} text-white text-xs font-bold tracking-wider uppercase mb-4 shadow-lg`}
                            >
                              {Array.isArray(exp.role) ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {exp.role.map((line) => (
                                    <li key={line}>{line}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="whitespace-pre-line">
                                  {exp.role}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 text-[0.95rem] text-muted-foreground/95 font-medium items-center md:items-start">
                              {exp.status && (
                                <div
                                  className={`flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50 ${
                                    exp.status === "Completed"
                                      ? "text-emerald-400"
                                      : "text-blue-400"
                                  }`}
                                >
                                  {exp.status === "Completed" ? (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                  )}
                                  <span className="tracking-[0.01em] text-sm font-semibold uppercase">
                                    {exp.status}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="tracking-[0.01em]">
                                  {exp.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="tracking-[0.01em]">
                                  {exp.location}
                                </span>
                              </div>
                            </div>
                            <div className="pt-4 w-full flex justify-center md:justify-start">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openExperienceDetail(exp);
                                }}
                                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-[0.9rem] font-semibold text-primary hover:bg-primary/20 hover:text-foreground transition-colors"
                              >
                                <FileText className="w-4 h-4" />
                                View Experience Details
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col gap-4 justify-center h-full">
                          <p className="text-foreground/90 text-[1.16rem] md:text-[1.22rem] leading-[1.7] font-normal antialiased tracking-[0.005em]">
                            {exp.description}
                          </p>

                          <div className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-br ${exp.color} shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0`}
                                />
                                <span className="text-muted-foreground/95 text-[1.02rem] md:text-[1.07rem] leading-[1.75] font-normal antialiased tracking-[0.005em]">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-6 mt-auto flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 text-[0.8rem] font-medium tracking-[0.01em] rounded-md bg-white/5 border border-white/10 text-foreground/90 hover:bg-white/10 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
              <button
                onClick={prevSlide}
                aria-label="Previous experience"
                className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
              >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>
              <div className="flex gap-3">
                {experiences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to experience ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === idx ? "bg-primary scale-125 shadow-[0_0_10px_rgba(var(--primary),0.8)]" : "bg-foreground/20 dark:bg-white/20 hover:bg-foreground/40 dark:hover:bg-white/40"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                aria-label="Next experience"
                className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
              >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1200px] {
          perspective: 1200px;
        }
      `}</style>
      </section>
      {typeof document !== "undefined"
        ? createPortal(detailModal, document.body)
        : detailModal}
    </>
  );
};

export default ExperienceSection;
