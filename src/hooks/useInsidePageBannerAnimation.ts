"use client";

import { useEffect, RefObject } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Options for the inside-page banner load animation (optional overrides) */
export type InsidePageBannerOptions = {
  /** When false, banner animation does not run (e.g. wait for page blur to clear). When true or undefined, run as usual. */
  startWhenReady?: boolean;
  /** Delay before banner zoom starts (default: 0.5) */
  zoomDelay?: number;
  /** Banner zoom duration (default: 1.5) */
  zoomDuration?: number;
  /** Initial scale for zoom (default: 1.15) */
  zoomFrom?: number;
  /** Delay before caption appears (default: 2 = zoomDelay + zoomDuration) */
  captionDelay?: number;
  /** Caption fade duration (default: 0.5) */
  captionDuration?: number;
  /** Delay before scroll-based caption animation is enabled (default: 2200) */
  scrollCaptionDelay?: number;
  /** Enable heading animation on load + viewport */
  enableHeadingAnimation?: boolean;
  /** Heading root selector inside caption */
  headingSelector?: string;
  /** Child selector to animate; falls back to heading node when empty */
  headingItemSelector?: string;
  /** Viewport threshold for heading re-trigger */
  headingThreshold?: number;
  /** Viewport root margin for heading observer */
  headingRootMargin?: string;
  /** Heading enter duration */
  headingEnterDuration?: number;
  /** Heading exit duration */
  headingExitDuration?: number;
  /** Heading stagger amount */
  headingStagger?: number;
  /** Heading initial rotateX */
  headingInitialRotateX?: number;
  /** Heading initial Y offset */
  headingInitialY?: number;
  /** Delay after caption starts before first heading animation */
  headingLoadDelay?: number;
};

const DEFAULTS: Required<InsidePageBannerOptions> = {
  startWhenReady: true,
  zoomDelay: 0.5,
  zoomDuration: 1.5,
  zoomFrom: 1.15,
  captionDelay: 1.5,
  captionDuration: 0.5,
  scrollCaptionDelay: 2200,
  enableHeadingAnimation: true,
  headingSelector: "h1",
  headingItemSelector: "span",
  headingThreshold: 0.2,
  headingRootMargin: "0px",
  headingEnterDuration: 0.7,
  headingExitDuration: 0.7,
  headingStagger: 0.25,
  headingInitialRotateX: 180,
  headingInitialY: 30,
  headingLoadDelay: 0.12,
};

/** Initial styles to apply to bg/caption so first paint is correct (no jerk from late JS) */
export function getInsidePageBannerInitialStyles(options: InsidePageBannerOptions = {}) {
  const opts = { ...DEFAULTS, ...options };
  return {
    bgStyle: {
      transform: `scale(${opts.zoomFrom})`,
      transformOrigin: "center center",
      willChange: "transform",
    } as CSSProperties,
    captionStyle: {
      opacity: 0,
      transform: "translateY(20px)",
    } as CSSProperties,
  };
}

/**
 * Shared animation for inside-page banners:
 * - On load: banner image smooth zoom in, then caption fade + slide up
 * - On scroll: parallax on image, caption fades as you scroll up
 * Apply getInsidePageBannerInitialStyles() to bg/caption divs so first paint has no jerk.
 */
export function useInsidePageBannerAnimation(
  bgRef: RefObject<HTMLDivElement | null>,
  captionRef: RefObject<HTMLDivElement | null> | null,
  options: InsidePageBannerOptions = {}
) {
  const opts = { ...DEFAULTS, ...options };
  const canStart = opts.startWhenReady !== false;

  useEffect(() => {
    if (!canStart) return;
    const bg = bgRef.current;
    const caption = captionRef?.current ?? null;
    let headingObserver: IntersectionObserver | null = null;
    let headingInTl: gsap.core.Timeline | null = null;
    let headingOutTl: gsap.core.Timeline | null = null;
    let headingLoadT: number | null = null;

    // Wait one frame so layout is settled and we avoid jerk from ScrollTrigger/ref timing
    const raf = requestAnimationFrame(() => {
      // Zoom out from 1.15 → 1 (initial scale from inline style on first paint)
      if (bg) {
        gsap.to(bg, {
          scale: 1,
          duration: opts.zoomDuration,
          delay: opts.zoomDelay,
          ease: "power2.out",
          overwrite: true,
          force3D: true,
        });
      }

      // Caption: fade + slide up after zoom
      if (caption) {
        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: opts.captionDuration,
          delay: opts.captionDelay,
          ease: "power2.out",
        });

        if (opts.enableHeadingAnimation) {
          const heading = caption.querySelector<HTMLElement>(opts.headingSelector);
          if (heading) {
            const items = heading.querySelectorAll<HTMLElement>(opts.headingItemSelector);
            const targets: HTMLElement[] = items.length
              ? Array.from(items)
              : [heading];

            gsap.set(targets, {
              opacity: 0,
              rotateX: opts.headingInitialRotateX,
              y: opts.headingInitialY,
              transformOrigin: "center center",
              willChange: "transform, opacity",
            });

            headingInTl = gsap.timeline({ paused: true });
            headingInTl.to(targets, {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration: opts.headingEnterDuration,
              ease: "power2.out",
              stagger: {
                amount: opts.headingStagger,
                from: "start",
              },
              onComplete: () => {
                if (targets.length && targets[0]?.isConnected) {
                  gsap.set(targets, { willChange: "auto" });
                }
              },
            });

            headingOutTl = gsap.timeline({ paused: true });
            headingOutTl.to(targets, {
              opacity: 0,
              rotateX: opts.headingInitialRotateX,
              y: opts.headingInitialY,
              duration: opts.headingExitDuration,
              ease: "power2.in",
              stagger: {
                amount: opts.headingStagger,
                from: "end",
              },
              onComplete: () => {
                if (targets.length && targets[0]?.isConnected) {
                  gsap.set(targets, { willChange: "auto" });
                }
              },
            }); 

            headingLoadT = window.setTimeout(() => {
              gsap.set(targets, {
                opacity: 0,
                rotateX: opts.headingInitialRotateX,
                y: opts.headingInitialY,
              });
              headingInTl?.restart();
            }, (opts.captionDelay + opts.headingLoadDelay) * 1000);

            const observeTarget = bg ?? caption;
            headingObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    gsap.set(targets, {
                      opacity: 0,
                      rotateX: opts.headingInitialRotateX,
                      y: opts.headingInitialY,
                    });
                    headingOutTl?.pause();
                    headingInTl?.restart();
                  } else {
                    headingInTl?.pause();
                    headingOutTl?.restart();
                  }
                });
              },
              { threshold: opts.headingThreshold, rootMargin: opts.headingRootMargin }
            );

            headingObserver.observe(observeTarget);
          }
        }
      }
    });

    // Defer ScrollTrigger until after load animation so parallax doesn’t fight the zoom (reduces jerk)
    const loadDuration = (opts.zoomDelay + opts.zoomDuration + opts.captionDuration) * 1000;
    const scrollT = setTimeout(() => {
      if (bg) {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (caption && bg) {
        gsap.to(caption, {
          opacity: 0.5,
          y: -40,
          scrollTrigger: {
            trigger: bg,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
      }
    }, Math.max(loadDuration, opts.scrollCaptionDelay));

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(scrollT);
      if (headingLoadT !== null) window.clearTimeout(headingLoadT);
      if (headingObserver) headingObserver.disconnect();
      headingInTl?.kill();
      headingOutTl?.kill();
    };
  }, [canStart]);
}
