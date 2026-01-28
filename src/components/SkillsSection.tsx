import { motion } from 'framer-motion';
import { Code2, Database, Wrench, Layers } from 'lucide-react';

// Skill data with icons (using SVG paths for tech logos)
const skillsWithIcons = {
  // Programming Languages
  Python: { color: '#3776AB', icon: '🐍' },
  'C++': { color: '#00599C', icon: null, text: 'C++' },
  TypeScript: { color: '#3178C6', icon: null, text: 'TS' },
  JavaScript: { color: '#F7DF1E', icon: null, text: 'JS' },
  Java: { color: '#ED8B00', icon: '☕' },
  SQL: { color: '#4479A1', icon: null, text: 'SQL' },
  // Frameworks
  React: { color: '#61DAFB', icon: '⚛️' },
  'Next.js': { color: '#ffffff', icon: '▲' },
  'Node.js': { color: '#339933', icon: '⬢' },
  TensorFlow: { color: '#FF6F00', icon: null, text: 'TF' },
  PyTorch: { color: '#EE4C2C', icon: '🔥' },
  FastAPI: { color: '#009688', icon: '⚡' },
  'Tailwind CSS': { color: '#06B6D4', icon: '🌊' },
  // Databases
  PostgreSQL: { color: '#4169E1', icon: '🐘' },
  MongoDB: { color: '#47A248', icon: '🍃' },
  MySQL: { color: '#4479A1', icon: '🐬' },
  Redis: { color: '#DC382D', icon: '◆' },
  Supabase: { color: '#3FCF8E', icon: '⚡' },
  // Tools
  'Git & GitHub': { color: '#F05032', icon: '🔀' },
  Docker: { color: '#2496ED', icon: '🐳' },
  Kubernetes: { color: '#326CE5', icon: '☸️' },
  'Machine Learning': { color: '#9B59B6', icon: '🧠' },
  'Deep Learning': { color: '#8E44AD', icon: '🔮' },
  'Data Science': { color: '#1ABC9C', icon: '📊' },
  'Data Structures': { color: '#E74C3C', icon: '🏗️' },
  Algorithms: { color: '#3498DB', icon: '🔄' },
  'System Design': { color: '#2ECC71', icon: '🏛️' },
};

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGlow: 'hover:shadow-blue-500/20',
    skills: ['Python', 'C++', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGlow: 'hover:shadow-purple-500/20',
    skills: ['React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch', 'FastAPI', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    icon: Database,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderGlow: 'hover:shadow-emerald-500/20',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    title: 'Tools & Concepts',
    icon: Wrench,
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderGlow: 'hover:shadow-orange-500/20',
    skills: ['Git & GitHub', 'Docker', 'Kubernetes', 'Machine Learning', 'Deep Learning', 'Data Science', 'Data Structures', 'Algorithms', 'System Design'],
  },
];

const SkillBadge = ({ skill, index, catIndex }: { skill: string; index: number; catIndex: number }) => {
  const skillData = skillsWithIcons[skill as keyof typeof skillsWithIcons] || { color: '#888', icon: '•', text: undefined };
  const displayText = 'text' in skillData ? skillData.text : undefined;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: catIndex * 0.1 + index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.08,
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div 
        className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm cursor-default transition-all duration-300 hover:border-white/25 hover:shadow-lg"
        style={{
          boxShadow: `0 0 0 0 ${skillData.color}00`,
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{ backgroundColor: skillData.color + '30' }}
        />
        
        {/* Icon container */}
        <div 
          className="flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: skillData.color + '20',
            color: skillData.color,
            boxShadow: `0 0 12px ${skillData.color}40`
          }}
        >
        {skillData.icon || (
            <span className="text-[10px] font-bold tracking-tight">
              {displayText || skill.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Skill name */}
        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors whitespace-nowrap">
          {skill}
        </span>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
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
          className="mb-16"
        >
          <h2 className="section-heading mb-4">
            <span className="text-foreground">My Tech</span>{' '}
            <span className="text-gradient">Stack</span>
          </h2>
          <p className="section-subheading">
            ~ Technologies I have worked with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className={`relative group rounded-2xl p-6 md:p-8 bg-gradient-to-br ${category.gradient} border border-white/10 backdrop-blur-md transition-all duration-500 hover:shadow-2xl ${category.borderGlow}`}
            >
              {/* Background glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category header */}
              <div className="relative flex items-center gap-4 mb-8">
                <motion.div 
                  className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <category.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">{category.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{category.skills.length} technologies</p>
                </div>
              </div>

              {/* Skills */}
              <div className="relative flex flex-wrap gap-3">
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
        </div>

        {/* Constellation visualization - subtle background element */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Subtle connecting lines */}
            <line x1="20" y1="30" x2="50" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.1" opacity="0.3" />
            <line x1="50" y1="50" x2="80" y2="35" stroke="hsl(var(--primary))" strokeWidth="0.1" opacity="0.3" />
            <line x1="50" y1="50" x2="70" y2="70" stroke="hsl(var(--secondary))" strokeWidth="0.1" opacity="0.3" />
            <line x1="30" y1="70" x2="50" y2="50" stroke="hsl(var(--secondary))" strokeWidth="0.1" opacity="0.3" />
            
            {/* Node points */}
            <circle cx="20" cy="30" r="0.5" fill="hsl(var(--primary))" />
            <circle cx="50" cy="50" r="0.8" fill="hsl(var(--primary))" />
            <circle cx="80" cy="35" r="0.5" fill="hsl(var(--primary))" />
            <circle cx="70" cy="70" r="0.5" fill="hsl(var(--secondary))" />
            <circle cx="30" cy="70" r="0.5" fill="hsl(var(--secondary))" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
