import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, Award, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";
import { allCertifications, type Certificate } from "@/data/certifications";

/**
 * Folio reel — wheel-jacked infinite-loop showcase for the certifications.
 *
 * A vertical title list (left) and a portrait image strip (right) ride one
 * fractional position that loops forever. Clicking any item runs a GSAP glide
 * to the centre, then a shared-element FLIP into a detail panel.
 *
 * Numeric constants follow the Folio spec exactly. Deliberate adaptations for
 * this embedded (mid-page) context are marked with ADAPT comments:
 * - inactive text uses --muted-foreground (here --muted is a bg color),
 * - entrance runs on first viewport entry without locking page scroll,
 * - entrance tweens wrapper divs (tweening the strips would fight the rAF),
 * - long titles get shortened display strings + a stepped-down detail size,
 * - title area sits lower to leave a clear gap under the section heading,
 * - touch: horizontal swipes drive the reel, vertical swipes scroll the page.
 */

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ITEMS: Certificate[] = allCertifications;
const N = ITEMS.length;

// Short display strings for the reel rows (full official titles still appear
// in the detail panel). Keeps single-line rows inside their column.
const SHORT_TITLES: Record<string, string> = {
  "Cloud To Crowd: Media IQ for Developers with Python": "Cloud To Crowd · Media IQ",
  "GFG CodeRush Certificate": "GFG CodeRush",
  "Google Agentic Premier League Hackathon Certificate": "Agentic Premier League",
  "ByteEdu Internship Completion Certificate": "ByteEdu Internship",
  "Certificate of Appreciation - Finalist": "Hacksagon '26 · Finalist",
  "Certificate of Participation - From Idea to App in 60 Minutes": "Idea to App in 60 Minutes",
  "Certificate of Participation - DevSprint": "DevSprint",
  "Generative AI Unleashing": "Generative AI Unleashing",
  "Deep Learning for Developers": "Deep Learning for Devs",
  "Computer Vision 101": "Computer Vision 101",
  "Introduction to Artificial Intelligence": "Intro to AI",
  "Introduction to Data Science": "Intro to Data Science",
  "Agile Scrum in Practice": "Agile Scrum in Practice",
  "Artificial Intelligence": "Artificial Intelligence",
  "Artificial Intelligence Primer Certification": "AI Primer Certification",
  "Certificate of Participation - ET AI Hackathon 2026 (Semi-Finalist)": "ET AI Hackathon '26",
  "Generative Models for Developers": "Generative Models",
  "Introduction to Generative AI": "Intro to Generative AI",
  "Introduction to Deep Learning": "Intro to Deep Learning",
  "Introduction to Natural Language Processing": "Intro to NLP",
  "Introduction to OpenAI GPT Models": "Intro to GPT Models",
  "Hacksagon Ideation Certificate": "Hacksagon Ideation",
};

const MAX_TITLE_CHARS = 26;

function displayTitle(title: string): string {
  const short = SHORT_TITLES[title] ?? title;
  if (short.length <= MAX_TITLE_CHARS) return short;
  const cut = short.slice(0, MAX_TITLE_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 12 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function yearOf(period: string): string {
  const matches = period.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : period;
}

function certType(cert: Certificate): string {
  const hay = `${cert.title} ${cert.issuer}`.toLowerCase();
  if (hay.includes("internship")) return "Internship";
  if (/(hackathon|hacksagon|devsprint|gapl|coderush|codersh|product space|gfg)/.test(hay)) {
    return "Hackathon";
  }
  return "Course";
}

// ---------------------------------------------------------------------------
// Spec constants — exact values, do not drift (ADAPT: titleTopVh /
// titleAreaVh shifted down to clear the restored section heading).
// ---------------------------------------------------------------------------

const LOOP_COPIES = 3;
const POS_MIN = N;
const POS_MAX = 2 * N;
const RENDERED = LOOP_COPIES * N;

const SMOOTHING = 0.14;
const WHEEL_PER_EVENT_CAP = 200;
const TOUCH_DIR_LOCK_PX = 12;
const SNAP_IDLE_MS = 90;
const SNAP_EPSILON = 0.0005;
const NEAR_OPACITY = 0.78;
const FAR_OPACITY = 0.18;
const NEAR_SCALE = 0.93;
const FAR_SCALE = 0.84;
const NONACTIVE_OPACITY = 0.7;
const HOVER_LERP = 0.18;
const HOVER_WGHT_BONUS = 80;
const TITLE_MASK_PX = 20;
const CURSOR_RING_PX = 76;

interface FolioLayout {
  titleAreaVh: number;
  titleTopVh: number;
  titleMidVh: number;
  titleSlotVh: number;
  titleVisible: number;
  titleFontVhMax: number;
  titleFontVhMin: number;
  imageWrapperTopVh: number;
  imageWrapperHeightVh: number;
  imageWrapperMidViewportVh: number;
  imageHeightVh: number;
  imageGapVh: number;
  imagePitchVh: number;
  imageOffsetPx: number;
  pixelsPerItem: number;
}

const DESKTOP_LAYOUT: FolioLayout = {
  titleAreaVh: 80,
  titleTopVh: 15,
  titleMidVh: 40,
  titleSlotVh: 80 / 9,
  titleVisible: 9,
  titleFontVhMax: 4.5,
  titleFontVhMin: 4.2,
  imageWrapperTopVh: 0,
  imageWrapperHeightVh: 100,
  imageWrapperMidViewportVh: 50,
  imageHeightVh: 60,
  imageGapVh: 5,
  imagePitchVh: 65,
  imageOffsetPx: 0,
  pixelsPerItem: 600,
};

const MOBILE_LAYOUT: FolioLayout = {
  titleAreaVh: 40,
  titleTopVh: 12,
  titleMidVh: 45,
  titleSlotVh: 40 / 5,
  titleVisible: 5,
  titleFontVhMax: 2.6,
  titleFontVhMin: 2.5,
  imageWrapperTopVh: 50,
  imageWrapperHeightVh: 50,
  imageWrapperMidViewportVh: 69,
  imageHeightVh: 38,
  imageGapVh: 4,
  imagePitchVh: 42,
  imageOffsetPx: 20,
  pixelsPerItem: 120,
};

const MASK_GRADIENT = `linear-gradient(transparent 0, #000 ${TITLE_MASK_PX}px, #000 calc(100% - ${TITLE_MASK_PX}px), transparent 100%)`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type Phase = "idle" | "opening" | "detail" | "closing";

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleStripRef = useRef<HTMLDivElement | null>(null);
  const imageStripRef = useRef<HTMLDivElement | null>(null);
  const titleRevealRef = useRef<HTMLDivElement | null>(null);
  const imageRevealRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleVisibleRef = useRef<Record<number, boolean>>({});
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clickMeRef = useRef<HTMLDivElement | null>(null);

  const detailRef = useRef<HTMLDivElement | null>(null);
  const detailImageRef = useRef<HTMLDivElement | null>(null);
  const detailTitleRef = useRef<HTMLHeadingElement | null>(null);
  const sourceImageRectRef = useRef<DOMRect | null>(null);
  const sourceTitleRectRef = useRef<DOMRect | null>(null);
  const hiddenIdxRef = useRef<number | null>(null);
  const flipAppliedRef = useRef(false);

  const targetPosRef = useRef(POS_MIN);
  const posRef = useRef(POS_MIN);
  const activeIdxRef = useRef(POS_MIN);
  const [activeIdx, setActiveIdx] = useState(POS_MIN);
  const [phase, setPhase] = useState<Phase>("idle");
  const [detailIdx, setDetailIdx] = useState<number | null>(null);
  const detailOpenRef = useRef(false);
  const navigatingRef = useRef(false);
  const entranceDoneRef = useRef(false);
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navProxyRef = useRef({ value: POS_MIN });
  const lastWheelTimeRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const hoveredTitleIdxRef = useRef<number | null>(null);
  const titleHoverProgressRef = useRef<Record<number, number>>({});
  const isHoveringActiveRef = useRef(false);
  const onSectionRef = useRef(false);
  const hoverRef = useRef({ x: 0, y: 0 });
  const cursorRenderRef = useRef({ x: 0, y: 0 });
  const touchXRef = useRef(0);
  const touchYRef = useRef(0);
  // Locked swipe axis for the current touch: "x" drives the reel, "y" lets
  // the page scroll. The reel loops forever, so capturing vertical swipes
  // would trap touch users inside this full-viewport section with no escape.
  const touchDirRef = useRef<"x" | "y" | null>(null);
  const aspectRef = useRef<Record<number, number>>({});

  const [isMobile, setIsMobile] = useState(false);
  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const layoutRef = useRef<FolioLayout>(DESKTOP_LAYOUT);

  useEffect(() => {
    phaseRef.current = phase;
    detailOpenRef.current = phase !== "idle";
  }, [phase]);

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Single rAF ticker driving all reel motion.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // 1. Wheel-idle snap.
      if (
        !navigatingRef.current &&
        !detailOpenRef.current &&
        performance.now() - lastWheelTimeRef.current > SNAP_IDLE_MS
      ) {
        const t = targetPosRef.current;
        const snapped = Math.round(t);
        if (snapped !== t) targetPosRef.current = snapped;
      }

      // 2. Lerp pos toward target.
      const target = targetPosRef.current;
      const cur = posRef.current;
      let next =
        Math.abs(target - cur) < SNAP_EPSILON
          ? target
          : cur + (target - cur) * SMOOTHING;

      // 3. Teleport — keep next inside [POS_MIN, POS_MAX).
      while (next < POS_MIN) {
        next += N;
        targetPosRef.current += N;
      }
      while (next >= POS_MAX) {
        next -= N;
        targetPosRef.current -= N;
      }
      posRef.current = next;

      const L = layoutRef.current;
      const vh = window.innerHeight / 100;

      // 4. Title strip — active row's centre at wrapper-local titleMidVh.
      const titleStrip = titleStripRef.current;
      if (titleStrip) {
        const y = (L.titleMidVh - (next + 0.5) * L.titleSlotVh) * vh;
        titleStrip.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }

      // 5. Image strip — active slot's centre at imageWrapperMidViewportVh.
      const imageStrip = imageStripRef.current;
      if (imageStrip) {
        const y =
          (L.imageWrapperMidViewportVh -
            L.imageWrapperTopVh -
            L.imagePitchVh / 2 -
            (RENDERED - 1) * L.imagePitchVh +
            next * L.imagePitchVh) *
            vh +
          L.imageOffsetPx;
        imageStrip.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }

      // 6. Per-slot opacity + scale (image side).
      for (let i = 0; i < RENDERED; i++) {
        const el = slotRefs.current[i];
        if (!el) continue;
        const dist = Math.abs(i - next);
        let opacity: number;
        let scale: number;
        if (dist < 1) {
          const t = 1 - dist;
          opacity = NEAR_OPACITY + (1 - NEAR_OPACITY) * t;
          scale = NEAR_SCALE + (1 - NEAR_SCALE) * t;
        } else if (dist < 2) {
          const t = 1 - (dist - 1);
          opacity = FAR_OPACITY + (NEAR_OPACITY - FAR_OPACITY) * t;
          scale = FAR_SCALE + (NEAR_SCALE - FAR_SCALE) * t;
        } else {
          opacity = FAR_OPACITY;
          scale = FAR_SCALE;
        }
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `scale(${scale.toFixed(4)})`;
      }

      // 7. Per-row colour + opacity + wght + size (title side).
      // ADAPT: inactive text mixes toward --muted-foreground (here --muted
      // is a near-white/near-black surface color, unreadable as text).
      const hoveredIdx = hoveredTitleIdxRef.current;
      for (let i = 0; i < RENDERED; i++) {
        const el = titleRefs.current[i];
        if (!el) continue;
        const dist = Math.abs(i - next);
        const tColor = Math.max(0, 1 - dist * 2);
        const tType = Math.max(0, 1 - dist * 0.55);
        const targetHover =
          hoveredIdx !== null && i % N === hoveredIdx % N ? 1 : 0;
        const curHover = titleHoverProgressRef.current[i] ?? 0;
        const nextHover = curHover + (targetHover - curHover) * HOVER_LERP;
        titleHoverProgressRef.current[i] = nextHover;
        el.style.color = `color-mix(in srgb, var(--foreground) ${(tColor * 100).toFixed(1)}%, var(--muted-foreground))`;
        el.style.opacity = (
          NONACTIVE_OPACITY +
          (1 - NONACTIVE_OPACITY) * tColor
        ).toFixed(3);
        const wght = 420 + 200 * tType + nextHover * HOVER_WGHT_BONUS;
        el.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
        el.style.fontWeight = String(Math.round(wght));
        const h3 = el.querySelector("h3");
        if (h3) {
          const fontVh =
            L.titleFontVhMin + (L.titleFontVhMax - L.titleFontVhMin) * tType;
          (h3 as HTMLElement).style.fontSize = `${fontVh.toFixed(2)}dvh`;
        }
      }

      // 8. Subtitle (credit) — fades in only on the active row.
      // Collapsed out of layout when faded so invisible credits never steal
      // row width and truncate the title (writes guarded to avoid style churn).
      for (let i = 0; i < RENDERED; i++) {
        const el = subtitleRefs.current[i];
        if (!el) continue;
        const dist = Math.abs(i - next);
        const t = Math.max(0, 1 - dist * 2.8);
        el.style.opacity = t.toFixed(3);
        el.style.transform = `translateX(${((1 - t) * -10).toFixed(2)}px)`;
        const vis = t > 0.02;
        if (subtitleVisibleRef.current[i] !== vis) {
          subtitleVisibleRef.current[i] = vis;
          el.style.display = vis ? "" : "none";
        }
      }

      // 9. Active rendered index.
      const rounded = Math.max(0, Math.min(RENDERED - 1, Math.round(next)));
      if (rounded !== activeIdxRef.current) {
        activeIdxRef.current = rounded;
        setActiveIdx(rounded);
      }

      // 10. Cursor ring — lerps toward the pointer; snaps when hidden.
      // ADAPT: subtract half the ring size so it stays centred (the spec's
      // translate3d would overwrite the -translate-1/2 centering classes).
      const ring = clickMeRef.current;
      if (ring) {
        const visible =
          isHoveringActiveRef.current &&
          onSectionRef.current &&
          !detailOpenRef.current;
        const lerp = visible ? 0.22 : 1;
        const cr = cursorRenderRef.current;
        const h = hoverRef.current;
        cr.x += (h.x - cr.x) * lerp;
        cr.y += (h.y - cr.y) * lerp;
        const half = CURSOR_RING_PX / 2;
        ring.style.transform = `translate3d(${(cr.x - half).toFixed(2)}px, ${(cr.y - half).toFixed(2)}px, 0)`;
        ring.style.opacity = visible ? "1" : "0";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const skipEntranceIfRunning = useCallback(() => {
    if (entranceDoneRef.current) return;
    entranceTimelineRef.current?.kill();
    entranceTimelineRef.current = null;
    // Finish the reveal states instantly so the strips never freeze mid-fade,
    // but keep the current position so the user takes over from here.
    gsap.set(
      [titleRevealRef.current, imageRevealRef.current].filter(Boolean),
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    );
    const chromes = sectionRef.current?.querySelectorAll("[data-chrome]");
    if (chromes) gsap.set(chromes, { opacity: 1, y: 0 });
    entranceDoneRef.current = true;
  }, []);

  // Entrance — load-time auto-scroll. ADAPT: runs on first viewport entry
  // (this reel lives mid-page, not full-page) and never locks page scroll.
  // ADAPT: tweens wrapper divs, not the strips — the rAF owns strip
  // transforms every frame and would fight GSAP on the same property.
  const startEntrance = useCallback(() => {
    if (entranceDoneRef.current) return;
    const cycleDistance =
      Math.floor(1.4 * N) + Math.floor(Math.random() * N);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let v = POS_MIN + cycleDistance;
      while (v >= POS_MAX) v -= N;
      posRef.current = v;
      targetPosRef.current = v;
      entranceDoneRef.current = true;
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        entranceDoneRef.current = true;
        entranceTimelineRef.current = null;
      },
    });
    entranceTimelineRef.current = tl;

    tl.fromTo(
      [titleRevealRef.current, imageRevealRef.current].filter(Boolean),
      { opacity: 0, y: 28, scale: 1.04, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
      },
      0,
    );

    tl.fromTo(
      sectionRef.current?.querySelectorAll("[data-chrome]") ?? [],
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 },
      0.5,
    );

    const entranceProxy = { value: POS_MIN };
    tl.to(entranceProxy, {
      value: POS_MIN + cycleDistance,
      duration: 1.7,
      ease: "power4.out",
      onUpdate: () => {
        let v = entranceProxy.value;
        while (v < POS_MIN) v += N;
        while (v >= POS_MAX) v -= N;
        posRef.current = v;
        targetPosRef.current = v;
        // Suppress the wheel-idle snap while the programmatic tween runs.
        lastWheelTimeRef.current = performance.now();
      },
    }, 0);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (!entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        startEntrance();
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      entranceTimelineRef.current?.kill();
      entranceTimelineRef.current = null;
    };
  }, [startEntrance]);

  // Wheel + touch input.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (!onSectionRef.current) return;
      if (detailOpenRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-wheel]")) return;
      e.preventDefault();
      if (!entranceDoneRef.current) skipEntranceIfRunning();
      if (navigatingRef.current) {
        gsap.killTweensOf(navProxyRef.current);
        navigatingRef.current = false;
      }
      lastWheelTimeRef.current = performance.now();
      const delta = Math.max(
        -WHEEL_PER_EVENT_CAP,
        Math.min(WHEEL_PER_EVENT_CAP, e.deltaY),
      );
      targetPosRef.current += delta / layoutRef.current.pixelsPerItem;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (detailOpenRef.current) return;
      if ((e.target as HTMLElement)?.closest("[data-no-wheel]")) return;
      if (!entranceDoneRef.current) skipEntranceIfRunning();
      touchXRef.current = e.touches[0]?.clientX ?? 0;
      touchYRef.current = e.touches[0]?.clientY ?? 0;
      touchDirRef.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (detailOpenRef.current) return;
      if ((e.target as HTMLElement)?.closest("[data-no-wheel]")) return;
      const x = e.touches[0]?.clientX ?? touchXRef.current;
      const y = e.touches[0]?.clientY ?? touchYRef.current;
      const dx = touchXRef.current - x;
      const dy = touchYRef.current - y;
      if (touchDirRef.current === null) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < TOUCH_DIR_LOCK_PX) return;
        touchDirRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      touchXRef.current = x;
      touchYRef.current = y;
      // Vertical swipes scroll the page — never captured.
      if (touchDirRef.current === "y") return;
      e.preventDefault();
      if (!entranceDoneRef.current) skipEntranceIfRunning();
      if (navigatingRef.current) {
        gsap.killTweensOf(navProxyRef.current);
        navigatingRef.current = false;
      }
      lastWheelTimeRef.current = performance.now();
      const capped = Math.max(-WHEEL_PER_EVENT_CAP, Math.min(WHEEL_PER_EVENT_CAP, dx));
      targetPosRef.current += capped / layoutRef.current.pixelsPerItem;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, [skipEntranceIfRunning]);

  const openDetailFromActiveAt = (idx: number) => {
    if (phase !== "idle" || !entranceDoneRef.current) return;
    const slot = slotRefs.current[idx];
    const titleRow = titleRefs.current[idx];
    const titleH3 = titleRow?.querySelector("h3") as HTMLElement | null;
    sourceImageRectRef.current = slot?.getBoundingClientRect() ?? null;
    sourceTitleRectRef.current = titleH3?.getBoundingClientRect() ?? null;
    hiddenIdxRef.current = idx;
    if (slot) slot.style.visibility = "hidden";
    if (titleH3) titleH3.style.visibility = "hidden";
    detailOpenRef.current = true;
    setPhase("opening");
    setDetailIdx(idx % N);
  };

  const navigateAndOpen = (i: number) => {
    if (phase !== "idle" || !entranceDoneRef.current) return;
    const currentIdx = activeIdxRef.current;
    if (i === currentIdx) {
      openDetailFromActiveAt(currentIdx);
      return;
    }

    const currentPos = posRef.current;
    const currentLogical = ((Math.round(currentPos) % N) + N) % N;
    const clickedLogical = ((i % N) + N) % N;
    let delta = clickedLogical - currentLogical;
    if (delta > N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    if (delta === 0) {
      openDetailFromActiveAt(currentIdx);
      return;
    }

    const proxy = navProxyRef.current;
    proxy.value = currentPos;
    navigatingRef.current = true;
    gsap.killTweensOf(proxy);
    gsap.to(proxy, {
      value: currentPos + delta,
      duration: 0.85 + Math.abs(delta) * 0.11,
      ease: "power3.inOut",
      onUpdate: () => {
        let v = proxy.value;
        while (v < POS_MIN) v += N;
        while (v >= POS_MAX) v -= N;
        posRef.current = v;
        targetPosRef.current = v;
      },
      onComplete: () => {
        navigatingRef.current = false;
        requestAnimationFrame(() =>
          openDetailFromActiveAt(activeIdxRef.current),
        );
      },
    });
  };

  // Click → detail (FLIP open).
  useLayoutEffect(() => {
    if (detailIdx === null) {
      flipAppliedRef.current = false;
      return;
    }
    if (flipAppliedRef.current) return;
    flipAppliedRef.current = true;

    const sourceImg = sourceImageRectRef.current;
    const sourceTitle = sourceTitleRectRef.current;
    const imgEl = detailImageRef.current;
    const titleEl = detailTitleRef.current;
    const root = detailRef.current;
    if (!root) return;

    // Match the source slot's measured aspect before measuring the target
    // so the FLIP frame fits this item exactly.
    const knownRatio = aspectRef.current[detailIdx];
    if (knownRatio && imgEl) imgEl.style.aspectRatio = `${knownRatio}`;

    const scrim = root.querySelector("[data-detail-scrim]");
    if (scrim) {
      gsap.fromTo(
        scrim,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    }

    if (sourceImg && imgEl) {
      const target = imgEl.getBoundingClientRect();
      const dx = sourceImg.left - target.left;
      const dy = sourceImg.top - target.top;
      const sx = sourceImg.width / target.width;
      const sy = sourceImg.height / target.height;
      gsap.set(imgEl, {
        visibility: "visible",
        transformOrigin: "top left",
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
      });
      gsap.to(imgEl, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.95,
        ease: "power4.out",
      });
    }

    if (sourceTitle && titleEl) {
      const target = titleEl.getBoundingClientRect();
      const dx = sourceTitle.left - target.left;
      const dy = sourceTitle.top - target.top;
      const s = sourceTitle.height / target.height;
      gsap.set(titleEl, {
        visibility: "visible",
        transformOrigin: "top left",
        x: dx,
        y: dy,
        scale: s,
      });
      gsap.to(titleEl, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: "power4.out",
        onComplete: () => setPhase("detail"),
      });

      const lift = sourceTitle.top - target.top;
      const activeIdxNow = hiddenIdxRef.current;
      if (activeIdxNow !== null && lift !== 0) {
        for (let i = 0; i < activeIdxNow; i++) {
          const row = titleRefs.current[i];
          if (row) gsap.to(row, { y: -lift, duration: 0.95, ease: "power4.out" });
        }
      }
    } else {
      setPhase("detail");
    }

    gsap.fromTo(
      root.querySelectorAll("[data-detail-reveal]"),
      { y: 24, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.05,
        delay: 0.25,
      },
    );
  }, [detailIdx]);

  const finalizeClose = useCallback(() => {
    const hidIdx = hiddenIdxRef.current;
    if (hidIdx !== null) {
      const slot = slotRefs.current[hidIdx];
      const titleRow = titleRefs.current[hidIdx];
      const titleH3 = titleRow?.querySelector("h3") as HTMLElement | null;
      if (slot) slot.style.visibility = "";
      if (titleH3) titleH3.style.visibility = "";
      for (let i = 0; i < hidIdx; i++) {
        const row = titleRefs.current[i];
        if (row) gsap.set(row, { clearProps: "transform" });
      }
    }
    hiddenIdxRef.current = null;
    sourceImageRectRef.current = null;
    sourceTitleRectRef.current = null;
    detailOpenRef.current = false;
    setDetailIdx(null);
    setPhase("idle");
  }, []);

  // Close → reverse FLIP.
  const handleClose = useCallback(() => {
    if (phaseRef.current === "closing" || phaseRef.current === "idle") return;
    setPhase("closing");

    const sourceImg = sourceImageRectRef.current;
    const sourceTitle = sourceTitleRectRef.current;
    const imgEl = detailImageRef.current;
    const titleEl = detailTitleRef.current;
    const root = detailRef.current;

    if (root) {
      const reveal = root.querySelectorAll("[data-detail-reveal]");
      gsap.to(reveal, {
        y: 14,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.35,
        ease: "power3.in",
        stagger: 0.03,
      });
      const scrim = root.querySelector("[data-detail-scrim]");
      if (scrim) {
        gsap.to(scrim, {
          opacity: 0,
          duration: 0.55,
          delay: 0.25,
          ease: "power2.in",
        });
      }
    }

    if (sourceImg && imgEl) {
      const target = imgEl.getBoundingClientRect();
      const sx = sourceImg.width / target.width;
      const sy = sourceImg.height / target.height;
      gsap.to(imgEl, {
        x: sourceImg.left - target.left,
        y: sourceImg.top - target.top,
        scaleX: sx,
        scaleY: sy,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.05,
      });
    }

    if (sourceTitle && titleEl) {
      const target = titleEl.getBoundingClientRect();
      const s = sourceTitle.height / target.height;
      gsap.to(titleEl, {
        x: sourceTitle.left - target.left,
        y: sourceTitle.top - target.top,
        scale: s,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.05,
        onComplete: finalizeClose,
      });
      const activeIdxNow = hiddenIdxRef.current;
      if (activeIdxNow !== null) {
        for (let i = 0; i < activeIdxNow; i++) {
          const row = titleRefs.current[i];
          if (row) {
            gsap.to(row, {
              y: 0,
              duration: 0.85,
              ease: "power3.inOut",
              delay: 0.05,
            });
          }
        }
      }
    } else {
      finalizeClose();
    }
  }, [finalizeClose]);

  // Body scroll lock while detail is open.
  useEffect(() => {
    if (detailIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [detailIdx]);

  useEffect(() => {
    if (detailIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailIdx, handleClose]);

  const detailItem = detailIdx !== null ? ITEMS[detailIdx] : null;
  const logicalIdx = ((activeIdx % N) + N) % N;

  return (
    <section
      ref={sectionRef}
      id="certifications"
      aria-label="Certifications"
      className="relative z-10 h-[100dvh] w-full overflow-hidden bg-background"
      onPointerEnter={() => {
        onSectionRef.current = true;
      }}
      onPointerLeave={() => {
        onSectionRef.current = false;
      }}
      onPointerMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        hoverRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }}
    >
      {/* Section heading */}
      <div
        data-chrome
        className="pointer-events-none absolute left-6 top-4 z-10 md:left-12 md:top-6 lg:left-28"
      >
        <h2 className="fx-head pointer-events-auto">
          <span className="fx-word text-primary">My</span>
          <span className="fx-word text-secondary">Certifications</span>
        </h2>
        <p className="mt-2 text-xs text-muted-foreground md:hidden">
          Swipe to browse · Tap to open
        </p>
      </div>

      {/* Counter chrome */}
      <div
        data-chrome
        className="pointer-events-none absolute right-6 top-24 z-10 flex items-center gap-3 md:right-12 md:top-24"
      >
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground tabular-nums">
          {String(logicalIdx + 1).padStart(2, "0")}
          <span className="mx-1.5 opacity-40">/</span>
          {String(N).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-foreground/30" />
      </div>

      {/* Title wrapper */}
      <div
        className={`absolute left-0 z-[1] overflow-hidden ${isMobile ? "w-full" : "w-1/2"}`}
        style={{
          top: `${layout.titleTopVh}dvh`,
          height: `${layout.titleAreaVh}dvh`,
          maskImage: MASK_GRADIENT,
          WebkitMaskImage: MASK_GRADIENT,
        }}
      >
        <div ref={titleRevealRef} className="absolute inset-0">
          <div
            ref={titleStripRef}
            className="absolute inset-x-0 top-0 will-change-transform"
          >
            {Array.from({ length: RENDERED }, (_, i) => {
              const item = ITEMS[i % N];
              return (
                <div
                  key={i}
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  onClick={() => navigateAndOpen(i)}
                  onPointerEnter={() => {
                    hoveredTitleIdxRef.current = i;
                  }}
                  onPointerLeave={() => {
                    if (hoveredTitleIdxRef.current === i) {
                      hoveredTitleIdxRef.current = null;
                    }
                  }}
                  role="button"
                  aria-label={`View certificate: ${item.title}`}
                  style={{ height: `${layout.titleSlotVh}dvh` }}
                  className={`flex cursor-pointer items-center overflow-hidden ${
                    isMobile
                      ? "justify-center px-6"
                      : "gap-4 pl-6 pr-6 md:pl-12 lg:pl-28"
                  }`}
                >
                  <h3 className="min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-sans leading-[1.2] tracking-[-0.015em]">
                    {displayTitle(item.title)}
                  </h3>
                  <span
                    ref={(el) => {
                      subtitleRefs.current[i] = el;
                    }}
                    data-reel-subtitle
                    style={{ opacity: 0 }}
                    className="hidden shrink-0 text-xs text-muted-foreground sm:inline"
                  >
                    {item.issuer} · {item.skills[0]} · {yearOf(item.period)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image wrapper */}
      <div
        className={`absolute overflow-hidden ${
          isMobile ? "left-0 w-full" : "right-0 w-1/2"
        }`}
        style={{
          top: `${layout.imageWrapperTopVh}dvh`,
          height: `${layout.imageWrapperHeightVh}dvh`,
          ...(isMobile
            ? { maskImage: MASK_GRADIENT, WebkitMaskImage: MASK_GRADIENT }
            : {}),
        }}
      >
        <div ref={imageRevealRef} className="absolute inset-0">
          <div
            ref={imageStripRef}
            className="absolute inset-x-0 top-0 will-change-transform"
            style={{ height: `${RENDERED * layout.imagePitchVh}dvh` }}
          >
            {Array.from({ length: RENDERED }, (_, i) => {
              const item = ITEMS[i % N];
              return (
                <div
                  key={i}
                  className="absolute inset-x-0 flex items-center justify-center"
                  style={{
                    top: `${(RENDERED - 1 - i) * layout.imagePitchVh}dvh`,
                    height: `${layout.imagePitchVh}dvh`,
                  }}
                >
                  <div
                    ref={(el) => {
                      slotRefs.current[i] = el;
                    }}
                    onClick={() => navigateAndOpen(i)}
                    onPointerEnter={() => {
                      isHoveringActiveRef.current = true;
                    }}
                    onPointerLeave={() => {
                      isHoveringActiveRef.current = false;
                    }}
                    role="button"
                    aria-label={`View certificate: ${item.title}`}
                    className="relative max-h-[38dvh] w-[92%] max-w-[80dvh] cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card md:max-h-[60dvh]"
                    style={{
                      aspectRatio: "3 / 2",
                    }}
                  >
                    {/* Fallback tile — visible while the photo loads or when
                        it fails, so the column never renders as an empty
                        void. The img paints above it once decoded. */}
                    <div
                      data-slot-fallback
                      aria-hidden="true"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
                    >
                      <Award className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm font-medium text-muted-foreground/70">
                        {item.issuer}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40">
                        {yearOf(item.period)}
                      </p>
                    </div>
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.style.opacity = "0";
                      }}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        const ratio = img.naturalWidth / img.naturalHeight;
                        if (Number.isFinite(ratio) && ratio > 0) {
                          aspectRef.current[i % N] = ratio;
                          const frame = slotRefs.current[i];
                          if (frame) frame.style.aspectRatio = `${ratio}`;
                        }
                      }}
                      className="relative h-full w-full object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cursor ring */}
      <div
        ref={clickMeRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/55"
        style={{
          opacity: 0,
          transition: "opacity 260ms ease-out",
          mixBlendMode: "difference",
          willChange: "transform, opacity",
        }}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-white">
          View
        </span>
      </div>

      {/* Detail panel */}
      {detailItem !== null && detailIdx !== null && (
        <div
          ref={detailRef}
          className="absolute inset-0 z-30"
          role="dialog"
          aria-modal="true"
          aria-label={detailItem.title}
          onClick={(e) => {
            if (
              e.target === e.currentTarget ||
              (e.target as HTMLElement).closest?.("[data-detail-scrim]")
            ) {
              handleClose();
            }
          }}
        >
          <div data-detail-scrim className="absolute inset-0 bg-background" />
          {isMobile ? (
            <div
              data-no-wheel
              className="absolute inset-0 overflow-y-auto"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex flex-col gap-6 px-6 pb-12 pt-24">
                <div data-detail-reveal>
                  <BackButton onClose={handleClose} />
                </div>
                <h2
                  ref={detailTitleRef}
                  className="break-words font-sans leading-[1.2] tracking-[-0.015em]"
                  style={{
                    fontSize: `${
                      displayTitle(detailItem.title).length <= 20
                        ? MOBILE_LAYOUT.titleFontVhMax * 1.1
                        : 2.35
                    }dvh`,
                    fontWeight: 620,
                    fontVariationSettings: '"wght" 620',
                    transformOrigin: "top left",
                    visibility: "hidden",
                  }}
                >
                  {displayTitle(detailItem.title)}
                </h2>
                <DetailBody item={detailItem} total={N} />
                <div
                  ref={detailImageRef}
                  className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-card"
                  style={{ transformOrigin: "top left", visibility: "hidden" }}
                >
                  <img
                    src={detailItem.image}
                    alt={detailItem.title}
                    draggable={false}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      const ratio = img.naturalWidth / img.naturalHeight;
                      if (Number.isFinite(ratio) && ratio > 0) {
                        aspectRef.current[detailIdx] = ratio;
                        if (detailImageRef.current) {
                          detailImageRef.current.style.aspectRatio = `${ratio}`;
                        }
                      }
                    }}
                    className="h-full w-full object-contain"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                data-no-wheel
                className="absolute left-0 top-0 flex h-full flex-col gap-6 overflow-y-auto px-8 pb-8 pt-24 md:px-14 md:pb-14 md:pt-28 lg:pb-16 lg:pl-28 lg:pr-16 lg:pt-28"
                style={{ width: "calc(55vw - 30px)" }}
              >
                <div data-detail-reveal>
                  <BackButton onClose={handleClose} />
                </div>
                <h2
                  ref={detailTitleRef}
                  className="mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-sans leading-[1.2] tracking-[-0.015em]"
                  style={{
                    fontSize:
                      displayTitle(detailItem.title).length <= 20
                        ? "clamp(2.4rem, 7dvh, 5rem)"
                        : "clamp(1.8rem, 5.2dvh, 3.4rem)",
                    fontWeight: 620,
                    fontVariationSettings: '"wght" 620',
                    transformOrigin: "top left",
                    visibility: "hidden",
                  }}
                >
                  {displayTitle(detailItem.title)}
                </h2>
                <DetailBody item={detailItem} total={N} />
              </div>
              <div
                data-no-wheel
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 right-[30px] top-0 flex items-center"
              >
                <div className="relative">
                  <div
                    ref={detailImageRef}
                    className="relative aspect-[3/2] w-[42vw] max-h-[80dvh] max-w-[640px] overflow-hidden rounded-2xl bg-card"
                    style={{ transformOrigin: "top left", visibility: "hidden" }}
                  >
                    <img
                      src={detailItem.image}
                      alt={detailItem.title}
                      draggable={false}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        const ratio = img.naturalWidth / img.naturalHeight;
                        if (Number.isFinite(ratio) && ratio > 0) {
                          aspectRef.current[detailIdx] = ratio;
                          if (detailImageRef.current) {
                            detailImageRef.current.style.aspectRatio = `${ratio}`;
                          }
                        }
                      }}
                      className="h-full w-full object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close details"
                    className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

function BackButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back
    </button>
  );
}

function DetailBody({ item, total }: { item: Certificate; total: number }) {
  const fullTitle = item.title;
  const short = displayTitle(item.title);
  return (
    <>
      {short !== fullTitle && (
        <p data-detail-reveal className="-mt-3 text-sm text-muted-foreground">
          {fullTitle}
        </p>
      )}
      <p data-detail-reveal className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {item.description}
      </p>
      <div data-detail-reveal className="grid grid-cols-2 gap-6">
        <MetaCell label="Issuer" value={item.issuer} />
        <MetaCell label="Issued" value={item.period} />
        <MetaCell label="Type" value={certType(item)} />
        <MetaCell
          label="Focus"
          value={item.skills.slice(0, 2).join(" · ")}
        />
      </div>
      <div data-detail-reveal>
        <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-secondary/20 bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary sm:px-3 sm:py-1.5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div data-detail-reveal className="mt-auto flex flex-wrap items-center gap-3 pt-10">
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
        >
          Verify Credential <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={item.image}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          View full image <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div data-detail-reveal>
        <Link
          to="/certificates"
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse all {total} certificates →
        </Link>
      </div>
    </>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export default CertificationsSection;
