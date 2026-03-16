"use client";

import { useEffect, RefObject } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Options for the inside-page banner load animation (optional overrides) */
export type InsidePageBannerOptions = {
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
};

const DEFAULTS: Required<InsidePageBannerOptions> = {
  zoomDelay: 0.5,
  zoomDuration: 1.5,
  zoomFrom: 1.15,
  captionDelay: 1.5,
  captionDuration: 0.5,
  scrollCaptionDelay: 2200,
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

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const caption = captionRef?.current ?? null;

    // Wait one frame so layout is settled and we avoid jerk from ScrollTrigger/ref timing
    const raf = requestAnimationFrame(() => {
      // Zoom out from 1.15 → 1 (initial scale from inline style on first paint)
      gsap.to(bg, {
        scale: 1,
        duration: opts.zoomDuration,
        delay: opts.zoomDelay,
        ease: "power2.out",
        overwrite: true,
        force3D: true,
      });

      // Caption: fade + slide up after zoom
      if (caption) {
        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: opts.captionDuration,
          delay: opts.captionDelay,
          ease: "power2.out",
        });
      }
    });

    // Defer ScrollTrigger until after load animation so parallax doesn’t fight the zoom (reduces jerk)
    const loadDuration = (opts.zoomDelay + opts.zoomDuration + opts.captionDuration) * 1000;
    const scrollT = setTimeout(() => {
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

      if (caption) {
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
    };
  }, []);
}
