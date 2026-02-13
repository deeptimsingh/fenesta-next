"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CommonButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CommonButton({
  children,
  className = "",
}: CommonButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const leftArrowRef = useRef<HTMLSpanElement>(null);
  const rightArrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!btn || !leftArrow || !rightArrow) return;

    gsap.set(leftArrow, { x: 0, opacity: 1 });
    gsap.set(rightArrow, { x: 16, opacity: 0 });

    const hoverIn = () => {
      gsap.to(leftArrow, {
        x: -12,
        opacity: 0,
        duration: 0.25,
        
        ease: "power3.in",
      });

      gsap.to(rightArrow, {
        x: 0,
        opacity: 1,
        duration: 0.3,
         delay: 0.05,
        ease: "power3.out",
      });
    };

    const hoverOut = () => {
      gsap.to(rightArrow, {
        x: 12,
        opacity: 0,
        duration: 0.25,
        
        ease: "power3.in",
      });

      gsap.to(leftArrow, {
        x: 0,
        opacity: 1,
        duration: 0.3,
         delay: 0.05,
        ease: "power3.out",
      });
    };

    btn.addEventListener("mouseenter", hoverIn);
    btn.addEventListener("mouseleave", hoverOut);

    return () => {
      btn.removeEventListener("mouseenter", hoverIn);
      btn.removeEventListener("mouseleave", hoverOut);
      gsap.killTweensOf([leftArrow, rightArrow]);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`common-btn relative inline-flex items-center overflow-hidden  ${className}`}
    >
      {/* LEFT ARROW (default) */}
      <span
        ref={leftArrowRef}
        className="absolute left-5 text-lg pointer-events-none"
      >
        →
      </span>

      {/* TEXT (defines width) */}
      <span className="relative z-10 whitespace-nowrap uppercase">
        {children}
      </span>

      {/* RIGHT ARROW (hover) */}
      <span
        ref={rightArrowRef}
        className="absolute right-5 text-lg pointer-events-none"
      >
        →
      </span>
    </button>
  );
}
