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

  const tl = gsap.timeline();

  // Backdrop
  gsap.set(searchBackdropRef.current, {
    transformOrigin: `${cx}px ${cy}px`,
    opacity: 0,
    scale: 0.9,
  });

  // Panel
  gsap.set(searchPanelRef.current, {
    opacity: 0,
    scale: 0.8,
    y: 40,
  });

  tl.to(searchBackdropRef.current, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power3.out",
  });

  tl.to(
    searchPanelRef.current,
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.55,
      ease: "power4.out",
    },
    "-=0.3"
  );
}, [isOpen, origin, mounted]);

  /**
   * Close handler: animates panel and backdrop back to button, then calls onClose
   */
const handleClose = () => {
  if (!searchBackdropRef.current || !searchPanelRef.current) {
    onClose();
    return;
  }

  const tl = gsap.timeline({
    onComplete: onClose,
  });

  tl.to(searchPanelRef.current, {
    opacity: 0,
    scale: 0.85,
    y: 30,
    duration: 0.35,
    ease: "power3.inOut",
  });

  tl.to(
    searchBackdropRef.current,
    {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power3.inOut",
    },
    "-=0.25"
  );
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
        className="absolute inset-0 z-10 bg-black/85 backdrop-blur-sm"
        aria-hidden
      />

      {/* Close button - top right */}
      <button
        type="button"
        onClick={handleClose}
        className="fixed top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm border border-white/20"
        aria-label="Close search"
      >
        <span className="text-2xl leading-none" aria-hidden>
          ×
        </span>
      </button>

      {/* Search panel - grows from button to center */}
      <div
        ref={searchPanelRef}
        className="fixed z-30 rounded-xl bg-white dark:bg-gray-900 backdrop-blur-sm shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/50"
        style={{
           width: "min(70vw, 800px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-6xl px-8 py-12 h-full min-h-[120px] flex flex-col justify-center">
          <form
            className="flex items-center gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search products, windows, doors..."
              className="w-full bg-transparent text-gray-900 dark:text-white text-2xl md:text-4xl outline-none placeholder-gray-400 dark:placeholder-gray-500 font-light border-b border-[rgba(0,0,0,0.2)]"
              autoFocus
            />
            <button
              type="submit"
              className="text-gray-500 dark:text-gray-400 hover:text-[#0094D9] dark:hover:text-[#0094D9] transition-colors shrink-0"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Start typing to search...
          </div>
        </div>
      </div>
    </div>
  );
}
