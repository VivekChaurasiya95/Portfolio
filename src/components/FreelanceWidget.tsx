import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, Sparkles } from "lucide-react";
import { EMAIL_ADDRESS } from "@/data/siteLinks";

const FreelanceWidget = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm ml-auto">
      {/* Title */}
      <h4 className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase font-display pr-2 md:text-right text-center">
        Availability
      </h4>

      {/* Widget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full h-auto min-h-[14rem] md:min-h-[16rem] p-6 rounded-2xl border border-primary/20 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden group shadow-[0_0_30px_rgba(var(--primary),0.05)] flex flex-col items-center md:items-end text-center md:text-right"
      >
        {/* HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '2rem 2rem'
          }}
        />

        {/* Decorative Animated Tiles */}
        <div className="absolute top-4 left-4 grid grid-cols-4 gap-2 opacity-50 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-6 h-6 rounded-md border border-primary ${i === 2 || i === 5 ? 'bg-primary/40' : 'bg-primary/5'}`}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="absolute bottom-8 right-1/2 translate-x-12 grid grid-cols-3 gap-2 opacity-40 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-8 h-6 rounded-md border border-primary ${i === 1 ? 'bg-primary/30' : 'bg-primary/10'}`}
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{
                duration: 1.5 + (i % 2),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Decorative sweeping line animation */}
        <motion.div
          animate={{ y: [0, 256, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0 pointer-events-none"
        />

        {/* Content (Foreground) */}
        <div className="relative z-10 w-full flex flex-col items-center md:items-end">
          {/* Available Pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a]/80 border border-primary/40 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
            animate={{
              boxShadow: [
                "0 0 10px hsl(var(--primary)/0.1)",
                "0 0 20px hsl(var(--primary)/0.3)",
                "0 0 10px hsl(var(--primary)/0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] font-display pt-0.5">
              Available for Work
            </span>
          </motion.div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-display tracking-wide drop-shadow-md">
            Freelance Services
          </h3>
          
          <p className="text-muted-foreground text-xs md:text-sm mb-6 max-w-[260px] font-body leading-relaxed drop-shadow-sm">
            Open for freelance projects in web development, ML solutions, and
            full-stack applications.
          </p>

          <motion.a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] font-display"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Briefcase className="w-4 h-4" />
            Hire Me
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default FreelanceWidget;
