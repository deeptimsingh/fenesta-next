"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInsidePageBannerAnimation, getInsidePageBannerInitialStyles } from "@/hooks/useInsidePageBannerAnimation";

const initial = getInsidePageBannerInitialStyles();

export default function BannerMain() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useInsidePageBannerAnimation(bgRef, titleRef);

  return (
     <section className="inside-page-banner relative h-screen max-h-192 w-full overflow-hidden flex items-center justify-start inside-page-banner">        
        {/* BACKGROUND IMAGE WITH PARALLAX */}
        <div ref={bgRef} className="absolute inset-0" style={initial.bgStyle}>
          <Image src="/images/banner/presence-bg.webp" alt="Hero Background"  fill className="object-cover" priority />

          {/* ✨ GRADIENT OVERLAY — YOUR CUSTOM STYLE */}
          <div className="absolute inset-0 pointer-events-none"  style={{background: "linear-gradient(-90deg, rgba(0, 0, 0, 0) 36.81%, rgba(0, 0, 0, 0.7) 70%)",}}
          /></div>

        {/* CENTER TITLE + DESCRIPTION */}
        <div className="banner-caption  container relative h-full">          
          <div ref={titleRef} className="absolute inset-0 top-auto bottom-20 sm:bottom-[14vw] xl:bottom-[8vw] z-10 max-w-3xl" style={initial.captionStyle}>
            <h1 className="text-white text-h1 leading-none flex justify-start flex-wrap gap-2">Our  <span className="font-subFont text-corinthiaHeading text-cream leading-none"> Presence</span></h1>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/90 text-sm mt-10">
              <span className="hover:text-white cursor-pointer ">Home</span>
              <Image src="/images/down-arrow.svg" alt="arrow"  width={12} height={12} className="transform -rotate-90" />
              <span className="text-white">Our Presence</span>
            </div>
          </div>      
        </div>
     </section>
  );
}
