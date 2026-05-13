"use client";

import { ReactNode, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useImageParallax } from "@/hooks/useImageParallax";
import FenestaButton from "@/components/base/FenestaButton";

/**
 * Image parallax:
 * - scale in (1.15 -> 1)
 * - Y movement (-20px -> 20px)
 * driven by scroll progress (same style as only-bgimage-caption)
 */
function ParallaxImage({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  useImageParallax(containerRef, imageWrapRef, {
    fromScale: 1,
    toScale: 1,
    // Increased Y distance for visibility; lower smooth value for softer interpolation.
    fromY: -50,
    toY: 50,
    smooth: 0.08,
  });

  return (
    <div ref={containerRef} className="rounded-xl overflow-hidden will-change-transform">
      <div ref={imageWrapRef} className="w-full h-full min-h-[280px] md:min-h-[320px] will-change-transform scale-[1.15]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/** Props for one content block: title, highlight span, description, CTA label and optional href */
export type ContentBlockProps = {
  title: string;
  titleHighlight?: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
};

/** One row in sections mode: image + content block, optional flip for desktop order */
export type LeftRightSectionItem = {
  imageSrc: string;
  imageAlt: string;
  content: ContentBlockProps;
  flipOnDesktop?: boolean;
};

/**
 * Content block: heading (with useHeadingAnimation) + description + CTA.
 * headingOuter (sectionRef) animates translateY(-20px) → 0 when it enters viewport (IntersectionObserver).
 * headingSubTitle is just content inside sectionRef; we observe sectionRef so one ref does both.
 */
function ContentBlock({ title, titleHighlight, description, ctaLabel, ctaHref }: ContentBlockProps) {
  const { headingRef, sectionRef } = useHeadingAnimation();

  useEffect(() => {
    // Use sectionRef for both: observe this element and animate it when it enters viewport
    const el = sectionRef.current;
    if (!el) return;

    // Initial state: headingOuter (and everything inside, including headingSubTitle) is 20px above
    gsap.set(el, { y: -20 });

    // Observe sectionRef (headingOuter); works with Lenis. When visible, animate to 0 (once)
    let didAnimate = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || didAnimate) return;
        didAnimate = true;
        gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out", overwrite: true });
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(el);
    };
  }, [sectionRef]);

  // CTA: link if ctaHref provided, else plain button
  const cta = ctaHref ? (
    <Link href={ctaHref} className="flex flex-col justify-start mt-5 max-w-max">
      <FenestaButton>{ctaLabel}</FenestaButton>
    </Link>
  ) : (
    <div className="flex flex-col justify-start mt-5 max-w-max">
      <FenestaButton>{ctaLabel}</FenestaButton>
    </div>
  );
  return (
    <>
      {/* headingOuter (sectionRef): observed and animated translateY -20 → 0 when this block enters viewport */}
      <div ref={sectionRef} className="headingOuter w-full">
        <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 justify-start">
          <div ref={headingRef} className="title-section flex flex-col w-full justify-start">
            <h2 className="font-mainFont text-h2 leading-none text-theme flex flex-wrap">
              {title}
              {titleHighlight != null && titleHighlight !== "" && (
                <span className="font-subFont text-corinthiaHeading text-brown flex justify-start">{titleHighlight}</span>
              )}
            </h2>
          </div>
          {/* headingSubTitle: inside sectionRef; no separate ref needed */}
          <div className="headingSubTitle flex flex-col w-full">
            <p className="mt-3 text-black">{description}</p>
          </div>
        </div>
      </div>
      {cta}
    </>
  );
}

/**
 * Single row: left column + right column. Optional flip so right appears first on desktop.
 */
function SingleRow({
  left,
  right,
  content,
  flipOnDesktop,
  className,
  leftClassName,
  rightClassName,
}: {
  left: ReactNode;
  right?: ReactNode;
  content?: ContentBlockProps;
  flipOnDesktop: boolean;
  className: string;
  leftClassName: string;
  rightClassName: string;
}) {
  // Tailwind order: flipOnDesktop => right column first on md+
  const leftOrder = flipOnDesktop ? "order-2 md:order-2" : "order-1 md:order-1";
  const rightOrder = flipOnDesktop ? "order-1 md:order-1" : "order-2 md:order-2";
  const rightContent = content ? <ContentBlock {...content} /> : right;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${className}`}>
      <div className={`${leftOrder} ${leftClassName}`}>{left}</div>
      <div className={`${rightOrder} ${rightClassName}`}>{rightContent}</div>
    </div>
  );
}

export type LeftRightStructureProps = {
  /** When set, renders the full section (common-padding, container, space-y-16) with each item as a row */
  sections?: LeftRightSectionItem[];
  /** Content for the left column (single-row mode) */
  left?: ReactNode;
  /** Content for the right column (single-row mode); ignored if content is provided */
  right?: ReactNode;
  /** When set, the right column renders the standard heading + description + CTA block (single-row mode) */
  content?: ContentBlockProps;
  /** When true, on md+ screens right is shown first (left column), left second (right column) */
  flipOnDesktop?: boolean;
  /** Optional class for the grid wrapper (single-row) or section wrapper (sections mode) */
  className?: string;
  /** Optional class for the left column wrapper */
  leftClassName?: string;
  /** Optional class for the right column wrapper */
  rightClassName?: string;
};

export default function LeftRightStructure({
  sections,
  left,
  right,
  content,
  flipOnDesktop = false,
  className = "",
  leftClassName = "",
  rightClassName = "",
}: LeftRightStructureProps) {
  // Sections mode: render full section with container and multiple rows (image + content per row)
  if (sections && sections.length > 0) {
    return (
      <section className={`common-padding ${className}`}>
        <div className="container space-y-16">
          {sections.map((item, index) => (
            <SingleRow
              key={index}
              left={<ParallaxImage imageSrc={item.imageSrc} imageAlt={item.imageAlt} />}
              content={item.content}
              flipOnDesktop={!!item.flipOnDesktop}
              className=""
              leftClassName=""
              rightClassName=""
            />
          ))}
        </div>
      </section>
    );
  }

  // Single-row mode: one left + one right (or content block)
  if (left == null) return null;
  return (
    <SingleRow
      left={left}
      right={right}
      content={content}
      flipOnDesktop={flipOnDesktop}
      className={className}
      leftClassName={leftClassName}
      rightClassName={rightClassName}
    />
  );
}
