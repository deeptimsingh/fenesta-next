"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_SLIDE_DURATION = 4; // seconds for image slides
const SLIDE_COUNT = 5;

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectsSlider() {
  const [thumbs, setThumbs]               = useState<string[]>([]);
  const [active, setActive]               = useState(0);
  const [isVisible, setIsVisible]         = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  /** true only after the expand-to-100vw animation finishes; reverses on scroll-back */
  const [sliderEnabled, setSliderEnabled] = useState(false);

  // DOM refs
  const containerRef      = useRef<HTMLDivElement | null>(null);
  const sliderInnerRef    = useRef<HTMLDivElement | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbsWrapperRef  = useRef<HTMLDivElement | null>(null);
  const progressRef       = useRef<HTMLDivElement>(null);
  const captionRefs       = useRef<HTMLDivElement[]>([]);
  const videoRefs         = useRef<(HTMLVideoElement | null)[]>([]);

  // Swiper / timer refs
  const swiperRef              = useRef<SwiperClass | null>(null);
  const slideAdvanceTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Heading hook refs
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useHeadingAnimation({
    headingRef,
    sectionRef,
    selector: "h2, h2 span",
    threshold: 0.2,
    enterDuration: 0.7,
    exitDuration: 0.7,
    stagger: 0.25,
  });

  // ─── Helpers (declared before effects that reference them) ──────────────────

  /** Animate the caption for slide `index`; hide all others */
  const animateCaption = useCallback((index: number) => {
    captionRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
      }
    });
  }, []);

  /** Restart the progress bar for a given duration (seconds) */
  const resetProgress = useCallback((durationSeconds = DEFAULT_SLIDE_DURATION) => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    void bar.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${durationSeconds}s linear`;
        bar.style.width = "100%";
      });
    });
  }, []);

  /** Build thumbnail list from real (non-duplicate) Swiper slides */
  const buildThumbs = useCallback((swiper: SwiperClass) => {
    if (!swiper?.slides?.length) return;
    const realSlides = (Array.from(swiper.slides) as HTMLElement[]).filter(
      (el) => !el.classList.contains("swiper-slide-duplicate")
    );
    const t = realSlides
      .slice(0, SLIDE_COUNT)
      .map((el) => {
        const video = el.querySelector("video");
        if (video) return video.getAttribute("poster") ?? "";
        const img = el.querySelector("img");
        return img?.getAttribute("src") ?? img?.getAttribute("data-src") ?? "";
      })
      .filter(Boolean) as string[];
    setThumbs(t);
  }, []);

  /** Fade/pause videos — only the active slide plays */
  const syncVideoPlayback = useCallback(
    (swiper: SwiperClass) => {
      if (!swiper?.el) return;
      const wrapper    = swiper.el as HTMLElement;
      const activeSlide = wrapper.querySelector(".swiper-slide-active");
      wrapper.querySelectorAll("video").forEach((video) => {
        const v = video as HTMLVideoElement;
        if (activeSlide?.contains(v) && isVisible) {
          const play = () => { v.play().catch(() => {}); };
          if (v.readyState >= 2) play();
          else v.addEventListener("canplay", play, { once: true });
        } else {
          v.pause();
        }
      });
    },
    [isVisible]
  );

  const runSyncAfterTransition = useCallback(
    (swiper: SwiperClass) => {
      requestAnimationFrame(() => requestAnimationFrame(() => syncVideoPlayback(swiper)));
    },
    [syncVideoPlayback]
  );

  /** Grey-out prev/next arrows at boundaries (loop-aware) */
  const updateArrows = useCallback(
    (swiper: SwiperClass) => {
      const prev  = document.querySelector(".slider-prev") as HTMLElement | null;
      const next  = document.querySelector(".slider-next") as HTMLElement | null;
      if (!prev || !next) return;
      const total = thumbs.length || SLIDE_COUNT;
      const idx   = (swiper?.realIndex ?? active) + 1;
      prev.classList.toggle("disabled", idx <= 1);
      next.classList.toggle("disabled", idx >= total);
    },
    [thumbs.length, active]
  );

  /** Called after each transition; manages autoplay vs video timer */
  const onTransitionEnd = useCallback(
    (swiper: SwiperClass) => {
      if (slideAdvanceTimerRef.current) {
        clearTimeout(slideAdvanceTimerRef.current);
        slideAdvanceTimerRef.current = null;
      }
      syncVideoPlayback(swiper);

      const wrapper     = swiper?.el as HTMLElement | undefined;
      const activeSlide = wrapper?.querySelector(".swiper-slide-active");
      const video       = activeSlide?.querySelector("video") as HTMLVideoElement | null;

      if (video) {
        swiper.autoplay?.stop?.();
        const setDurationAndStart = () => {
          if (slideAdvanceTimerRef.current) {
            clearTimeout(slideAdvanceTimerRef.current);
            slideAdvanceTimerRef.current = null;
          }
          const dur = video.duration;
          const d   = isFinite(dur) && dur > 0 ? dur : DEFAULT_SLIDE_DURATION;
          resetProgress(d);
          video.play().catch(() => {});
          slideAdvanceTimerRef.current = setTimeout(() => swiper.slideNext(), d * 1000);
        };

        if (video.readyState >= 1 && video.duration) setDurationAndStart();
        else {
          video.addEventListener("loadedmetadata", setDurationAndStart, { once: true });
          video.addEventListener("durationchange",  setDurationAndStart, { once: true });
        }
      } else {
        swiper.autoplay?.start?.();
        resetProgress(DEFAULT_SLIDE_DURATION);
      }
    },
    [syncVideoPlayback, resetProgress]
  );

  // ─── Swiper event handlers ───────────────────────────────────────────────────

  const onSwiper = useCallback((s: SwiperClass) => {
    swiperRef.current = s;
  }, []);

  const onInit = useCallback(
    (swiper: SwiperClass) => {
      swiperRef.current = swiper;
      buildThumbs(swiper);
      setActive(swiper.realIndex ?? 0);
      updateArrows(swiper);

      const runAfterReady = () => {
        if (isVisible) {
          animateCaption(swiper.realIndex ?? 0);
          onTransitionEnd(swiper);
        } else {
          swiper.autoplay?.stop?.();
        }
        syncVideoPlayback(swiper);
        setTimeout(() => {
          syncVideoPlayback(swiper);
          if (isVisible) onTransitionEnd(swiper);
        }, 1000);
      };
      setTimeout(runAfterReady, 150);
    },
    [buildThumbs, updateArrows, isVisible, animateCaption, onTransitionEnd, syncVideoPlayback]
  );

  const onSlideChange = useCallback(
    (swiper: SwiperClass) => {
      if (slideAdvanceTimerRef.current) {
        clearTimeout(slideAdvanceTimerRef.current);
        slideAdvanceTimerRef.current = null;
      }
      const idx = swiper.realIndex ?? 0;
      setActive(idx);
      updateArrows(swiper);
      animateCaption(idx);
      runSyncAfterTransition(swiper);
    },
    [updateArrows, animateCaption, runSyncAfterTransition]
  );

  const goPrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const goNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const onThumbnailClick = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index);
  }, []);

  // ─── Effects ────────────────────────────────────────────────────────────────

  /**
   * Single IntersectionObserver:
   *  - sets hasEnteredViewport once (never resets) → mounts the Swiper
   *  - toggles isVisible on every enter/leave → controls autoplay
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /**
   * GSAP ScrollTrigger — fires once hasEnteredViewport is true.
   *
   * Phase 1 (scrub):  slider expands from 50 vw (centred) → 100 vw full-bleed.
   * Phase 2 (scrub):  captions and thumbnails fade/slide in.
   * onUpdate:         when progress > 0.95 → sliderEnabled = true (reverses on scroll back).
   */
  useEffect(() => {
    if (!hasEnteredViewport) return;

    const spacer          = containerRef.current;   // tall scroll-spacer, gives page height
    const slider          = sliderInnerRef.current; // sticky viewport panel
    const thumbsContainer = thumbsContainerRef.current;
    const thumbsWrapper   = thumbsWrapperRef.current;

    if (!spacer || !slider || !thumbsContainer || !thumbsWrapper) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Initial state of the sticky slider panel ───────────────────────────
      // Centred pill: 50 vw wide, horizontally centred, slightly scaled down
      gsap.set(slider, {
        width:        "80vw",
        marginLeft:   "auto",
        marginRight:  "auto",
        left:         "50%",
        xPercent:     -50,
        position:     "absolute",   // absolute inside the sticky wrapper
        top:          0,
        height:       "100%",
        borderRadius: 20,
        scale:        0.92,
        overflow:     "hidden",
      });

      gsap.set(".caption-container", { opacity: 0, y: 80 });
      gsap.set(thumbsContainer,      { opacity: 0, y: 60, pointerEvents: "none" });
      gsap.set(thumbsWrapper,        { xPercent: -8 });

      // ── Scrubbed timeline ─────────────────────────────────────────────────
      // The spacer is the trigger; it is NOT pinned by GSAP (sticky CSS does
      // the sticking). This means GSAP never inserts a pin-spacer div and the
      // section below sits exactly where it should in the document flow.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          // start when the spacer's top hits the top of the viewport
          start:   "top top",
          // scroll distance = 100vh of breathing room for the expand + reveal
          end:     "+=100%",
          scrub:   0.8,

          onUpdate(self) {
            const done = self.progress >= 0.98;
            setSliderEnabled(done);
            thumbsContainer.style.pointerEvents = done ? "auto" : "none";
          },
        },
      });

      // Phase 1 (0 → 0.6): expand 50 vw → 100 vw, lose border-radius + scale
      tl.to(
        slider,
        {
          width:        "100vw",
          left:         "50%",   // keep left anchor, xPercent handles centering
          xPercent:     -50,     // stays centred while width grows
          borderRadius: 0,
          scale:        1,
          ease:         "none", // scrub is linear; easing lives in scrub lag
          duration:     0.6,
        },
        0
      );

      // Phase 2 (0.6 → 0.75): captions slide up
      tl.to(
        ".caption-container",
        { opacity: 1, y: 0, stagger: 0.04, ease: "power2.out", duration: 0.15 },
        0.6
      );

      // Phase 2 (0.6 → 0.75): thumbnails appear immediately after 100 vw reached
      tl.to(
        thumbsContainer,
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.15 },
        0.6
      );
      tl.to(
        thumbsWrapper,
        { xPercent: 0, ease: "power2.out", duration: 0.15 },
        0.6
      );

      ScrollTrigger.refresh();
    }, spacer);

    return () => ctx.revert();
  }, [hasEnteredViewport]);

  /** Sync autoplay and video state whenever visibility changes */
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    if (isVisible) {
      animateCaption(s.realIndex ?? active);
      onTransitionEnd(s);
    } else {
      s.autoplay?.stop?.();
      if (slideAdvanceTimerRef.current) {
        clearTimeout(slideAdvanceTimerRef.current);
        slideAdvanceTimerRef.current = null;
      }
      if (progressRef.current) progressRef.current.style.transition = "none";
    }
  }, [isVisible, active, animateCaption, onTransitionEnd]);

  /** Keep video/arrows in sync whenever active slide or visibility changes */
  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      syncVideoPlayback(swiper);
      updateArrows(swiper);
    }
  }, [active, isVisible, thumbs.length, syncVideoPlayback, updateArrows]);

  // ─── Derived ────────────────────────────────────────────────────────────────

  const totalSlides  = thumbs.length || SLIDE_COUNT;
  const rotatedThumbs =
    thumbs.length > 0
      ? Array.from({ length: totalSlides - 1 }, (_, i) =>
          thumbs[(active + i + 1) % totalSlides]
        )
      : [];
  const highlightIndex = 0;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    /*
     * containerRef = tall scroll-spacer (300 vh).
     *   - Gives the page the vertical room the scrub needs.
     *   - Must NOT have overflow-hidden — that would clip the sticky child.
     * sticky panel = position:sticky top:0 height:100vh — the visible frame.
     * sliderInnerRef = the actual box GSAP animates (50 vw → 100 vw).
     *   It is absolute inside the sticky panel so GSAP can freely set left/width.
     */
    <div
      ref={containerRef}
      className="product-wrap relative w-full"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">
      <div ref={sliderInnerRef} className="slider-inner absolute inset-0 h-full">

        {/* ── Main Swiper — mounted lazily when section first enters viewport ── */}
        {hasEnteredViewport ? (
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            onInit={onInit}
            onSwiper={onSwiper}
            onSlideChange={onSlideChange}
            onSlideChangeTransitionEnd={onTransitionEnd}
            className={`w-full h-full productSlider-main ${sliderEnabled ? "" : "pointer-events-none"}`}
          >
            {/* ── SLIDE 1 — Video ── */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <video
                  ref={(el) => { videoRefs.current[0] = el; }}
                  src="/images/home/projectSlider/video1.mp4"
                  poster="/images/home/projectSlider/p1.jpg"
                  muted loop playsInline autoPlay preload="auto"
                  className="w-full h-full object-cover"
                />
                <div
                  ref={(el) => { captionRefs.current[0] = el!; }}
                  className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container"
                >
                  <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">
                          Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                          Projects
                        </h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* ── SLIDE 2 ── */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image src="/images/home/projectSlider/p2.jpg" alt="Slide 2" width={1920} height={945} className="w-full h-full object-cover" />
                <div
                  ref={(el) => { captionRefs.current[1] = el!; }}
                  className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container"
                >
                  <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">
                          Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                          Projects
                        </h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* ── SLIDE 3 — Video ── */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <video
                  ref={(el) => { videoRefs.current[2] = el; }}
                  src="/images/home/projectSlider/video1.mp4"
                  poster="/images/home/projectSlider/p3.jpg"
                  muted loop playsInline autoPlay preload="auto"
                  className="w-full h-full object-cover"
                />
                <div
                  ref={(el) => { captionRefs.current[2] = el!; }}
                  className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container"
                >
                  <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">
                          Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                          Projects
                        </h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* ── SLIDE 4 ── */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image src="/images/home/projectSlider/p4.jpg" alt="Slide 4" width={1920} height={945} className="w-full h-full object-cover" />
                <div
                  ref={(el) => { captionRefs.current[3] = el!; }}
                  className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container"
                >
                  <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">
                          Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                          Projects
                        </h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* ── SLIDE 5 ── */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image src="/images/home/projectSlider/p5.jpg" alt="Slide 5" width={1920} height={945} className="w-full h-full object-cover" />
                <div
                  ref={(el) => { captionRefs.current[4] = el!; }}
                  className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container"
                >
                  <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">
                          Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                          Projects
                        </h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          /* ── Placeholder image before Swiper mounts ── */
          <div className="w-full h-full relative">
            <Image
              src="/images/home/projectSlider/p1.jpg"
              alt=""
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30">
              <div className="container h-full flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                <div ref={sectionRef} className="max-w-full sm:max-w-md w-full sm:w-1/2">
                  <div className="title-section text-left flex flex-col justify-start w-full text-white">
                    <h2 className="font-mainFont text-h2 leading-none">
                      Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                      Projects
                    </h2>
                    <div className="headingSubTitle flex flex-col justify-center w-full my-4 sm:max-w-3xl mx-auto">
                      <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>
                    </div>
                  </div>
                </div>
                <div className="bottom-figcaption w-full max-w-[350px]">
                  <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                  <div className="mt-8"><FenestaButton href="#">Get inspired</FenestaButton></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Thumbnails + Progress bar — rendered once Swiper is mounted ── */}
        {hasEnteredViewport && (
          <div
            ref={thumbsContainerRef}
            className="absolute bottom-6 md:bottom-8 right-6 md:right-12 lg:right-16 xl:right-24 z-40 flex flex-col items-end gap-6 md:gap-8 thumbnails-container"
            style={{ pointerEvents: sliderEnabled ? "auto" : "none" }}
          >
            {/* Thumbnails */}
            <div ref={thumbsWrapperRef} className="flex gap-5 thumbnails-wrapper relative">
              {rotatedThumbs.map((src, idx) => {
                const realIndex = (active + idx + 1) % totalSlides;
                return (
                  <div
                    key={`thumb-${realIndex}-${idx}`}
                    onClick={() => onThumbnailClick(realIndex)}
                    className={`cursor-pointer w-32 h-32 md:w-[20vw] md:h-[10vw] max-w-[206px] max-h-[144px] rounded-xl overflow-hidden shadow-lg transition-all
                      ${idx === highlightIndex ? "ring-2 ring-blue-500 scale-100" : "scale-100 opacity-100"}`}
                    data-cursor
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>

            {/* Progress + Arrows + Counter */}
            <div className="outer-wrapper-bottom flex gap-6 items-center">
              <div className="relative flex items-center gap-4 z-40">
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    className="slider-prev w-10 h-10 bg-cream/25 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <Image src="/images/slider-arrow-prev-white.svg" alt="" width={12} height={25} className="w-[12px] h-[16px] object-cover invert-25" />
                  </button>
                  <button
                    onClick={goNext}
                    className="slider-next w-10 h-10 bg-cream rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <Image src="/images/slider-arrow-next-white.svg" alt="" width={12} height={25} className="w-[12px] h-[16px] object-cover invert-50" />
                  </button>
                </div>

                <div className="w-[30vw] h-[4px] bg-cream/25 rounded-full">
                  <div ref={progressRef} className="h-full w-0 bg-cream rounded-full" />
                </div>
              </div>

              {/* Counter */}
              <div className="relative bottom-0 right-0 z-40 text-lg font-semibold text-white">
                <span className="text-3xl font-bold">{String(active + 1).padStart(2, "0")}</span>
                {" / "}
                <span className="font-normal">{String(totalSlides).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        )}
      </div> 
      </div> 
    </div>    
  
  );
}
