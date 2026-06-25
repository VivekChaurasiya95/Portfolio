import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

interface CinematicPreloaderProps {
  onComplete: () => void;
}

const CODE_LINES = [
  'const developer = "Vivek";',
  'const role = "Software Developer";',
];

const ROLES = ["Software Developer", "AI Enthusiast", "Google Student Ambassador"];

const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"line" | "code" | "identity" | "exit">("line");
  const [typedLength, setTypedLength] = useState(0);
  const completedRef = useRef(false);
  const totalCodeLength = CODE_LINES.join("\n").length;

  const typedLines = useMemo(() => {
    let remaining = typedLength;

    return CODE_LINES.map((line) => {
      const next = line.slice(0, Math.max(0, Math.min(line.length, remaining)));
      remaining -= line.length + 1;
      return next;
    });
  }, [typedLength]);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase("exit");
    window.setTimeout(onComplete, 560);
  }, [onComplete]);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .to({}, { duration: 1.2 })
      .call(() => setPhase("code"))
      .to({}, { duration: 1.55 })
      .call(() => setPhase("identity"))
      .to({}, { duration: 2.0 })
      .call(finish);

    return () => {
      timeline.kill();
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "code") return;

    setTypedLength(0);
    const typing = gsap.to(
      { value: 0 },
      {
        value: totalCodeLength,
        duration: 1.18,
        ease: "steps(54)",
        onUpdate() {
          setTypedLength(Math.round(this.targets()[0].value));
        },
      },
    );

    return () => {
      typing.kill();
    };
  }, [phase, totalCodeLength]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505] text-white"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === "exit" ? 0 : 1,
        scale: phase === "exit" ? 1.06 : 1,
        filter: phase === "exit" ? "blur(12px)" : "blur(0px)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.35 }}
        animate={{
          opacity: [0.35, 0.82, 0.66],
          backgroundPosition: ["20% 52%", "74% 34%", "48% 70%"],
        }}
        transition={{ duration: 5.25, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 46%, hsla(185,50%,45%,0.18), transparent 30%), radial-gradient(circle at 74% 30%, hsla(350,25%,55%,0.14), transparent 28%), radial-gradient(circle at 52% 76%, rgba(249,115,22,0.08), transparent 34%), linear-gradient(180deg, #050505 0%, hsl(220 25% 6%) 100%)",
          backgroundSize: "140% 140%",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        animate={{ x: ["-8%", "8%", "-8%"] }}
        transition={{ duration: 5, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 49%, transparent 50%), linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.45) 49%, transparent 50%)",
          backgroundSize: "76px 76px",
        }}
      />
      <motion.div
        className="absolute inset-y-0 left-[-20%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-xl"
        animate={{ x: ["0vw", "140vw"] }}
        transition={{ duration: 4.8, ease: [0.65, 0, 0.35, 1] }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-primary/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] bg-white/[0.025] blur-3xl" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(72vw,36rem)] w-[min(72vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
        animate={{ scale: [0.9, 1.08, 0.98], opacity: [0.08, 0.22, 0.12] }}
        transition={{ duration: 4.8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(58vw,28rem)] w-[min(58vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/10"
        animate={{ scale: [1.08, 0.92, 1], opacity: [0.12, 0.24, 0.1] }}
        transition={{ duration: 4.6, ease: "easeInOut" }}
      />

      <button
        type="button"
        onClick={finish}
        className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-xl transition hover:border-primary/50 hover:text-white sm:right-8 sm:top-8"
      >
        Skip Intro
      </button>

      <AnimatePresence mode="wait">
        {phase === "line" && (
          <motion.div
            key="line"
            className="relative flex w-[min(78vw,620px)] items-center justify-center"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute h-14 w-full rounded-full bg-primary/10 blur-3xl" />
            <motion.div
              className="absolute -top-16 h-px w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0.25] }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute -bottom-16 h-px w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.8, 0.2] }}
              transition={{ duration: 0.85, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="relative h-px w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-center bg-gradient-to-r from-transparent via-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  boxShadow: [
                    "0 0 0 rgba(57,169,178,0)",
                    "0 0 34px rgba(57,169,178,0.48)",
                    "0 0 20px rgba(157,42,44,0.28)",
                  ],
                }}
                transition={{ duration: 0.92, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/85 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "760%" }}
                transition={{ duration: 0.9, delay: 0.34, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {phase === "code" && (
          <motion.div
            key="code"
            className="relative w-[min(88vw,760px)] px-5 py-8 text-left font-mono text-[clamp(0.95rem,3vw,1.75rem)] leading-[1.85] tracking-[-0.01em] sm:px-10"
            initial={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(16px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-[0_30px_140px_rgba(0,0,0,0.65)] backdrop-blur-2xl" />
            <motion.div
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-full rounded-2xl bg-gradient-to-b from-white/[0.08] via-transparent to-transparent"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, delay: 0.18, ease: "easeInOut" }}
            />
            <div className="relative">
              {typedLines.map((line, index) => (
                <div key={CODE_LINES[index]} className="min-h-[1.85em] whitespace-pre-wrap text-white/88">
                  {line.startsWith("const") ? (
                    <>
                      <span className="text-primary">const</span>
                      <span>{line.slice(5)}</span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                  {index === typedLines.findIndex((item, itemIndex) => item.length < CODE_LINES[itemIndex].length) && (
                    <span className="ml-1 inline-block h-[1em] w-px translate-y-1 bg-secondary" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {(phase === "identity" || phase === "exit") && (
          <motion.div
            key="identity"
            className="relative flex w-full max-w-5xl flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(18px)" }}
            animate={{
              opacity: phase === "exit" ? 0 : 1,
              y: phase === "exit" ? -34 : 0,
              scale: phase === "exit" ? 1.28 : 1,
              filter: phase === "exit" ? "blur(24px)" : "blur(0px)",
            }}
            transition={{ duration: phase === "exit" ? 0.72 : 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-x-7 -inset-y-10 rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-[0_32px_160px_rgba(57,169,178,0.14)] backdrop-blur-xl" />
            <motion.div
              className="absolute -inset-x-12 top-1/2 h-28 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-2xl"
              animate={{ opacity: [0.25, 0.75, 0.35], scaleX: [0.75, 1.1, 0.9] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <div className="relative h-px w-28 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h1 className="relative mt-8 font-display text-[clamp(2.25rem,7.8vw,7.25rem)] font-bold uppercase leading-[0.9] text-white">
              VIVEK CHAURASIYA
            </h1>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/62 sm:text-xs">
              {ROLES.map((role, index) => (
                <React.Fragment key={role}>
                  <span>{role}</span>
                  {index < ROLES.length - 1 && <span className="h-1 w-1 rounded-full bg-secondary" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CinematicPreloader;
