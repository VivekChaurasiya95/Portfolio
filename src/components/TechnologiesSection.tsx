import { motion } from "framer-motion";

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
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
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
  { name: "Flask", icon: "https://cdn.simpleicons.org/flask/white" },
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
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/white" },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
];

const TechnologiesSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-transparent border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-20 relative z-10 mb-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-wider text-secondary capitalize text-center font-serif italic">
            Technologies I Work With
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10"></div>

        <motion.div
          className="flex gap-6 md:gap-8 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {/* Render the array twice for seamless looping */}
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] h-[100px] md:h-[120px] rounded-2xl bg-[#111318]/80 backdrop-blur-sm border border-white/5 hover:border-primary/50 hover:shadow-glow hover:-translate-y-2 hover:bg-[#1a1d24] transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
