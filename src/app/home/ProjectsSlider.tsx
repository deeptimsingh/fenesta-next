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

  const swiperRef = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Observer for visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.6 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Autoplay on/off based on visibility
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    if (isVisible) {
      if (s.autoplay?.start) s.autoplay.start();
      resetProgress();
      animateCaption(s.realIndex ?? active);
    } else {
      if (s.autoplay?.stop) s.autoplay.stop();
      const bar = progressRef.current;
      if (bar) bar.style.transition = "none";
    }
  }, [isVisible]);

  // Progress Bar
  const resetProgress = () => {
    if (!isVisible) return;

    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";

    requestAnimationFrame(() => {
      bar.style.transition = "width 4s linear";
      bar.style.width = "100%";
    });
  };

  // Caption animation
  const animateCaption = (index: number) => {
    if (!isVisible) return;

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
  };

  // Build Thumbnails
  const buildThumbs = (swiper: any) => {
    const slideEls = Array.from(swiper.slides as any) as HTMLElement[];
    const realEls = slideEls.filter(
      (el) => !el.classList.contains("swiper-slide-duplicate")
    );
    const t = realEls.map((el) => {
      const img = el.querySelector("img");
      return img?.getAttribute("src") || "";
    });
    setThumbs(t);
  };

  /* ------------------------------------------------------------
      ARROW FADE — LOOP ENABLED
  ------------------------------------------------------------ */
  const updateArrows = (swiper: any) => {
    const prev = document.querySelector(".slider-prev") as HTMLElement | null;
    const next = document.querySelector(".slider-next") as HTMLElement | null;

    if (!prev || !next) return;

    const total = thumbs.length;
    const index = swiper.realIndex + 1;

    // First slide → fade prev
    if (index === 1) prev.classList.add("disabled");
    else prev.classList.remove("disabled");

    // Last slide → fade next
    if (index === total) next.classList.add("disabled");
    else next.classList.remove("disabled");
  };

  /* ------------------------------------------------------------
      INIT
  ------------------------------------------------------------ */
  const onInit = (swiper: any) => {
    swiperRef.current = swiper;
    buildThumbs(swiper);
    setActive(swiper.realIndex ?? 0);

    updateArrows(swiper); // 🔥 ADD HERE

    setTimeout(() => {
      if (isVisible) {
        resetProgress();
        animateCaption(swiper.realIndex ?? 0);
        if (swiper.autoplay?.start) swiper.autoplay.start();
      } else {
        if (swiper.autoplay?.stop) swiper.autoplay.stop();
      }
    }, 50);
  };

  const onSwiper = (s: any) => {
    swiperRef.current = s;
  };

  /* ------------------------------------------------------------
      SLIDE CHANGE
  ------------------------------------------------------------ */
  const onSlideChange = (swiper: any) => {
    setActive(swiper.realIndex ?? 0);

    updateArrows(swiper); // 🔥 ADD HERE

    if (isVisible) {
      animateCaption(swiper.realIndex ?? 0);
      resetProgress();
    }
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  const onThumbnailClick = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  // Rotating thumbnails
  const buildRotated = () => {
    if (thumbs.length === 0) return [];
    const total = thumbs.length;
    const arr: string[] = [];
    for (let i = 1; i < total; i++) {
      arr.push(thumbs[(active + i) % total]);
    }
    return arr;
  };

  const rotatedThumbs = buildRotated();
  const highlightIndex = 0;


  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white text-black"
    >
      {/* MAIN SWIPER */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onInit={onInit}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        className="w-full h-full productSlider-main"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/demo/1.webp"
              alt="Slide 1"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[0] = el!;
              }}
              className="absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 opacity-0 translate-y-10"
            >
              <div ref={sectionRef} className="w-full">
                <div className="container" >
                  <div ref={headingRef} className="title-section text-start text-ThemeTextColor flex flex-col justify-start w-full productSlider-figcaption sm:max-w-[350px]">
                    <h2 className="font-mainFont text-pageh2 leading-none">
                      Our <span className="font-subFont text-corinthiaHeading text-white">bespoke</span> Project
                    </h2>
                    <p className="mt-3 text-base leading-tight text-white">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>

                    <div className="bottom-figcaption mt-20"> 
                      <p className="mt-3 text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                      <div className="mt-8">
                          <FenestaButton>Get inspired</FenestaButton>    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/demo/2.webp"
              alt="Slide 2"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[1] = el!;
              }}
              className="absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 opacity-0 translate-y-10"
            >
              <div className="container">
               <div className="title-section text-start text-ThemeTextColor flex flex-col justify-start w-full productSlider-figcaption sm:max-w-[350px]">
                  <h2 className="font-mainFont text-pageh2 leading-none">
                     Our <span className="font-subFont text-corinthiaHeading text-white">bespoke</span> Project
                  </h2>
                  <p className="mt-3 text-base leading-tight text-white">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>

                  <div className="bottom-figcaption mt-20"> 
                    <p className="mt-3 text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                    <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/demo/3.webp"
              alt="Slide 3"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[2] = el!;
              }}
              className="absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 opacity-0 translate-y-10"
            >
              <div className="container">
                <div className="title-section text-start text-ThemeTextColor flex flex-col justify-start w-full productSlider-figcaption sm:max-w-[350px]">
                  <h2 className="font-mainFont text-pageh2 leading-none">
                     Our <span className="font-subFont text-corinthiaHeading text-white">bespoke</span> Project
                  </h2>
                  <p className="mt-3 text-base leading-tight text-white">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>

                  <div className="bottom-figcaption mt-20"> 
                    <p className="mt-3 text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                    <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/demo/4.webp"
              alt="Slide 4"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[3] = el!;
              }}
              className="absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 opacity-0 translate-y-10"
            >
              <div className="container">
                <div className="title-section text-start text-ThemeTextColor flex flex-col justify-start w-full productSlider-figcaption sm:max-w-[350px]">
                 <h2 className="font-mainFont text-pageh2 leading-none">
                     Our <span className="font-subFont text-corinthiaHeading text-white">bespoke</span> Project
                  </h2>
                  <p className="mt-3 text-base leading-tight text-white">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>

                  <div className="bottom-figcaption mt-20"> 
                    <p className="mt-3 text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                    <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 5 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/images/demo/5.webp"
              alt="Slide 5"
              width={1920}
              height={945}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                captionRefs.current[4] = el!;
              }}
              className="absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 opacity-0 translate-y-10"
            >
              <div className="container">
                <div className="title-section text-start text-ThemeTextColor flex flex-col justify-start w-full productSlider-figcaption sm:max-w-[350px]">
                  <h2 className="font-mainFont text-pageh2 leading-none">
                     Our <span className="font-subFont text-corinthiaHeading text-white">bespoke</span> Project
                  </h2>
                  <p className="mt-3 text-base leading-tight text-white">From luxury residences to iconic builds, explore how our customers are bringing their vision to life</p>

                  <div className="bottom-figcaption mt-20"> 
                    <p className="mt-3 text-base leading-tight text-white underline underline-offset-8">Lotus Esplendito, Hyderabad</p>
                    <div className="mt-8">
                        <FenestaButton>Get inspired</FenestaButton>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* THUMBNAILS */}
      <div className="absolute bottom-52 -right-5 z-40">
        <div className="flex gap-4">
          {rotatedThumbs.map((src, idx) => {
            const realIndex = (active + idx + 1) % (thumbs.length || 1);
            return (
              <div
                key={idx}
                onClick={() => onThumbnailClick(realIndex)}
                className={`cursor-pointer w-44 h-32 rounded-xl overflow-hidden shadow-lg transition-all
                ${idx === highlightIndex ? "ring-2 ring-blue-500 scale-110" : "scale-90 opacity-60"}`} data-cursor>
                <img src={src} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>

      {/* PROGRESS + ARROWS */}
      <div className="container relative">
        <div className="outer-wrapper-bottom absolute bottom-16 right-0 flex gap-6 items-center">
          <div className="relative flex items-center gap-4 z-40">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="slider-prev w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Image
                  src="/images/slider-arrow-prev-white.svg"
                  alt=""
                  width={12}
                  height={25}
                  className="w-[12px] h-[16px] object-cover"
                />
              </button>

              <button
                onClick={goNext}
                className="slider-next w-10 h-10 bg-[#0094DA] rounded-full flex items-center justify-center cursor-pointer"
              >
                <Image
                  src="/images/slider-arrow-next-white.svg"
                  alt=""
                  width={12}
                  height={25}
                  className="w-[12px] h-[16px] object-cover"
                />
              </button>
            </div>

            <div className="w-[600px] h-[4px] bg-white/20 rounded-full">
              <div
                ref={progressRef}
                className="h-full w-0 bg-blue-500 rounded-full"
              ></div>
            </div>
          </div>

          {/* COUNTER */}
          <div className="relative bottom-0 right-0 z-40 text-lg font-semibold">
            <span className="text-3xl font-bold">
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            /{" "}
            <span className="font-normal">
              {String(thumbs.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

