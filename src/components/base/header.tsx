"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ThemeToggle from "@/components/ThemeToggle";
import SearchIcon from "@/components/SearchIcon";
import Image from "next/image";

type MenuKey = "about" | "products" | "why" | "design" | "contact";

type MenuItem = {
  key: MenuKey;
  label: string;
  image: string;
  submenu: {
    title: string;
    items: {
      label: string;
      href: string;
      subItems?: { label: string; href: string }[];
    }[];
  }[];
};

const menuData: MenuItem[] = [
  {
    key: "about",
    label: "About",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
    submenu: [
      {
        title: "Company",
        items: [
          { label: "Our Story", href: "#" },
          { label: "Leadership", href: "#" },
          {
            label: "Careers",
            href: "#",
            subItems: [
              { label: "Open Positions", href: "#" },
              { label: "Benefits", href: "#" },
            ],
          },
        ],
      },
      {
        title: "Values",
        items: [
          { label: "Mission", href: "#" },
          { label: "Vision", href: "#" },
        ],
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    submenu: [
      {
        title: "Windows",
        items: [
          { label: "Casement Windows", href: "#" },
          { label: "Sliding Windows", href: "#" },
          {
            label: "Custom Windows",
            href: "#",
            subItems: [
              { label: "Design Options", href: "#" },
              { label: "Materials", href: "#" },
            ],
          },
        ],
      },
      {
        title: "Doors",
        items: [
          { label: "Entry Doors", href: "#" },
          { label: "Sliding Doors", href: "#" },
        ],
      },
    ],
  },
  {
    key: "why",
    label: "Why",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop",
    submenu: [
      {
        title: "Benefits",
        items: [
          { label: "Energy Efficiency", href: "#" },
          { label: "Durability", href: "#" },
        ],
      },
    ],
  },
  {
    key: "design",
    label: "Design",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=600&fit=crop",
    submenu: [
      {
        title: "Styles",
        items: [
          { label: "Modern", href: "#" },
          { label: "Traditional", href: "#" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
    submenu: [
      {
        title: "Get in Touch",
        items: [
          { label: "Contact Us", href: "#" },
          { label: "Locations", href: "#" },
        ],
      },
    ],
  },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<MenuKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prevMenuRef = useRef<MenuKey | null>(null);
  const accordionRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  useEffect(() => {
    setMounted(true);
    
    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, []);

  // Desktop dropdown animation with smooth fade up effect
  useEffect(() => {
    if (!mounted || !dropdownRef.current) return;

    if (activeMenu) {
      // Check if menu changed
      const isMenuChange = prevMenuRef.current !== null && prevMenuRef.current !== activeMenu;
      
      if (isMenuChange && imageRef.current && contentRef.current) {
        // Fade out current content smoothly
        gsap.to([imageRef.current, contentRef.current], {
          opacity: 0,
          y: -15,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            // Fade in new content smoothly
            gsap.fromTo(
              [imageRef.current, contentRef.current],
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power3.out",
              }
            );
          },
        });
      } else {
        // Initial show with smooth animation
        gsap.fromTo(
          [imageRef.current, contentRef.current],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }

      // Show dropdown with smooth slide down
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
          pointerEvents: "auto",
        }
      );
    } else {
      // Hide dropdown smoothly
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -15,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }

    prevMenuRef.current = activeMenu;
  }, [activeMenu, mounted]);

  // Accordion animation with GSAP - only one open at a time
  useEffect(() => {
    if (!mounted) return;

    Object.keys(accordionRefs.current).forEach((key) => {
      const ref = accordionRefs.current[key];
      if (!ref || !ref.parentElement) return; // Check if element exists in DOM

      const isExpanded = expandedAccordion === key;

      try {
        if (isExpanded) {
          // Open accordion - set initial state then animate
          gsap.set(ref, { height: 0, opacity: 0 });
          gsap.to(ref, {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Close accordion - get current height first
          const currentHeight = ref.scrollHeight;
          if (currentHeight > 0) {
            gsap.set(ref, { height: currentHeight });
            gsap.to(ref, {
              height: 0,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
            });
          }
        }
      } catch (error) {
        // Silently handle GSAP errors if element is removed
        console.debug('Accordion animation error:', error);
      }
    });
  }, [expandedAccordion, mounted]);

  // Mobile drawer animation
  useEffect(() => {
    if (!mounted || !mobileRef.current) return;

    gsap.to(mobileRef.current, {
      x: mobileOpen ? "0%" : "100%",
      duration: 0.3,
      ease: "power3.out",
    });
  }, [mobileOpen, mounted]);


  const currentMenu = menuData.find((m) => m.key === activeMenu);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-100 bg-[#12121280] shadow  py-5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* LOGO - LEFT */}
          <Link href="/" className="font-bold text-lg dark:text-white z-10">
              <Image src="/images/logo-white.svg" className="header-logo" alt=""  width={230} height={70} />
          </Link>

          {/* CENTER MENU - DESKTOP */}
          <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
            {menuData.map((menu) => (
              <div
                key={menu.key}
                className="relative"
                onMouseEnter={() => {
                  // Clear any pending timeout
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    setHoverTimeout(null);
                  }
                  setActiveMenu(menu.key);
                }}
                onMouseLeave={() => {
                  // Add small delay before closing to allow cursor movement
                  const timeout = setTimeout(() => {
                    setActiveMenu(null);
                    setExpandedAccordion(null);
                  }, 100);
                  setHoverTimeout(timeout);
                }}
              >
                <button
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 relative py-2"
                >
                  {menu.label}
                  {/* Arrow indicator below active menu item */}
                  {activeMenu === menu.key && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-blue-600 dark:border-t-blue-400 transition-all duration-300" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* RIGHT SIDE - SEARCH & THEME TOGGLE */}
          <div className="flex items-center gap-4 z-10">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* DESKTOP DROPDOWN - 600x600px */}
        {currentMenu && (
          <div
            ref={dropdownRef}
            onMouseEnter={() => {
              // Clear any pending timeout when entering dropdown
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                setHoverTimeout(null);
              }
              setActiveMenu(activeMenu);
            }}
            onMouseLeave={() => {
              // Add small delay before closing
              const timeout = setTimeout(() => {
                setActiveMenu(null);
                setExpandedAccordion(null);
              }, 100);
              setHoverTimeout(timeout);
            }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-900/50 rounded-xl overflow-hidden opacity-0 pointer-events-none z-40"
          >
            <div className="flex h-full">
              {/* LEFT SIDE - IMAGE */}
              <div ref={imageRef} className="w-1/2 relative overflow-hidden">
                <Image
                  src={currentMenu.image}
                  alt={currentMenu.label}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* RIGHT SIDE - MENU LIST */}
              <div ref={contentRef} className="w-1/2 p-8 overflow-y-auto">
                {currentMenu.submenu.map((submenu, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">
                      {submenu.title}
                    </h3>
                    <ul className="space-y-2">
                      {submenu.items.map((item, itemIdx) => {
                        const accordionId = `${activeMenu}-${idx}-${itemIdx}`;
                        const isExpanded = expandedAccordion === accordionId;
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        
                        return (
                          <li key={itemIdx} className="relative">
                            {hasSubItems ? (
                              // Accordion for items with third-level subItems
                              <div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Close current accordion if clicking the same one, otherwise open new one
                                    if (isExpanded) {
                                      setExpandedAccordion(null);
                                    } else {
                                      setExpandedAccordion(accordionId);
                                    }
                                  }}
                                  className="w-full text-left flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 group cursor-pointer"
                                >
                                  <span>{item.label}</span>
                                  <span
                                    className={`ml-2 text-xs transition-transform duration-300 ${
                                      isExpanded ? "rotate-90" : ""
                                    }`}
                                  >
                                    ›
                                  </span>
                                </button>
                                {/* Accordion Content - Third Level */}
                                <ul
                                  ref={(el) => {
                                    if (el) {
                                      accordionRefs.current[accordionId] = el;
                                      // Set initial state for closed accordion
                                      if (!isExpanded) {
                                        gsap.set(el, { height: 0, opacity: 0 });
                                      }
                                    } else {
                                      delete accordionRefs.current[accordionId];
                                    }
                                  }}
                                  className="pl-4 mt-1 space-y-1 overflow-hidden"
                                >
                                  {item.subItems!.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subItem.href}
                                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              // Regular link for items without third-level subItems
                              <Link
                                href={item.href}
                                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden fixed top-4 right-20 z-50 text-xl dark:text-white"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </header>

      {/* MOBILE DRAWER */}
      <div
        ref={mobileRef}
        className="fixed top-0 right-0 h-full w-[80%] bg-white dark:bg-gray-900 text-black dark:text-white z-[100] translate-x-full p-6 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            className="text-2xl"
            onClick={() => {
              setMobileOpen(false);
              setMobileActiveMenu(null);
            }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {menuData.map((menu) => (
            <div key={menu.key} className="border-b dark:border-gray-700 pb-4">
              <button
                onClick={() =>
                  setMobileActiveMenu(
                    mobileActiveMenu === menu.key ? null : menu.key
                  )
                }
                className="w-full text-left font-semibold text-lg py-2 flex items-center justify-between"
              >
                {menu.label}
                <span className="text-xl">
                  {mobileActiveMenu === menu.key ? "−" : "+"}
                </span>
              </button>

              {mobileActiveMenu === menu.key && (
                <div className="mt-4 pl-4 space-y-4">
                  {menu.submenu.map((submenu, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold mb-2">{submenu.title}</h3>
                      <ul className="space-y-2 pl-4">
                        {submenu.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileActiveMenu(null);
                              }}
                              className="block py-1 text-gray-600 dark:text-gray-400"
                            >
                              {item.label}
                            </Link>
                            {item.subItems && (
                              <ul className="pl-4 mt-2 space-y-1">
                                {item.subItems.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      href={subItem.href}
                                      onClick={() => {
                                        setMobileOpen(false);
                                        setMobileActiveMenu(null);
                                      }}
                                      className="block py-1 text-sm text-gray-500 dark:text-gray-500"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-start justify-center pt-32"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}
