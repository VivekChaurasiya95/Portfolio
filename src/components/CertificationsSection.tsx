import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  featuredCertifications,
  type Certificate,
} from "@/data/certifications";

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <>
      <section
        id="certifications"
        className="pt-16 pb-28 relative z-10 w-full overflow-hidden"
      >
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
              A curated list of certifications that support my development
              journey. Click any certificate to view details.
            </p>
          </motion.div>

          {/* View All Certificates Link */}
          <div className="flex justify-end mb-6 w-full pr-2">
            <Link
              to="/certificates"
              className="flex items-center gap-2 text-primary hover:text-foreground transition-colors font-bold text-sm tracking-widest uppercase"
            >
              SEE ALL CERTIFICATES &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredCertifications.map((cert, index) => (
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
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/800x600?text=Image+Missing";
                    }}
                  />
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
                  loading="lazy"
                  width={800}
                  height={600}
                  className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x600?text=Please+Add+Image+To+Public+Folder";
                  }}
                />
              </div>

              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Issuer
                    </p>
                    <span className="text-sm font-semibold text-primary">
                      {selectedCert.issuer}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {selectedCert.title}
                </h3>

                <div className="prose prose-sm dark:prose-invert mb-6 text-muted-foreground leading-relaxed">
                  <p>{selectedCert.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground mb-8 pb-6 border-b border-border/50">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Issued:{" "}
                    <span className="font-medium">{selectedCert.period}</span>
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Skills & Attributes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                      >
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
