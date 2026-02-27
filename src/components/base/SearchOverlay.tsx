"use client";

/**
 * SearchOverlay - Full-screen search modal
 *
 * Opens with a scale animation from the search button origin.
 * Closes with reverse animation back to the button.
 */

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SearchIcon from "@/components/SearchIcon";

interface SearchOverlayProps {
  /** Whether the overlay is visible */
  isOpen: boolean;
  /** Bounding rect of the trigger button (for open/close animation origin) */
  origin: DOMRect | null;
  /** Called when user requests close (click outside, Escape, or close button) */
  onClose: () => void;
  /** Whether the component has mounted (for animation) */
  mounted: boolean;
}

export default function SearchOverlay({
  isOpen,
  origin,
  onClose,
  mounted,
}: SearchOverlayProps) {
  const searchBackdropRef = useRef<HTMLDivElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);

  /**
   * Open animation: backdrop scales from button center, panel grows to center
   */
  useEffect(() => {
    if (!mounted || !isOpen || !origin) return;
    if (!searchBackdropRef.current || !searchPanelRef.current) return;

    const { x, y, width, height } = origin;
    const cx = x + width / 2;
    const cy = y + height / 2;

    gsap.set(searchBackdropRef.current, {
      transformOrigin: `${cx}px ${cy}px`,
      scale: 0,
      opacity: 1,
    });
    gsap.set(searchPanelRef.current, {
      left: x,
      top: y,
      width: width,
      height: height,
      x: 0,
      y: 0,
      opacity: 0,
    });

    gsap.to(searchBackdropRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(searchPanelRef.current, {
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
      width: "min(60vw, calc(100vw - 2rem))",
      height: "auto",
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
      delay: 0.08,
    });
  }, [isOpen, origin, mounted]);

  /**
   * Close handler: animates panel and backdrop back to button, then calls onClose
   */
  const handleClose = () => {
    if (!searchBackdropRef.current || !searchPanelRef.current) {
      onClose();
      return;
    }

    const { x, y, width, height } = origin || { x: 0, y: 0, width: 40, height: 40 };
    const cx = x + width / 2;
    const cy = y + height / 2;

    gsap.to(searchPanelRef.current, {
      left: x,
      top: y,
      x: 0,
      y: 0,
      width: width,
      height: height,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(searchBackdropRef.current, {
      scale: 0,
      transformOrigin: `${cx}px ${cy}px`,
      duration: 0.35,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  /** Handle Escape key */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  if (!isOpen || !origin) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Dark overlay - expands from button origin */}
      <div
        ref={searchBackdropRef}
        className="absolute inset-0 z-10 bg-black/90 backdrop-blur-md"
        aria-hidden
      />

      {/* Close button - top right */}
      <button
        type="button"
        onClick={handleClose}
        className="fixed top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white transition-colors"
        aria-label="Close search"
      >
        <span className="text-2xl leading-none" aria-hidden>
          ×
        </span>
      </button>

      {/* Search panel - grows from button to center */}
      <div
        ref={searchPanelRef}
        className="fixed z-30 rounded-2xl bg-grayLight backdrop-blur-md shadow-2xl overflow-hidden"
        style={{
          left: origin.x,
          top: origin.y,
          width: origin.width,
          height: origin.height,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-6xl px-6 py-8 h-full min-h-[100px] flex flex-col justify-center">
          <form
            className="flex items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Type and hit enter..."
              className="w-full bg-transparent text-gray-900 dark:text-white text-2xl md:text-4xl outline-none placeholder-gray-500 dark:placeholder-white/60"
              autoFocus
            />
            <button
              type="submit"
              className="ml-4 text-gray-800 dark:text-white hover:scale-110 transition-transform shrink-0"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
