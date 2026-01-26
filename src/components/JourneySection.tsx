import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2021',
    title: 'The Beginning',
    description: 'Started my coding journey with web fundamentals. Built simple static websites and discovered the joy of creating things from scratch.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    type: 'Education',
  },
  {
    year: '2022',
    title: 'Diving into Programming',
    description: 'Learned Python and C++, started solving competitive programming problems. Discovered my passion for algorithms and data structures.',
    tags: ['Python', 'C++', 'DSA'],
    type: 'Achievement',
  },
  {
    year: '2023',
    title: 'University Journey Begins',
    description: 'Started B.Tech in Computer Science at Madhav Institute of Technology and Science, Gwalior. Began exploring advanced concepts.',
    tags: ['B.Tech', 'MITS Gwalior'],
    type: 'Education',
  },
  {
    year: '2024',
    title: 'AI/ML Deep Dive',
    description: 'Immersed myself in Machine Learning and Data Science. Built multiple projects applying ML to real-world problems.',
    tags: ['TensorFlow', 'PyTorch', 'Data Science'],
    type: 'Achievement',
  },
  {
    year: '2025',
    title: 'Full-Stack & Beyond',
    description: 'Expanded to full-stack development. Building end-to-end applications with modern technologies and deploying production systems.',
    tags: ['React', 'Node.js', 'Cloud'],
    type: 'Current',
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-gradient mb-6">
            Coding Journey
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A cinematic voyage through my development odyssey.
            <br />
            <span className="text-primary">Each checkpoint marks a new horizon conquered.</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-xl p-6 inline-block"
                >
                  {/* Year badge */}
                  <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-primary font-display text-2xl font-medium">{milestone.year}</span>
                  </div>

                  {/* Type badge */}
                  <span className={`text-xs uppercase tracking-wider ${
                    milestone.type === 'Education' ? 'text-secondary' : 
                    milestone.type === 'Current' ? 'text-primary' : 'text-accent-foreground'
                  }`}>
                    {milestone.type}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-foreground mt-2 mb-3">
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {milestone.tags.map((tag) => (
                      <span key={tag} className="skill-badge text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="timeline-dot"
                />
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
