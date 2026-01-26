import { motion } from 'framer-motion';
import { Code2, Database, Wrench, Layers } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Python', 'C++', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch', 'FastAPI', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    title: 'Tools & Concepts',
    icon: Wrench,
    skills: ['Git & GitHub', 'Docker', 'Kubernetes', 'Machine Learning', 'Deep Learning', 'Data Science', 'Data Structures', 'Algorithms', 'System Design'],
  },
];

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
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass-card rounded-xl p-6 md:p-8"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
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
