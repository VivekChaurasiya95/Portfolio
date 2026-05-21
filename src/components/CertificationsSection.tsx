import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { SOCIAL_LINKS } from "@/data/siteLinks";

const certifications = [
  // Point all credentials to the LinkedIn Licenses & Certifications section.
  // Individual cert deep-links can be added later if needed.
  {
    title: "Certificate of Participation - From Idea to App in 60 Minutes",
    issuer: "Product Space",
    period: "16 March, 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/product-space.png",
    skills: ["No-Code Tools", "Rapid Prototyping"],
    description: "In Recognition of their participation for demonstrating exceptional commitment during the 'From Idea to App in 60 Minutes using No-Code Tools'."
  },
  {
    title: "Certificate of Appreciation - Finalist",
    issuer: "HACKSAGON 2026 (ABV-IIITM Gwalior)",
    period: "3-5 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/hacksagon.png",
    skills: ["Hackathon", "Innovation", "Technical Excellence"],
    description: "For successfully emerging as a Finalist among over 2100+ registered teams at HACKSAGON 2026 a National Level Software & Hardware Hackathon held from 3rd to 5th April 2026 at ABV-IIITM, Gwalior."
  },
  {
    title: "Generative AI Unleashing",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/infosys-genai.png",
    skills: ["Generative AI", "AI Concepts"],
    description: "Successfully completing the Generative AI Unleashing course on April 27, 2026."
  },
  {
    title: "Computer Vision 101",
    issuer: "Infosys Springboard",
    period: "25 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/infosys-cv.png",
    skills: ["Computer Vision", "AI Applications"],
    description: "Successfully completing the Computer Vision 101 course on April 25, 2026."
  },
  {
    title: "Deep Learning for Developers",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/infosys-dl.png",
    skills: ["Deep Learning", "Neural Networks"],
    description: "Successfully completing the Deep Learning for Developers course on April 27, 2026."
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    period: "13 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/infosys-data-science.jpg",
    skills: ["Data Science", "Analytics"],
    description: "Successfully completed the Introduction to Data Science course on April 13, 2026."
  },
  {
    title: "Certificate of Participation - DevSprint",
    issuer: "Google Developer Groups on Campus (MITS)",
    period: "8 Dec 2025 - 24 Jan 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/devsprint.jpg",
    skills: ["AI Prototyping", "Hackathon", "Collaboration"],
    description: "Successfully participated and submitted a prototype with team 'Antevenio' at 'DevSprint: Leveraging the Power of AI', a national-level hackathon conducted by Google Developer Groups on Campus - MITS Gwalior."
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    period: "23 April 2026",
    credentialUrl: `${SOCIAL_LINKS.linkedin}/details/certifications/`,
    image: "/certificates/infosys-ai.jpg",
    skills: ["Artificial Intelligence", "AI Concepts"],
    description: "Successfully completed the Introduction to Artificial Intelligence course on April 23, 2026."
  }
];

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <>
      <section id="certifications" className="py-28 relative z-10 w-full overflow-hidden">
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
              A curated list of certifications that support my development journey. Click any certificate to view details.
            </p>
          </motion.div>

          {/* View All Certificates Link */}
          <div className="flex justify-end mb-6 w-full pr-2">
            <a
              href={`${SOCIAL_LINKS.linkedin}/details/certifications/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
            >
              SEE ALL CERTIFICATES &rarr;
            </a>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card rounded-2xl border border-border/40 hover:border-primary/50 transition-all overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl"
              >
                {/* Thumbnail Image Header */}
                <div className="w-full h-48 bg-muted/20 relative overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Missing';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                </div>

                <div className="p-6 relative -mt-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border shadow-sm">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.issuer}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.period}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs bg-muted/30 text-muted-foreground border border-border/40"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="px-2.5 py-1 rounded-md text-xs bg-muted/30 text-muted-foreground border border-border/40">
                        +{cert.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-border/50 shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background text-foreground backdrop-blur-md transition-colors border border-border"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-3/5 bg-foreground/5 flex items-center justify-center p-4 min-h-[300px]">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Please+Add+Image+To+Public+Folder';
                  }}
                />
              </div>
              
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Issuer</p>
                    <span className="text-sm font-semibold text-primary">{selectedCert.issuer}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{selectedCert.title}</h3>
                
                <div className="prose prose-sm dark:prose-invert mb-6 text-muted-foreground leading-relaxed">
                  <p>{selectedCert.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground mb-8 pb-6 border-b border-border/50">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Issued: <span className="font-medium">{selectedCert.period}</span></span>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Skills & Attributes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-6">
                  <a 
                    href={selectedCert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25"
                  >
                    Verify Credential <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationsSection;

