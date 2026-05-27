"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CommonButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export default function EnquiryButton({
  children,
  className = "",
  href = "#",
}: CommonButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const leftArrowRef = useRef<HTMLSpanElement>(null);
  const rightArrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!btn || !leftArrow || !rightArrow) return;

    // Initial State
    gsap.set(leftArrow, {
      x: 0,
      opacity: 1,
    });

    gsap.set(rightArrow, {
      x: 16,
      opacity: 0,
    });

    // Hover In
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

    // Hover Out
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
    <a
      ref={btnRef}
      href={href}
     className={`
  common-btn
  relative
  inline-flex
  items-center
  overflow-hidden

  !bg-white
  border border-[#1296db]
  rounded-full

  !text-[#1296db]
  text-[14px]
  font-medium
  uppercase

  px-[22px]
  py-[10px]

  transition-all
  duration-300
  ease-out

  hover:!bg-[#1296db]
  hover:!text-white

  ${className}
`}
    >
      {/* LEFT ARROW */}
      <span
        ref={leftArrowRef}
        className="absolute left-5 text-lg leading-none pointer-events-none"
      >
        →
      </span>

      {/* TEXT */}
      <span className="relative z-10 whitespace-nowrap uppercase">
        {children}
      </span>

      {/* RIGHT ARROW */}
      <span
        ref={rightArrowRef}
        className="absolute right-5 text-lg leading-none pointer-events-none"
      >
        →
      </span>
    </a>
  );
}