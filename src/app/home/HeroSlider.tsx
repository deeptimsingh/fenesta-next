"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import FenestaButton from "@/components/base/FenestaButton";
import styles from "./HeroSlider.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Slide config — controls timing for each slide
// For image slides  → provide `duration` in ms (e.g. 5000)
// For video slides  → leave `duration` undefined — timing is driven by video
// ─────────────────────────────────────────────────────────────────────────────
const SLIDE_CONFIG = [
  { type: "image", duration: 5000 },  // Slide 1
  { type: "video", duration: undefined }, // Slide 2 — waits for video to end
  { type: "image", duration: 5000 },  // Slide 3
] as const;

const TOTAL_SLIDES = SLIDE_CONFIG.length;

interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  on: (event: string, callback: (swiper: { realIndex: number }) => void) => void;
  slideNext: (speed?: number, runCallbacks?: boolean) => void;
  slideToLoop: (index: number, speed?: number, runCallbacks?: boolean) => void;
  autoplay: { stop: () => void; start: () => void };
}

// ── Mute / Unmute Icon ───────────────────────────────────────────────────────
function MuteIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100 for progress bar

  // Video refs (one per video slide — add more if needed)
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  // Timer refs for image slides
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const progressStartRef = useRef<number>(0);
  const progressDurationRef = useRef<number>(5000);

  // ── Stop everything ────────────────────────────────────────────────────────
  const stopProgress = useCallback(() => {
    if (imageTimerRef.current) clearTimeout(imageTimerRef.current);
    if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
    imageTimerRef.current = null;
    progressRafRef.current = null;
  }, []);

  // ── Animate progress bar with requestAnimationFrame ────────────────────────
  const animateProgress = useCallback(
    (duration: number, onComplete: () => void) => {
      stopProgress();
      setProgress(0);
      progressDurationRef.current = duration;
      progressStartRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - progressStartRef.current;
        const pct = Math.min((elapsed / duration) * 100, 100);
        setProgress(pct);
        if (pct < 100) {
          progressRafRef.current = requestAnimationFrame(tick);
        } else {
          onComplete();
        }
      };
      progressRafRef.current = requestAnimationFrame(tick);
    },
    [stopProgress]
  );

  // ── Go to next slide ───────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    swiperRef.current?.slideNext(1600, true);
  }, []);

  const handleProgressBarClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!swiperRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const pct = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
      const clamped = Math.min(Math.max(pct, 0), 1);

      // Convert click position to a slide index (0..TOTAL_SLIDES-1)
      const index = Math.min(
        Math.floor(clamped * TOTAL_SLIDES),
        TOTAL_SLIDES - 1
      );

      swiperRef.current.slideToLoop(index);
    },
    []
  );

  // ── Sync videos & start the right timer when slide changes ────────────────
  const handleSlideChange = useCallback(
    (realIndex: number) => {
      stopProgress();
      setActiveIndex(realIndex);
      setProgress(0);

      const config = SLIDE_CONFIG[realIndex];

      if (config.type === "video") {
        // ── Video slide: stop swiper autoplay, let video drive timing ─────
        swiperRef.current?.autoplay.stop();

        const vid = video2Ref.current; // extend if you add more video refs
        if (vid) {
          vid.currentTime = 0;
          vid.muted = muted;
          // Play — must happen after user gesture or muted
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay blocked — fall back to 10s timer
              animateProgress(10000, goNext);
            });
          }

          // Animate progress based on video duration (wait for metadata)
          const startVideoProgress = () => {
            // `vid.duration` can be `NaN`/0 until metadata is available.
            // Fall back to 10s so the bar always starts filling.
            const durationSeconds =
              Number.isFinite(vid.duration) && vid.duration > 0
                ? vid.duration
                : 10;
            const dur = durationSeconds * 1000;
            animateProgress(dur, () => {});
          };

          // Start immediately (using fallback duration if needed).
          startVideoProgress();

          // If metadata arrives later, restart with the accurate duration.
          if (
            !(Number.isFinite(vid.duration) && vid.duration > 0)
          ) {
            vid.addEventListener("loadedmetadata", startVideoProgress, { once: true });
          }
        }
      } else {
        // ── Image slide: run swiper autoplay + progress timer ─────────────
        swiperRef.current?.autoplay.start();
        const dur = config.duration ?? 5000;
        animateProgress(dur, () => {}); // swiper autoplay triggers the change
      }
    },
    [animateProgress, goNext, muted, stopProgress]
  );

  // ── Pause all videos except the active one ─────────────────────────────────
  const pauseAllVideos = useCallback(
    (exceptIndex?: number) => {
      // Add more video refs here if you have more video slides
      if (exceptIndex !== 1 && video2Ref.current) {
        video2Ref.current.pause();
        video2Ref.current.currentTime = 0;
      }
    },
    []
  );

  // ── Init Swiper ────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { default: Swiper } = await import("swiper");
      const { Navigation, Pagination, Parallax, Autoplay, Mousewheel, Keyboard } =
        await import("swiper/modules");

      swiperRef.current = new Swiper(".swiper-container-h", {
        modules: [Navigation, Pagination, Parallax, Autoplay, Mousewheel, Keyboard],
        direction: "horizontal",
        effect: "slide",
        autoplay: {
          delay: SLIDE_CONFIG[0].duration ?? 5000,
          disableOnInteraction: false,
        },
        parallax: true,
        speed: 1600,
        loop: true,
        mousewheel: { sensitivity: 1 },
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: {
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        },
        // We control the pagination progress ourselves
        pagination: false,
      }) as unknown as SwiperInstance;

      swiperRef.current.on("slideChange", (swiper) => {
        const real = swiper.realIndex;
        pauseAllVideos(real);
        handleSlideChange(real);
      });

      // Bootstrap first slide
      handleSlideChange(0);
    };

    init();

    return () => {
      stopProgress();
      swiperRef.current?.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Video "ended" → go next ────────────────────────────────────────────────
  useEffect(() => {
    const vid = video2Ref.current;
    if (!vid) return;

    const onEnded = () => {
      stopProgress();
      setProgress(100);
      goNext();
    };

    vid.addEventListener("ended", onEnded);
    return () => vid.removeEventListener("ended", onEnded);
  }, [goNext, stopProgress]);

  // ── Toggle mute ────────────────────────────────────────────────────────────
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (video2Ref.current) video2Ref.current.muted = next;
  };

  // ── Scroll zoom/parallax for hero media ─────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const medias = sectionRef.current?.querySelectorAll<HTMLElement>(
        "img, video"
      );
      if (!medias || medias.length === 0) return;

      // Ensure consistent baseline before ScrollTrigger starts.
      gsap.set(medias, { transformOrigin: "center center", scale: 1, y: 0 });

      gsap.to(medias, {
        scale: 1.12,
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.creativeFullpageSlider}>
      <div className="banner-horizental">
        <div className={`swiper swiper-container-h ${styles.swiperContainerH}`} style={{ height: "100vh" }}>
          <div className={`${styles.swiperWrapper} swiper-wrapper`}>
            {/* ───────────── Slide 1 — Image ───────────── */}
            <div className={`${styles.swiperSlide} swiper-slide`}>
              <div className={styles.sliderInner} data-swiper-parallax="100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.heroMedia}
                  src="../images/home/herobanner/banner-img.webp"
                  alt="full_screen-image"
                />
                <div className={`${styles.swiperContent} container`} data-swiper-parallax="2000">
                  <div className={styles.titleArea}>
                    <Link href="#" className={styles.title}>
                      <h1 className="caption-title text-h1 mb-4 mask-reveal leading-none">
                        Let Life in{" "}
                        <span className="font-subFont text-corinthiaHeading text-white">
                          Beautifully
                        </span>
                      </h1>
                    </Link>
                  </div>
                  <FenestaButton>Take A Look</FenestaButton>
                </div>
              </div>
            </div>

            {/* ───────────── Slide 2 — Video ───────────── */}
            <div className={`${styles.swiperSlide} swiper-slide`}>
              <div className={styles.sliderInner} data-swiper-parallax="100">
                <video
                  ref={video2Ref}
                  className={`${styles.slideVideo} ${styles.heroMedia}`}
                  src="../images/home/herobanner/banner-video1.mp4"
                  muted={muted}
                  playsInline
                  preload="auto"
                  // no loop — we drive slide change on "ended"
                />
                {/* Mute toggle */}
                <button
                  className={styles.muteBtn}
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                >
                  <MuteIcon muted={muted} />
                </button>
                <div className={`${styles.swiperContent} container`} data-swiper-parallax="2000">
                  <div className={styles.titleArea}>
                    <Link href="#" className={styles.title}>
                      <h1 className="caption-title text-h1 mb-4 mask-reveal leading-none">
                        Let Life in{" "}
                        <span className="font-subFont text-corinthiaHeading text-white">
                          Beautifully
                        </span>
                      </h1>
                    </Link>
                  </div>
                  <FenestaButton>See More</FenestaButton>
                </div>
              </div>
            </div>

            {/* ───────────── Slide 3 — Image ───────────── */}
            <div className={`${styles.swiperSlide} swiper-slide`}>
              <div className={styles.sliderInner} data-swiper-parallax="100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.heroMedia}
                  src="../images/home/herobanner/banner-img.webp"
                  alt="full_screen-image"
                />
                <div className={`${styles.swiperContent} container`} data-swiper-parallax="2000">
                  <div className={styles.titleArea}>
                    <Link href="#" className={styles.title}>
                      <h1 className="caption-title text-h1 mb-4 mask-reveal leading-none">
                        Let Life in{" "}
                        <span className="font-subFont text-corinthiaHeading text-white">
                          Beautifully
                        </span>
                      </h1>
                    </Link>
                  </div>
                  <FenestaButton>Read More</FenestaButton>
                </div>
              </div>
            </div>
          </div>{/* end .swiper-wrapper */}

         

          {/* ── Custom Progress Pagination ── */}
          <div className={styles.sliderPaginationArea}>   
            {/* ── Navigation Buttons ── */}
            <div  className={styles.navbtn} >
              <button
                className={`${styles.swiperButtonNext} swiper-button-next`}
                tabIndex={0}
                role="button"
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button
                className={`${styles.swiperButtonPrev} swiper-button-prev`}
                tabIndex={0}
                role="button"
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>        

            {/* Progress bar — width driven by `progress` state (0–100) */}
            <div
              className={styles.progressWrapper}
              onClick={handleProgressBarClick}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
            </div>

            <div className={styles.counter}>
              <h5 className={`${styles.slideRange} ${styles.one}`}>
                {String(activeIndex + 1).padStart(2, "0")}
              </h5>
              <span>/</span>
              <h5 className={`${styles.slideRange} ${styles.three}`}>
                {String(TOTAL_SLIDES).padStart(2, "0")}
              </h5>
            </div>
        </div>
        </div>{/* end .swiper */}
      </div>
    </section>
  );
}
