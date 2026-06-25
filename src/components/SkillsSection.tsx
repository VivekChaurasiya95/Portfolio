import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

// Official tech logo SVG components
const TechIcons: Record<string, React.FC<{ className?: string }>> = {
  Python: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      className={className}
      alt="Python"
    />
  ),
  JavaScript: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
      className={className}
      alt="JavaScript"
    />
  ),
  C: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
      className={className}
      alt="C"
    />
  ),
  "C++": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
      className={className}
      alt="C++"
    />
  ),
  TypeScript: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      className={className}
      alt="TypeScript"
    />
  ),
  SQL: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="25" rx="40" ry="15" fill="#4479A1" />
      <path
        d="M10 25v50c0 8.284 17.909 15 40 15s40-6.716 40-15V25"
        fill="#4479A1"
      />
      <ellipse cx="50" cy="25" rx="40" ry="15" fill="#5B9BD5" />
      <path
        d="M90 25c0 8.284-17.909 15-40 15S10 33.284 10 25"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 50c0 8.284 17.909 15 40 15s40-6.716 40-15"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="#fff"
        fontSize="20"
        fontWeight="bold"
        fontFamily="Arial"
      >
        SQL
      </text>
    </svg>
  ),
  HTML: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
      className={className}
      alt="HTML"
    />
  ),
  CSS: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
      className={className}
      alt="CSS"
    />
  ),
  React: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      className={className}
      alt="React"
    />
  ),
  "Next.Js": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
      className={className}
      alt="Next.js"
    />
  ),
  "Tailwind Css": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
      className={className}
      alt="Tailwind CSS"
    />
  ),
  "Mermaid.Js": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.simpleicons.org/mermaid/FF3670"
      className={className}
      alt="Mermaid.Js"
    />
  ),
  Stitch: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#FCB9FA" />
      <path
        d="M 40 28 h 20 a 2 2 0 0 1 0 4 h -2 v 12 l -18 28 a 5 5 0 0 0 4 7 h 32 a 5 5 0 0 0 4 -7 l -18 -28 v -12 h -2 a 2 2 0 0 1 0 -4 Z"
        fill="#000"
      />
      <path
        d="M 37 54 c 10 10 20 -5 32 0 l 2 4 c -12 -5 -22 10 -32 0 z"
        fill="#FCB9FA"
      />
    </svg>
  ),
  "Three.js": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg"
      className={className}
      alt="Three.js"
    />
  ),
  "Framer Motion": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.simpleicons.org/framer/0055FF"
      className={className}
      alt="Framer Motion"
    />
  ),
  Figma: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
      className={className}
      alt="Figma"
    />
  ),
  Canva: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg"
      className={className}
      alt="Canva"
    />
  ),
  Shadcn: ({ className }) => (
    <svg className={className} viewBox="0 0 256 256" fill="none">
      <path d="M208 128l-80 80M192 40L40 192" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Spline: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="splineGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="30%" stopColor="#ff9aff" />
          <stop offset="60%" stopColor="#47e3ff" />
          <stop offset="100%" stopColor="#4568dc" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="#1A1C23" />
      <circle cx="50" cy="50" r="42" fill="#0F1015" />
      <circle cx="50" cy="50" r="36" fill="url(#splineGrad)" />
    </svg>
  ),
  "Node.Js": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      className={className}
      alt="Node.js"
    />
  ),
  "Express.Js": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
      className={className}
      alt="Express.js"
    />
  ),
  Flask: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg"
      className={className}
      alt="Flask"
    />
  ),
  MySQL: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
      className={className}
      alt="MySQL"
    />
  ),
  MongoDB: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      className={className}
      alt="MongoDB"
    />
  ),
  PostgreSQL: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      className={className}
      alt="PostgreSQL"
    />
  ),
  SupaBase: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
      className={className}
      alt="Supabase"
    />
  ),
  Git: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
      className={className}
      alt="Git"
    />
  ),
  Github: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
      className={className}
      alt="GitHub"
    />
  ),
  Firebase: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
      className={className}
      alt="Firebase"
    />
  ),
  Vercel: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
      className={className}
      alt="Vercel"
    />
  ),
  Netlify: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg"
      className={className}
      alt="Netlify"
    />
  ),
  Render: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="20" fill="#000" />
      <path d="M40 30h20a10 10 0 010 20H40V30zM40 50h10l10 20H40V50z" fill="#fff" />
    </svg>
  ),
  Numpy: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"
      className={className}
      alt="NumPy"
    />
  ),
  Pandas: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg"
      className={className}
      alt="Pandas"
    />
  ),
  MatplotLib: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg"
      className={className}
      alt="Matplotlib"
    />
  ),
  Seaborn: ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://seaborn.pydata.org/_static/logo-mark-lightbg.svg"
      className={className}
      alt="Seaborn"
    />
  ),
  "Google Colab": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.simpleicons.org/googlecolab/F9AB00"
      className={className}
      alt="Google Colab"
    />
  ),
  "Data Structures": ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="35" y="10" width="30" height="20" rx="4" fill="#E74C3C" />
      <rect x="10" y="45" width="30" height="20" rx="4" fill="#3498DB" />
      <rect x="60" y="45" width="30" height="20" rx="4" fill="#2ECC71" />
      <rect x="35" y="75" width="30" height="20" rx="4" fill="#F1C40F" />
      <line x1="50" y1="30" x2="25" y2="45" stroke="#fff" strokeWidth="2" />
      <line x1="50" y1="30" x2="75" y2="45" stroke="#fff" strokeWidth="2" />
      <line x1="25" y1="65" x2="50" y2="75" stroke="#fff" strokeWidth="2" />
      <line x1="75" y1="65" x2="50" y2="75" stroke="#fff" strokeWidth="2" />
    </svg>
  ),
  Algorithms: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <path
        d="M20 80 L50 20 L80 80"
        stroke="#9B59B6"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="50" cy="20" r="8" fill="#8E44AD" />
      <circle cx="20" cy="80" r="8" fill="#3498DB" />
      <circle cx="80" cy="80" r="8" fill="#E74C3C" />
      <circle cx="35" cy="50" r="6" fill="#F1C40F" />
      <circle cx="65" cy="50" r="6" fill="#2ECC71" />
      <line x1="35" y1="50" x2="65" y2="50" stroke="#fff" strokeWidth="2" />
    </svg>
  ),
  "Design Pattern": ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <polygon points="50,10 90,30 50,50 10,30" fill="#34495E" />
      <polygon points="50,30 90,50 50,70 10,50" fill="#E67E22" />
      <polygon points="50,50 90,70 50,90 10,70" fill="#1ABC9C" />
    </svg>
  ),
  "Computer Network": ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#3498DB"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="50" cy="20" r="10" fill="#E74C3C" />
      <circle cx="20" cy="65" r="10" fill="#2ECC71" />
      <circle cx="80" cy="65" r="10" fill="#F1C40F" />
      <line x1="50" y1="30" x2="25" y2="58" stroke="#fff" strokeWidth="2" />
      <line x1="50" y1="30" x2="75" y2="58" stroke="#fff" strokeWidth="2" />
      <line x1="30" y1="65" x2="70" y2="65" stroke="#fff" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#9B59B6" />
    </svg>
  ),
  "Operating System": ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect
        x="15"
        y="20"
        width="70"
        height="60"
        rx="5"
        fill="#2C3E50"
        stroke="#95A5A6"
        strokeWidth="4"
      />
      <circle cx="30" cy="35" r="5" fill="#E74C3C" />
      <circle cx="45" cy="35" r="5" fill="#F1C40F" />
      <circle cx="60" cy="35" r="5" fill="#2ECC71" />
      <path
        d="M30 60 L45 75 L70 45"
        stroke="#3498DB"
        strokeWidth="5"
        fill="none"
      />
    </svg>
  ),
  DBMS: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="25" rx="35" ry="12" fill="#E67E22" />
      <path
        d="M15 25 v25 c0 6.6 15.7 12 35 12 s35 -5.4 35 -12 v-25"
        fill="#D35400"
      />
      <path
        d="M15 50 v25 c0 6.6 15.7 12 35 12 s35 -5.4 35 -12 v-25"
        fill="#E67E22"
      />
    </svg>
  ),
  OOPs: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="25" y="20" width="30" height="30" fill="#3498DB" />
      <rect x="45" y="40" width="30" height="30" fill="#9B59B6" opacity="0.8" />
      <circle cx="70" cy="30" r="15" fill="#E74C3C" opacity="0.9" />
      <polygon points="20,80 40,50 60,80" fill="#2ECC71" opacity="0.9" />
    </svg>
  ),
  CSO: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        fill="#16A085"
        stroke="#fff"
        strokeWidth="2"
      />
      <rect x="35" y="35" width="30" height="30" fill="#1ABC9C" />
      <line x1="25" y1="40" x2="15" y2="40" stroke="#fff" strokeWidth="4" />
      <line x1="25" y1="60" x2="15" y2="60" stroke="#fff" strokeWidth="4" />
      <line x1="75" y1="40" x2="85" y2="40" stroke="#fff" strokeWidth="4" />
      <line x1="75" y1="60" x2="85" y2="60" stroke="#fff" strokeWidth="4" />
      <line x1="40" y1="25" x2="40" y2="15" stroke="#fff" strokeWidth="4" />
      <line x1="60" y1="25" x2="60" y2="15" stroke="#fff" strokeWidth="4" />
      <line x1="40" y1="75" x2="40" y2="85" stroke="#fff" strokeWidth="4" />
      <line x1="60" y1="75" x2="60" y2="85" stroke="#fff" strokeWidth="4" />
    </svg>
  ),
  TOC: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <circle
        cx="30"
        cy="50"
        r="15"
        stroke="#34495E"
        strokeWidth="4"
        fill="#F39C12"
      />
      <circle
        cx="70"
        cy="50"
        r="15"
        stroke="#34495E"
        strokeWidth="4"
        fill="#3498DB"
      />
      <circle
        cx="70"
        cy="50"
        r="10"
        stroke="#34495E"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M45 50 Q50 40 55 50"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrow)"
      />
      <path
        d="M55 50 Q50 60 45 50"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#fff" />
        </marker>
      </defs>
    </svg>
  ),
  "Software Engineering": ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="20" y="20" width="60" height="60" rx="8" fill="#8E44AD" />
      <path
        d="M40 35 L60 35 M40 50 L60 50 M40 65 L50 65"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="30" cy="35" r="4" fill="#F1C40F" />
      <circle cx="30" cy="50" r="4" fill="#2ECC71" />
      <circle cx="30" cy="65" r="4" fill="#E74C3C" />
    </svg>
  ),
  "Gemini AI": ({ className }) => (
    <img width={40} height={40} loading="lazy" src="/gemini.png" className={className} alt="Gemini AI" />
  ),
  Codex: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="codexGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8783E0" />
          <stop offset="100%" stopColor="#4239ED" />
        </radialGradient>
      </defs>
      <path
        d="M 50 10 C 80 10 90 30 90 50 C 90 70 80 90 50 90 C 20 90 10 70 10 50 C 10 30 20 10 50 10 Z"
        fill="url(#codexGrad)"
      />
      <path
        d="M 35 38 L 48 50 L 35 62"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 53 62 h 14"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  "Claude AI": ({ className }) => (
    <img width={40} height={40} loading="lazy" src="/claude.png" className={className} alt="Claude AI" />
  ),
  ChatGpt: ({ className }) => (
    <img width={40} height={40} loading="lazy" src="/chatgpt.png" className={className} alt="ChatGPT" />
  ),
  "Google AI Studio": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="/google ai studio.png"
      className={className}
      alt="Google AI Studio"
    />
  ),
  "Android Studio": ({ className }) => (
    <img width={40} height={40} loading="lazy" src="/android studio.png" className={className} alt="Android Studio" />
  ),
  "GitHub Copilot": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="https://cdn.simpleicons.org/githubcopilot/ffffff"
      className={className}
      alt="GitHub Copilot"
    />
  ),
  "AntiGravity IDE": ({ className }) => (
    <img width={40} height={40} loading="lazy"
      src="/antigravity.png?v=2"
      className={className}
      alt="AntiGravity IDE"
    />
  ),
};

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "C", "C++", "TypeScript", "SQL"],
  },
  {
    title: "Frontend & Design",
    skills: [
      "HTML",
      "CSS",
      "React",
      "Next.Js",
      "Tailwind Css",
      "Mermaid.Js",
      "Stitch",
      "Three.js",
      "Framer Motion",
      "Figma",
      "Canva",
      "Shadcn",
      "Spline",
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      "Node.Js",
      "Express.Js",
      "Flask",
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "SupaBase",
      "Git",
      "Github",
      "Firebase",
      "Vercel",
      "Netlify",
      "Render",
    ],
  },
  {
    title: "Data Science & AIML",
    skills: [
      "Numpy",
      "Pandas",
      "MatplotLib",
      "Seaborn",
      "Google Colab",
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      "Data Structures",
      "Algorithms",
      "Design Pattern",
      "Computer Network",
      "Operating System",
      "DBMS",
      "OOPs",
      "CSO",
      "TOC",
      "Software Engineering",
    ],
  },
  {
    title: "AI Tools & Technologies",
    skills: [
      "Gemini AI",
      "Codex",
      "Claude AI",
      "ChatGpt",
      "Google AI Studio",
      "Android Studio",
      "GitHub Copilot",
      "AntiGravity IDE",
    ],
  },
];

const SkillBadge = ({
  skill,
  index,
  catIndex,
}: {
  skill: string;
  index: number;
  catIndex: number;
}) => {
  const IconComponent = TechIcons[skill];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: catIndex * 0.08 + index * 0.04,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: 1.08,
        y: -3,
        transition: { duration: 0.18, type: "spring", stiffness: 400 },
      }}
      className="flex items-center gap-2.5 px-[18px] py-[9.5px] rounded-xl bg-muted/60 dark:bg-[#111318] border border-border/30 dark:border-white/5 hover:border-primary/40 dark:hover:border-white/10 hover:bg-primary/5 dark:hover:bg-[#1a1d24] hover:shadow-[0_4px_20px_hsl(var(--primary)/0.15)] transition-all cursor-default"
    >
      {/* Icon container */}
      <div
        className="flex items-center justify-center w-5 h-5 shrink-0"
        style={{ width: 22, height: 22, minWidth: 22, minHeight: 22 }}
      >
        {IconComponent ? (
          <IconComponent className="w-full h-full object-contain drop-shadow-sm" />
        ) : (
          <div className="w-full h-full rounded-sm bg-gradient-to-br from-primary/50 to-secondary/50" />
        )}
      </div>

      {/* Skill name */}
      <span className="text-[14px] sm:text-[15px] font-semibold tracking-wide text-foreground/90 font-['Space_Grotesk'] leading-none pt-0.5">
        {skill}
      </span>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              My Skills
            </span>
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
            <span className="text-foreground">My Tech</span>{" "}
            <span className="text-gradient">Stack</span>
          </h2>
          <p className="section-subheading text-[1.06rem] md:text-[1.13rem] max-w-[46rem] mx-auto">
            A curated collection of technologies I've mastered.
            <br />
            <span className="text-primary font-medium">
              Each skill represents countless hours of practice and real-world
              application.
            </span>
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
              whileHover={{
                boxShadow: "0 8px 40px hsl(var(--primary)/0.12)",
                borderColor: "hsl(var(--primary)/0.3)",
                transition: { duration: 0.3 },
              }}
              className="relative p-6 sm:p-8 rounded-[2rem] bg-card/80 dark:bg-[#0a0a0a] border border-border/30 dark:border-white/5 transition-colors duration-500 group"
            >
              {/* Animated gradient glow on hover */}
              <motion.div
                className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/0 opacity-0 group-hover:opacity-100 -z-10 blur-sm"
                transition={{ duration: 0.4 }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-6 h-[2px] bg-[#B57B85] rounded-full"
                  whileHover={{ scaleX: 1.5 }}
                />
                <h3 className="text-xl font-bold tracking-wide text-[#B57B85] font-['Space_Grotesk']">
                  {category.title}
                </h3>
              </div>

              {/* Skills Inner Grid (Flex wrap for pills) */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={skillIndex}
                    catIndex={catIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
