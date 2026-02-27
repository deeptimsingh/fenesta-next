"use client";

/**
 * Header - Main site header with logo, navigation, search, and theme toggle
 *
 * Composes:
 * - Logo (left)
 * - NavigationBar (center) - desktop nav, mega menus, mobile drawer
 * - SearchOverlay - full-screen search modal
 * - ThemeToggle, Search button, Close mega menu (right)
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import SearchIcon from "@/components/SearchIcon";
import SearchOverlay from "@/components/base/SearchOverlay";
import NavigationBar from "@/components/base/NavigationBar";
import type { MegaMenuId } from "./navigationConfig";

export default function Header() {
  /* ---------- State ---------- */
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [hoverReady, setHoverReady] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("windows");

  /* ---------- Refs ---------- */
  const headerRef = useRef<HTMLElement | null>(null);
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(88);
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchOrigin, setSearchOrigin] = useState<DOMRect | null>(null);

  /* ---------- Effects ---------- */

  /** Set mounted flag and cleanup hover timeout on unmount */
  useEffect(() => {
    setMounted(true);
    return () => clearHoverCloseTimeout();
  }, []);

  /** Show header only after page is fully loaded */
  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  /** Delay hover-to-open so mega menu doesn't open when header first appears under cursor */
  useEffect(() => {
    if (!pageLoaded) return;
    const t = setTimeout(() => setHoverReady(true), 400);
    return () => clearTimeout(t);
  }, [pageLoaded]);

  /** Close mega menu on Escape key */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && megaMenuOpen) {
        setMegaMenuOpen(false);
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaMenuOpen]);

  /** Close mega menu when user scrolls */
  useEffect(() => {
    const onScroll = () => {
      if (megaMenuOpen) {
        setMegaMenuOpen(false);
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaMenuOpen]);

  /** Lock body scroll when mega menu is open */
  useEffect(() => {
    if (megaMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [megaMenuOpen]);

  /** Measure header height for mega menu positioning */
  useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    });
    ro.observe(headerRef.current);
    setHeaderHeight(headerRef.current.offsetHeight);
    return () => ro.disconnect();
  }, []);

  /* ---------- Mega menu hover handlers ---------- */

  /** Cancel the delayed close when user hovers back into nav/menu */
  const clearHoverCloseTimeout = () => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
  };

  /** Schedule close after 500ms when mouse leaves nav/menu area */
  const scheduleHoverClose = () => {
    clearHoverCloseTimeout();
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
      setActiveMegaMenu(null);
      hoverCloseTimeoutRef.current = null;
    }, 500);
  };

  /** Open a specific mega menu by id */
  const openMegaMenu = (id: Exclude<MegaMenuId, null>) => {
    clearHoverCloseTimeout();
    setActiveMegaMenu(id);
    setMegaMenuOpen(true);
  };

  /** Open mega menu from hover only when ready (avoids accidental open when header first appears) */
  const openMegaMenuFromHover = (id: Exclude<MegaMenuId, null>) => {
    if (hoverReady) openMegaMenu(id);
  };

  /** Close the mega menu immediately */
  const closeMegaMenu = () => {
    clearHoverCloseTimeout();
    setMegaMenuOpen(false);
    setActiveMegaMenu(null);
  };

  /* ---------- Search handlers ---------- */

  /** Open search overlay, storing button rect for animation origin */
  const handleSearchOpen = () => {
    const rect = searchButtonRef.current?.getBoundingClientRect();
    if (rect) setSearchOrigin(rect);
    setSearchOpen(true);
  };

  /** Close search overlay and clear origin */
  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchOrigin(null);
  };

  return (
    <>
      {/* ========== HEADER BAR ========== */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-100 shadow py-5 transition-all duration-500 ${
          megaMenuOpen ? "bg-theme " : "bg-theme/80"
        } ${pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <div className="container-fluid mx-0 sm:mx-0 2xl:mx-[10%] md:h-16 flex items-center  justify-between relative">
          {/* Logo - left */}
          <Link href="/" className="font-bold text-lg dark:text-white z-10">
            <Image
              src="/images/logo-white.svg"
              className="header-logo max-w-[40vw] md:max-w-[12vw]"
              alt="Fenesta"
              width={230}
              height={70}
            />
          </Link>

          {/* Navigation - center (desktop) */}
          <NavigationBar
            megaMenuOpen={megaMenuOpen}
            activeMegaMenu={activeMegaMenu}
            mobileOpen={mobileOpen}
            openAccordion={openAccordion}
            headerHeight={headerHeight}
            mounted={mounted}
            megaMenuRef={megaMenuRef}
            mobileRef={mobileRef}
            onOpenMegaMenu={openMegaMenu}
            onOpenMegaMenuFromHover={openMegaMenuFromHover}
            onCloseMegaMenu={closeMegaMenu}
            onClearHoverClose={clearHoverCloseTimeout}
            onScheduleHoverClose={scheduleHoverClose}
            onSetOpenAccordion={setOpenAccordion}
            onSetMobileOpen={setMobileOpen}
          />

          {/* Right side - close mega menu, theme, search (keep-open zone when menu is open) */}
          <div
            className="flex items-center gap-4 z-10"
            onMouseEnter={megaMenuOpen ? clearHoverCloseTimeout : undefined}
          >
            {megaMenuOpen && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMegaMenu();
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/20 hover:bg-white/80 text-white transition-colors cursor-pointer"
                aria-label="Close menu">
                <span className="text-2xl leading-none">×</span>
              </button>
            )}
            <ThemeToggle />
            <button
              ref={searchButtonRef}
              onClick={() =>
                searchOpen ? handleSearchClose() : handleSearchOpen()
              }
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/20 hover:bg-white/80 text-white transition-colors cursor-pointer"
              aria-label="Search">
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ========== SEARCH OVERLAY - Full-screen modal ========== */}
      <SearchOverlay
        isOpen={searchOpen}
        origin={searchOrigin}
        onClose={handleSearchClose}
        mounted={mounted}
      />
    </>
  );
}
