"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // DISABLE CURSOR ON MOBILE/TABLET
    if (window.innerWidth < 1024) {
      ringRef.current?.classList.add("hidden");
      dotRef.current?.classList.add("hidden");
      return; // stop running the whole effect
    }

    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    const ringSetter = gsap.quickSetter(ring, "css");
    const dotSetter = gsap.quickSetter(dot, "css");

    const ringSize = 40;
    const dotSize = 6;

    let firstMove = true;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (firstMove) {
        ring.style.transform = `translate3d(${mouseX - ringSize / 2}px, ${mouseY - ringSize / 2}px, 0)`;
        dot.style.transform = `translate3d(${mouseX - dotSize / 2}px, ${mouseY - dotSize / 2}px, 0)`;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
        firstMove = false;
      }
    });

    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      ringSetter({ x: `${ringX - ringSize / 2}px`, y: `${ringY - ringSize / 2}px` });
      dotSetter({ x: `${dotX - dotSize / 2}px`, y: `${dotY - dotSize / 2}px` });
    });

    const interactive = document.querySelectorAll("a, button, [data-cursor]");

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-hover");

        gsap.to(ring, {
          width: 70,
          height: 70,
          background: "rgba(0,148,218,0.3)",
          borderWidth: 0,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        ring.classList.remove("cursor-hover");
        dot.classList.remove("cursor-hover");

        gsap.to(ring, {
          width: 30,
          height: 30,
          background: "transparent",
          borderWidth: 2,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "back.out(1.7)",
        });
      });
    });

    window.addEventListener("mousedown", () => {
      gsap.to(ring, { scale: 0.75, duration: 0.1, ease: "power2.out" });
    });

    window.addEventListener("mouseup", () => {
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
    });
  }, []);

  return (
    <>
      <div id="cursor-ring" ref={ringRef}></div>
      <div id="cursor-dot" ref={dotRef}></div>
    </>
  );
}


