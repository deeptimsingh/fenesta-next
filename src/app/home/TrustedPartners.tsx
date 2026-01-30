"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function TrustedPartners() {
  const [isMounted, setIsMounted] = useState(false);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const animatedElements = useRef(new Set<HTMLDivElement>());
  const marqueeAnimationRef = useRef<any>(null);

  
  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

  const setupMarquee = useCallback((marquee: HTMLDivElement | null) => {
    if (!marquee || animatedElements.current.has(marquee)) return;

    const group = marquee.querySelector(".marquee__group") as HTMLDivElement;
    if (!group) return;

    marquee.querySelectorAll(".marquee__clone").forEach((el) => el.remove());

    const clone = group.cloneNode(true) as HTMLDivElement;
    clone.classList.add("marquee__clone");
    marquee.appendChild(clone);

    gsap.killTweensOf(marquee.children);

    const animation = gsap.fromTo(
      marquee.children,
      { xPercent: 0 },
      {
        xPercent: -100,
        duration: 40,
        ease: "none",
        repeat: -1,
      }
    );

    marqueeAnimationRef.current = animation;
    animatedElements.current.add(marquee);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && marqueeRef.current) {
      setupMarquee(marqueeRef.current);
    }
  }, [isMounted, setupMarquee]);

  // Handle hover to pause/resume marquee
  const handleMarqueeHover = () => {
    if (marqueeAnimationRef.current) {
      marqueeAnimationRef.current.pause();
    }
  };

  const handleMarqueeLeave = () => {
    if (marqueeAnimationRef.current) {
      marqueeAnimationRef.current.resume();
    }
  };

  return (
    <section className="trustedpartners gradient-background  w-full bg-white overflow-hidden  transition-colors duration-200 common-padding relative">
       <div className="w-full mx-auto relative z-2  ">
        <div className="container-fluid m-auto px-6 md:px-0">      

          <div ref={sectionRef} className="w-full">
              <div className="container" >
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full">
                  <h2 className="font-mainFont text-pageh2 leading-none"><span className="font-subFont text-corinthiaHeading text-brown leading-0">Trusted </span>
                  by India’s leading <br /> builders and architects </h2>
                  <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                     <p className="max-w-full mx-auto">Explore finishes, test movement, and feel the quiet difference for yourself.</p>   
                  </div>  
                </div>
              </div>
          </div>
        </div>

        <div className="container-fluid m-auto">
          {/* DESKTOP MARQUEE */}
          <div
            ref={marqueeRef}
            suppressHydrationWarning
            className="hidden md:flex logo-marquee-container relative overflow-hidden select-none whitespace-nowrap my-10"
            onMouseEnter={handleMarqueeHover}
            onMouseLeave={handleMarqueeLeave}
          >
            <div className="logo-marquee inline-flex marquee__group flex-shrink-0 items-center justify-center">
              {/* All logos */}
              {[
                "logo1.png",
                "logo2.png",
                "logo3.png",
                "logo4.png",
                "logo5.png",
                "logo6.png",
              ].map((img, i) => (
                <div
                  key={i}
                  className="logo-item logo-item-desktop relative border-r-1 border-[#121212]/20 w-[330px] h-[265px] flex items-center justify-center"
                  onMouseEnter={handleMarqueeHover}
                  onMouseLeave={handleMarqueeLeave}
                >
                  <Image
                    src={`/images/home/logos/${img}`}
                    alt={img}
                    width={228}
                    height={116}
                    className="w-auto h-auto max-h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE STATIC GRID */}
          <div className="md:hidden grid grid-cols-3 justify-items-center w-full px-0 mt-10">
            {[
             "logo1.png",
                "logo2.png",
                "logo3.png",
                "logo4.png",
                "logo5.png",
                "logo6.png",
            ].map((img, i) => (
              <div
                key={i}
                className="logo-item logo-item-mobile relative border-1 w-full h-[130px] flex items-center justify-center px-2 justify-center"
              >
                <Image
                  src={`/images/home/logos/${img}`}
                  alt={img}
                  width={228}
                  height={116}
                  className="w-auto h-auto max-h-[130px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center flex-wrap">
          <FenestaButton>See who builds with us</FenestaButton>
        </div>
      </div>
    </section>
  );
}
