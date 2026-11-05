
const technologies = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  {
    name: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  },
  {
    name: "Matplotlib",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  },
  {
    name: "Seaborn",
    icon: "https://seaborn.pydata.org/_static/logo-mark-lightbg.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
];

const TechnologiesSection = () => {
  return (
    <section className="py-10 sm:py-16 relative overflow-hidden bg-transparent border-y border-border/20 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10 mb-6 sm:mb-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-secondary capitalize text-center font-meridian italic">
            Technologies I Work With
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 sm:gap-6 md:gap-8 w-max px-4 animate-marquee hover:[animation-play-state:paused]">
          {/* Render the array twice for seamless looping */}
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center justify-center min-w-[85px] xs:min-w-[95px] md:min-w-[120px] h-[85px] xs:h-[95px] md:h-[120px] p-2 rounded-xl sm:rounded-2xl bg-muted/60 dark:bg-[#111318]/80 backdrop-blur-sm border border-border/30 dark:border-white/5 hover:border-primary/50 hover:shadow-glow hover:-translate-y-1 sm:hover:-translate-y-2 hover:bg-muted dark:hover:bg-[#1a1d24] transition-all duration-300 group relative overflow-hidden cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1.5 sm:mb-2.5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center truncate max-w-full px-1">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
