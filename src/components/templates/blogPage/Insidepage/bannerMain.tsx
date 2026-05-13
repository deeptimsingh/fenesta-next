"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInsidePageBannerAnimation, getInsidePageBannerInitialStyles } from "@/hooks/useInsidePageBannerAnimation";

const initial = getInsidePageBannerInitialStyles();

export default function BannerMain({ animationReady = true }: { animationReady?: boolean }) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useInsidePageBannerAnimation(bgRef, titleRef, { startWhenReady: animationReady });

  return (
     <section className="inside-page-banner relative h-screen max-h-192 w-full overflow-hidden flex items-center justify-start ">        
        {/* BACKGROUND IMAGE WITH PARALLAX */}
        <div ref={bgRef} className="absolute inset-0" style={initial.bgStyle}>
          <picture className="absolute inset-0 block w-full h-full">
            {/* Desktop: 768px and up */}
            <source
              media="(min-width: 768px)"
              srcSet="/images/banner/blog-bg.webp"
            />
            {/* Mobile: below 768px — use blog-bg-mobile.webp when available, or same as desktop */}
            <source
              media="(max-width: 767px)"
              srcSet="/images/banner/blog-bg-mobile.webp"
            />
            <img
              src="/images/banner/blog-bg.webp"
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          </picture>

          {/* ✨ GRADIENT OVERLAY — YOUR CUSTOM STYLE */}
          <div
            className="banner-overlay absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)] sm:bg-[linear-gradient(-90deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)]"
          />
        </div>       
      </section>
  );
}
