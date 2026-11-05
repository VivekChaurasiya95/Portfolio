type Technology = {
  name: string;
  icon: string;
  category: string;
  lightTile?: boolean;
};

const technologies: Technology[] = [
  { name: "HTML5", category: "FRONTEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "FRONTEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", category: "LANGUAGE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", category: "LANGUAGE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", category: "FRONTEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", category: "FRONTEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", lightTile: true },
  { name: "Node.js", category: "BACKEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "C++", category: "LANGUAGE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", category: "LANGUAGE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Flask", category: "BACKEND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", lightTile: true },
  { name: "NumPy", category: "AI & ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Pandas", category: "AI & ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "Matplotlib", category: "AI & ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Seaborn", category: "AI & ML", icon: "https://seaborn.pydata.org/_static/logo-mark-lightbg.svg", lightTile: true },
  { name: "MongoDB", category: "DATABASE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", category: "DATABASE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", category: "DATABASE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Supabase", category: "DATABASE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Git", category: "DEVOPS & TOOLS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", category: "DEVOPS & TOOLS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", lightTile: true },
  { name: "Flutter", category: "MOBILE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
];

const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

const TechPill = ({ tech }: { tech: Technology }) => (
  <div className="flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-card/70 dark:bg-white/[0.06] backdrop-blur-xl border border-border/40 dark:border-white/10 shadow-lg hover:border-primary/40 hover:shadow-glow transition-all duration-300 shrink-0 cursor-pointer">
    <span
      className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 p-0.5 shrink-0 ${
        tech.lightTile ? "dark:bg-white dark:rounded-md" : ""
      }`}
    >
      <img
        src={tech.icon}
        alt={tech.name}
        width={28}
        height={28}
        loading="lazy"
        className="max-w-full max-h-full object-contain"
      />
    </span>
    <span className="text-xs sm:text-sm font-bold font-sans text-foreground whitespace-nowrap tracking-tight">
      {tech.name}
    </span>
    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 dark:bg-white/10 rounded-full px-1.5 sm:px-2 py-1 whitespace-nowrap">
      {tech.category}
    </span>
  </div>
);

const TechnologiesSection = () => {
  return (
    <section className="pt-10 sm:pt-16 pb-6 sm:pb-8 relative overflow-hidden bg-transparent border-y border-border/20 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10 mb-6 sm:mb-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-wider text-secondary capitalize text-center font-meridian italic">
            Technologies I Work With
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Row 1: scrolls left */}
          <div className="flex gap-3 sm:gap-4 w-max px-4 animate-marquee hover:[animation-play-state:paused]">
            {[...firstRow, ...firstRow].map((tech, i) => (
              <TechPill key={`row1-${tech.name}-${i}`} tech={tech} />
            ))}
          </div>

          {/* Row 2: scrolls right */}
          <div className="flex gap-3 sm:gap-4 w-max px-4 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...secondRow, ...secondRow].map((tech, i) => (
              <TechPill key={`row2-${tech.name}-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
