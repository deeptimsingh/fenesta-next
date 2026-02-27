"use client";

/**
 * NavigationBar - Desktop nav, mega menus, and mobile drawer
 *
 * Renders the main navigation links with mega menu dropdowns.
 * Each nav item opens a full-screen mega menu on hover (desktop) or click (mobile).
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Image from "next/image";
import type { MegaMenuId } from "./navigationConfig";
import { getMegaMenuTitle } from "./navigationConfig";

/* ========== NavItemWithMega - Single nav link with mega menu ========== */

interface NavItemWithMegaProps {
  id: Exclude<MegaMenuId, null>;
  label: string;
  activeMegaMenu: MegaMenuId;
  onOpen: (id: Exclude<MegaMenuId, null>) => void;
  onOpenFromHover: (id: Exclude<MegaMenuId, null>) => void;
  onClose: () => void;
  onHoverEnter: () => void;
}

/**
 * Renders a nav link that opens its mega menu on hover (desktop) or click.
 * Shows active state (blue pill) when its mega menu is open.
 */
function NavItemWithMega({
  id,
  label,
  activeMegaMenu,
  onOpen,
  onOpenFromHover,
  onClose,
  onHoverEnter,
}: NavItemWithMegaProps) {
  const isActive = activeMegaMenu === id;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        onHoverEnter();
        onOpenFromHover(id);
      }}
    >
      <button
        onClick={() => (isActive ? onClose() : onOpen(id))}
        className={`text-base relative py-2 px-3 transition-colors min-w-max flex flex-wrap rounded-full ${
          isActive ? "bg-[#0094D9] text-white" : "text-white hover:text-blue-400"
        }`}
      >
        {label}
      </button>
    </div>
  );
}

/* ========== MobileSubMenuView - Sub-screen with back button ========== */

interface MobileSubMenuViewProps {
  id: Exclude<MegaMenuId, null>;
  openAccordion: string | null;
  onSetOpenAccordion: (id: string | null) => void;
  onBack: () => void;
  onClose: () => void;
}

const mobileLinkClass =
  "text-black dark:text-white font-medium hover:text-[#0094D9] transition-colors block py-2";

function MobileSubMenuView({
  id,
  openAccordion,
  onSetOpenAccordion,
  onBack,
  onClose,
}: MobileSubMenuViewProps) {
  const title = getMegaMenuTitle(id);
  const toggleAccordion = (accId: string) =>
    onSetOpenAccordion(openAccordion === accId ? null : accId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Back to menu"
        >
          <span className="text-xl">←</span>
        </button>
        <h2 className="text-xl font-bold flex-1">{title}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-blue rounded-full transition-colors text-2xl"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto -mx-6 px-6">
        {id === "who-we-are" && (
          <ul className="space-y-1">
            <li><Link href="#" className={mobileLinkClass}>OVERVIEW</Link></li>
            <li><Link href="#" className={mobileLinkClass}>AWARDS & ACCREDITATIONS</Link></li>
            <li><Link href="#" className={mobileLinkClass}>SUSTAINABILITY</Link></li>
            <li><Link href="#" className={mobileLinkClass}>IN THE NEWS</Link></li>
          </ul>
        )}
        {id === "our-collection" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                By Room
              </h3>
              <ul className="space-y-1">
                {["LIVING ROOM", "BEDROOM", "KITCHEN", "BALCONY", "STUDY/OFFICE", "BATHROOM"].map((room) => (
                  <li key={room}>
                    <Link href="#" className={mobileLinkClass}>{room}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                All Products
              </h3>
              <MobileAccordion
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
              />
            </div>
          </div>
        )}
        {id === "fenesta-difference" && (
          <ul className="space-y-1">
            <li><Link href="#" className={mobileLinkClass}>OVERVIEW</Link></li>
            <li><Link href="#" className={mobileLinkClass}>QUALITY & INNOVATION</Link></li>
            <li><Link href="#" className={mobileLinkClass}>WARRANTY</Link></li>
            <li><Link href="#" className={mobileLinkClass}>SERVICE</Link></li>
          </ul>
        )}
        {id === "projects-stories" && (
          <ul className="space-y-1">
            <li><Link href="#" className={mobileLinkClass}>OVERVIEW</Link></li>
            <li><Link href="#" className={mobileLinkClass}>BLOGS</Link></li>
            <li><Link href="#" className={mobileLinkClass}>FABLES OF FAÇADE</Link></li>
            <li><Link href="#" className={mobileLinkClass}>ACE CLUB</Link></li>
          </ul>
        )}
        {id === "contact-us" && (
          <ul className="space-y-1">
            <li><Link href="#" className={mobileLinkClass}>OVERVIEW</Link></li>
            <li><Link href="#" className={mobileLinkClass}>GET IN TOUCH</Link></li>
            <li><Link href="#" className={mobileLinkClass}>FIND A DEALER</Link></li>
            <li><Link href="#" className={mobileLinkClass}>CAREERS</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}

/* ========== MobileAccordion - Simplified for Our Collection ========== */

interface MobileAccordionProps {
  openAccordion: string | null;
  onToggle: (id: string) => void;
}

function MobileAccordion({ openAccordion, onToggle }: MobileAccordionProps) {
  const sections = [
    { id: "windows", label: "WINDOWS", links: ["Casement window", "Slider window", "Tilt and turn", "Fixed window", "Glass to glass window", "Combination window", "Mini window", "Arch Window", "Louvers"] },
    { id: "doors", label: "DOORS", links: ["Entry Doors", "Sliding Doors"] },
    { id: "solid", label: "SOLID PANEL DOORS", links: [] },
    { id: "facades", label: "FACADES", links: [] },
    { id: "accessories", label: "ACCESSORIES", links: [] },
  ];
  return (
    <div className="space-y-1">
      {sections.map(({ id, label, links }) => {
        const isOpen = openAccordion === id;
        return (
          <div key={id}>
            <button
              type="button"
              onClick={() => onToggle(id)}
              className="w-full flex items-center justify-between text-black dark:text-white font-medium hover:text-[#0094D9] transition-colors py-2 cursor-pointer"
            >
              <span>{label}</span>
              <span className="text-gray-500 text-xl">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && links.length > 0 && (
              <ul className="pl-3 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 ml-1">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#0094D9] block py-1">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ========== NavigationBar - Main component ========== */

interface NavigationBarProps {
  /** Whether any mega menu is open */
  megaMenuOpen: boolean;
  /** Which mega menu section is currently active */
  activeMegaMenu: MegaMenuId;
  /** Whether mobile drawer is open */
  mobileOpen: boolean;
  /** Which All Products accordion section is expanded (Our Collection only) */
  openAccordion: string | null;
  /** Header height in px (for mega menu positioning) */
  headerHeight: number;
  /** Whether component has mounted (for animations) */
  mounted: boolean;
  /** Ref for mega menu container */
  megaMenuRef: React.RefObject<HTMLDivElement | null>;
  /** Ref for mobile drawer */
  mobileRef: React.RefObject<HTMLDivElement | null>;
  /** Open a mega menu by id (click) */
  onOpenMegaMenu: (id: Exclude<MegaMenuId, null>) => void;
  /** Open a mega menu by id (hover only - delayed to avoid accidental open on page load) */
  onOpenMegaMenuFromHover: (id: Exclude<MegaMenuId, null>) => void;
  /** Close the mega menu */
  onCloseMegaMenu: () => void;
  /** Cancel the delayed hover-close (keep menu open) */
  onClearHoverClose: () => void;
  /** Schedule delayed close when mouse leaves */
  onScheduleHoverClose: () => void;
  /** Toggle accordion section (Our Collection) */
  onSetOpenAccordion: (id: string | null) => void;
  /** Open mobile drawer */
  onSetMobileOpen: (open: boolean) => void;
}

export default function NavigationBar({
  megaMenuOpen,
  activeMegaMenu,
  mobileOpen,
  openAccordion,
  headerHeight,
  mounted,
  megaMenuRef,
  mobileRef,
  onOpenMegaMenu,
  onOpenMegaMenuFromHover,
  onCloseMegaMenu,
  onClearHoverClose,
  onScheduleHoverClose,
  onSetOpenAccordion,
  onSetMobileOpen,
}: NavigationBarProps) {


  /**
   * Mega menu: slide in from top + staggered link animation
   */
  useEffect(() => {
    if (!mounted || !megaMenuRef.current) return;
    const el = megaMenuRef.current;

    if (megaMenuOpen) {
      gsap.set(el, { pointerEvents: "auto" });
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      tl.from(
        el.querySelectorAll(".mega-menu-item"),
        {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.25"
      );
    } else {
      gsap.to(el, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [megaMenuOpen, activeMegaMenu, mounted, megaMenuRef]);

  /** Mobile sub-menu: main list vs sub-view with back button */
  const [mobileMenuLevel, setMobileMenuLevel] = useState<"main" | "sub">("main");
  const [mobileSubMenu, setMobileSubMenu] = useState<Exclude<MegaMenuId, null> | null>(null);
  const mobileMainRef = useRef<HTMLDivElement>(null);
  const mobileSubRef = useRef<HTMLDivElement>(null);
  const mobilePrevLevelRef = useRef<"main" | "sub">("main");

  /** Reset to main when drawer closes */
  useEffect(() => {
    if (!mobileOpen) {
      setMobileMenuLevel("main");
      setMobileSubMenu(null);
      mobilePrevLevelRef.current = "main";
    }
  }, [mobileOpen]);

  /** Smooth slide animation between main and sub level */
  useLayoutEffect(() => {
    if (!mobileOpen || !mobileMainRef.current || !mobileSubRef.current) return;
    const main = mobileMainRef.current;
    const sub = mobileSubRef.current;
    const duration = 0.35;
    const ease = "power3.out";

    if (mobilePrevLevelRef.current === mobileMenuLevel) {
      gsap.set(main, { x: mobileMenuLevel === "main" ? 0 : "-100%" });
      gsap.set(sub, { x: mobileMenuLevel === "main" ? "100%" : 0 });
      return;
    }

    if (mobileMenuLevel === "sub") {
      gsap.to(main, { x: "-100%", duration, ease });
      gsap.fromTo(sub, { x: "100%" }, { x: 0, duration, ease });
    } else {
      gsap.to(sub, { x: "100%", duration, ease });
      gsap.fromTo(main, { x: "-100%" }, { x: 0, duration, ease });
    }
    mobilePrevLevelRef.current = mobileMenuLevel;
  }, [mobileMenuLevel, mobileOpen]);

  return (
    <>
      {/* ========== DESKTOP NAV - Center of header ========== */}
      <nav
        className="hidden lg:flex gap-[2vw] items-center absolute left-1/2 -translate-x-1/2 z-100"
        onMouseEnter={onClearHoverClose}
        onMouseLeave={onScheduleHoverClose}
      >
        <NavItemWithMega
          id="who-we-are"
          label="Who we are"
          activeMegaMenu={activeMegaMenu}
          onOpen={onOpenMegaMenu}
          onOpenFromHover={onOpenMegaMenuFromHover}
          onClose={onCloseMegaMenu}
          onHoverEnter={onClearHoverClose}
        />
        <NavItemWithMega
          id="our-collection"
          label="Our Collection"
          activeMegaMenu={activeMegaMenu}
          onOpen={onOpenMegaMenu}
          onOpenFromHover={onOpenMegaMenuFromHover}
          onClose={onCloseMegaMenu}
          onHoverEnter={onClearHoverClose}
        />
        <NavItemWithMega
          id="fenesta-difference"
          label="The Fenesta Difference"
          activeMegaMenu={activeMegaMenu}
          onOpen={onOpenMegaMenu}
          onOpenFromHover={onOpenMegaMenuFromHover}
          onClose={onCloseMegaMenu}
          onHoverEnter={onClearHoverClose}
        />
        <NavItemWithMega
          id="projects-stories"
          label="Projects & Stories"
          activeMegaMenu={activeMegaMenu}
          onOpen={onOpenMegaMenu}
          onOpenFromHover={onOpenMegaMenuFromHover}
          onClose={onCloseMegaMenu}
          onHoverEnter={onClearHoverClose}
        />
        <NavItemWithMega
          id="contact-us"
          label="Contact us"
          activeMegaMenu={activeMegaMenu}
          onOpen={onOpenMegaMenu}
          onOpenFromHover={onOpenMegaMenuFromHover}
          onClose={onCloseMegaMenu}
          onHoverEnter={onClearHoverClose}
        />
      </nav>

      {/* ========== MEGA MENU - Full-screen dropdown below header ========== */}
      <div
        ref={megaMenuRef}
        onMouseEnter={onClearHoverClose}
        onMouseLeave={onScheduleHoverClose}
        className="fixed left-0 right-0 w-full bg-darkbase z-90 pointer-events-none opacity-0 flex flex-col"
        style={{
          transform: "translateY(-100%)",
          top: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`${getMegaMenuTitle(activeMegaMenu)} menu`}
      >
        <div className="flex flex-1 min-h-0 overflow-hidden bg-theme">
          {activeMegaMenu === "our-collection" ? (
            <MegaMenuOurCollection
              openAccordion={openAccordion}
              onSetOpenAccordion={onSetOpenAccordion}
            />
          ) : activeMegaMenu === "who-we-are" ? (
            <MegaMenuWhoWeAre />
          ) : activeMegaMenu === "fenesta-difference" ? (
            <MegaMenuFenestaDifference />
          ) : activeMegaMenu === "projects-stories" ? (
            <MegaMenuProjectsStories />
          ) : activeMegaMenu === "contact-us" ? (
            <MegaMenuContactUs />
          ) : null}
        </div>
      </div>

      {/* ========== MOBILE MENU BUTTON - Hamburger ========== */}
      <button
        className="lg:hidden absolute top-1/2 -translate-y-1/2 right-32 z-50 w-10 h-10 rounded-full bg-cream/30 hover:bg-cream/80 text-white flex items-center justify-center transition-colors duration-200"
        onClick={() => onSetMobileOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* ========== MOBILE DRAWER - Slide-in from right with spring overshoot ========== */}
      <div
        ref={mobileRef}
        className={`mobile-drawer fixed top-0 right-0 h-screen  w-[85%] max-w-sm bg-white dark:bg-gray-900 text-black dark:text-white z-[100] overflow-hidden shadow-xl flex flex-col ${mobileOpen ? "mobile-drawer-open" : ""}`}
      >
        <div className="relative flex-1 min-h-0 overflow-hidden">
          {/* Main level - slides left when going to sub */}
          <div
            ref={mobileMainRef}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-2xl p-1 hover:opacity-70"
                onClick={() => onSetMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-0">
              {(
                [
                  ["who-we-are", "Who we are"],
                  ["our-collection", "Our Collection"],
                  ["fenesta-difference", "The Fenesta Difference"],
                  ["projects-stories", "Projects & Stories"],
                  ["contact-us", "Contact us"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => {
                    setMobileSubMenu(id);
                    setMobileMenuLevel("sub");
                  }}
                  className="w-full text-left border-b border-gray-200 dark:border-gray-700 py-4 font-semibold text-lg flex items-center justify-between group"
                >
                  {label}
                  <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* Sub level - slides in from right when opening sub */}
          <div
            ref={mobileSubRef}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            {mobileSubMenu && (
              <MobileSubMenuView
                id={mobileSubMenu}
                openAccordion={openAccordion}
                onSetOpenAccordion={onSetOpenAccordion}
                onBack={() => setMobileMenuLevel("main")}
                onClose={() => onSetMobileOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ========== MegaMenuOurCollection - By Room + All Products ========== */
interface MegaMenuOurCollectionProps {
  openAccordion: string | null;
  onSetOpenAccordion: (id: string | null) => void;
}

/**
 * Our Collection mega menu: By Room links + All Products accordion
 */
function MegaMenuOurCollection({
  openAccordion,
  onSetOpenAccordion,
}: MegaMenuOurCollectionProps) {
  const toggleAccordion = (id: string) =>
    onSetOpenAccordion(openAccordion === id ? null : id);

  return (
    <>
      <div className="flex-1 bg-theme overflow-y-auto">
        <div className="container-fluid mx-[20px] sm:mx-[5%] 2xl:mx-[10%] py-10 px-8 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 w-[20vw] flex-wrap shrink-0">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-6">
              By Room
            </h3>
            <ul className="space-y-4">
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  LIVING ROOM
                </Link>
              </li>
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  BEDROOM
                </Link>
              </li>
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  KITCHEN
                </Link>
              </li>
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  BALCONY
                </Link>
              </li>
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  STUDY/OFFICE
                </Link>
              </li>
              <li className="mega-menu-item">
                <Link
                  href="#"
                  className="text-white text-lg font-medium hover:text-[#0094D9] transition-colors block"
                >
                  BATHROOM
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 shrink-0 w-[30vw] min-w-lg flex-wrap ">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-6">
              All Products
            </h3>
            <div className="space-y-1">
              <AccordionSection
                id="windows"
                label="WINDOWS"
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
                content={
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">
                        Upvc windows
                      </p>
                      <ul className="space-y-1">
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Casement window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Slider window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Tilt and turn</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Fixed window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Glass to glass window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Combination window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Mini window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Arch Window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Louvers</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">
                        Alu windows
                      </p>
                      <ul className="space-y-1">
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Casement window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Slider window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Tilt and turn Corestella</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Fixed Window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Glass to Glass window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Combination Window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">AwD</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Arch Window</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Louvers</Link></li>
                        <li><Link href="#" className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block">Vertical slide</Link></li>
                      </ul>
                    </div>
                  </div>
                }
              />
              <AccordionSection
                id="doors"
                label="DOORS"
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
                content={
                  <div className="mt-2 pl-0">
                    <p className="text-white/80 text-sm font-medium mb-2">
                      Entry & Sliding
                    </p>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="#"
                          className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block"
                        >
                          Entry Doors
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-white/70 text-sm hover:text-[#0094D9] transition-colors block"
                        >
                          Sliding Doors
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              />
              <AccordionSection
                id="solid"
                label="SOLID PANEL DOORS"
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
                content={
                  <div className="mt-2 text-white/70 text-sm">
                    Content for Solid Panel Doors
                  </div>
                }
              />
              <AccordionSection
                id="facades"
                label="FACADES"
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
                content={
                  <div className="mt-2 text-white/70 text-sm">
                    Content for Facades
                  </div>
                }
              />
              <AccordionSection
                id="accessories"
                label="ACCESSORIES"
                openAccordion={openAccordion}
                onToggle={toggleAccordion}
                content={
                  <div className="mt-2 text-white/70 text-sm">
                    Content for Accessories
                  </div>
                }
              />
            </div>
          </div>           

          <div className="hidden lg:flex w-[40vw] max-w-xl shrink-0 p-6 gap-4">
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[30%] h-full">
              <Image
                src="/images/nav-img1.webp"
                alt="Bedroom with window"
                fill
                className="object-cover" sizes="300px"           
              />
            </div>
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[70%] h-full">
              <Image
                src="/images/nav-img2.webp"
                alt="Living space with glass doors"
                fill
                className="object-cover"  sizes="300px"    
              />
            </div>
          </div>
        </div>  
      </div>
    </>
  );
}

/* ========== AccordionSection - Reusable accordion item ========== */

interface AccordionSectionProps {
  id: string;
  label: string;
  openAccordion: string | null;
  onToggle: (id: string) => void;
  content: React.ReactNode;
}

function AccordionSection({
  id,
  label,
  openAccordion,
  onToggle,
  content,
}: AccordionSectionProps) {
  const isOpen = openAccordion === id;
  return (
    <div className="mega-menu-item">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between text-white text-base font-medium hover:text-[#0094D9] transition-colors py-2 cursor-pointer"
      >
        <span>{label}</span>
        <span className="text-white/70 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && content}
    </div>
  );
}

/* ========== Mega menus - Direct HTML (no arrays) ========== */

const linkClass =
  "text-white text-lg font-medium hover:text-[#0094D9] transition-colors block";

const imgClass =
  "relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg min-w-0";

/** Who we are - direct links, no array */
function MegaMenuWhoWeAre() {
  return (
    <div className="flex-1 bg-[#121212] overflow-y-auto">
      <div className="container-fluid mx-[20px] sm:mx-[5%] 2xl:mx-[10%] py-10 px-8 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 justify-between">
        <div className="flex-1 w-[20vw] max-w-lg flex-wrap shrink-0 max-w-lg">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-4 pb-2 border-b border-white/30">
            Who we are
          </h3>
          <ul className="space-y-4">
            <li className="mega-menu-item"><Link href="#" className={linkClass}>OVERVIEW</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>AWARDS & ACCREDITATIONS</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>SUSTAINABILITY</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>IN THE NEWS</Link></li>
          </ul>
        </div>
      
        <div className="hidden lg:flex w-[40vw] max-w-xl shrink-0 p-6 gap-4 min-h-[50vh]">
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[30%] h-full">
              <Image
                src="/images/nav-img1.webp"
                alt="Bedroom with window"
                fill
                className="object-cover" sizes="300px"           
              />
            </div>
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[70%] h-full">
              <Image
                src="/images/nav-img2.webp"
                alt="Living space with glass doors"
                fill
                className="object-cover"  sizes="300px"    
              />
            </div>
          </div>
      </div>
    </div>
  );
}

/** The Fenesta Difference - direct links, no array */
function MegaMenuFenestaDifference() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container-fluid mx-[20px] sm:mx-[5%] 2xl:mx-[10%] py-10 px-8 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 justify-between">
        <div className="flex-1 w-[20vw] flex-wrap shrink-0 max-w-lg">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-4 pb-2 border-b border-white/30">
            The Fenesta Difference
          </h3>
          <ul className="space-y-4">
            <li className="mega-menu-item"><Link href="#" className={linkClass}>OVERVIEW</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>QUALITY & INNOVATION</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>WARRANTY</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>SERVICE</Link></li>
          </ul>
        </div>
       
        <div className="hidden lg:flex w-[40vw] max-w-xl shrink-0 p-6 gap-4 min-h-[50vh]">
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[30%] h-full">
              <Image
                src="/images/nav-img1.webp"
                alt="Bedroom with window"
                fill
                className="object-cover" sizes="300px"           
              />
            </div>
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[70%] h-full">
              <Image
                src="/images/nav-img2.webp"
                alt="Living space with glass doors"
                fill
                className="object-cover"  sizes="300px"    
              />
            </div>
          </div>
      </div>
    </div>
  );
}

/** Projects & stories - direct links, no array */
function MegaMenuProjectsStories() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container-fluid mx-[20px] sm:mx-[5%] 2xl:mx-[10%] py-10 px-8 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 justify-between">
        <div className="flex-1 w-[20vw] flex-wrap shrink-0 max-w-lg">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-4 pb-2 border-b border-white/30">
            Projects & stories
          </h3>
          <ul className="space-y-4">
            <li className="mega-menu-item"><Link href="#" className={linkClass}>OVERVIEW</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>BLOGS</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>FABLES OF FAÇADE</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>ACE CLUB</Link></li>
          </ul>
        </div>
      
        <div className="hidden lg:flex w-[40vw] max-w-xl shrink-0 p-6 gap-4 min-h-[50vh]">
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[30%] h-full">
              <Image
                src="/images/nav-img1.webp"
                alt="Bedroom with window"
                fill
                className="object-cover" sizes="300px"           
              />
            </div>
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[70%] h-full">
              <Image
                src="/images/nav-img2.webp"
                alt="Living space with glass doors"
                fill
                className="object-cover"  sizes="300px"    
              />
            </div>
          </div>
      </div>
    </div>
  );
}

/** Contact us - direct links, no array */
function MegaMenuContactUs() {
  return (
    <div className="flex-1 bg-[#121212] overflow-y-auto">
    <div className="container-fluid mx-[20px] sm:mx-[5%] 2xl:mx-[10%] py-10 px-8 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 justify-between">
      <div className="flex-1 w-[20vw] max-w-lg flex-wrap shrink-0 max-w-lg">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-4 pb-2 border-b border-white/30">
            Contact us
          </h3>
          <ul className="space-y-4">
            <li className="mega-menu-item"><Link href="#" className={linkClass}>OVERVIEW</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>GET IN TOUCH</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>FIND A DEALER</Link></li>
            <li className="mega-menu-item"><Link href="#" className={linkClass}>CAREERS</Link></li>
          </ul>
        </div>
        
        <div className="hidden lg:flex w-[40vw] max-w-xl shrink-0 p-6 gap-4 min-h-[50vh]">
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[30%] h-full">
              <Image
                src="/images/nav-img1.webp"
                alt="Bedroom with window"
                fill
                className="object-cover" sizes="300px"           
              />
            </div>
            <div className="mega-menu-item relative flex-1 aspect-3/2 rounded-xl overflow-hidden shadow-lg max-w-[70%] h-full">
              <Image
                src="/images/nav-img2.webp"
                alt="Living space with glass doors"
                fill
                className="object-cover"  sizes="300px"    
              />
            </div>
          </div>
      </div>
    </div>
  );
}
