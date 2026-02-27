"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BannerMain() {
  const bgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

       gsap.to(titleRef.current, {
      opacity: 0.5,
      y: -40,
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "40% top",
        scrub: true,
      },
    });
  }, []);

  return (
     <section className="relative h-screen max-h-[768px] w-full overflow-hidden flex items-center justify-start">        
        {/* BACKGROUND IMAGE WITH PARALLAX */}
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="/images/banner/blog-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />

          {/* ✨ GRADIENT OVERLAY — YOUR CUSTOM STYLE */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(-90deg, rgba(0, 0, 0, 0) 36.81%, rgba(0, 0, 0, 0.7) 70%)",
            }}
          /></div>

        {/* CENTER TITLE + DESCRIPTION */}
        <div className="container relative h-full">          
        <div
            ref={titleRef}
            className="absolute  inset-0 top-auto bottom-20 sm:bottom-[14vw] xl:bottom-[8vw]  z-10  px-6 max-w-3xl"
          >
            <h1 className="text-white text-h1 leading-none text-theme flex justify-start flex-wrap "><span className="font-subFont text-corinthiaHeading text-cream leading-none">Products</span></h1>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/90 text-sm mt-5">
              <span className="hover:text-white cursor-pointer ">Home</span>
              <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="text-white">Products</span>
            </div>
          </div>      
        </div>  
      </section>
  );
}
