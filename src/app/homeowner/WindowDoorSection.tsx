"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SlideItem = {
  title: string;
  image?: string;
  video?: string;
  type?: "image" | "video";
};

export default function PanoramaTabsSingle() {
  const tabs = ["By Space", "Our Collection"];
  const [activeTab, setActiveTab] = useState(0);
  const [sliderReady, setSliderReady] = useState(false);

  const { headingRef, sectionRef } = useHeadingAnimation();
  const swiperSectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<any>(null);

  const isInViewportRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  const sliderData: SlideItem[][] = [
    [
      { title: "Balcony",     image: "/images/demo/room1.webp", type: "image" },
      { title: "Bathroom",    image: "/images/demo/room2.webp", type: "image" },
      { title: "Bedroom",     image: "/images/demo/room3.webp", type: "image" },
      { title: "Kitchen",     image: "/images/demo/room4.webp", type: "image" },
      { title: "Living Room", image: "/images/demo/room5.webp", type: "image" },
    ],
    [
      { title: "Noise Control",      image: "/images/demo/room1.webp",        type: "image" },
      { title: "Thermal",            video: "/images/demo/project-video.mp4", type: "video" },
      { title: "Security",           image: "/images/demo/room3.webp",        type: "image" },
      { title: "Weather Protection", video: "/images/demo/project-video.mp4", type: "video" },
    ],
  ];

  const GHOST_COUNT = sliderData[activeTab].length;

  // ─────────────────────────────────────────────────────────────────
  //  SPREAD-FROM-CENTER ANIMATION
  //
  //  Key insight: Swiper with `loop` creates duplicate slides internally
  //  and positions them via `transform: translateX(Npx)` on each
  //  `.swiper-slide` element.
  //
  //  We read Swiper's ACTUAL computed translate for every slide via
  //  `swiper.getTranslate()` + slide offsets — then cancel it on the
  //  wrapper so all slides LOOK centered, then animate back to 0.
  //
  //  This avoids all gap issues caused by guessing slideWidth * step.
  // ─────────────────────────────────────────────────────────────────

  const animateSpread = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.slides) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const slides = Array.from(swiper.slides as HTMLElement[]);

    slides.forEach((slide) => {
      const wrapper = slide.querySelector<HTMLElement>(".slide-spread-wrapper");
      if (!wrapper) return;

      // Read exactly where Swiper has placed this slide (its CSS transform translateX)
      const matrix = window.getComputedStyle(slide).transform;
      let slideTranslateX = 0;
      if (matrix && matrix !== "none") {
        // matrix(a,b,c,d,tx,ty) — tx is index 4
        const values = matrix.replace(/[^0-9\-.,]/g, "").split(",");
        slideTranslateX = parseFloat(values[4] ?? "0");
      }

      // Also read wrapper's own left offset relative to swiper container
      const swiperRect = swiper.el?.getBoundingClientRect?.() ?? { left: 0 };
      const slideRect  = slide.getBoundingClientRect();
      const relLeft    = slideRect.left - swiperRect.left;

      // Center of swiper container
      const swiperWidth  = swiper.el?.offsetWidth ?? window.innerWidth;
      const slideWidth   = slide.offsetWidth;
      const swiperCenter = swiperWidth / 2;
      const slideCenter  = relLeft + slideWidth / 2;

      // How far this slide's center is from the swiper center
      const distFromCenter = slideCenter - swiperCenter;

      // Phase 1 — snap wrapper to visually center this slide (no transition)
      wrapper.style.transition = "none";
      wrapper.style.transform  = `translateX(${-distFromCenter}px)`;
      wrapper.style.opacity    = "0";

      // Phase 2 — animate wrapper back to 0 (its natural position)
      const absDist = Math.abs(distFromCenter);
      const maxDist = swiperWidth / 2;
      // Stagger: slides farther from center animate a little later
      const delayMs = 40 + (absDist / maxDist) * 160;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.style.transition = [
            `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
            `opacity  0.7s ease                           ${delayMs}ms`,
          ].join(", ");
          wrapper.style.transform = "translateX(0)";
          wrapper.style.opacity   = "1";
        });
      });
    });
  }, []);

  const resetSlides = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.slides) return;
    Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
      const wrapper = slide.querySelector<HTMLElement>(".slide-spread-wrapper");
      if (!wrapper) return;
      wrapper.style.transition = "none";
      wrapper.style.opacity    = "0";
      wrapper.style.transform  = "translateX(0)";
    });
    hasAnimatedRef.current = false;
  }, []);

  // ─── IntersectionObserver ────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isInViewportRef.current = true;
          if (sliderReady) animateSpread();
        } else {
          isInViewportRef.current = false;
          resetSlides();
        }
      },
      { threshold: 0.15 }
    );

    const el = swiperSectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [sliderReady, animateSpread, resetSlides]);

  // Fire when Swiper becomes ready and section is already in viewport
  useEffect(() => {
    if (!sliderReady) return;
    if (isInViewportRef.current) animateSpread();
  }, [sliderReady, animateSpread]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSliderReady(false);
    hasAnimatedRef.current = false;
  };

  // ─── Scroll fan-in animation (desktop only) ─────────────────────────
  useEffect(() => {
    if (!sliderReady) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = swiperSectionRef.current;
    if (!root) return;

    const sliders = Array.from(root.querySelectorAll<HTMLElement>(".team-slider"));
    if (!sliders.length) return;

    const startX = ["120%", "60%", "-60%", "-120%"];
    const startY = ["0%", "6%", "6%", "0%"];
    const startScale = [0.8, 0.88, 0.88, 0.8];
    const startRot = [-7, -2, 2, 7];

    const ctx = gsap.context(() => {
      sliders.forEach((slider) => {
        const slides = Array.from(
          slider.querySelectorAll<HTMLElement>(".swiper-slide:not(.swiper-slide-duplicate)")
        );

        slides.forEach((slide, i) => {
          gsap.set(slide, {
            x: startX[i] ?? "0%",
            y: startY[i] ?? "0%",
            scale: startScale[i] ?? 0.85,
            rotation: startRot[i] ?? 0,
            opacity: 1,
            transformOrigin: "70% bottom",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            // Start only when team-slider reaches 50% viewport
            start: "top 50%",
            end: "bottom 50%",
            scrub: 2,
            invalidateOnRefresh: true,
           //  markers: true, // enable for debugging
          },
        });

        slides.forEach((slide) => {
          tl.to(
            slide,
            {
              x: "0%",
              y: "0%",
              scale: 1,
              rotation: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 1,
            },
            0
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, [sliderReady, activeTab]);

  return (
    <section
      ref={swiperSectionRef}
      className="common-padding w-full flex flex-col items-center window-door-section white-gradient-background text-black"
    >
      {/* Heading */}
      <div className="container-fluid m-auto px-6 md:px-0">
        <div ref={sectionRef} className="w-full">
          <div
            ref={headingRef}
            className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto">
            <h2 className="text-h2 leading-none">
              Browse to find what <br /> feels right for{" "}
              <span className="font-subFont text-corinthiaHeading text-brown">
                your home
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 mt-10 tabs-outer-container dark:bg-gray-900 dark:text-white">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`pb-2 text-lg transition-all border-b-2 ${
              activeTab === index
                ? "text-brown border-[var(--color-brown)] font-bold"
                : "text-theme border-transparent font-medium"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div
        className="relative w-full pb-10 -mt-5 team-slider-outer-container"
        style={{ minHeight: "25vw", perspective: '1200px', perspectiveOrigin: 'center center' }}
      >
        <Swiper
          key={activeTab}
          className="PanoramaSwiper-slider team-slider"
          loop
          centeredSlides
          parallax
          freeMode
          speed={1000}
          grabCursor
          // ── Show 5 slides on desktop, scale down gracefully ──
          slidesPerView={5}
          spaceBetween={16}
          breakpoints={{
            0:    { slidesPerView: 1.3,  spaceBetween: 10 },
            480:  { slidesPerView: 2.2,  spaceBetween: 12 },
            768:  { slidesPerView: 3.2,  spaceBetween: 14 },
            1024: { slidesPerView: 4.5,  spaceBetween: 16 },
            1280: { slidesPerView: 5,    spaceBetween: 16 },
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;

            // Pre-hide all wrappers before first paint
            if (swiper.slides) {
              Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
                const w = slide.querySelector<HTMLElement>(".slide-spread-wrapper");
                if (w) { w.style.transition = "none"; w.style.opacity = "0"; }
              });
            }

            swiper.update();

            // Wait for Swiper to finish layout (getBoundingClientRect needs a paint)
            setTimeout(() => setSliderReady(true), 80);
          }}

          /* Parallax while dragging */
          onProgress={(swiper) => {
            if (!swiper?.slides) return;
            Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
              const el = slide.querySelector<HTMLElement>(".parallax-img, .parallax-video");
              if (!el) return;
              const progress = (slide as any).progress ?? 0;
              requestAnimationFrame(() => {
                el.style.transform = `translateX(${-progress * 180}px)`;
              });
            });
          }}

          onSetTransition={(swiper, duration) => {
            if (!swiper?.slides || duration === 0) return;
            Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
              const el = slide.querySelector<HTMLElement>(".parallax-img, .parallax-video");
              if (el) el.style.transition = "none";
            });
          }}

          onTransitionEnd={(swiper) => {
            if (!swiper?.slides) return;
            Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
              const el = slide.querySelector<HTMLElement>(".parallax-img, .parallax-video");
              if (el) { el.style.transform = "translateX(0px)"; el.style.transition = ""; }
            });
          }}
        >
          {/* Real Slides */}
          {sliderData[activeTab].map((item, index) => (
            <SwiperSlide key={`real-${index}`}>
              {/* Wrapper is what we animate — Swiper never touches it */}
              <div
                className="slide-spread-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <SlideCard item={item} />
              </div>
            </SwiperSlide>
          ))}

          {/* Ghost slides for seamless loop */}
          {sliderData[activeTab].slice(0, GHOST_COUNT).map((item, index) => (
            <SwiperSlide key={`ghost-${index}`}>
              <div
                className="slide-spread-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <SlideCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-5 sm:-mt-10 z-[1]">
        <FenestaButton href="#">Explore our range</FenestaButton>
      </div>
    </section>
  );
}

/* ============================= */
/* SLIDE CARD                    */
/* ============================= */

function SlideCard({ item }: { item: SlideItem }) {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo  = item.type === "video" || (!!item.video && !item.image);
  const mediaSrc = isVideo ? item.video : item.image;

  useEffect(() => {
    if (!isVideo || !videoRef.current || !containerRef.current) return;
    const video = videoRef.current;

    const safePlay = () => {
      if (video.readyState < 2 || document.visibilityState !== "visible") return;
      video.play().catch((e) => {
        if (e.name !== "AbortError" && e.name !== "NotAllowedError")
          console.debug("Video play error:", e.name);
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && entry.intersectionRatio > 0.3
          ? safePlay()
          : video.pause();
      },
      { threshold: [0, 0.3, 0.5, 0.7, 1] }
    );
    obs.observe(containerRef.current!);

    const onVis = () =>
      document.visibilityState === "visible" ? safePlay() : video.pause();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isVideo]);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    const tryPlay = () => {
      if (video.readyState >= 2 && document.visibilityState === "visible")
        video.play().catch(() => {});
    };
    video.readyState >= 2
      ? tryPlay()
      : video.addEventListener("loadeddata", tryPlay, { once: true });
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [isVideo]);

  return (
    <div ref={containerRef} className="relative z-[10] overflow-hidden w-full h-full">
      <div className={isVideo ? "parallax-video" : "parallax-img"}>
        {isVideo && mediaSrc ? (
          <video
            ref={videoRef}
            src={mediaSrc}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            style={{ pointerEvents: "none", display: "block" }}
          />
        ) : mediaSrc ? (
          <Image src={mediaSrc} alt={item.title} width={900} height={600} />
        ) : null}
      </div>

      <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm pt-4 pb-10 flex justify-center z-[20]">
        <p className="text-white text-lg font-medium">{item.title}</p>
      </div>
    </div>
  );
}