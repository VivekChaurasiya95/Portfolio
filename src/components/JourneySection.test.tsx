import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import JourneySection from "./JourneySection";

// Controllable requestAnimationFrame queue (jsdom has no visual frames).
let rafQueue = new Map<number, FrameRequestCallback>();
let nextRafId = 1;

const stepFrames = (count: number) => {
  act(() => {
    for (let i = 0; i < count; i += 1) {
      const callbacks = [...rafQueue.values()];
      rafQueue.clear();
      callbacks.forEach((cb) => cb(performance.now()));
    }
  });
};

// Controllable IntersectionObserver: the component restarts motion on entry.
type IOCallback = (entries: { isIntersecting: boolean }[]) => void;
let ioCallback: IOCallback | null = null;

const setInView = (inView: boolean) => {
  act(() => {
    ioCallback?.([{ isIntersecting: inView }]);
  });
};

const TRACK_WIDTH = 800;
const TRACK_SCROLL_WIDTH = 860; // maxScroll = 60, reached in ~86 frames at 0.7px/frame

const renderJourney = () => {
  render(<JourneySection />);
  const track = screen.getByTestId("journey-track");
  Object.defineProperty(track, "clientWidth", {
    configurable: true,
    value: TRACK_WIDTH,
  });
  Object.defineProperty(track, "scrollWidth", {
    configurable: true,
    value: TRACK_SCROLL_WIDTH,
  });
  return track as HTMLElement;
};

beforeEach(() => {
  rafQueue = new Map();
  nextRafId = 1;
  ioCallback = null;
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    const id = nextRafId;
    nextRafId += 1;
    rafQueue.set(id, cb);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    rafQueue.delete(id);
  });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      callback: IOCallback;
      constructor(callback: IOCallback) {
        this.callback = callback;
        ioCallback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("JourneySection auto-motion", () => {
  it("stays still until the section scrolls into view", () => {
    const track = renderJourney();
    expect(track.scrollLeft).toBe(0);
    stepFrames(10);
    expect(track.scrollLeft).toBe(0);
  });

  it("starts moving from the beginning on view entry and stops at the end", () => {
    const track = renderJourney();
    setInView(true);
    expect(track.scrollLeft).toBe(0);
    expect(screen.getByText("Moving")).toBeInTheDocument();

    stepFrames(10);
    expect(track.scrollLeft).toBeGreaterThan(0);

    stepFrames(200);
    expect(track.scrollLeft).toBe(TRACK_SCROLL_WIDTH - TRACK_WIDTH);
    expect(
      screen.getByTitle("Restart timeline from B.Tech"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Completed • Stopped at FlyRank AI/),
    ).toBeInTheDocument();
  });

  it("restarts from the beginning when the section re-enters view", () => {
    const track = renderJourney();
    setInView(true);
    stepFrames(200);
    expect(
      screen.getByTitle("Restart timeline from B.Tech"),
    ).toBeInTheDocument();

    setInView(false);
    const parked = track.scrollLeft;
    stepFrames(10);
    expect(track.scrollLeft).toBe(parked);

    setInView(true);
    expect(track.scrollLeft).toBe(0);
    expect(
      screen.queryByTitle("Restart timeline from B.Tech"),
    ).not.toBeInTheDocument();
    stepFrames(10);
    expect(track.scrollLeft).toBeGreaterThan(0);
  });
});
