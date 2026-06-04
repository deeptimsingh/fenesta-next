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
     <section className="inside-page-banner relative h-[85vh] sm:h-screen max-h-192 w-full overflow-hidden flex items-center justify-start ">        
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
              srcSet="/images/banner/product-bg-mobile-700.jpg"
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

        {/* CENTER TITLE + DESCRIPTION */}
        <div className="banner-caption container relative h-full flex items-center flex-wrap justify-center">          
          <div ref={titleRef} className="absolute px-4 sm:px-6 left-auto sm:left-0 bottom-[25vw] sm:bottom-auto  z-10" style={initial.captionStyle}>
            <h1 className="text-white text-h1 leading-none flex justify-center sm:justify-start flex-wrap gap-3 w-full text-center sm:text-left">uPVC <span className="font-subFont text-corinthiaHeading text-cream leading-none">Casement Windows</span></h1>

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
              <span className="text-white">uPVC Windows</span>
              <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="text-white">Casement</span>
            </div> 
          </div>      
        </div>
      </section>
  );
}
