"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    // next-themes automatically handles adding/removing 'dark' class and localStorage
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Debug: Log theme change
    console.log("Theme changed to:", newTheme);
    
    // Ensure dark class is applied/removed
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <span className="w-5 h-5">🌓</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-800 
                 flex items-center justify-center
                 transition-colors duration-200
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  );
}
