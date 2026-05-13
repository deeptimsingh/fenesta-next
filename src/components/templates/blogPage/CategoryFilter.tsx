"use client";

import { useRef, useState, useEffect, CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { initCardReveal } from "@/components/base/cardReveal";

const VALID_CATEGORY = new Set([
  "windowsanddoor",
  "homedecor",
  "architectureanddesign",
  "ecofridenly",
  "smartcity",
  "corporatenewsroom",
]);

function getActiveTabId(pathname: string): string {
  if (pathname === "/blog" || pathname === "/blog/") return "all";
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "blog") return "all";
  const seg = parts[1];
  if (seg && VALID_CATEGORY.has(seg)) return seg;
  return "all";
}

type CategoryFilterProps = {
  children: ReactNode;
};

export default function CategoryFilter({ children }: CategoryFilterProps) {
  const pathname = usePathname() ?? "";
  const active = getActiveTabId(pathname);

  const [highlightStyle, setHighlightStyle] = useState<CSSProperties>({});
  const [showRightFade, setShowRightFade] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  /* Card reveal — only on “All” listing */
  useEffect(() => {
    if (active !== "all") return;
    if (!cardsContainerRef.current) return;

    const ctx = initCardReveal({
      container: cardsContainerRef.current,
      cardSelector: ".reveal-card",
      imageSelector: ".card-image",
    });

    return () => ctx?.revert();
  }, [active, pathname]);

  /* Hover image swap */
  useEffect(() => {
    const root = cardsContainerRef.current;
    if (!root) return;

    const preloaders: HTMLImageElement[] = [];
    root.querySelectorAll<HTMLImageElement>(".project-img[data-hover]").forEach((img) => {
      const hover = img.getAttribute("data-hover");
      if (!hover) return;
      const pre = new window.Image();
      pre.src = hover;
      preloaders.push(pre);
    });

    const wrappers = Array.from(root.querySelectorAll<HTMLElement>(".reveal-img-wrapper"));
    const cleanups: Array<() => void> = [];

    wrappers.forEach((wrapper) => {
      const img = wrapper.querySelector<HTMLImageElement>(".project-img[data-hover]");
      if (!img) return;

      const originalSrc = img.getAttribute("src") || img.currentSrc || "";
      const originalSrcSet = img.getAttribute("srcset") || "";
      const originalSizes = img.getAttribute("sizes") || "";
      const hover = img.getAttribute("data-hover");
      if (!hover) return;
      let timer: number | null = null;
      let incomingTimer: number | null = null;
      const SWAP_MS = 260;

      const clearTimer = () => {
        if (timer !== null) {
          window.clearTimeout(timer);
          timer = null;
        }
        if (incomingTimer !== null) {
          window.clearTimeout(incomingTimer);
          incomingTimer = null;
        }
      };

      const resetClasses = () => {
        img.classList.remove("is-swapping-out");
        img.classList.remove("is-swapping-in");
      };

      const runIncomingSettle = () => {
        img.classList.add("is-swapping-in");
        img.getBoundingClientRect();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            incomingTimer = window.setTimeout(() => {
              img.classList.remove("is-swapping-in");
              incomingTimer = null;
            }, 40);
          });
        });
      };

      const onEnter = () => {
        clearTimer();
        resetClasses();
        img.classList.add("is-swapping-out");
        timer = window.setTimeout(() => {
          img.setAttribute("srcset", "");
          img.setAttribute("sizes", "");
          img.src = hover;
          img.classList.remove("is-swapping-out");
          runIncomingSettle();
        }, SWAP_MS);
      };

      const onLeave = () => {
        clearTimer();
        resetClasses();
        img.src = originalSrc;
        if (originalSrcSet) img.setAttribute("srcset", originalSrcSet);
        else img.removeAttribute("srcset");
        if (originalSizes) img.setAttribute("sizes", originalSizes);
        else img.removeAttribute("sizes");
      };

      wrapper.addEventListener("pointerenter", onEnter);
      wrapper.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        clearTimer();
        resetClasses();
        wrapper.removeEventListener("pointerenter", onEnter);
        wrapper.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, active]);

  const updateHighlight = (id: string) => {
    const el = document.getElementById(id);
    const container = tabContainerRef.current;
    if (!el || !container) return;
    const tabEl = el as HTMLElement;

    setHighlightStyle({
      width: `${tabEl.offsetWidth}px`,
      transform: `translateX(${tabEl.offsetLeft}px)`,
    });
  };

  const ensureActiveTabVisible = (id: string) => {
    const container = tabContainerRef.current;
    const el = document.getElementById(id) as HTMLElement | null;
    if (!container || !el) return;

    const left = el.offsetLeft;
    const right = left + el.offsetWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = visibleLeft + container.clientWidth;
    const pad = 8;

    if (left < visibleLeft + pad) {
      container.scrollTo({ left: Math.max(left - pad, 0), behavior: "smooth" });
      return;
    }

    if (right > visibleRight - pad) {
      const nextLeft = right - container.clientWidth + pad;
      container.scrollTo({ left: Math.max(nextLeft, 0), behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = tabContainerRef.current;
    updateHighlight(active);
    ensureActiveTabVisible(active);

    const onResize = () => {
      updateHighlight(active);
    };
    const onScroll = () => {
      updateHighlight(active);
    };
    window.addEventListener("resize", onResize);
    container?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      container?.removeEventListener("scroll", onScroll);
    };
  }, [active]);

  useEffect(() => {
    const container = tabContainerRef.current;
    if (!container) return;

    const updateRightFade = () => {
      const tolerance = 3;
      const hasOverflow = container.scrollWidth > container.clientWidth + tolerance;
      const atLeftStart = container.scrollLeft <= tolerance;
      const atRightEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - tolerance;
      setShowLeftFade(hasOverflow && !atLeftStart);
      setShowRightFade(hasOverflow && !atRightEnd);
    };

    updateRightFade();
    container.addEventListener("scroll", updateRightFade, { passive: true });
    window.addEventListener("resize", updateRightFade);

    requestAnimationFrame(updateRightFade);
    setTimeout(updateRightFade, 260);

    return () => {
      container.removeEventListener("scroll", updateRightFade);
      window.removeEventListener("resize", updateRightFade);
    };
  }, [active]);

  useEffect(() => {
    const updateOffset = () => {
      const header = document.getElementById("site-header");
      if (!header) return;

      const headerHeight = header.offsetHeight;
      const offset = headerHeight + 10;

      document.documentElement.style.setProperty("--header-offset", `${offset}px`);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onDrag = (e: React.MouseEvent) => {
    const el = tabContainerRef.current;
    if (!el || !isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
  };

  const startTouch = (e: React.TouchEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onTouchDrag = (e: React.TouchEvent) => {
    const el = tabContainerRef.current;
    if (!el || !isDraggingRef.current) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const tabBase =
    "relative z-10 flex items-center gap-2  py-3 rounded-[50px] h-[50px] text-basexs leading-tight px-3 md:px-4 shrink-0";
  const tabInactive = "bg-white text-theme/80 dark:text-white";
  const tabActive = "text-white";

  return (
    <div ref={cardsContainerRef} className="w-full">
      <div
        className={`tab-sticky-fade-wrap ${showRightFade ? "show-right-fade" : ""} ${showLeftFade ? "show-left-fade" : ""}`}
      >
        <div
          ref={tabContainerRef}
          className="tab-sticky relative flex md:flex items-center justify-start md:justify-between gap-3 md:gap-[0.75vw] bg-theme/20 dark:bg-cream/20 p-2 rounded-[50px] overflow-x-auto whitespace-nowrap no-scrollbar cursor-grab backdrop-blur-sm"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startTouch}
          onTouchMove={onTouchDrag}
          onTouchEnd={stopDrag}
        >
          <div
            className="absolute top-2 bottom-2 left-0 bg-blue rounded-full transition-all duration-300"
            style={highlightStyle}
          />

          <Link
            id="all"
            href="/blog"
            scroll={false}
            className={`${tabBase} ${active === "all" ? tabActive : `bg-white bg-lightdarkbase ${tabInactive}`}`}
          >
            <span className="text-left">All</span>
          </Link>

          <Link
            id="windowsanddoor"
            href="/blog/windowsanddoor"
            scroll={false}
            className={`${tabBase} ${active === "windowsanddoor" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon1.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Windows
              <br />
              & doors
            </span>
          </Link>

          <Link
            id="homedecor"
            href="/blog/homedecor"
            scroll={false}
            className={`${tabBase} ${active === "homedecor" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon2.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Home
              <br />
              decor
            </span>
          </Link>

          <Link
            id="architectureanddesign"
            href="/blog/architectureanddesign"
            scroll={false}
            className={`${tabBase} ${active === "architectureanddesign" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon3.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Architecture
              <br />
              & design
            </span>
          </Link>

          <Link
            id="ecofridenly"
            href="/blog/ecofridenly"
            scroll={false}
            className={`${tabBase} ${active === "ecofridenly" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon4.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Eco-friendly
              <br />
              home
            </span>
          </Link>

          <Link
            id="smartcity"
            href="/blog/smartcity"
            scroll={false}
            className={`${tabBase} ${active === "smartcity" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon5.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Smart
              <br />
              city
            </span>
          </Link>

          <Link
            id="corporatenewsroom"
            href="/blog/corporatenewsroom"
            scroll={false}
            className={`${tabBase} ${active === "corporatenewsroom" ? tabActive : tabInactive}`}
          >
            <Image src="/images/blog/icons/icon6.svg" width={20} height={20} alt="" />
            <span className="text-left">
              Corporate
              <br />
              newsroom
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-6 animate-slideUp">{children}</div>
    </div>
  );
}
