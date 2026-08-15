import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    // FIX 1: Changed "ScrollTrigger" to lowercase "scrollTrigger"
    scrollTrigger: {
      trigger: target,
      // FIX 2: Corrected the spelling of the last "reverse"
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

/**
 * FIXED ANIMATION UTILITY
 * Handles 3D rotation sync paired with DOM layout translations.
 */
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps,
) => {
  // Fail-safe check to prevent crashes if the 3D model canvas hasn't mounted yet
  if (!rotationRef?.current?.rotation) return;

  // 1. Wipe clean previous timeline records so animations never pile up or freeze
  timeline.clear();

  // 2. Animate the Three.js model's custom axis rotation state
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 2,
    ease: "power2.inOut",
    overwrite: "auto", // Terminate overlapping transition threads if user clicks fast
  });

  // 3. Translate the first HTML viewport view out of the viewport bounds
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<", // Synchronize timestamp to play directly with the rotation tween
  );

  // 4. Translate the second HTML viewport view into focus position
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<", // Synchronize timestamp to play directly with the rotation tween
  );
};
