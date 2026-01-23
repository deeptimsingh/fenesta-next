"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import FenestaButton from "@/components/base/FenestaButton";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const DIGIT_HEIGHT = 48;

  /* -------------------------------------------------------
     PARALLAX — STRONG SCROLL PARALLAX
  -------------------------------------------------------- */
useLayoutEffect(() => {
  if (!sectionRef.current) return;

  const heroEl = sectionRef.current;
  let onMove: (e: MouseEvent) => void;

  const ctx = gsap.context(() => {
    // Master timeline controlled by scroll (section-based)
    const wrapper = document.querySelector(".heroslider-main") as HTMLElement;
    const imgs = gsap.utils.toArray<HTMLElement>(".hero-img");

    if (!wrapper || !imgs.length) return;

    // master timeline drives wrapper + inner image motion together
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // 1) Wrapper big upward parallax (subtle)
    tl.fromTo(
      wrapper,
      { y: 0 },
      { y: -140, ease: "none" },
      0 // align to timeline start
    );

    // 2) Each image: Y movement + gentle scale up as user scrolls down
    imgs.forEach((img) => {
      // ensure GPU-accelerated transform
      gsap.set(img, { transformOrigin: "center center", force3D: true });

      tl.fromTo(
        img,
        { yPercent: -10, scale: 1 },
        {
          yPercent: 10,
          scale: 1.06,           // scale up slightly on scroll down
          ease: "none",         // timeline scrub controls easing
        },
        0
      );
    });

    // 3) Optional: caption scroll-out (if you keep caption)
    tl.to(
      ".hero-caption",
      { y: -90, opacity: 0, ease: "none" },
      0
    );

    // MOUSE PARALLAX (on top of scroll animation)
    onMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const moveX = (x / rect.width - 0.5) * 2;
      const moveY = (y / rect.height - 0.5) * 2;

      // Apply only to active slide for best performance (uncomment one of below)
      // gsap.to(".swiper-slide-active .hero-img", { xPercent: moveX * 3, yPercent: moveY * 3, duration: 1.2, ease: "expo.out" });

      // OR apply to all images (keeps all layers synced)
      gsap.to(".hero-img", {
        xPercent: moveX * 3,
        yPercent: moveY * 3,
        duration: 1.2,
        ease: "expo.out",
      });
    };

    heroEl.addEventListener("mousemove", onMove);
  }, sectionRef);

  return () => {
    // remove mouse listener & revert GSAP context
    if (onMove && sectionRef.current) sectionRef.current.removeEventListener("mousemove", onMove);
    ctx.revert();
  };
}, []);





  /* -------------------------------------------------------
      MASK RESET
  -------------------------------------------------------- */
  const resetMaskReveal = (slide: HTMLElement) => {
    const masks = slide.querySelectorAll<HTMLElement>(".mask-reveal");

    masks.forEach((mask) => {
      mask.classList.add("reset");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mask.classList.remove("reset");
        });
      });
    });
  };

  /* -------------------------------------------------------
      PROGRESS BAR
  -------------------------------------------------------- */
  const resetProgress = () => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.offsetWidth;
  };

  const startProgress = (ms: number) => {
    const bar = progressRef.current;
    if (!bar) return;

    resetProgress();
    requestAnimationFrame(() => {
      bar.style.transition = `width ${ms}ms linear`;
      bar.style.width = "100%";
    });
  };

  /* -------------------------------------------------------
      ODOMETER
  -------------------------------------------------------- */
  const updateOdometer = (index: number) => {
    const box = paginationRef.current;
    if (!box) return;
    box.style.transition = "transform .55s cubic-bezier(.34,1.56,.64,1)";
    box.style.transform = `translateY(-${(index - 1) * DIGIT_HEIGHT}px)`;
  };

  const generateDigits = (total: number) => {
    const box = paginationRef.current;
    if (!box) return;

    box.innerHTML = "";
    for (let i = 1; i <= total; i++) {
      const d = document.createElement("div");
      d.className = "odometer-digit";
      d.textContent = String(i).padStart(2, "0");
      box.appendChild(d);
    }
  };

  /* -------------------------------------------------------
      VIDEO HANDLING
  -------------------------------------------------------- */
  const handleVideo = (swiper: SwiperType, vid: HTMLVideoElement | null) => {
    if (!swiper) return;

    try {
      swiper.autoplay.stop();
    } catch {}

    if (!vid) {
      try {
        swiper.autoplay.start();
      } catch {}
      startProgress(4000);
      return;
    }

    const apply = () => {
      const dur =
        vid.duration && !isNaN(vid.duration)
          ? Math.round(vid.duration * 1000)
          : 4000;

      startProgress(dur);

      vid.pause();
      vid.currentTime = 0;
      vid.muted = true;

      vid.play().catch(() => {
        try {
          swiper.autoplay.start();
        } catch {}
        startProgress(4000);
      });

      vid.onended = () => {
        try {
          swiper.slideNext();
          swiper.autoplay.start();
        } catch {}
      };
    };

    if (vid.readyState >= 1) apply();
    else vid.addEventListener("loadedmetadata", apply, { once: true });
  };

  /* -------------------------------------------------------
      GET ACTIVE SLIDES
  -------------------------------------------------------- */
  const getActiveSlides = (swiper: SwiperType | null) => {
    if (!swiper || !swiper.slides) return [];

    const slides = Array.from(swiper.slides) as HTMLElement[];

    return slides.filter(
      (s) =>
        s.classList.contains("swiper-slide-active") ||
        s.classList.contains("swiper-slide-duplicate-active")
    );
  };

  /* -------------------------------------------------------
      ARROWS
  -------------------------------------------------------- */
  const updateArrows = (swiper: SwiperType, total: number) => {
    const prev = document.querySelector(".hero-prev") as HTMLElement | null;
    const next = document.querySelector(".hero-next") as HTMLElement | null;

    if (!prev || !next) return;

    const index = swiper.realIndex + 1;

    if (index === 1) prev.classList.add("disabled");
    else prev.classList.remove("disabled");

    if (index === total) next.classList.add("disabled");
    else next.classList.remove("disabled");
  };

  /* -------------------------------------------------------
      INIT
  -------------------------------------------------------- */
  const onInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    const total = swiper.slides.filter(
      (el) => !el.classList.contains("swiper-slide-duplicate")
    ).length;

    const totalEl = document.getElementById("hero-total");
    if (totalEl) totalEl.textContent = String(total).padStart(2, "0");

    generateDigits(total);
    updateOdometer(1);
    updateArrows(swiper, total);

    swiper.slides.forEach((s) => {
      s.classList.remove("slide-active");
      resetMaskReveal(s as HTMLElement);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const actives = getActiveSlides(swiper);
        actives.forEach((s) => s.classList.add("slide-active"));

        const realSlide = swiper.slides?.[swiper.realIndex] as HTMLElement | undefined;
        if (!realSlide) return;

        const video = realSlide.querySelector("video");
        handleVideo(swiper, video);
      });
    });
  };

  /* -------------------------------------------------------
      SLIDE CHANGE
  -------------------------------------------------------- */
  const onSlideChange = (swiper: SwiperType) => {
    const index = swiper.realIndex + 1;
    updateOdometer(index);
    resetProgress();

    const total = swiper.slides.filter(
      (el) => !el.classList.contains("swiper-slide-duplicate")
    ).length;
    updateArrows(swiper, total);

    swiper.slides.forEach((s) => {
      s.classList.remove("slide-active");
      resetMaskReveal(s as HTMLElement);
    });

    setTimeout(() => {
      const actives = getActiveSlides(swiper);
      actives.forEach((s) => s.classList.add("slide-active"));
    }, 40);

    const realSlide = swiper.slides?.[swiper.realIndex] as HTMLElement | undefined;
    if (!realSlide) return;
    const video = realSlide.querySelector("video");
    handleVideo(swiper, video);
  };
  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden z-20 heroslider-main">

      {/* CONTROLS */}
      <div className="absolute bottom-12 left-8 right-8 z-50 pointer-events-none">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 w-full pointer-events-auto">
            <button className="hero-prev text-white text-4xl cursor-pointer">
              <Image src="/images/slider-arrow-prev-white.svg" alt="" width={12} height={25} />
            </button>

            <button className="hero-next text-white text-4xl cursor-pointer">
              <Image src="/images/slider-arrow-next-white.svg" alt="" width={12} height={25} />
            </button>

            <div className="relative flex-1 h-[2px] bg-white/30">
              <div ref={progressRef} className="absolute left-0 top-0 h-full bg-white w-0" />
            </div>
          </div>

          {/* ODOMETER */}
          <div className="flex items-center ml-6 text-white text-4xl font-bold pointer-events-auto w-64">
            <div className="overflow-hidden h-[48px] mr-2">
              <div ref={paginationRef} className="odometer-container" />
            </div>
            <span className="text-white/40">
              / <span id="hero-total">00</span>
            </span>
          </div>
        </div>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay, Navigation]}
        parallax={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        onSwiper={onInit}
        onSlideChange={onSlideChange}
        className="w-full h-full heroslider-main"
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="hero-img-wrap" >
            <Image
              src="/images/home/herobanner/banner-img.webp"
              alt="Slide 1"
              width={1920}
              height={945}
              className="hero-img absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div className="overlay absolute inset-0 w-full h-full z-10 bg-[linear-gradient(-90deg,rgba(0,0,0,0)_33%,#000_96%)] opacity-45"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="container">
              <div className="slide-caption text-white max-w-lg">
                <h1 className="caption-title text-pageh1 font-bold mb-4 mask-reveal leading-none">
                  <span>Built For Better Spaces</span>
                </h1>
                <p className="caption-desc text-xl mb-6 max-w-xl mask-reveal">
                  <span>From personal spaces to ambitious builds, discover windows and doors that elevate every environment</span>
                </p>
                <div className="caption-btn mt-6">
                  <FenestaButton>FIND THE PERFECT FIT</FenestaButton>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="hero-img-wrap" >
            <Image
              src="/images/home/herobanner/banner-img.webp"
              alt="Slide 2"
              width={1920}
              height={945}
              className="hero-img absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div className="overlay absolute inset-0 w-full h-full z-10 bg-[linear-gradient(-90deg,rgba(0,0,0,0)_33%,#000_96%)] opacity-45"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="container">
              <div className="slide-caption text-white max-w-lg">
                <h2 className="caption-title text-pageh1 font-bold mb-4 mask-reveal leading-none">
                  <span>Live Better With Us</span>
                </h2>

                <p className="caption-desc text-xl max-w-xl mask-reveal">
                  <span>Experience next-level comfort.</span>
                </p>

                <div className="caption-btn mt-6">
                  <FenestaButton>FIND THE PERFECT FIT</FenestaButton>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="hero-img-wrap" >
            <Image
              src="/images/home/herobanner/banner-img.webp"
              alt="Slide 3"
              width={1920}
              height={945}
              className="hero-img absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div className="overlay absolute inset-0 w-full h-full z-10 bg-[linear-gradient(-90deg,rgba(0,0,0,0)_33%,#000_96%)] opacity-45"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="container">
              <div className="slide-caption text-white max-w-lg">
                <h2 className="caption-title text-pageh1 font-bold mb-4 mask-reveal leading-none">
                  <span>Comfort In Every Frame</span>
                </h2>

                <p className="caption-desc text-xl max-w-xl mask-reveal">
                  <span>Designed for modern living.</span>
                </p>

                <div className="caption-btn mt-6">
                  <FenestaButton>FIND THE PERFECT FIT</FenestaButton>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4 */}
        <SwiperSlide>
          <div className="hero-img-wrap" >
            <Image
              src="/images/home/herobanner/banner-img.webp"
              alt="Slide 4"
              width={1920}
              height={945}
              className="hero-img absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div className="overlay absolute inset-0 w-full h-full z-10 bg-[linear-gradient(-90deg,rgba(0,0,0,0)_33%,#000_96%)] opacity-45"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="container">
              <div className="slide-caption text-white max-w-lg">
                <h2 className="caption-title text-pageh1 font-bold mb-4 mask-reveal leading-none">
                  <span>Experience New Standards</span>
                </h2>

                <p className="caption-desc text-xl max-w-xl mask-reveal">
                  <span>Elevate your lifestyle.</span>
                </p>

                <div className="caption-btn mt-6">
                  <FenestaButton>FIND THE PERFECT FIT</FenestaButton>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}
