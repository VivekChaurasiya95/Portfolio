import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 pointer-events-none md:hidden" />
      {/* Wrapper to push the Spline canvas down to cut off the watermark */}
      <div className="absolute inset-x-0 top-0 bottom-[-80px] md:translate-x-[0%] lg:translate-x-[0%] scale-[1.2] md:scale-[1.4] lg:scale-[1.5] transition-transform duration-700">
        <Spline
          scene="https://prod.spline.design/9f3RAIU6aeChpYAP/scene.splinecode"
          className="w-full h-full cursor-none"
        />
      </div>
    </div>
  );
}
