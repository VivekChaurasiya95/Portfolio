import sys
import re

with open('src/components/SkillsSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new SkillBadge and SkillsSection code
new_code = """const SkillBadge = ({ skill, index }: { skill: string, index: number }) => {
  const IconComponent = TechIcons[skill];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="flex items-center gap-4 bg-[#111318] border border-white/5 rounded-2xl px-5 py-3.5 hover:border-primary/50 hover:bg-[#1a1d24] transition-all cursor-default group hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]"
    >
      <div className="flex items-center justify-center w-8 h-8 shrink-0">
        {IconComponent ? (
          <IconComponent className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
        ) : (
          <div className="w-full h-full rounded-sm bg-gradient-to-br from-primary/50 to-secondary/50" />
        )}
      </div>
      <span className="text-[15px] font-medium text-white/90">
        {skill}
      </span>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 lg:py-0 bg-transparent min-h-screen flex items-center overflow-hidden">
      {/* Background Lighting Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-full pointer-events-none flex justify-center items-center z-0 opacity-80">
        {/* Horizontal Beam */}
        <div className="absolute w-[150%] h-[1px] bg-primary/40 blur-[2px] rotate-[-8deg] origin-center" />
        <div className="absolute w-[150%] h-[40px] bg-primary/20 blur-[40px] rotate-[-8deg] origin-center" />
        
        {/* Vertical Beam */}
        <div className="absolute w-[1px] h-[150%] bg-primary/50 blur-[2px] translate-x-[20vw] origin-center" />
        <div className="absolute w-[80px] h-[150%] bg-primary/20 blur-[60px] translate-x-[20vw] origin-center" />
        
        {/* Center Glow where they intersect */}
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full translate-x-[20vw]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Column - Sticky Header */}
          <div className="w-full lg:w-[45%]">
            <div className="sticky top-[30vh] lg:h-fit">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-primary font-mono text-sm sm:text-base tracking-wider font-semibold">
                    {`{02}`} — Tools & Skills
                  </span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-white block">My technical</span>
                  <span className="text-white/40 block mt-2">skillset</span>
                </h2>
                
                <p className="text-white/50 text-lg max-w-md leading-relaxed mt-8">
                  A curated collection of the technologies and tools I use to build premium digital experiences.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Scrolling Categories */}
          <div className="w-full lg:w-[55%] flex flex-col gap-20 lg:py-40">
            {skillCategories.map((category, catIndex) => (
              <motion.div 
                key={category.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="flex flex-col"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-[1px] bg-primary/50" />
                  <h3 className="text-2xl font-medium text-white/90 tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Container */}
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge key={skill} skill={skill} index={skillIndex} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
"""

# Extract the beginning of the file up to the SkillBadge component
split_index = content.find("const SkillBadge = ({")
if split_index != -1:
    new_content = content[:split_index] + new_code
    with open('src/components/SkillsSection.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("Could not find 'const SkillBadge = ({'")
