"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./whyexperts.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: "/images/expertsicon/icon1.svg", title: "Low maintenance" },
  { icon: "/images/expertsicon/icon2.svg", title: "Energy efficient" },
  { icon: "/images/expertsicon/icon3.svg", title: "Weather resistant" },
  { icon: "/images/expertsicon/icon4.svg", title: "Termite resistant" },
  { icon: "/images/expertsicon/icon5.svg", title: "Excellent acoustic insulation" },
  { icon: "/images/expertsicon/icon6.svg", title: "Enhanced strength and security" },
  { icon: "/images/expertsicon/icon7.svg", title: "Rainwater insulation" },
] as const;

const ICON_COUNT = features.length;

function FeatureSvgIcon({
  src,
  title,
  onReady,
}: {
  src: string;
  title: string;
  onReady?: () => void;
}) {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${src}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setMarkup(text);
      })
      .catch(() => {
        if (!cancelled) setMarkup(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useLayoutEffect(() => {
    if (markup) onReady?.();
  }, [markup, onReady]);

  return (
    <div
      className="expert-icon feature-icon flex h-28 w-28 items-center justify-center [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible"
      role="img"
      aria-label={title}
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  );
}

function getStrokePaths(icon: Element): SVGPathElement[] {
  return Array.from(icon.querySelectorAll<SVGPathElement>("path")).filter(
    (path) => path.hasAttribute("stroke") && path.getAttribute("stroke") !== "none"
  );
}

function getFillOnlyPaths(icon: Element): SVGPathElement[] {
  return Array.from(icon.querySelectorAll<SVGPathElement>("path")).filter(
    (path) =>
      path.hasAttribute("fill") &&
      path.getAttribute("fill") !== "none" &&
      !path.hasAttribute("stroke")
  );
}

/** Per-card stroke draw — play on enter viewport, reverse on scroll back up */
function setupStrokeDraw(root: HTMLElement) {
  const cards = gsap.utils.toArray<HTMLElement>(".feature-card", root);

  cards.forEach((card) => {
    const icon = card.querySelector(".expert-icon");
    if (!icon) return;

    const strokePaths = getStrokePaths(icon);
    const fillPaths = getFillOnlyPaths(icon);
    if (!strokePaths.length && !fillPaths.length) return;

    strokePaths.forEach((path) => {
      const length = path.getTotalLength();
      if (length <= 0) return;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    if (fillPaths.length) {
      gsap.set(fillPaths, { opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    if (strokePaths.length) {
      tl.to(strokePaths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.12,
      });
    }

    if (fillPaths.length) {
      tl.to(
        fillPaths,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
        },
        strokePaths.length ? "-=0.6" : 0
      );
    }

    ScrollTrigger.create({
      trigger: card,
      animation: tl,
      start: "top 88%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    });

    // If card is already visible when SVGs finish loading, show drawn state
    if (ScrollTrigger.isInViewport(card, 0.1)) {
      tl.progress(1);
    }
  });

  ScrollTrigger.refresh();
}

export default function Whyexperts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const readyIconsRef = useRef(new Set<string>());
  const [allIconsReady, setAllIconsReady] = useState(false);

  const handleIconReady = useCallback((iconSrc: string) => {
    readyIconsRef.current.add(iconSrc);
    if (readyIconsRef.current.size >= ICON_COUNT) {
      setAllIconsReady(true);
    }
  }, []);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root || !allIconsReady) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
        }
      );

      setupStrokeDraw(root);

      gsap.to(".expert-icon", {
        y: -8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.15, from: "random" },
      });
    }, root);

    return () => {
      readyIconsRef.current.clear();
      ctx.revert();
    };
  }, [allIconsReady]);

  return (
    <section ref={sectionRef} className="whyExperts-items-wrapper container pt-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {features.map((item) => (
          <article
            key={item.title}
            className="feature-card group relative overflow-hidden bg-[#EDE8D0A3] text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#f3eee8] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 mb-5 flex justify-center">
              <FeatureSvgIcon
                src={item.icon}
                title={item.title}
                onReady={() => handleIconReady(item.icon)}
              />
            </div>

            <h3 className="relative z-10 text-[13px] font-medium leading-normal text-[#4b3425] md:text-[15px]">
              {item.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
