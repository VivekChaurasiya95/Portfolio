import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { RESUME_URL } from "@/data/siteLinks";

const certifications = [
  {
    title: "Certificate of Participation - From Idea to App in 60 Minutes",
    issuer: "Product Space",
    period: "March 2026",
    credentialUrl: RESUME_URL,
    skills: ["No-Code Tools", "Rapid Prototyping", "Product Thinking"],
  },
  {
    title: "Online Code Clash Certificate",
    issuer: "Online Code Clash",
    period: "2026",
    credentialUrl: RESUME_URL,
    skills: ["Competitive Coding", "Problem Solving", "Algorithms"],
  },
  {
    title: "IBM Skills Certification Track",
    issuer: "IBM",
    period: "2025",
    credentialUrl: RESUME_URL,
    skills: ["Cloud Basics", "Professional Skills", "Applied Learning"],
  },
  {
    title: "Google Cloud Certification Track",
    issuer: "Google Cloud",
    period: "2025",
    credentialUrl: RESUME_URL,
    skills: ["Cloud Fundamentals", "Data & AI Concepts", "Platform Tools"],
  },
  {
    title: "Udemy Professional Certifications",
    issuer: "Udemy",
    period: "2025",
    credentialUrl: RESUME_URL,
    skills: ["Web Development", "Problem Solving", "Project Skills"],
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-28 relative z-10">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-5">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Verified Learning
            </span>
          </div>

          <h2 className="section-heading mb-4">
            <span className="text-foreground">My</span>{" "}
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="section-subheading max-w-2xl">
            A curated list of certifications that support my full-stack and
            AI-focused development journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-border/40 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`${cert.title} credential`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {cert.issuer}
              </p>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mb-3"
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{cert.period}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs bg-muted/30 text-muted-foreground border border-border/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
