import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  const isTypingComplete = typedLength >= totalCodeLength;
  const activeTypingIndex = typedLines.findIndex(
    (item, itemIndex) => item.length < CODE_LINES[itemIndex].length
  );

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase("exit");
    window.setTimeout(() => {
      onComplete();
    }, 550);
  }, [onComplete]);

  // Handle ESC or Spacebar to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        finish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  // Complete, beautifully-paced timeline:
  // 0.0s - 1.25s: Laser horizon line expanding & resolving
  // 1.25s - 3.35s (2.1s): Code terminal typing out completely, with 0.7s of peaceful resting cursor
  // 3.35s - 5.5s (2.15s): Identity reveal - VIVEK CHAURASIYA & roles with glowing cosmic aura
  // 5.5s - 6.05s: Smooth cinematic crossfade into live portfolio
  useEffect(() => {
    const tCode = window.setTimeout(() => {
      setPhase("code");
    }, 1250);

    const tIdentity = window.setTimeout(() => {
      setPhase("identity");
    }, 3350);

    const tFinish = window.setTimeout(() => {
      finish();
    }, 5500);

    return () => {
      clearTimeout(tCode);
      clearTimeout(tIdentity);
      clearTimeout(tFinish);
    };
  }, [finish]);

  // Smooth typing cadence
  useEffect(() => {
    if (phase !== "code") return;

    setTypedLength(0);
    const intervalTime = 23; // ~23ms per character -> completes in ~1.4s
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setTypedLength(current);
      if (current >= totalCodeLength) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [phase, totalCodeLength]);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden bg-[#040508] font-sans text-white select-none"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === "exit" ? 0 : 1,
        scale: phase === "exit" ? 1.08 : 1,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background ambient lighting (line/code phases only — the identity
          screen stays a clean solid so no color wash tints the name) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: phase === "line" || phase === "code" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(circle at 25% 42%, hsla(185,50%,45%,0.16), transparent 45%), radial-gradient(circle at 75% 58%, hsla(350,30%,50%,0.14), transparent 42%), linear-gradient(180deg, #040508 0%, #070911 100%)",
        }}
      />

      {/* Cyber Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Light sweep beam */}
      <motion.div
        className="absolute inset-y-0 left-[-20%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-xl pointer-events-none"
        animate={{ x: ["0vw", "140vw"] }}
        transition={{ duration: 5.5, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Ambient background orbital rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(72vw,36rem)] w-[min(72vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/15 pointer-events-none"
        animate={{ scale: [0.94, 1.06, 0.98], opacity: [0.08, 0.24, 0.12] }}
        transition={{ duration: 5.2, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(58vw,28rem)] w-[min(58vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-500/15 pointer-events-none"
        animate={{ scale: [1.06, 0.94, 1.02], opacity: [0.12, 0.26, 0.1] }}
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={finish}
        className="group absolute right-5 top-5 z-50 flex items-center gap-2 min-h-[44px] rounded-full border border-white/15 bg-black/60 px-4 py-2 font-sans text-xs uppercase tracking-widest text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:text-white sm:right-8 sm:top-8 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        aria-label="Skip Intro Animation"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>Skip Intro</span>
        <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-sans">
          ESC
        </kbd>
      </button>

      <AnimatePresence mode="wait">
        {/* ================= PHASE 1: LINE ================= */}
        {phase === "line" && (
          <motion.div
            key="line"
            className="relative flex w-[min(78vw,620px)] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute h-14 w-full rounded-full bg-cyan-500/15 blur-2xl" />
            <motion.div
              className="absolute -top-14 h-px w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0.3] }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute -bottom-14 h-px w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.8, 0.25] }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="relative h-px w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-center bg-gradient-to-r from-transparent via-cyan-400 to-rose-400"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  boxShadow: [
                    "0 0 0 rgba(6,182,212,0)",
                    "0 0 32px rgba(6,182,212,0.6)",
                    "0 0 16px rgba(244,63,94,0.4)",
                  ],
                }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/90 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "650%" }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* ================= PHASE 2: CODE ================= */}
        {phase === "code" && (
          <motion.div
            key="code"
            className="relative w-[min(88vw,740px)] px-6 py-9 text-left font-sans text-[clamp(1rem,3.2vw,1.75rem)] leading-[1.85] tracking-[-0.01em] sm:px-10"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_25px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl" />
            <motion.div
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-full rounded-2xl bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              {typedLines.map((line, index) => (
                <div key={CODE_LINES[index]} className="min-h-[1.85em] whitespace-pre-wrap text-white/90 font-sans">
                  {line.startsWith("const") ? (
                    <>
                      <span className="text-cyan-400 font-semibold">const</span>
                      <span>{line.slice(5)}</span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                  {/* Blinking cursor at typing position or persistent on final line once complete */}
                  {((index === activeTypingIndex) || (isTypingComplete && index === CODE_LINES.length - 1)) && (
                    <span className="ml-1 inline-block h-[1em] w-2 translate-y-0.5 bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= PHASE 3: IDENTITY ================= */}
        {(phase === "identity" || phase === "exit") && (
          <motion.div
            key="identity"
            className="relative flex w-full max-w-5xl flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{
              opacity: phase === "exit" ? 0 : 1,
              y: phase === "exit" ? -30 : 0,
              scale: phase === "exit" ? 1.18 : 1,
            }}
            transition={{ duration: phase === "exit" ? 0.55 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-x-6 -inset-y-10 rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_32px_150px_rgba(0,0,0,0.7)] backdrop-blur-xl" />
            <div className="relative h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <h1
              className="relative mt-8 font-meridian text-balance text-[clamp(2.5rem,8.2vw,7.5rem)] font-semibold uppercase leading-[1.08] text-white tracking-[-0.02em]"
            >
              VIVEK CHAURASIYA
            </h1>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.72rem] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-white/70">
              {ROLES.map((role, index) => (
                <React.Fragment key={role}>
                  <span className={index === 0 ? "text-cyan-300" : index === 1 ? "text-rose-300" : "text-white/80"}>
                    {role}
                  </span>
                  {index < ROLES.length - 1 && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />}
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
