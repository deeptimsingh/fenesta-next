'use client';

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    // Expose Lenis on window for external access
    (window as any).lenis = lenis;

    // Remove scroll-lock and force scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    document.body.classList.remove("scroll-lock");
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenis.scrollTo(0, { immediate: true });
    // Extra pass next frame in case browser restores after unlock
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    });

    const raf = (time: number) => {
      lenis.raf(time);
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
