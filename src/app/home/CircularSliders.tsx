"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  number: string;
  title: string;
  description: string;
  image: string;
  iconImage: string;
};

export default function FirstVisittoFinalFit() {
  const [mounted, setMounted] = useState(false);

  // ⭐ Responsive icon radius - use consistent default to prevent hydration mismatch
  const [iconRadius, setIconRadius] = useState(300);
  const [isMounted, setIsMounted] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [outerRadius, setOuterRadius] = useState(346);
  const [innerRadius, setInnerRadius] = useState(287);

  const slides: Slide[] = [
    { number: "01", title: "Precision Manufacturing", description: "Your windows and doors are crafted in ISO-certified facilities.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon1.svg" },
    { number: "02", title: "Site Survey & Measurement", description: "We take precise measurements to ensure a perfect fit.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon2.svg" },
    { number: "03", title: "Installation", description: "Proper leveling & sealing for long-term durability.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon3.svg" },
    { number: "04", title: "Precision Manufacturing", description: "ISO-certified facilities ensure accuracy.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon4.svg" },
    { number: "05", title: "Site Survey & Measurements", description: "Perfect fit ensured through precision measurement.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon5.svg" },
    { number: "06", title: "Installation", description: "Long-term durability guaranteed.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon6.svg" },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const centerImgRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    setIsMounted(true);
  }, []);

  // ⭐ Responsive radius calculation - only after mount
  useEffect(() => {
    if (!isMounted) return;
    
    function updateRadius() {
      const vw = window.innerWidth;
      
      // Responsive stroke width
      if (vw >= 640) {
        setStrokeWidth(4.65);
      } else {
        setStrokeWidth(3);
      }
      
      // Responsive circle radii based on viewport width
      // Base calculation: outer radius scales with container size
      const containerSize = vw >= 1024 ? vw * 0.50 : vw >= 640 ? vw * 0.60 : vw * 0.80;
      const baseRadius = containerSize / 2;
      setOuterRadius(baseRadius);
      setInnerRadius(baseRadius * 0.83); // Inner radius is ~83% of outer (287/346 ≈ 0.83)
      
      // Align icon radius with outer circle radius (icons should be on the outer circle)
      // Account for icon size so icons sit properly on the circle edge
      // Icon sizes: active = 90px (45px radius), inactive = 60px (30px radius)
      // Use average to position icons nicely on the circle
      const iconSizeOffset = vw >= 640 ? 85 : 50; // Offset to position icons slightly inside circle edge
      setIconRadius(baseRadius - iconSizeOffset); // Position icons slightly inside the outer circle edge
    }

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [isMounted]);

  // ⭐ Semi-circle position for icons - use consistent radius until mounted
  const computeSemiCircle = (index: number) => {
    const start = -90;
    const end = 90;
    const angle = start + (index / (slides.length - 1)) * (end - start);
    const rad = (angle * Math.PI) / 180;
    
    // Use consistent radius on server, responsive radius after mount
    const radius = isMounted ? iconRadius : 300;

    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      angle,
    };
  };

  // ⭐ GSAP ScrollTrigger (WITH LENIS SCROLLER FIX)
  useLayoutEffect(() => {
    if (!sectionRef.current || !rightRef.current || !spacerRef.current || !isMounted) return;
    if (!circleRef.current || !centerImgRef.current) return;

    try {
      // Calculate scroll distance based on viewport height (not content height)
      const viewportHeight = window.innerHeight;
      const scrollDistance = viewportHeight * slides.length;
      spacerRef.current.style.height = scrollDistance + "px";

      const ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          // No scroller specified - uses default window (works with Lenis)
          start: "top top",
          end: () => {
            // Use viewport-based scroll distance instead of content height
            const viewportHeight = window.innerHeight;
            const scrollDistance = viewportHeight * slides.length;
            if (spacerRef.current) {
              spacerRef.current.style.height = scrollDistance + "px";
            }
            return "+=" + scrollDistance;
          },
          pin: true, // Pin the trigger element (section)
          pinSpacing: false, // Disable pinSpacing - spacer handles spacing
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging

          onUpdate: (self) => {
            const index = Math.round(self.progress * (slides.length - 1));
            setActiveIndex(index);

            const { angle } = computeSemiCircle(index);

            if (circleRef.current) {
              gsap.to(circleRef.current, {
                rotation: -angle,
                duration: 0.6,
                ease: "power3.out",
              });

              // Counter-rotate all icons to keep them straight
              const icons = circleRef.current.querySelectorAll<HTMLElement>(".icon-item");
              icons?.forEach((icon, i) => {
                if (icon) {
                  // All icons counter-rotate by angle to stay straight
                  // Active icon gets additional rotation if needed
                  gsap.to(icon, {
                    rotation: angle, // Counter-rotate to keep icons straight
                    transformOrigin: "50% 50%",
                    duration: 0.6,
                    ease: "power3.out",
                  });
                }
              });
            }

            const progress = self.progress;

            // Smooth zoom OUT based on scroll
            if (centerImgRef.current) {
              gsap.to(centerImgRef.current, {
                scale: 1 - progress * 0.25,  // 1 → 0.75
                opacity: 1 - progress * 0.3, // fade slightly
                ease: "none",
              });
            }
          },
        });
      });

      // Refresh ScrollTrigger after a small delay to ensure DOM is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        ctx.revert();
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === sectionRef.current) {
            st.kill();
          }
        });
      };
    } catch (error) {
      console.debug('GSAP ScrollTrigger error:', error);
    }
  }, [iconRadius, isMounted, slides.length]);

  // ⭐ Manual Click Jump
  const jumpToSlide = (i: number) => {
    if (!circleRef.current) return;
    
    setActiveIndex(i);

    const { angle } = computeSemiCircle(i);
    
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: -angle,
        duration: 0.6,
        ease: "power3.out",
      });

      // Counter-rotate all icons to keep them straight
      const icons = circleRef.current.querySelectorAll<HTMLElement>(".icon-item");
      icons?.forEach((icon, idx) => {
        if (icon) {
          // All icons counter-rotate by angle to stay straight
          gsap.to(icon, {
            rotation: angle, // Counter-rotate to keep icons straight
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "power3.out",
          });
        }
      });
    }

    // ScrollTrigger synced with Lenis scroller
    const st = ScrollTrigger.getAll()[0];
    if (st && st.end) {
      const targetY = (i / (slides.length - 1)) * st.end;

      gsap.to("#smooth-wrapper", {
        scrollTo: targetY,
        duration: 1,
        ease: "power3.out",
      });
    }
  };

  // ⭐ Center image zoom animation
  useEffect(() => {
    if (!centerImgRef.current) return;
    const img = centerImgRef.current;
    gsap.fromTo(
      img,
      { scale: 1.15, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    ); 
  }, [activeIndex]);


  return (
    <>
      <section
        ref={sectionRef}
        suppressHydrationWarning
        className="h-screen w-full bg-white flex items-center justify-center overflow-hidden 
        before:absolute before:bg-gradient-to-l before:from-[#DDF3FF] before:to-[#B8E6FF]
        before:content-[''] before:w-[80vw] before:h-[70%] before:rounded-[30vw]
        before:opacity-100 before:blur-[100px] relative before:-z-1 before:-right-[10vw]"
      >
        <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-20 relative z-0">

          {/* LEFT SIDE */}
          <div className="w-full md:w-[40vw] xl:w-[40vw] flex justify-center items-center">
            <div className="relative w-[45vw] h-[45vw] flex items-center justify-center -left-20">

            {/* ROTATING RING center image */}
            {mounted && (
                <div
                  ref={centerImgRef}
                  className="absolute w-[26vw] h-[26vw] rounded-full overflow-hidden shadow-xl z-50 pointer-events-none "
                >
                  <Image src={slides[activeIndex].image} alt="" fill className="object-cover" />
                </div>
            )}

            {/* ROTATING RING */}
            <div ref={circleRef} className="absolute inset-0 flex items-center justify-center z-0">
                <svg 
                  className="absolute inset-0 w-full h-full -rotate-90 max-w-[80vw] max-h-[80vw] sm:max-w-[60vw] sm:max-h-[60vw] md:max-w-[50vw] md:max-h-[50vw]" 
                  viewBox={`0 0 ${outerRadius * 2} ${outerRadius * 2}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle 
                    cx={outerRadius} 
                    cy={outerRadius} 
                    r={outerRadius} 
                    fill="none" 
                    stroke="#EDE8D0E8" 
                    strokeWidth={strokeWidth}
                  />
                  <circle 
                    cx={outerRadius} 
                    cy={outerRadius} 
                    r={innerRadius} 
                    fill="none" 
                    stroke="#EDE8D0E8" 
                    strokeWidth={strokeWidth}
                  />
                </svg>

                {slides.map((slide, i) => {
                  const { x, y } = computeSemiCircle(i);
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={i}
                      onClick={() => jumpToSlide(i)}
                      className="absolute icon-wrapper cursor-pointer"
                      suppressHydrationWarning
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div
                        className={`icon-item ${
                          isActive ? "active-icon w-[90px] h-[90px]" : "w-[60px] h-[60px]"
                        } bg-[#EDE8D0E8] rounded-full shadow-md flex items-center justify-center`}
                      >
                        <Image
                          src={slide.iconImage}
                          alt=""
                          width={isActive ? 60 : 40}
                          height={isActive ? 60 : 40}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div ref={rightRef} className="w-full md:w-[60vw] xl:w-[60vw] max-w-lg right-content ">
            <div className="title-section text-left text-ThemeTextColor flex flex-col flex-wrap justify-start w-full md:w-[30vw]">
              <h2 className="text-pageh2 leading-tight scroll-animated-text">
                From First Visit to <br /> Final Fit — we handle it all
              </h2>
              <p className="mt-3 text-base leading-tight">Tell us who you are, we’ll guide you from there</p>
            </div>

            <div className=" mb-[2vw] mt-[2vw] bg-white p-5 max-w-full relative backdrop-blur-[594px] bg-[linear-gradient(96.08deg,rgba(255,255,255,0.8)_0.99%,rgba(240,240,240,0.8)_100%)]">
              <span className="text-[160px] leading-none font-bold text-[#FFFFFF33] absolute -right-28 -top-20 icon-img">
                {slides[activeIndex].number}
              </span>

              <h3 className="text-pageh3 text-ThemeBlueColor mb-2 font-bold">{slides[activeIndex].title}</h3>
              <p className="ThemeTextColor">{slides[activeIndex].description}</p>
            </div>
          </div>
        </div>
      </section>

      <div ref={spacerRef} className="h-0" />
    </>
  );
}
