import { useEffect, RefObject, useRef } from "react";
import { gsap } from "gsap";

interface UseHeadingAnimationOptions {
  headingRef?: RefObject<HTMLElement | null>;
  sectionRef?: RefObject<HTMLElement | HTMLDivElement | null>;
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  enterDuration?: number;
  exitDuration?: number;
  stagger?: number;
  initialRotateX?: number;
  initialY?: number;
}

/**
 * Custom hook for GSAP heading animation (in and out)
 * Creates refs internally and triggers animation when section is 20% visible in viewport
 * 
 * @param options Configuration options for the animation
 * @returns Object with headingRef and sectionRef for use in JSX
 * 
 * @example
 * ```tsx
 * // Option 1: Let hook create refs (recommended)
 * const { headingRef, sectionRef } = useHeadingAnimation({
 *   selector: "h2, h2 span",
 *   threshold: 0.2 // 20% viewport visibility
 * });
 * 
 * // Option 2: Provide your own refs
 * const headingRef = useRef<HTMLDivElement>(null);
 * const sectionRef = useRef<HTMLElement>(null);
 * useHeadingAnimation({ headingRef, sectionRef });
 * ```
 */
export function useHeadingAnimation({
  headingRef: providedHeadingRef,
  sectionRef: providedSectionRef,
  selector = "h2, h2 span",
  threshold = 0.2, // 20% viewport visibility - triggers animation when section is 20% visible
  rootMargin = '0px',
  enterDuration = 0.7, // Common duration for enter animation
  exitDuration = 0.7, // Common duration for exit animation
  stagger = 0.25, // Common stagger timing
  initialRotateX = 180, // Common initial rotation
  initialY = 30 // Common initial Y offset
}: UseHeadingAnimationOptions = {}) {
  // Create refs internally if not provided
  const internalHeadingRef = useRef<HTMLDivElement>(null);
  const internalSectionRef = useRef<HTMLDivElement>(null);
  
  const headingRef = providedHeadingRef || internalHeadingRef;
  const sectionRef = providedSectionRef || internalSectionRef;
  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;

    const content = headingRef.current;
    const items = content.querySelectorAll(selector);
    
    if (!items.length) return;

    // Initial hidden state with transform origin for smoother rotation
    gsap.set(items, {
      opacity: 0,
      rotateX: initialRotateX,
      y: initialY,
      transformOrigin: "center center",
      willChange: "transform, opacity"
    });

    // Enter animation timeline - smoother easing
    const tlIn = gsap.timeline({ paused: true });

    tlIn.to(items, {
      opacity: 1,
      rotateX: 0,
      y: 0,
      duration: enterDuration,
      ease: "power2.out", // Smoother than power3.out
      stagger: {
        amount: stagger,
        from: "start"
      },
      onComplete: () => {
        // Remove will-change after animation for performance
        gsap.set(items, { willChange: "auto" });
      }
    });

    // Exit animation timeline - smoother easing
    const tlOut = gsap.timeline({ paused: true });

    tlOut.to(items, {
      opacity: 0,
      rotateX: initialRotateX,
      y: initialY,
      duration: exitDuration,
      ease: "power2.in", // Smoother than power3.in
      stagger: {
        amount: stagger,
        from: "end" // Reverse stagger for exit
      },
      onComplete: () => {
        // Remove will-change after animation
        gsap.set(items, { willChange: "auto" });
      }
    });

    // Observe when section enters/exits viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enter animation - reset and restart
            gsap.set(items, {
              opacity: 0,
              rotateX: initialRotateX,
              y: initialY
            });
            tlOut.pause();
            tlIn.restart();
          } else {
            // Exit animation - animate out
            tlIn.pause();
            tlOut.restart();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // Cleanup animations
      tlIn.kill();
      tlOut.kill();
    };
  }, [headingRef, sectionRef, selector, threshold, rootMargin, enterDuration, exitDuration, stagger, initialRotateX, initialY]);

  // Return refs so components can use them in JSX
  return {
    headingRef: headingRef as RefObject<HTMLDivElement | null>,
    sectionRef: sectionRef as RefObject<HTMLDivElement | null>
  };
}
