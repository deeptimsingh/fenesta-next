"use client";

import { useLayoutEffect } from "react";

export type UseImageParallaxOptions = {
  fromScale?: number;
  toScale?: number;
  fromY?: number;
  toY?: number;
  smooth?: number;
  startVisibleVh?: number;
};

/**
 * Parallax for image: scroll-driven scale and Y movement (same as LeftRightStructure / only-bgimage-caption).
 * Apply to a container (observed) and imageWrap (element that gets transform).
 */
export function useImageParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  imageWrapRef: React.RefObject<HTMLElement | null>,
  opts: UseImageParallaxOptions = {}
) {
  const {
    fromScale = 1.15,
    toScale = 1,
    fromY = -20,
    toY = 20,
    smooth = 0.12,
    startVisibleVh = 0.6,
  } = opts;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const imageWrap = imageWrapRef.current;
    if (!container || !imageWrap) return;

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    let lastTs = 0;
    let inView = false;
    let stateScale = fromScale;
    let stateY = fromY;

    const render = () => {
      imageWrap.style.transform = `translate3d(0, ${stateY}px, 0) scale(${stateScale})`;
    };

    const step = (ts: number) => {
      raf = 0;
      const dt = lastTs ? Math.min(48, ts - lastTs) : 16.67;
      lastTs = ts;
      const alpha = 1 - Math.pow(1 - smooth, dt / 16.67);

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const travel = vh + rect.height || 1;
      const t = clamp01((vh - rect.top) / travel);
      const eased = 1 - Math.pow(1 - t, 2);
      const targetScale = lerp(fromScale, toScale, eased);
      const targetY = lerp(fromY, toY, eased);

      stateScale = lerp(stateScale, targetScale, alpha);
      stateY = lerp(stateY, targetY, alpha);
      render();

      if (
        inView ||
        Math.abs(stateScale - targetScale) > 0.001 ||
        Math.abs(stateY - targetY) > 0.05
      ) {
        raf = window.requestAnimationFrame(step);
      }
    };

    const kick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
      },
      { threshold: 0 }
    );
    observer.observe(container);
    imageWrap.style.transformOrigin = "center";
    render();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [containerRef, imageWrapRef, fromScale, toScale, fromY, toY, smooth, startVisibleVh]);
}
