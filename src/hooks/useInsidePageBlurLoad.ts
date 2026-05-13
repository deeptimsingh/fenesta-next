"use client";

import { useState, useEffect } from "react";

/**
 * Inside pages: show content with blur on load, then smooth transition to full clarity.
 * Run this first; header and banner effects should start only after isReady is true.
 * @returns pageBlurClass – add to page wrapper; isReady – true after durationMs (use to delay header/banner)
 */
export function useInsidePageBlurLoad(durationMs = 300) {
  const [blurDone, setBlurDone] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const frameId = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => setBlurDone(true), durationMs);
    });
    return () => {
      cancelAnimationFrame(frameId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [durationMs]);

  const pageBlurClass = blurDone ? "inside-page-blur-done" : "inside-page-blur-load";
  return { pageBlurClass, isReady: blurDone };
}
