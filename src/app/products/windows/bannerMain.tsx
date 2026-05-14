"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useInsidePageBannerAnimation, getInsidePageBannerInitialStyles } from "@/hooks/useInsidePageBannerAnimation";

const initial = getInsidePageBannerInitialStyles();

/** Desktop hero clip — swap for a lighter desktop-only file when you have one */
const VIDEO_SRC_DESKTOP = "/images/productPage/uPVCWindow.mp4";
/** Mobile: same asset until a dedicated mobile encode exists (e.g. uPVCWindow-mobile.mp4) */
const VIDEO_SRC_MOBILE = "/images/productPage/uPVCWindow.mp4";

export default function BannerMain({ animationReady = true }: { animationReady?: boolean }) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useInsidePageBannerAnimation(bgRef, titleRef, { startWhenReady: animationReady });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || prefersReducedMotion) return;
    el.play().catch(() => {});
  }, [prefersReducedMotion, animationReady]);

  return (
     <section className="inside-page-banner relative h-[85vh] sm:h-screen max-h-192 w-full overflow-hidden flex items-center justify-start ">        
        {/* BACKGROUND VIDEO / IMAGE — parallax on wrapper */}
        <div ref={bgRef} className="absolute inset-0" style={initial.bgStyle}>
          {prefersReducedMotion ? (
            <picture className="absolute inset-0 block h-full w-full">
              <source media="(min-width: 768px)" srcSet="/images/banner/blog-bg.webp" />
              <source media="(max-width: 767px)" srcSet="/images/banner/product-bg-mobile-700.jpg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/banner/blog-bg.webp"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
            </picture>
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full min-h-full object-cover object-center"
              poster="/images/banner/product-bg-mobile-700.jpg"
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden
            >
              <source media="(min-width: 768px)" src={VIDEO_SRC_DESKTOP} type="video/mp4" />
              <source src={VIDEO_SRC_MOBILE} type="video/mp4" />
            </video>
          )}

          {/* ✨ GRADIENT OVERLAY — YOUR CUSTOM STYLE */}
          <div
            className="banner-overlay absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)] sm:bg-[linear-gradient(-90deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)]"
          />
        </div>

        {/* CENTER TITLE + DESCRIPTION */}
        <div className="banner-caption container relative h-full flex items-center flex-wrap justify-center">          
          <div ref={titleRef} className="absolute px-4 sm:px-6 left-auto sm:left-0 bottom-[25vw] sm:bottom-auto  z-10" style={initial.captionStyle}>
            <h1 className="text-white text-h1 leading-none flex justify-center sm:justify-start flex-wrap gap-3 w-full text-center sm:text-left">uPVC <span className="font-subFont text-corinthiaHeading text-cream leading-none">Windows</span></h1>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm mt-5">
              <span className="hover:text-white cursor-pointer ">Home</span>
               <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="hover:text-white cursor-pointer ">Window</span>
              <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="text-white">uPVC Casement Windows</span>
            </div> 
          </div>      
        </div>
      </section>
  );
}
