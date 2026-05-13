"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

export default function ProjectsSlider() {
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  const swiperRef = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slideAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEFAULT_SLIDE_DURATION = 4; // seconds for image slides
  const SLIDE_COUNT = 5; // number of SwiperSlides

  // Caption refs
  const captionRefs = useRef<HTMLDivElement[]>([]);

  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

useHeadingAnimation({
  headingRef,
  sectionRef,
  selector: "h2, h2 span",
  threshold: 0.2,
  enterDuration: 0.7,
  exitDuration: 0.7,
  stagger: 0.25
})

  // Observer for visibility + lazy init (only mount Swiper when section enters viewport)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setIsVisible(true);
          setHasEnteredViewport(true); // init slider only once when first in view
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Autoplay on/off based on visibility
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    if (isVisible) {
      animateCaption(s.realIndex ?? active);
      onTransitionEnd(s);
    } else {
      if (s.autoplay?.stop) s.autoplay.stop();
      if (slideAdvanceTimerRef.current) {
        clearTimeout(slideAdvanceTimerRef.current);
        slideAdvanceTimerRef.current = null;
      }
      const bar = progressRef.current;
      if (bar) bar.style.transition = "none";
    }
  }, [isVisible]);

  // Progress Bar - duration in seconds (for images default 4s, for video use video.duration)
  const resetProgress = (durationSeconds: number = DEFAULT_SLIDE_DURATION) => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    // Force reflow + double rAF so 0% is painted before starting the fill animation
    void bar.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${durationSeconds}s linear`;
        bar.style.width = "100%";
      });
    });
  };

  // Caption animation: show active slide caption, hide others (runs on slide change and when section becomes visible)
  const animateCaption = (index: number) => {
    const refs = captionRefs.current;
    for (let i = 0; i < SLIDE_COUNT; i++) {
      const el = refs[i];
      if (!el) continue;
      if (i === index) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
      }
    }
  };

  // Build thumbnails from DOM: each slide's img src or video poster (real slides only, no loop duplicates)
  const buildThumbs = (swiper: any) => {
    if (!swiper?.slides?.length) return;
    const slideEls = Array.from(swiper.slides) as HTMLElement[];
    const realSlides = slideEls.filter(
      (el) => !el.classList.contains("swiper-slide-duplicate")
    );
    const t = realSlides.slice(0, SLIDE_COUNT).map((el) => {
      const video = el.querySelector("video");
      if (video) return (video.getAttribute("poster") || "") as string;
      const img = el.querySelector("img");
      return (img?.getAttribute("src") || img?.getAttribute("data-src") || "") as string;
    }).filter(Boolean);
    setThumbs(t);
  };

  /* ------------------------------------------------------------
      ARROW FADE — LOOP ENABLED
  ------------------------------------------------------------ */
  const updateArrows = (swiper: any) => {
    const prev = document.querySelector(".slider-prev") as HTMLElement | null;
    const next = document.querySelector(".slider-next") as HTMLElement | null;

    if (!prev || !next) return;

    const total = thumbs.length || SLIDE_COUNT;
    const index = (swiper?.realIndex ?? active) + 1;

    if (index <= 1) prev.classList.add("disabled");
    else prev.classList.remove("disabled");

    if (index >= total) next.classList.add("disabled");
    else next.classList.remove("disabled");
  };

  // Play video only in the slide that has .swiper-slide-active (visible slide); pause all others
  const syncVideoPlayback = (swiper: any) => {
    if (!swiper?.el) return;
    const wrapper = swiper.el as HTMLElement;
    const activeSlide = wrapper.querySelector(".swiper-slide-active");
    const allVideos = wrapper.querySelectorAll("video");

    allVideos.forEach((video) => {
      const v = video as HTMLVideoElement;
      const isInActiveSlide = activeSlide?.contains(video);
      if (isInActiveSlide && isVisible) {
        const playWhenReady = () => {
          v.play().catch(() => {});
          v.removeEventListener("canplay", playWhenReady);
        };
        if (v.readyState >= 2) {
          v.play().catch(() => {});
        } else {
          v.addEventListener("canplay", playWhenReady, { once: true });
        }
      } else {
        v.pause();
      }
    });
  };

  const runSyncAfterTransition = (swiper: any) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => syncVideoPlayback(swiper));
    });
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      syncVideoPlayback(swiper);
      updateArrows(swiper);
    }
  }, [active, isVisible, thumbs.length]);

  /* ------------------------------------------------------------
      INIT
  ------------------------------------------------------------ */
  const onInit = (swiper: any) => {
    swiperRef.current = swiper;
    buildThumbs(swiper);
    setActive(swiper.realIndex ?? 0);

    updateArrows(swiper);

    const runAfterReady = () => {
      if (isVisible) {
        animateCaption(swiper.realIndex ?? 0);
        onTransitionEnd(swiper);
      } else {
        if (swiper.autoplay?.stop) swiper.autoplay.stop();
      }
      syncVideoPlayback(swiper);
      setTimeout(() => {
        syncVideoPlayback(swiper);
        if (isVisible) onTransitionEnd(swiper);
      }, 1000);
    };
    setTimeout(runAfterReady, 150);
  };

  const onSwiper = (s: any) => {
    swiperRef.current = s;
  };

  /* ------------------------------------------------------------
      SLIDE CHANGE
  ------------------------------------------------------------ */
  const onSlideChange = (swiper: any) => {
    if (slideAdvanceTimerRef.current) {
      clearTimeout(slideAdvanceTimerRef.current);
      slideAdvanceTimerRef.current = null;
    }
    const idx = swiper.realIndex ?? 0;
    setActive(idx);
    updateArrows(swiper);
    animateCaption(idx); // always sync caption so it shows correctly on scroll back
    runSyncAfterTransition(swiper);
  };

  /** Trigger zoom-out animation on active slide's image/video (runs on every slide change) */
  const triggerSlideZoomAnimation = (swiper: any) => {
    const wrapper = swiper?.el as HTMLElement | undefined;
    if (!wrapper) return;
    const activeSlide = wrapper.querySelector(".swiper-slide-active");
    if (!activeSlide) return;
    const media = activeSlide.querySelector("img, video") as HTMLElement | null;
    if (!media) return;
    media.classList.remove("slide-zoom-out");
    void media.offsetHeight; // force reflow so animation restarts
    media.classList.add("slide-zoom-out");
    const removeAfter = () => {
      media.classList.remove("slide-zoom-out");
      media.removeEventListener("animationend", removeAfter);
    };
    media.addEventListener("animationend", removeAfter, { once: true });
  };

  const onTransitionEnd = (swiper: any) => {
    if (slideAdvanceTimerRef.current) {
      clearTimeout(slideAdvanceTimerRef.current);
      slideAdvanceTimerRef.current = null;
    }

    syncVideoPlayback(swiper);
    triggerSlideZoomAnimation(swiper);

    const wrapper = swiper?.el as HTMLElement | undefined;
    const activeSlide = wrapper?.querySelector(".swiper-slide-active");
    const video = activeSlide?.querySelector("video") as HTMLVideoElement | null;

    if (video) {
      swiper.autoplay?.stop?.();

      const setDurationAndStart = () => {
        if (slideAdvanceTimerRef.current) {
          clearTimeout(slideAdvanceTimerRef.current);
          slideAdvanceTimerRef.current = null;
        }
        const duration = video.duration;
        if (!isFinite(duration) || duration <= 0) {
          resetProgress(DEFAULT_SLIDE_DURATION);
          slideAdvanceTimerRef.current = setTimeout(() => swiper.slideNext(), DEFAULT_SLIDE_DURATION * 1000);
          return;
        }
        resetProgress(duration);
        video.play().catch(() => {});
        slideAdvanceTimerRef.current = setTimeout(() => swiper.slideNext(), duration * 1000);
      };

      if (video.readyState >= 1 && video.duration) {
        setDurationAndStart();
      } else {
        video.addEventListener("loadedmetadata", setDurationAndStart, { once: true });
        video.addEventListener("durationchange", setDurationAndStart, { once: true });
      }
    } else {
      if (swiper.autoplay?.params) swiper.autoplay.params.delay = DEFAULT_SLIDE_DURATION * 1000;
      swiper.autoplay?.start?.();
      resetProgress(DEFAULT_SLIDE_DURATION);
    }
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  const onThumbnailClick = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  // Thumbnails: show all slides except current (next 4 in rotation)
  const totalSlides = thumbs.length || SLIDE_COUNT;
  const rotatedThumbs =
    thumbs.length > 0
      ? Array.from({ length: totalSlides - 1 }, (_, i) => thumbs[(active + i + 1) % totalSlides])
      : [];
  const highlightIndex = 0;


  return (
    <div ref={containerRef} className="product-wrap relative w-full h-[160vw]  md:h-screen overflow-hidden bg-white text-black ">
      {/* MAIN SWIPER - only mount when section enters viewport (starts at slide 1) */}
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
        className="w-full h-full productSlider-main"
      >
        {/* SLIDE 1 - Video */}
        <SwiperSlide>
          <div className="relative w-full h-full ">
            <video
              ref={(el) => { videoRefs.current[0] = el; }}
              src="/images/home/projectSlider/video1.mp4"
              poster="/images/home/projectSlider/p1.jpg"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[0] = el!;
              }}
              className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container">
               <div className="container h-full  flex flex-col justify-start lg:justify-between items-start px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>             
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full ">
            <Image
                src="/images/home/projectSlider/p2.jpg"
              alt="Slide 2"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            
            <div
              ref={(el) => {
                captionRefs.current[1] = el!;
              }}
              className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container">
                <div className="container h-full  flex flex-col justify-start lg:justify-between items-start  px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>                
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 - Video */}
        <SwiperSlide>
          <div className="relative w-full h-full ">
            <video
              ref={(el) => { videoRefs.current[2] = el; }}
              src="/images/home/projectSlider/video1.mp4"
              poster="/images/home/projectSlider/p3.jpg"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              className="w-full h-full object-cover"
            />
           <div
              ref={(el) => {
                captionRefs.current[2] = el!;
              }}
              className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container">
              <div className="container h-full  flex flex-col justify-start lg:justify-between items-start  px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>             
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4 */}
        <SwiperSlide >
          <div className="relative w-full h-full ">
            <Image
               src="/images/home/projectSlider/p4.jpg"
              alt="Slide 4"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[3] = el!;
              }}
              className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container">
                <div className="container h-full  flex flex-col justify-start lg:justify-between items-start  px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>          
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 5 */}
        <SwiperSlide>
          <div className="relative w-full h-full ">
            <Image
               src="/images/home/projectSlider/p5.jpg"
              alt="Slide 4"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
           <div
              ref={(el) => {
                captionRefs.current[4] = el!;
              }}
              className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30 transition-all duration-700 opacity-0 translate-y-10 caption-container">
                <div className="container h-full  flex flex-col justify-start lg:justify-between items-start  px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>              
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      ) : (
        /* Placeholder before viewport - first slide only, no autoplay */
        <div className="w-full h-full relative">
          <Image
            src="/images/home/projectSlider/p1.jpg"
            alt=""
            width={1920}
            height={945}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pl-0 md:pl-12 lg:pl-0 xl:pl-0 pt-6 md:pt-12 lg:pt-16 xl:pt-24 pb-38 z-30">
          <div className="container h-full  flex flex-col justify-start lg:justify-between items-start  px-0 sm:px-auto">
                    <div ref={sectionRef} className="max-w-full sm:max-w-md w-full sm:w-1/2">
                      <div  className="title-section text-left flex flex-col justify-start w-full text-white">
                        <h2 className="font-mainFont text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-cream leading-0">bespoke </span>
                        Projects</h2>
                        <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-3xl mx-auto">              
                          <p className="max-w-full mx-auto">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>   
                        </div>  
                      </div>
                    </div>                   
                    
                    <div className="bottom-figcaption w-full max-w-[350px]">
                      <p className="text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>
                      </div>
                    </div>  
                </div>    
          </div>
        </div>
      )}

      {/* THUMBNAILS + PROGRESS (bottom right, stacked) - only when slider is initialized */}
      {hasEnteredViewport && (
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-12 lg:right-16 xl:right-24 z-40 flex flex-col items-end gap-6 md:gap-8 thumbnails-container">
        {/* THUMBNAILS */}
        <div className="flex gap-5 thumbnails-wrapper relative ">
          {rotatedThumbs.map((src, idx) => {
            const realIndex = (active + idx + 1) % totalSlides;
            return (
              <div
                key={`thumb-${realIndex}-${idx}`}
                onClick={() => onThumbnailClick(realIndex)}
                className={`cursor-pointer w-32 h-32  md:w-[20vw] md:h-[10vw] max-w-[206px] max-h-[144px] rounded-xl overflow-hidden shadow-lg transition-all
                ${idx === highlightIndex ? "ring-2 ring-blue-500 scale-100" : "scale-100 opacity-100"}`}
                data-cursor
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        {/* PROGRESS + ARROWS */}
        <div className="outer-wrapper-bottom flex gap-6 items-center">
          <div className="relative flex items-center gap-4 z-40">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="slider-prev w-10 h-10 bg-cream/25 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Image
                  src="/images/slider-arrow-prev-white.svg"
                  alt=""
                  width={12}
                  height={25}
                  className="w-[12px] h-[16px] object-cover invert-25"
                />
              </button>

              <button
                onClick={goNext}
                className="slider-next w-10 h-10 bg-cream rounded-full flex items-center justify-center cursor-pointer"
              >
                <Image
                  src="/images/slider-arrow-next-white.svg"
                  alt=""
                  width={12}
                  height={25}
                  className="w-[12px] h-[16px] object-cover invert-50"
                />
              </button>
            </div>

            <div className="w-[30vw] h-[4px] bg-cream/25 rounded-full">
              <div
                ref={progressRef}
                className="h-full w-0 bg-cream rounded-full"
              ></div>
            </div>
          </div>

          {/* COUNTER */}
          <div className="relative bottom-0 right-0 z-40 text-lg font-semibold text-white">
            <span className="text-3xl font-bold">
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            /{" "}
            <span className="font-normal">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

