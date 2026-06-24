import { motion } from "framer-motion";

const StatusWidget = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {/* Title */}
      <h4 className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase font-display pl-2">
        Current Status
      </h4>

      {/* Widget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full h-48 md:h-56 rounded-2xl border border-primary/20 bg-card/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden group shadow-[0_0_30px_hsl(var(--primary)/0.05)]"
      >
        {/* HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '2rem 2rem'
          }}
        />

        {/* Decorative Grid Squares (Animated Tiles) */}
        <div className="absolute top-8 right-1/2 translate-x-12 grid grid-cols-3 gap-2 opacity-40">
          {[...Array(9)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-6 h-6 rounded-md border border-primary ${i === 4 ? 'bg-primary/30' : 'bg-primary/5'}`}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 1.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="absolute bottom-4 right-8 grid grid-cols-4 gap-2 opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-8 h-6 rounded-md border border-primary bg-primary/10"
              animate={{ opacity: [0.1, 0.7, 0.1] }}
              transition={{
                duration: 2 + (i % 2),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* HUD Sweeping Curve */}
        <svg className="absolute inset-0 w-full h-full opacity-30 text-primary" preserveAspectRatio="none">
          <path 
            d="M 0,150 Q 150,150 350,0" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
          />
          {/* Concentric Radar Circles */}
          <circle cx="280" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="280" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          
          {/* Target Reticle */}
          <path d="M 280,30 L 280,170 M 210,100 L 350,100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Left Radar Blip */}
        <div className="absolute top-1/3 left-6 flex items-center justify-center">
          <div className="absolute w-8 h-8 rounded-full bg-primary/10 border border-primary/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>

        {/* Right Radar Blip (on the crosshair) */}
        <div className="absolute top-[100px] right-[calc(100%-280px)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 hidden md:flex">
          <div className="absolute w-6 h-6 rounded-full bg-primary/20" />
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        </div>

        {/* LIVE Indicator */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
            />
            <span className="text-primary text-xs font-bold tracking-widest leading-none mt-0.5">
              LIVE
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="absolute bottom-6 left-6 z-20 max-w-[200px] md:max-w-[240px]">
          <h3 className="text-foreground text-lg md:text-xl font-bold font-display tracking-wide mb-1 drop-shadow-md leading-tight">
            Pragati Vihar
          </h3>
          <p className="text-muted-foreground font-mono text-[10px] md:text-xs tracking-wider opacity-90 leading-relaxed">
            Near Gole ka Mandir, Gwalior
          </p>
        </div>

        {/* Decorative scanning line animation */}
        <motion.div
          animate={{ y: [0, 224, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
        />
      </motion.div>
    </div>
  );
};

export default StatusWidget;
