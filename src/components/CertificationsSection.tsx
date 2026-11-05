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
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedCert(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedCert]);

  return (
    <>
      <section
        id="certifications"
        className="pt-12 sm:pt-16 pb-20 sm:pb-28 relative z-10 w-full overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-5 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono font-medium text-primary uppercase tracking-wider">
                Verified Learning
              </span>
            </div>

            <h2 className="section-heading mb-4">
              <span className="text-foreground">My</span>{" "}
              <span className="text-secondary">Certifications</span>
            </h2>
            <p className="section-subheading max-w-2xl">
              A curated list of certifications that support my development
              journey. Click any certificate to view details.
            </p>
          </motion.div>

          {/* View All Certificates Link */}
          <div className="flex justify-end mb-6 w-full">
            <Link
              to="/certificates"
              className="inline-flex items-center gap-2 min-h-[44px] text-primary hover:text-foreground transition-colors font-bold text-xs sm:text-sm tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2"
            >
              SEE ALL CERTIFICATES &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {featuredCertifications.map((cert, index) => (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card rounded-2xl border border-border/40 hover:border-primary/50 transition-all overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                tabIndex={0}
                role="button"
                aria-label={`View certificate: ${cert.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
              >
                {/* Thumbnail Image Header */}
                <div className="w-full h-44 sm:h-48 bg-muted/20 relative overflow-hidden">
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

                <div className="p-5 sm:p-6 relative -mt-8 sm:-mt-10">
                  <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                    <div className="p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border shadow-sm">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    {cert.issuer}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 sm:mb-5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{cert.period}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto glass-card rounded-2xl border border-border/50 shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/60 hover:bg-background text-foreground backdrop-blur-md transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-3/5 bg-foreground/5 flex items-center justify-center p-3 sm:p-5 min-h-[220px] sm:min-h-[300px]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="max-w-full max-h-[38vh] sm:max-h-[50vh] md:max-h-[80vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x600?text=Please+Add+Image+To+Public+Folder";
                  }}
                />
              </div>

              <div className="w-full md:w-2/5 p-5 sm:p-6 md:p-8 flex flex-col">
                <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Issuer
                    </p>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {selectedCert.issuer}
                    </span>
                  </div>
                </div>

                <h3
                  id="cert-modal-title"
                  className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight"
                >
                  {selectedCert.title}
                </h3>

                <div className="prose prose-sm dark:prose-invert mb-4 sm:mb-6 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  <p>{selectedCert.description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-border/50">
                  <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span>
                    Issued:{" "}
                    <span className="font-medium">{selectedCert.period}</span>
                  </span>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider">
                    Skills & Attributes
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 sm:pt-6">
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25"
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
