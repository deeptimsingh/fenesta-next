"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  number: string;
  title: string;
  description: string;
  image: string;
  iconImage: string;
};

export default function FirstVisittoFinalFit() {
    // 🔥 Heading animation with GSAP (using common defaults)
    const { headingRef, sectionRef: headingSectionRef } = useHeadingAnimation();
    
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
    { number: "07", title: "Installation", description: "Long-term durability guaranteed.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon6.svg" },
    { number: "08", title: "Installation", description: "Long-term durability guaranteed.", image: "/images/home/fromfirstvisit/img1.webp", iconImage: "/images/home/fromfirstvisit/icon6.svg" },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const centerImgRef = useRef<HTMLDivElement | null>(null);
  const captionTitleRef = useRef<HTMLHeadingElement | null>(null);
  const captionDescRef = useRef<HTMLParagraphElement | null>(null);
  const captionNumberRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null); // Store ScrollTrigger reference
  const isClickingRef = useRef(false); // Flag to prevent onUpdate during click
  const lastActiveIndexRef = useRef(0); // Track last active index to prevent duplicate animations
  const lastCaptionIndexRef = useRef(0); // Track last caption animation index
  const clickedIndexRef = useRef<number | null>(null); // Track clicked index to prevent revert
  const clickTimestampRef = useRef<number>(0); // Track when click happened

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
      // Mobile: bigger circle (95vw); desktop: same as before
      const containerSize = vw >= 1024 ? vw * 0.50 : vw >= 640 ? vw * 0.60 : vw * 0.95;
      const baseRadius = containerSize / 2;
      setOuterRadius(baseRadius);
      setInnerRadius(baseRadius * 0.83); // Inner radius is ~83% of outer (287/346 ≈ 0.83)
      
      // Mobile: icons a little inside the circle stroke; desktop: icons slightly inside circle edge
      const isMobileView = vw < 768;
      const mobileInsideOffset = 20; // px inside the outer stroke
      if (isMobileView) {
        setIconRadius(baseRadius - mobileInsideOffset);
      } else {
        const iconSizeOffset = vw >= 640 ? 85 : 50;
        setIconRadius(baseRadius - iconSizeOffset);
      }
    }

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [isMounted]);

  // ⭐ Icon position: full circle on mobile (even spacing), semicircle on desktop
  const computeSemiCircle = (index: number) => {
    let angle: number;
    if (isMobile) {
      // Full circle on mobile - even spacing (360 / n)
      angle = index * (360 / slides.length);
    } else {
      // Semicircle on desktop - right center (0°) to left center (180°)
      const start = 0;
      const end = 180;
      angle = start + (index / (slides.length - 1)) * (end - start);
    }
    const rad = (angle * Math.PI) / 180;

    const radius = isMounted ? iconRadius : 300;

    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      angle,
    };
  };

  // ⭐ Update arrow position function - always at right center of circle
  const updateArrowPosition = () => {
    if (!arrowRef.current || !circleRef.current) return;
    
    // Store refs locally to avoid stale closures
    const arrow = arrowRef.current;
    const circle = circleRef.current;
    
    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      if (!arrow || !circle || !arrowRef.current || !circleRef.current) return;
      
      try {
        // Get the circle container's position relative to viewport
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        
        const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;
        const iconHalf = isMobileView ? 28 : 45;
        const radius = isMounted ? iconRadius : 300;
        // Mobile: arrow at bottom center (active icon at 6 o'clock); desktop: right center
        const fixedX = isMobileView ? circleCenterX : circleCenterX + radius + iconHalf + 8;
        const fixedY = isMobileView ? circleCenterY + radius + iconHalf + 8 : circleCenterY;
        const arrowRotation = isMobileView ? -90 : 0;
        const transformOrigin = isMobileView ? "50% 0%" : "0% 50%";
        
        gsap.set(arrow, {
          left: fixedX,
          top: fixedY,
          rotation: arrowRotation,
          transformOrigin,
          opacity: 1,
          visibility: "visible",
        });
      } catch (error) {
        console.debug('Arrow position update error:', error);
      }
    });
  };

  // ⭐ Initialize arrow position on mount - always at right center
  useEffect(() => {
    if (!arrowRef.current || !circleRef.current || !isMounted) return;
    updateArrowPosition();
  }, [isMounted, iconRadius]);

  // ⭐ Update arrow position on window resize
  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = () => {
      updateArrowPosition();
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted, iconRadius]);

  // ⭐ Mobile only: set initial circle/icon rotation so active icon is at bottom center (6 o'clock = 90°)
  useEffect(() => {
    if (!isMobile || !circleRef.current || !isMounted) return;
    const circle = circleRef.current;
    const { angle } = computeSemiCircle(activeIndex);
    const circleRotation = 90 - angle; // 90° = bottom center in standard coords
    const iconCounterRotation = angle - 90;
    // Run after layout so rotation applies correctly (active icon at 6 o'clock)
    const id = requestAnimationFrame(() => {
      if (!circleRef.current) return;
      gsap.set(circleRef.current, { rotation: circleRotation, transformOrigin: "50% 50%" });
      circleRef.current.querySelectorAll<HTMLElement>(".icon-item").forEach((icon) => {
        if (icon) gsap.set(icon, { rotation: iconCounterRotation, transformOrigin: "50% 50%" });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [isMobile, isMounted, iconRadius]);

  // ⭐ GSAP ScrollTrigger (WITH LENIS SCROLLER FIX) - desktop only; on mobile use click only
  useLayoutEffect(() => {
    if (!sectionRef.current || !rightRef.current || !spacerRef.current || !isMounted) return;
    if (!circleRef.current || !centerImgRef.current || !arrowRef.current) return;
    if (isMobile) {
      spacerRef.current.style.height = "0px";
      return;
    }

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

          onEnter: () => {
            // Update arrow position when section enters viewport
            updateArrowPosition();
          },

          onUpdate: (self) => {
            // Skip update if we're in the middle of a click action
            if (isClickingRef.current) return;
            
            // Calculate index based on progress - each slide gets equal scroll distance
            // Use Math.floor to ensure single scroll activates each slide
            const index = Math.min(Math.floor(self.progress * slides.length), slides.length - 1);
            
            // Prevent reverting to a previous index immediately after clicking
            // Allow 500ms grace period after a click to prevent unwanted reverts
            const timeSinceClick = Date.now() - clickTimestampRef.current;
            if (clickedIndexRef.current !== null && timeSinceClick < 500) {
              // If we recently clicked and the calculated index doesn't match clicked index,
              // check if it's close (within 1 slide) - if not, ignore the update
              if (Math.abs(index - clickedIndexRef.current) > 1) {
                // Too far from clicked index, ignore this update
                return;
              }
              // If we're close to the clicked index, allow the update but clear the clicked ref
              if (index === clickedIndexRef.current) {
                clickedIndexRef.current = null;
              }
            }
            
            // Only update activeIndex if it actually changed to prevent duplicate content animations
            if (index !== lastActiveIndexRef.current) {
              lastActiveIndexRef.current = index;
              setActiveIndex(index);
            }

            const { angle } = computeSemiCircle(index);

            const circle = circleRef.current;
            if (!circle || !circle.parentElement) return;
            
            try {
              gsap.to(circle, {
                rotation: -angle,
                duration: 0.6,
                ease: "power3.out",
              });
            } catch (error) {
              console.debug('Circle rotation error:', error);
            }

            // Counter-rotate all icons to keep them straight
            const icons = circle.querySelectorAll<HTMLElement>(".icon-item");
            icons?.forEach((icon, i) => {
              if (icon && icon.parentElement) {
                try {
                  // All icons counter-rotate by angle to stay straight
                  // Active icon gets additional rotation if needed
                  gsap.to(icon, {
                    rotation: angle, // Counter-rotate to keep icons straight
                    transformOrigin: "50% 50%",
                    duration: 0.6,
                    ease: "power3.out",
                  });
                } catch (error) {
                  console.debug('Icon rotation error:', error);
                }
              }
            });

            // Position arrow at right center of circle (fixed position)
            const arrow = arrowRef.current;
            if (arrow) {
              requestAnimationFrame(() => {
                const currentArrow = arrowRef.current;
                const currentCircle = circleRef.current;
                if (!currentArrow || !currentCircle) return;
                
                try {
                  // Get the circle container's position relative to viewport
                  const circleRect = currentCircle.getBoundingClientRect();
                  const circleCenterX = circleRect.left + circleRect.width / 2;
                  const circleCenterY = circleRect.top + circleRect.height / 2;
                  
                  // Position arrow at right center of circle (0 degrees = right center)
                  const iconHalf = typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 45;
                  const fixedX = circleCenterX + iconRadius + iconHalf + 8; // Circle radius + half icon width + spacing
                  const fixedY = circleCenterY; // Center vertically
                  
                  // Use fixed positioning - arrow always at right center
                  gsap.to(currentArrow, {
                    left: fixedX,
                    top: fixedY,
                    rotation: 0, // Always point right
                    transformOrigin: "0% 50%",
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.6,
                    ease: "power3.out",
                  });
                } catch (error) {
                  console.debug('Arrow animation error:', error);
                }
              });
            }

            const progress = self.progress;

            // Smooth zoom OUT based on scroll
            const centerImg = centerImgRef.current;
            if (centerImg && centerImg.parentElement) {
              try {
                gsap.to(centerImg, {
                  scale: 1 - progress * 0.25,  // 1 → 0.75
                  opacity: 1 - progress * 0.3, // fade slightly
                  ease: "none",
                });
              } catch (error) {
                console.debug('Center image animation error:', error);
              }
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
  }, [iconRadius, isMounted, isMobile, slides.length]);

  // ⭐ Helper to get Lenis instance
  const getLenis = () => {
    // @ts-ignore
    return typeof window !== 'undefined' ? (window as any)?.lenis || null : null;
  };

  // ⭐ Manual Click Jump
  const jumpToSlide = (i: number) => {
    if (!circleRef.current) return;
    
    // Set flag to prevent onUpdate from interfering
    isClickingRef.current = true;
    
    // Track clicked index and timestamp to prevent reverts
    clickedIndexRef.current = i;
    clickTimestampRef.current = Date.now();
    
    // Update the ref to track current index
    lastActiveIndexRef.current = i;
    
    // Update active index immediately
    setActiveIndex(i);

    const { angle } = computeSemiCircle(i);
    const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;
    // On mobile: active icon at bottom center (6 o'clock = 90°); on desktop: at right center (0°)
    const circleRotation = isMobileView ? 90 - angle : -angle;
    const iconCounterRotation = isMobileView ? angle - 90 : angle;

    const circle = circleRef.current;
    if (circle && circle.parentElement) {
      try {
        gsap.to(circle, {
          rotation: circleRotation,
          transformOrigin: "50% 50%",
          duration: 0.6,
          ease: "power3.out",
        });
      } catch (error) {
        console.debug('Circle rotation error in jumpToSlide:', error);
        isClickingRef.current = false;
        return;
      }

      // Counter-rotate all icons to keep them straight
      const icons = circleRef.current.querySelectorAll<HTMLElement>(".icon-item");
      icons?.forEach((icon, idx) => {
        if (icon) {
          gsap.to(icon, {
            rotation: iconCounterRotation,
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "power3.out",
          });
        }
      });

      // Position arrow: mobile = bottom center, desktop = right center
      const iconHalf = isMobileView ? 28 : 45;
      if (arrowRef.current && circleRef.current) {
        requestAnimationFrame(() => {
          if (!arrowRef.current || !circleRef.current) return;
          
          const circleRect = circleRef.current.getBoundingClientRect();
          const circleCenterX = circleRect.left + circleRect.width / 2;
          const circleCenterY = circleRect.top + circleRect.height / 2;
          
          const fixedX = isMobileView ? circleCenterX : circleCenterX + iconRadius + iconHalf + 8;
          const fixedY = isMobileView ? circleCenterY + iconRadius + iconHalf + 8 : circleCenterY;
          const arrowRotation = isMobileView ? -90 : 0; // Point down on mobile, right on desktop
          
          gsap.to(arrowRef.current, {
            left: fixedX,
            top: fixedY,
            rotation: arrowRotation,
            transformOrigin: isMobileView ? "50% 0%" : "0% 50%",
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            ease: "power3.out",
          });
        });
      }
    }

    // On mobile: no scroll sync, only click updates; done after visual updates
    if (isMobile) {
      setTimeout(() => {
        isClickingRef.current = false;
      }, 100);
      return;
    }

    // Sync ScrollTrigger progress with clicked slide (desktop only)
    try {
      const st = scrollTriggerRef.current;
      if (!st || !sectionRef.current) {
        console.debug('ScrollTrigger or sectionRef not available');
        isClickingRef.current = false;
        return;
      }

      // Calculate the target progress for this slide (0 to 1)
      const targetProgress = i / (slides.length - 1);
      
      // Check if section is already visible/pinned
      const isSectionActive = st.isActive;
      const currentScrollY = window.scrollY || window.pageYOffset;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + currentScrollY;
      const viewportTop = currentScrollY;
      const viewportBottom = currentScrollY + window.innerHeight;
      
      // If section is not in viewport, scroll to it first
      const needsScrollToSection = sectionTop > viewportBottom || (sectionTop + sectionRef.current.offsetHeight) < viewportTop;
      
      // Get Lenis instance
      const lenis = getLenis();
      
      // CRITICAL: Temporarily stop Lenis to prevent smooth scroll interference
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
      
      // CRITICAL: Temporarily disable ScrollTrigger to prevent onUpdate from interfering
      st.disable();
      
      // Refresh to get current positions
      ScrollTrigger.refresh();
      
      // Wait for refresh
      requestAnimationFrame(() => {
        const stStart = st.start;
        const stEnd = st.end;
        const scrollDistance = stEnd - stStart;
        
        // Calculate target scroll position
        // Only scroll within the section if it's already pinned, otherwise scroll to section first
        const targetScrollPosition = needsScrollToSection && !isSectionActive 
          ? stStart  // Scroll to section start if not visible
          : stStart + (targetProgress * scrollDistance); // Scroll within section if already visible
        
        // Check if we're already at the target position (within tolerance)
        const currentScrollY = window.scrollY || window.pageYOffset;
        const scrollDiff = Math.abs(currentScrollY - targetScrollPosition);
        const tolerance = 10; // 10px tolerance
        
        // If we're already at the target position (or very close), just update state without scrolling
        if (scrollDiff < tolerance && isSectionActive) {
          // Section is already visible and we're close to target - just update state
          st.enable();
          if (lenis && typeof lenis.start === 'function') {
            lenis.start();
          }
          ScrollTrigger.refresh();
          lastActiveIndexRef.current = i;
          clickedIndexRef.current = i;
          clickTimestampRef.current = Date.now();
          setTimeout(() => {
            isClickingRef.current = false;
          }, 100);
          return;
        }
        
        // Scroll to target position (ScrollTrigger is disabled, Lenis is stopped)
        const scrollComplete = () => {
          // Wait for scroll to fully complete and settle
          setTimeout(() => {
            // Re-enable ScrollTrigger
            st.enable();
            
            // Re-start Lenis
            if (lenis && typeof lenis.start === 'function') {
              lenis.start();
            }
            
            // Force refresh to recalculate progress based on current scroll position
            ScrollTrigger.refresh();
            
            // Wait for ScrollTrigger to update
            requestAnimationFrame(() => {
              // Verify progress matches
              const actualProgress = st.progress;
              const actualIndex = Math.min(Math.floor(actualProgress * slides.length), slides.length - 1);
              
              if (actualIndex !== i) {
                // Progress doesn't match - fine-tune scroll position
                // Stop Lenis and disable ScrollTrigger again for fine-tuning
                if (lenis && typeof lenis.stop === 'function') {
                  lenis.stop();
                }
                st.disable();
                
                ScrollTrigger.refresh();
                const fineStart = st.start;
                const fineEnd = st.end;
                const fineDistance = fineEnd - fineStart;
                const finePosition = fineStart + (targetProgress * fineDistance);
                
                // Use immediate scroll (no animation) for fine-tuning
                window.scrollTo({
                  top: finePosition,
                  behavior: 'auto'
                });
                
                setTimeout(() => {
                  st.enable();
                  if (lenis && typeof lenis.start === 'function') {
                    lenis.start();
                  }
                  ScrollTrigger.refresh();
                  lastActiveIndexRef.current = i;
                  clickedIndexRef.current = i;
                  clickTimestampRef.current = Date.now();
                  setTimeout(() => {
                    isClickingRef.current = false;
                  }, 300);
                }, 100);
              } else {
                // Progress matches perfectly!
                lastActiveIndexRef.current = i;
                clickedIndexRef.current = i;
                clickTimestampRef.current = Date.now();
                setTimeout(() => {
                  isClickingRef.current = false;
                }, 300);
              }
            });
          }, 200);
        };
        
        if (lenis && typeof lenis.scrollTo === 'function') {
          // Use Lenis scrollTo with immediate flag for more precise control
          lenis.scrollTo(targetScrollPosition, {
            duration: needsScrollToSection ? 1.2 : 0.8, // Longer duration if scrolling to section
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            onComplete: scrollComplete,
          });
        } else {
          // Fallback to window.scrollTo
          window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
          });
          setTimeout(scrollComplete, needsScrollToSection ? 600 : 400);
        }
      });
    } catch (error) {
      console.debug('Scroll animation error in jumpToSlide:', error);
      // Re-enable ScrollTrigger and Lenis in case of error
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.enable();
      }
      const lenis = getLenis();
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
      isClickingRef.current = false;
    }
  };

  // ⭐ Center image zoom animation
  useEffect(() => {
    if (!centerImgRef.current) return;
    const img = centerImgRef.current;
    
    if (!img.parentElement) return;
    
    try {
      const anim = gsap.fromTo(
        img,
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
      
      return () => {
        if (anim) anim.kill();
      };
    } catch (error) {
      console.debug('Center image animation error:', error);
    }
  }, [activeIndex]);

  // ⭐ Caption animation on change
  useEffect(() => {
    // Only animate if activeIndex actually changed to prevent duplicate animations
    if (activeIndex === lastCaptionIndexRef.current) return;
    
    // Update ref to track current index
    lastCaptionIndexRef.current = activeIndex;
    
    if (!captionTitleRef.current || !captionDescRef.current || !captionNumberRef.current) return;

    const title = captionTitleRef.current;
    const desc = captionDescRef.current;
    const number = captionNumberRef.current;

    // Check if elements are still in DOM
    if (!title.parentElement || !desc.parentElement || !number.parentElement) return;

    try {
      // Set initial state - start hidden
      gsap.set([title, desc, number], {
        opacity: 0, // Start at 0% opacity (hidden)
        y: 20,
      });

      // Create animation timeline - simple fade in
      const tl = gsap.timeline();

      // Fade in content from 0% to 100% opacity
      tl.to([title, desc, number], {
        opacity: 1, // Fade from 0% to 100% opacity
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1, // Slight stagger between elements
      });

      return () => {
        if (tl) tl.kill();
      };
    } catch (error) {
      console.debug('Caption animation error:', error);
    }
  }, [activeIndex]);


  return (
    <>
      <section
        ref={sectionRef}
        suppressHydrationWarning
        onClick={(e) => {
          // Prevent clicks on section background from doing anything
          if (e.target === e.currentTarget) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="circular-slider-section gradient-background bg-lightdarkbase h-screen w-full flex items-center justify-center overflow-hidden before:absolute before:content-[''] before:w-[80vw] before:h-[70%] before:rounded-[30vw] before:opacity-100 before:blur-[100px] relative before:-z-1 before:-right-[10vw] transition-colors duration-200">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-20 relative z-0 px-3 md:px-0">
          {/* Mobile: centered title on top */}
          <div className="w-full order-1 text-center px-2 md:hidden">
            <h2 className="font-mainFont text-pageh2 leading-none text-[var(--color-gray)] transition-colors duration-200">From <span className="font-subFont text-corinthiaHeading text-brown dark:text-[#d4a574] transition-colors duration-200">First Visit</span> to Final Fit — we handle it all</h2>
          </div>
          
          {/* Row: circle (left) + content (right) on mobile and desktop */}
          <div className="w-full order-2 flex md:flex-row flex-col items-center justify-center gap-3 md:gap-20 flex-1 min-h-0 flex-wrap">
            {/* Desktop: left column 40vw with 45vw circle inside (previous layout) */}
            <div className="w-[90vw] md:w-[40vw] xl:w-[40vw] flex justify-start md:justify-center items-center flex-shrink-0 ms-0 sm:ms-[-10vw] ">
            <div className="relative w-[95vw] h-[95vw] md:w-[45vw] md:h-[45vw] flex  items-center justify-center -left-0 md:-left-20" style={{ minWidth: 0 }}>
            {/* ROTATING RING center image */}
            {mounted && (
                <div
                  ref={centerImgRef}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] md:w-[28vw] md:h-[28vw] rounded-full overflow-hidden shadow-xl dark:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5)] z-50 pointer-events-none transition-shadow duration-200"
                >
                  <Image src={slides[activeIndex].image} alt="" fill className="object-cover" />
                </div>
            )}

            {/* ROTATING RING */}
            <div ref={circleRef} className="absolute inset-0 flex items-center justify-center z-0 rotating-ring">
                <svg 
                  className="absolute inset-0 w-full h-full -rotate-90 max-w-[95vw] max-h-[95vw] sm:max-w-[60vw] sm:max-h-[60vw] md:max-w-[50vw] md:max-h-[50vw] circle-svg" 
                  viewBox={`0 0 ${outerRadius * 2} ${outerRadius * 2}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle 
                    cx={outerRadius} 
                    cy={outerRadius} 
                    r={outerRadius} 
                    fill="none" 
                    stroke="var(--circle-stroke)" 
                    strokeWidth={strokeWidth}
                    className="circle-stroke"
                  />
                  <circle 
                    cx={outerRadius} 
                    cy={outerRadius} 
                    r={innerRadius} 
                    fill="none" 
                    stroke="var(--circle-stroke)" 
                    strokeWidth={strokeWidth}
                    className="circle-stroke"
                  />
                </svg>

                {slides.map((slide, i) => {
                  const { x, y } = computeSemiCircle(i);
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        jumpToSlide(i);
                      }}
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
                          isActive ? "active-icon w-16 h-16 md:w-[90px] md:h-[90px]" : "w-12 h-12 md:w-[70px] md:h-[70px]"
                        } rounded-full shadow-md dark:shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center relative transition-colors duration-200`}
                      >
                        <Image
                          src={slide.iconImage}
                          alt=""
                          width={isActive ? 60 : 40}
                          height={isActive ? 60 : 40}
                          className="dark:invert w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Single arrow element - positioned at right center of circle (independent of rotation) */}
              {isMounted && (
                <div ref={arrowRef} className="active-icon-arrow" />
              )}
            </div>
          </div>
          {/* RIGHT SIDE CONTENT - caption; desktop also has heading above */}
          <div ref={rightRef} className="w-full flex-1 min-w-[200px] md:w-[60vw] xl:w-[60vw] md:max-w-3xl right-content flex flex-col justify-center mt-10 md:mt-0">
            {/* Heading - desktop only (mobile uses centered title above) */}
            <div ref={headingSectionRef} className="w-full hidden md:block">
                <div ref={headingRef} className="title-section text-start flex flex-col justify-center w-full mx-auto">
                  <h2 className="font-mainFont text-h2 leading-none transition-colors duration-200">From <span className="font-subFont text-corinthiaHeading text-brown  transition-colors duration-200">First Visit</span> to Final Fit — we handle it all</h2>
                </div>
            </div>

            <div className="mt-0 md:mt-[2vw] relative flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-0 mx-auto md:mx-0 max-w-full md:max-w-lg overflow-hidden min-h-[100px]">
              <span 
                ref={captionNumberRef}
                className="text-[80px] sm:text-[120px] md:text-[155px] leading-[0.55] font-extrabold text-[#fff] dark:text-gray-800 relative left-0 top-0 md:top-2 flex mb-1 md:mb-[2vw] icon-img"
              >
                {slides[activeIndex].number}
              </span>
              <div className="overflow-hidden relative">
                <h3 
                  ref={captionTitleRef}
                  className="text-brown mb-1 md:mb-2 font-medium"
                >
                  {slides[activeIndex].title}
                </h3>
                <p 
                  ref={captionDescRef}
                  className="text-black dark:text-white text-sm md:text-base transition-colors duration-200"
                >
                  {slides[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <div ref={spacerRef} className="h-0" />
    </>
  );
}
