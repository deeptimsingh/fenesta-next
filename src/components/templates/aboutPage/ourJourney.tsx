
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

/* ===== CONFIG ===== */
const TOTAL = 12;
const DESKTOP_ARC = 160; // from -80 to 80

export default function JourneySection() {
  /* ===== REFS ===== */
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  

  /* ===== STATE ===== */
  const [activeIndex, setActiveIndex] = useState(6);
  const [circleSize, setCircleSize] = useState(600);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  /* ===== MOUNT SAFETY ===== */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ===== RESPONSIVE CHECK ===== */
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);

    if (!wrapperRef.current) return;

    const width = wrapperRef.current.offsetWidth;
    const size = Math.min(Math.max(width, 300), 620);
    setCircleSize(size);
  }, []);

  useEffect(() => {
    handleResize();

    let timeout: NodeJS.Timeout;
    const listener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
      clearTimeout(timeout);
    };
  }, [handleResize]);

  /* ===== GEOMETRY ===== */
  const center = circleSize / 2;
  const radius = circleSize * 0.4;

  const getAngleForIndex = (index: number) => {
    const arcSpan = isMobile ? 360 : DESKTOP_ARC;
    const startAngle = isMobile ? -180 : -DESKTOP_ARC / 2;
    return startAngle + (arcSpan / (TOTAL - 1)) * index;
  };

  const getPosition = (index: number) => {
    const angleDeg = getAngleForIndex(index);
    const rad = (angleDeg * Math.PI) / 180;

    return {
      x: Math.round((center + radius * Math.cos(rad)) * 100) / 100,
      y: Math.round((center + radius * Math.sin(rad)) * 100) / 100,
      rotation: angleDeg,
    };
  };

  /* ===== ROTATION ===== */
  const rotateTo = (index: number) => {
    if (index < 0 || index >= TOTAL) return;
  
    const itemAngle = getAngleForIndex(index);
  
    const targetAngle = isMobile
      ? 90 - itemAngle   // mobile → active at bottom
      : -itemAngle;      // desktop normal arc
  
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotate: targetAngle,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  
    setCurrentRotation(targetAngle); // 👈 important
    setActiveIndex(index);
  };

  const nextYear = () => rotateTo(activeIndex + 1);
  const prevYear = () => rotateTo(activeIndex - 1);

  /* ===== CONTENT ANIMATION ===== */
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  /* ===== YEAR CONTENT ===== */
  const getActiveContent = () => {
    switch (activeIndex) {
      case 6:
        return {
          title: "2013 & 2014",
          description:
            "Shriram Alkali & Chemicals Unit commissioned in Bharuch (Gujarat).",
          type: "image" as const,
          media: "/images/about/about-img2.webp",
        };
      case 10:
        return {
          title: "2021-2022",
          description:
            "Achieved global recognition and sustainability certifications.",
          type: "video" as const,
          media: "/images/about/video1.mp4",
        };
      default:
        return {
          title: "Milestone",
          description: "Detailed milestone information for this year.",
          type: "image" as const,
          media: "/images/about/about-img1.webp",
        };
    }
  };

  const activeContent = getActiveContent();

  /* ===== RENDER INDIVIDUAL YEARS ===== */
  const renderYear = (index: number, label: string) => {
    const pos = getPosition(index);
    const isActive = activeIndex === index;
  
    return (
      <div
        key={index}
        onClick={() => rotateTo(index)}
        className={`absolute cursor-pointer year-item ${
          isActive ? "active" : ""
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          transform: `rotate(${pos.rotation}deg)`,
          transformOrigin: "0 50%",
        }}
      >
        <div
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            transform:
              isMobile && isActive
                ? `rotate(${-currentRotation}deg)`
                : "none",
          }}
        >
          {isActive && (
            <span className="w-3 h-3 bg-white rotate-45 shrink-0" />
          )}
  
          <span
            className={`whitespace-nowrap ${
              isActive
                ? "text-white text-lg sm:text-xl font-semibold"
                : "text-white/70 text-xs sm:text-sm"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0094D9] flex items-center overflow-hidden common-padding">
      {/* Left Background */}
      <div className="absolute -left-[20vw] top-[-10vw] bottom-0 w-full h-[130vh] pointer-events-none z-0" aria-hidden >
        <img
          src={"/images/about/backgroundVectors.svg"}
          className="w-full h-[120vh] object-fill object-left"
        />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-col lg:flex-row items-center gap-10 relative z-10">

        <div className="headingTitle mb-6 xl:mb-6 px-0 md:px-0 flex         md:hidden">
              <div className="title-section  md:flex flex-col w-full">
                <h2 className="font-mainFont text-h2 leading-none text-white flex justify-center flex-wrap mx-auto">Our  <span className="font-subFont text-corinthiaHeading text-cream leading-none">Journey</span></h2>
              </div>
        </div>  


        {/* ===== CIRCLE MENU ===== */}
        <div className="w-full lg:w-[30vw] flex justify-center lg:justify-start year-circle-wrapper">
          <div
            ref={wrapperRef}
            className="relative w-[85vw] max-w-[80vw] md:max-w-[50vw] aspect-square left-0 md:left-[-10vw]"
          >
            {/* Circle Line */}
            <svg
              className="absolute inset-0 w-full h-full md:scale-[1.125]"
              viewBox={`0 0 ${circleSize} ${circleSize}`}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="5 12"
                strokeOpacity="0.5"
              />
            </svg>

            {/* Rotating Items */}
            <div
              ref={circleRef}
              className="absolute inset-0 md:scale-[1.25]"
              style={{ transformOrigin: `${center}px ${center}px` }}
            >
              {mounted &&
                [...Array(TOTAL)].map((_, i) =>
                  renderYear(i, `${1998 + i}`)
                )}
            </div>
          </div>
        </div>

        {/* ===== CONTENT TEXT ===== */}
        <div className="text-white w-full lg:w-[35vw] px-6 md:px-0">
          <div className="headingTitle mb-6 xl:mb-6 px-0 md:px-0 hidden md:flex">
              <div className="title-section  md:flex flex-col w-full">
                <h2 className="font-mainFont text-h2 leading-none text-white flex  justify-start flex-wrap mx-auto">Our  <span className="font-subFont text-corinthiaHeading text-cream leading-none">Journey</span></h2>
              </div>
          </div>  

          <div ref={contentRef} key={activeIndex}>
            <h3 className="text-h3 mb-2">{activeContent.title}</h3>
            <p>{activeContent.description}</p>
          </div>

          <div className="flex items-center gap-6 mt-8 text-xs sm:text-sm uppercase tracking-widest">
            <button
              onClick={prevYear}
              disabled={activeIndex === 0}
              className="hover:opacity-80 disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="w-px h-4 bg-white/50" />
            <button
              onClick={nextYear}
              disabled={activeIndex === TOTAL - 1}
              className="hover:opacity-80 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>

        {/* ===== IMAGE / VIDEO ===== */}
        <div className="relative w-screen md:w-[80vw] max-w-[90vw] md:max-w-[35vw] aspect-square flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full z-10"
            style={{
              background:
                "url('/images/about/circleShadow.svg')",
              backgroundSize: "130% 130%",
              backgroundPosition: "center",
            }}
          />
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle, black 70%, rgba(0,0,0,0.8) 80%, transparent 90%)",
              maskImage:
                "radial-gradient(circle, black 70%, rgba(0,0,0,0.8) 80%, transparent 90%)",
            }}
          >
            {activeContent.type === "video" ? (
              <video
                key={activeIndex}
                src={activeContent.media}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                key={activeIndex}
                src={activeContent.media}
                alt={activeContent.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}