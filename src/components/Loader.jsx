import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + scale the loader in
      gsap.from(loaderRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power3.out",
      });

      // Smooth pulsing animation
      gsap.to(loaderRef.current, {
        scale: 1.05,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Loading text animation
      gsap.to(textRef.current, {
        opacity: 0.35,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Progress animation
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 2.5,
          repeat: -1,
          ease: "power1.inOut",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Html>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div
          ref={loaderRef}
          className="flex w-[260px] flex-col items-center gap-6"
        >
          {/* Apple-style loader */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full border border-white/20" />

            <div className="absolute h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-white" />

            <div className="h-2 w-2 rounded-full bg-white" />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className="text-sm font-medium tracking-[0.35em] text-white uppercase"
          >
            Loading
          </div>

          {/* Progress bar */}
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div ref={progressRef} className="h-full rounded-full bg-white" />
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
