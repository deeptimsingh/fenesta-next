"use client";

import { useLayoutEffect } from "react";

type Refs = {
  sectionRef: React.RefObject<HTMLElement | null>;
  frameRef: React.RefObject<HTMLDivElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
  captionRef: React.RefObject<HTMLDivElement | null>;
  overlayRef?: React.RefObject<HTMLDivElement | null>;
};

type Options = {
  /** smoothing factor; lower = smoother but slower catch-up */
  smooth?: number; // default 0.16
  /** optional smoothing just for background scale (overrides smooth) */
  bgSmooth?: number; // default 0.10
  /** initial card width in vw */
  fromWidthVw?: number; // default 60
  /** final card width in vw */
  toWidthVw?: number; // default 100
  /** initial card height in vh */
  fromHeightVh?: number; // default 65
  /** final card height in vh */
  toHeightVh?: number; // default 100
  /** initial border radius in px */
  fromRadiusPx?: number; // default 80
  /** final border radius in px */
  toRadiusPx?: number; // default 0
  /** background scale at start */
  fromBgScale?: number; // default 1.5
  /** background scale at end */
  toBgScale?: number; // default 1.0
  /** start animation when this fraction of viewport is visible (0.2 = 20vh) */
  startVisibleVh?: number; // default 0.65
  /** caption starts revealing when eased progress reaches this value */
  captionStart?: number; // default 0.65
  /** caption reveal range */
  captionRange?: number; // default 0.6
  /** caption offset X at start (vw) */
  captionFromX?: number; // default -10
  /** caption offset X at end (vw) */
  captionToX?: number; // default 0
  /** overlay starts revealing when eased progress reaches this value */
  overlayStart?: number; // default 0.50
  /** overlay reveal range */
  overlayRange?: number; // default 0.6
  /** called once when caption has finished revealing (opacity and position at target) */
  onCaptionRevealComplete?: () => void;
};

export function useOnlyBgImageCaptionAnimation(
  { sectionRef, frameRef, bgRef, captionRef, overlayRef }: Refs,
  opts: Options = {}
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const bg = bgRef.current;
    const caption = captionRef.current;
    const overlay = overlayRef?.current ?? null;
    if (!section || !frame || !bg || !caption) return;

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const {
      smooth = 0.16,
      bgSmooth = 0.10,
      fromWidthVw = 60,
      toWidthVw = 100,
      fromHeightVh = 65,
      toHeightVh = 100,
      fromRadiusPx = 80,
      toRadiusPx = 0,
      fromBgScale = 1.5,
      toBgScale = 1.0,
      startVisibleVh = 0.65,
      captionStart = 0.65,
      captionRange = 0.6,
      captionFromX = -10,
      captionToX = 0,
      overlayStart = 0.50,
      overlayRange = 0.6,
      onCaptionRevealComplete,
    } = opts;

    let raf = 0;
    let captionRevealFired = false;
    let inView = false;
    let lastTs = 0;
    let needsTick = true;

    const state = {
      radiusPx: fromRadiusPx,
      bgScale: fromBgScale,
      capOpacity: 0,
      capX: captionFromX,
      overlayOpacity: 0,
      // visual size as transform (avoid layout reflow / jerks)
      scaleX: fromWidthVw / 100,
      scaleY: fromHeightVh / 100,
    };

    const render = () => {
      frame.style.borderRadius = `${state.radiusPx}px`;
      frame.style.transform = `scale(${state.scaleX}, ${state.scaleY})`;
      bg.style.transform = `scale(${state.bgScale})`;
      caption.style.opacity = `${state.capOpacity}`;
      caption.style.transform = `translateX(${state.capX}vw)`;
      if (overlay) overlay.style.opacity = `${state.overlayOpacity}`;
    };

    const step = (ts: number) => {
      raf = 0;
      const dt = lastTs ? Math.min(48, ts - lastTs) : 16.67;
      lastTs = ts;
      const alpha = 1 - Math.pow(1 - smooth, dt / 16.67);
      const alphaBg = 1 - Math.pow(1 - bgSmooth, dt / 16.67);

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Start when ~startVisibleVh of viewport is visible.
      const startTop = vh * (1 - startVisibleVh);
      const t = clamp01((startTop - rect.top) / startTop);
      const eased = 1 - Math.pow(1 - t, 2);

      const targetW = lerp(fromWidthVw, toWidthVw, eased);
      const targetH = lerp(fromHeightVh, toHeightVh, eased);
      const targetR = lerp(fromRadiusPx, toRadiusPx, eased);
      const targetBg = lerp(fromBgScale, toBgScale, eased);

      const c = clamp01((eased - captionStart) / captionRange);
      const cEased = 1 - Math.pow(1 - c, 2);
      const targetCapOpacity = cEased;
      const targetCapX = lerp(captionFromX, captionToX, cEased);

      const o = clamp01((eased - overlayStart) / overlayRange);
      const oEased = 1 - Math.pow(1 - o, 2);
      const targetOverlayOpacity = oEased;

      const targetScaleX = targetW / 100;
      const targetScaleY = targetH / 100;

      state.scaleX = lerp(state.scaleX, targetScaleX, alpha);
      state.scaleY = lerp(state.scaleY, targetScaleY, alpha);
      state.radiusPx = lerp(state.radiusPx, targetR, alpha);
      state.bgScale = lerp(state.bgScale, targetBg, alphaBg);
      state.capOpacity = lerp(state.capOpacity, targetCapOpacity, alpha);
      state.capX = lerp(state.capX, targetCapX, alpha);
      state.overlayOpacity = lerp(state.overlayOpacity, targetOverlayOpacity, alpha);
      render();

      const close =
        Math.abs(state.bgScale - targetBg) < 0.001 &&
        Math.abs(state.scaleX - targetScaleX) < 0.001 &&
        Math.abs(state.scaleY - targetScaleY) < 0.001 &&
        Math.abs(state.radiusPx - targetR) < 0.25 &&
        Math.abs(state.capOpacity - targetCapOpacity) < 0.01 &&
        Math.abs(state.capX - targetCapX) < 0.5 &&
        (!overlay || Math.abs(state.overlayOpacity - targetOverlayOpacity) < 0.01);

      if (!captionRevealFired && close && targetCapOpacity >= 0.9) {
        captionRevealFired = true;
        onCaptionRevealComplete?.();
      }

      if ((inView && !close) || needsTick) {
        needsTick = false;
        raf = window.requestAnimationFrame(step);
      }
    };

    const kick = () => {
      needsTick = true;
      if (raf) return;
      raf = window.requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
      },
      { threshold: 0 }
    );
    io.observe(section);

    // Ensure base element is full-screen; we animate size using transform.
    frame.style.width = "100vw";
    frame.style.height = "100vh";
    frame.style.transformOrigin = "center";

    render();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sectionRef, frameRef, bgRef, captionRef, opts]);
}

