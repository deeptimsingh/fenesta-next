"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";


type MenuKey = "about" | "products" | "why" | "design" | "contact";

export default function Header() {
  /* ===============================
     STATE
  =============================== */
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropX, setDropX] = useState(0);

  /* ===============================
     REFS
  =============================== */
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  /* ===============================
     MOUNT FIX (HYDRATION SAFE)
  =============================== */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ===============================
     DROPDOWN ANIMATION
  =============================== */
  useEffect(() => {
    if (!mounted || !dropdownRef.current) return;

    gsap.to(dropdownRef.current, {
      autoAlpha: activeMenu ? 1 : 0,
      y: activeMenu ? 0 : -10,
      duration: 0.25,
      ease: "power3.out",
      pointerEvents: activeMenu ? "auto" : "none",
    });
  }, [activeMenu, mounted]);

  /* ===============================
     MOBILE DRAWER
  =============================== */
  useEffect(() => {
    if (!mounted || !mobileRef.current) return;

    gsap.to(mobileRef.current, {
      x: mobileOpen ? "0%" : "100%",
      duration: 0.3,
      ease: "power3.out",
    });
  }, [mobileOpen, mounted]);

  /* ===============================
     RENDER
  =============================== */
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="font-bold text-lg">
            LOGO
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6">
            {[
              ["about", "About"],
              ["products", "Products"],
              ["why", "Why"],
              ["design", "Design"],
              ["contact", "Contact"],
            ].map(([key, label]) => (
              <button
                key={key}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setDropX(rect.left + rect.width / 2);
                  setActiveMenu(key as MenuKey);
                }}
                onMouseLeave={() => setActiveMenu(null)}
                className="font-medium hover:text-blue-600 relative"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* DESKTOP DROPDOWN */}
      <div
        ref={dropdownRef}
        style={{ left: dropX }}
        onMouseEnter={() => setActiveMenu(activeMenu)}
        onMouseLeave={() => setActiveMenu(null)}
        className="fixed top-16 -translate-x-1/2
                   bg-white shadow-lg rounded-xl p-6
                   opacity-0 pointer-events-none z-40"
      >
        {activeMenu && (
          <div className="space-y-2 text-sm min-w-[160px]">
            <p className="font-semibold capitalize">{activeMenu}</p>
            <Link href="#" className="block hover:text-blue-600">Item 1</Link>
            <Link href="#" className="block hover:text-blue-600">Item 2</Link>
            <Link href="#" className="block hover:text-blue-600">Item 3</Link>
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      <div
        ref={mobileRef}
        className="fixed top-0 right-0 h-full w-[80%]
                   bg-slate-900 text-white z-[100]
                   translate-x-full p-6"
      >
        <button
          className="mb-6 text-xl"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>

        <div className="flex flex-col gap-4">
          {["about", "products", "why", "design", "contact"].map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setMobileOpen(false)}
              className="capitalize"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
