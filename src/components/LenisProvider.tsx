'use client';

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Unlock scroll immediately so the scrollbar is visible as soon as this effect runs (no wait for Lenis)
    document.body.classList.remove("scroll-lock");
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    // Expose Lenis on window for external access
    (window as any).lenis = lenis;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenis.scrollTo(0, { immediate: true });
    // Extra pass next frame in case browser restores scroll after unlock
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenis.scrollTo(0, { immediate: true });
    });

    const raf = (time: number) => {
      lenis.raf(time);
      // Lenis animates scroll outside the native timeline — keep GSAP ScrollTrigger in sync
     // ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
