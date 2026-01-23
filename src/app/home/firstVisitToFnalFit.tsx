"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: string;
  angle: number; // Angle in degrees for positioning around circle
}

const steps: Step[] = [
  {
    id: 1,
    number: "01",
    title: "First Visit",
    description: "Our expert team visits your home to understand your needs and provide personalized recommendations.",
    icon: "/images/icons/building.svg",
    angle: 210, // Top-left (11 o'clock) - circuit board/microchip
  },
  {
    id: 2,
    number: "02",
    title: "Design Consultation",
    description: "Work with our designers to create custom solutions that match your style and requirements.",
    icon: "/images/icons/hard-hat.svg",
    angle: 270, // Top-middle (12 o'clock) - house
  },
  {
    id: 3,
    number: "03",
    title: "Approval Process",
    description: "Review and approve your custom design with our streamlined approval process.",
    icon: "/images/icons/checkmark.svg",
    angle: 300, // Top-right (2 o'clock) - crossed pencils
  },
  {
    id: 4,
    number: "04",
    title: "Documentation",
    description: "Complete all necessary documentation and finalize your order details.",
    icon: "/images/icons/document.svg",
    angle: 0, // Mid-right (3 o'clock) - clipboard
  },
  {
    id: 5,
    number: "05",
    title: "Precision Manufacturing",
    description: "Your windows and doors are crafted in ISO-certified facilities to global standards.",
    icon: "/images/icons/factory.svg",
    angle: 30, // Right-middle (4 o'clock) - gear with globe (highlighted)
  },
  {
    id: 6,
    number: "06",
    title: "Quality Check",
    description: "Every product undergoes rigorous quality checks before leaving our facility.",
    icon: "/images/icons/delivery.svg",
    angle: 60, // Bottom-right (5 o'clock) - delivery truck
  },
  {
    id: 7,
    number: "07",
    title: "Delivery",
    description: "Your products are carefully packaged and delivered to your location on schedule.",
    icon: "/images/icons/house.svg",
    angle: 90, // Bottom-middle (6 o'clock) - document
  },
  {
    id: 8,
    number: "08",
    title: "Final Fit",
    description: "Our professional installation team ensures perfect fit and finish for your windows and doors.",
    icon: "/images/icons/wrench.svg",
    angle: 120, // Bottom-left (7 o'clock) - hard hat person
  },
];

export default function FirstVisitToFinalFit() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);
  const scrollTriggerRef = useRef<any>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const sectionStartScrollRef = useRef<number>(0);
  const pathRef = useRef<SVGPathElement>(null);

  // Heading animation
  const { headingRef, sectionRef } = useHeadingAnimation();

  // Check screen size - only after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate icon positions around circle - responsive radius
  const getIconPosition = (angle: number) => {
    // Responsive radius based on screen size - use default on server to prevent hydration mismatch
    const radius = (isMounted && isMobile) ? 120 : 200; // Smaller radius on mobile
    
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  // Generate SVG path connecting icons in curved path
  const generatePath = (radius: number = 200) => {
    const pathRadius = radius + 25; // Path slightly outside icons
    
    // Create smooth curved path through all icon positions
    const points = steps.map((step) => {
      const radian = (step.angle * Math.PI) / 180;
      const x = Math.cos(radian) * pathRadius;
      const y = Math.sin(radian) * pathRadius;
      return { x, y };
    });

    // Create smooth bezier curve path
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];
      
      // Control points for smooth curve
      const cp1x = current.x + (next.x - prev.x) * 0.2;
      const cp1y = current.y + (next.y - prev.y) * 0.2;
      const cp2x = next.x - (next.x - prev.x) * 0.2;
      const cp2y = next.y - (next.y - prev.y) * 0.2;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    
    return path;
  };

  // Handle icon click
  const handleIconClick = (index: number) => {
    if (!pinWrapperRef.current) return;
    
    // Prevent ScrollTrigger from interfering temporarily
    isClickingRef.current = true;
    
    // Update active step immediately for visual feedback
    setActiveStep(index);
    
    // Calculate scroll distance based on screen size
    const checkMobile = () => window.innerWidth < 1024;
    const mobileCheck = checkMobile();
    const scrollDistance = mobileCheck 
      ? window.innerHeight * steps.length * 0.6
      : window.innerHeight * steps.length;
    
    // Calculate the target scroll position within the pinned section
    // Use equal step heights for accurate positioning
    const stepHeight = scrollDistance / steps.length;
    const scrollOffset = index * stepHeight;
    
    // Use the stored section start scroll position
    const sectionStart = sectionStartScrollRef.current;
    const targetScroll = sectionStart + scrollOffset;
    
    // Get current scroll position
    const currentScroll = window.pageYOffset || window.scrollY;
    const sectionEnd = sectionStart + scrollDistance;
    
    // Check if we're already within the pinned section
    const isInPinnedSection = currentScroll >= sectionStart - 50 && currentScroll <= sectionEnd + 50;
    
    // Only scroll forward, never backward to prevent page jumping up
    // If clicking an earlier step while already scrolled down, just update the visual state
    if (isInPinnedSection && targetScroll < currentScroll - 50) {
      // Clicking an earlier step - don't scroll backward, just update step
      // The ScrollTrigger will handle updates as user scrolls naturally
      setTimeout(() => {
        isClickingRef.current = false;
      }, 100);
      return;
    }
    
    // Ensure we're scrolling within the pinned section bounds
    const clampedTarget = Math.max(sectionStart, Math.min(sectionEnd, targetScroll));
    
    // Only scroll if target is significantly different from current (with tolerance)
    const scrollDifference = Math.abs(clampedTarget - currentScroll);
    
    if (scrollDifference > 50) {
      // Smooth scroll to the target position (only forward or to section start)
      window.scrollTo({
        top: clampedTarget,
        behavior: 'smooth'
      });
      
      // Re-enable ScrollTrigger updates after scroll completes
      setTimeout(() => {
        isClickingRef.current = false;
      }, 1500);
    } else {
      // Already close to target, just update step without scrolling
      setTimeout(() => {
        isClickingRef.current = false;
      }, 100);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinWrapperRef.current) return;

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    
    // Responsive scroll distance - less on mobile
    const checkMobile = () => window.innerWidth < 1024;
    const mobileCheck = checkMobile();
    const scrollDistance = mobileCheck 
      ? window.innerHeight * steps.length * 0.6 // Shorter on mobile
      : window.innerHeight * steps.length;

    // Main pin ScrollTrigger - unpins after last step
    const pinTrigger = ScrollTrigger.create({
      trigger: pinWrapper,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: container,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => {
        // Don't reset if we're clicking
        if (!isClickingRef.current) {
          setActiveStep(0);
        }
      },
      onLeave: () => {
        // Don't reset if we're clicking
        if (!isClickingRef.current) {
          // Ensure we're on the last step when unpinning
          setActiveStep(steps.length - 1);
        }
      },
      onLeaveBack: () => {
        // Don't reset if we're clicking
        if (!isClickingRef.current) {
          // Reset to first step when scrolling back up
          setActiveStep(0);
        }
      },
    });

    // Store pinTrigger reference and initial scroll position for click handler
    pinTriggerRef.current = pinTrigger;
    // Store the scroll position where the section starts (before pinning)
    sectionStartScrollRef.current = pinWrapper.offsetTop;

    // Create timeline for smooth step transitions
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: pinWrapper,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: false, // Already pinned above
        onUpdate: (self) => {
          // Don't update if we're clicking (to prevent conflicts)
          if (isClickingRef.current) return;
          
          const progress = self.progress;
          const stepIndex = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          );
          setActiveStep(stepIndex);
        },
      },
    });

    // Store ScrollTrigger reference for click handler
    scrollTriggerRef.current = masterTimeline.scrollTrigger;

    // Animate icons
    iconRefs.current.forEach((icon, index) => {
      if (!icon) return;
      
      const progress = index / (steps.length - 1);
      
      masterTimeline.to(
        icon,
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        progress
      );

      if (index > 0 && iconRefs.current[index - 1]) {
        masterTimeline.to(
          iconRefs.current[index - 1],
          {
            scale: 1,
            opacity: 0.6,
            duration: 0.1,
            ease: "power2.out",
          },
          progress
        );
      }
    });

    // Animate center image rotation
    if (centerImageRef.current) {
      masterTimeline.to(
        centerImageRef.current,
        {
          rotation: 360,
          duration: 1,
          ease: "none",
        },
        0
      );
    }

    // Animate curved path on scroll - draw path as user scrolls
    if (pathRef.current) {
      try {
        const pathLength = pathRef.current.getTotalLength();
        if (pathLength > 0 && !isNaN(pathLength)) {
          pathRef.current.style.strokeDasharray = `${pathLength}`;
          pathRef.current.style.strokeDashoffset = `${pathLength}`;

          // Animate path drawing on scroll
          ScrollTrigger.create({
            trigger: pinWrapper,
            start: "top top",
            end: `+=${scrollDistance}`,
            onUpdate: (self) => {
              if (pathRef.current) {
                const progress = self.progress;
                const drawLength = pathLength * progress;
                pathRef.current.style.strokeDashoffset = `${pathLength - drawLength}`;
              }
            },
          });
        }
      } catch (error) {
        // Silently handle path animation errors
        console.debug('Path animation error:', error);
      }
    }

    // Create individual step triggers for scroll-based navigation
    steps.forEach((step, index) => {
      const stepHeight = scrollDistance / steps.length;
      const scrollStart = index * stepHeight;

      ScrollTrigger.create({
        trigger: pinWrapper,
        start: `top top+=${scrollStart}`,
        end: `top top+=${scrollStart + stepHeight * 0.5}`,
        onEnter: () => {
          // Don't update if we're clicking (to prevent conflicts)
          if (!isClickingRef.current) {
            setActiveStep(index);
          }
        },
        onEnterBack: () => {
          // Don't update if we're clicking (to prevent conflicts)
          if (!isClickingRef.current) {
            setActiveStep(index);
          }
        },
      });
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === pinWrapper || st === pinTrigger) {
          st.kill();
        }
      });
    };
  }, []);

  // Update content animation when active step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activeStep]);

  const currentStep = steps[activeStep];

  return (
    <section className="w-full bg-gradient-to-b from-[#EDE8D0] to-[#B8D4E3] py-0 overflow-hidden relative" suppressHydrationWarning>
      {/* Top Blue Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0066CC] z-10"></div>
      
      {/* Bottom Blue Line */}
     

    

      {/* Pinned Container */}
      <div ref={pinWrapperRef} className="relative pb-20 lg:pb-0">
        <div
          ref={containerRef}
          className="container-fluid m-auto px-4 md:px-6 lg:px-12 xl:px-20 flex flex-col lg:flex-row items-center justify-between min-h-[80vh] lg:min-h-screen relative"
        >
          {/* Vertical Dotted Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300 z-0 transform -translate-x-1/2"></div>

          {/* Left Section - Circle with Icons */}
          <div ref={leftSectionRef} className="w-full lg:w-1/2 flex items-center justify-center mb-12 lg:mb-0 relative z-10 pr-0 lg:pr-8">
            <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center">
              {/* SVG Container for Curved Path */}
              <svg
                className="absolute inset-0 w-full h-full z-0"
                viewBox="-250 -250 500 500"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: 'visible' }}
              >
                {/* Curved Path Lines - Multiple concentric paths for depth */}
                <path
                  d={generatePath((isMounted && isMobile) ? 110 : 190)}
                  fill="none"
                  stroke="#E8DCC8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="opacity-30"
                />
                <path
                  ref={pathRef}
                  d={generatePath((isMounted && isMobile) ? 120 : 200)}
                  fill="none"
                  stroke="#E8DCC8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-50"
                />
                <path
                  d={generatePath((isMounted && isMobile) ? 130 : 210)}
                  fill="none"
                  stroke="#E8DCC8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="opacity-30"
                />
              </svg>

              {/* Outer Circle - Light Beige */}
              <div className="absolute inset-0 rounded-full bg-[#F5F0E0] border border-[#E8DCC8] z-[5]"></div>

              {/* Center Image - Responsive */}
              <div
                ref={centerImageRef}
                className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] rounded-full bg-white border-2 border-[#E8DCC8] overflow-hidden z-10"
              >
                <Image
                  src="/images/home/consultation-team.webp"
                  alt="Consultation Team"
                  width={280}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Icons around circle */}
              {steps.map((step, index) => {
                const { x, y } = getIconPosition(step.angle);
                const isActive = activeStep === index;
                
                // Circle container stays at original position
                // Only the icon inside will move to right center when active
                const radius = (isMounted && isMobile) ? 120 : 200;
                // Calculate offset to move icon from current position to right center (radius, 0)
                const rightCenterX = radius - x; // Horizontal offset to right center
                const rightCenterY = 0 - y; // Vertical offset to center

                // SVG Icons matching reference design
                const renderIcon = () => {
                  const iconSize = (isMounted && isMobile) ? 16 : 20;
                  const iconColor = isActive ? "#FFFFFF" : "#442917"; // White for active, dark brown for inactive
                  
                  switch(step.id) {
                    case 1: // Building
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18" />
                          <path d="M5 21V7l8-4v18" />
                          <path d="M19 21V11l-6-4" />
                          <path d="M9 9v0" />
                          <path d="M9 12v0" />
                          <path d="M9 15v0" />
                          <path d="M9 18v0" />
                        </svg>
                      );
                    case 2: // Hard Hat
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2Z" />
                          <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                          <path d="M4 15v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3" />
                        </svg>
                      );
                    case 3: // Checkmark
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      );
                    case 4: // Document
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                      );
                    case 5: // Gear/Factory
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                        </svg>
                      );
                    case 6: // Magnifying Glass / Quality Check
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                      );
                    case 7: // Truck/Delivery
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                          <path d="M15 18H9" />
                          <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 0-1.393.738L17 14" />
                          <circle cx="17" cy="18" r="2" />
                          <circle cx="7" cy="18" r="2" />
                        </svg>
                      );
                    case 8: // Wrench
                      return (
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      );
                    default:
                      return null;
                  }
                };

                return (
                  <div
                    key={`icon-${step.id}`}
                    ref={(el) => {
                      iconRefs.current[index] = el;
                    }}
                    onClick={() => handleIconClick(index)}
                    className={`absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full cursor-pointer transition-all duration-500 ease-in-out z-20 flex items-center justify-center ${
                      isActive
                        ? "scale-110 shadow-lg z-30"
                        : "hover:scale-105"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) ${isActive ? "scale(1.1)" : ""}`,
                      backgroundColor: isActive ? "#D4A574" : "#F5F0E0", // Golden-brown for active, beige for inactive
                      border: `2px solid ${isActive ? "#B8935F" : "#E8DCC8"}`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out pointer-events-none"
                      style={{
                        transform: isActive ? `translate(${rightCenterX}px, ${rightCenterY}px)` : "translate(0, 0)",
                      }}
                    >
                      {renderIcon()}
                    </div>

                    {/* Active indicator arrow - black triangle pointing right */}
                    {isActive && (
                      <div
                        className="absolute -right-1 md:-right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[7px] md:border-t-[6px] md:border-b-[6px] md:border-l-[8px] lg:border-t-[7px] lg:border-b-[7px] lg:border-l-[10px] border-transparent border-l-[#442917]"
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section - Content */}
          <div
            ref={rightSectionRef}
            className="w-full lg:w-1/2 lg:pl-12 flex items-center justify-center relative z-10 px-4 md:px-6 lg:px-0 flex-wrap"
          >
            {/* Heading */}
            <div ref={sectionRef} className="container-fluid m-auto px-6 md:px-0 pt-16 pb-8">
                <div ref={headingRef} className="title-section text-center lg:text-left flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto lg:mx-0">
                <h2 className="font-mainFont text-pageh2 leading-none">
                    From <span className="font-subFont text-corinthiaHeading text-brown">First Visit</span> to <span className="font-subFont text-corinthiaHeading text-brown">Final Fit</span>
                </h2>
                <p className="mt-2 text-lg">- we handle it all</p>
                </div>
            </div>

            <div
              ref={contentRef}
              className="w-full max-w-2xl text-center lg:text-left"
            >
              {/* Step Number - Large Semi-transparent Blue - Responsive */}
              <div className="mb-4 md:mb-6">
                <span className="text-[80px] md:text-[120px] lg:text-[140px] xl:text-[220px] font-bold text-[#0066CC]/20 leading-none block">
                  {currentStep.number}
                </span>
              </div>

              {/* Step Title - Responsive */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-mainFont text-gray-900 mb-4 md:mb-6 font-normal">
                {currentStep.title}
              </h3>

              {/* Step Description - Responsive */}
              <p className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {currentStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
