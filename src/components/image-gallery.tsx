"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "@/app/product-page/image-gallery.css";

gsap.registerPlugin(ScrollTrigger);

/** Image scale when off-center → scale at center (swiper progress 1 → 0). */
const IMAGE_GALLERY_SCALE_FROM = 1.25;
const IMAGE_GALLERY_SCALE_TO = 1;
/** Vertical parallax range (px); smaller = subtler, less jerk. */
const IMAGE_GALLERY_SCROLL_PARALLAX_Y = 28;
/** Scrub lag (seconds): higher = smoother catch-up with Lenis, slightly more latency. */
const IMAGE_GALLERY_SCROLL_SCRUB = 1.35;
const IMAGE_GALLERY_REVEAL_Y = 40;

export type ImageGallerySlide = {
  id: number;
  image: string;
  title: string;
};

const defaultGalleryData: ImageGallerySlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

type ImageGalleryProps = {
  /** When omitted, built-in demo slides are used. */
  slides?: ImageGallerySlide[];
};

/** More than three → Swiper; one → centered; two or three → static row (no slider). */
const SWIPER_THRESHOLD = 3;
const MOBILE_CENTER_MAX_WIDTH = 1023;

/** Side offset so first/last slides can sit in the viewport center (mobile). */
function applyMobileEdgeCentering(swiper: SwiperType) {
  if (typeof window === "undefined") return;
  if (window.innerWidth > MOBILE_CENTER_MAX_WIDTH) {
    swiper.params.slidesOffsetBefore = 0;
    swiper.params.slidesOffsetAfter = 0;
    return;
  }

  const slide = swiper.slides[swiper.activeIndex] as HTMLElement | undefined;
  if (!slide) return;

  const slideW = slide.offsetWidth;
  const containerW = swiper.width;
  if (!slideW || !containerW) return;

  const offset = Math.max(0, (containerW - slideW) / 2);
  swiper.params.slidesOffsetBefore = offset;
  swiper.params.slidesOffsetAfter = offset;
}

export default function ImageGallery({ slides }: ImageGalleryProps) {
  const data = slides ?? defaultGalleryData;
  const count = data.length;
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const layoutReadyRef = useRef(false);
  const slideScaleSettersRef = useRef(
    new Map<HTMLElement, ReturnType<typeof gsap.quickSetter>>()
  );
  const captionOpacitySettersRef = useRef(
    new Map<HTMLElement, ReturnType<typeof gsap.quickSetter>>()
  );
  const captionYSettersRef = useRef(
    new Map<HTMLElement, ReturnType<typeof gsap.quickSetter>>()
  );
  const [swiperLayoutReady, setSwiperLayoutReady] = useState(false);

  const showSwiper = count > SWIPER_THRESHOLD;
  const showSingleCentered = count === 1;
  const showStaticRow = count >= 2 && count <= SWIPER_THRESHOLD;

  const updateSlideMotion = useCallback((swiper: SwiperType) => {
    if (!layoutReadyRef.current || !swiper?.slides) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
      if (slide.classList.contains("swiper-slide-duplicate")) return;

      const progress = Math.min(
        1,
        Math.abs((slide as unknown as { progress?: number }).progress ?? 0)
      );
      const centered = reduceMotion ? 1 : 1 - progress;

      const scaleEl = slide.querySelector<HTMLElement>(".ig-parallax-img-scale");
      if (scaleEl) {
        const isMoving = swiper.animating || Boolean(swiper.touches?.diff);
        const scale =
          reduceMotion || !isMoving
            ? IMAGE_GALLERY_SCALE_TO
            : IMAGE_GALLERY_SCALE_TO +
              progress * (IMAGE_GALLERY_SCALE_FROM - IMAGE_GALLERY_SCALE_TO);

        let scaleSetter = slideScaleSettersRef.current.get(scaleEl);
        if (!scaleSetter) {
          gsap.set(scaleEl, {
            transformOrigin: "center center",
            force3D: true,
            scale: IMAGE_GALLERY_SCALE_TO,
          });
          scaleSetter = gsap.quickSetter(scaleEl, "scale");
          slideScaleSettersRef.current.set(scaleEl, scaleSetter);
        }
        scaleSetter(scale);
      }

      const track = slide.querySelector<HTMLElement>(".ig-parallax-track");
      if (track) {
        gsap.set(track, { clipPath: "inset(0% round 14px)" });
      }

      const caption = slide.querySelector<HTMLElement>(".ig-card-text");
      if (caption) {
        let opacitySetter = captionOpacitySettersRef.current.get(caption);
        let ySetter = captionYSettersRef.current.get(caption);
        if (!opacitySetter || !ySetter) {
          gsap.set(caption, {
            opacity: 0,
            y: IMAGE_GALLERY_REVEAL_Y,
            force3D: true,
          });
          opacitySetter = gsap.quickSetter(caption, "opacity");
          ySetter = gsap.quickSetter(caption, "y", "px");
          captionOpacitySettersRef.current.set(caption, opacitySetter);
          captionYSettersRef.current.set(caption, ySetter);
        }
        opacitySetter(centered);
        ySetter(IMAGE_GALLERY_REVEAL_Y * (1 - centered));
      }
    });
  }, []);

  const revealActiveSlide = useCallback((swiper: SwiperType) => {
    if (!layoutReadyRef.current) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      updateSlideMotion(swiper);
      return;
    }

    const activeSlide = swiper.slides[swiper.activeIndex] as
      | HTMLElement
      | undefined;
    if (!activeSlide?.classList.contains("swiper-slide")) return;

    const caption = activeSlide.querySelector<HTMLElement>(".ig-card-text");

    if (caption) {
      gsap.to(caption, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    updateSlideMotion(swiper);
  }, [updateSlideMotion]);

  const handleSwiperInit = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      layoutReadyRef.current = false;
      slideScaleSettersRef.current.clear();
      captionOpacitySettersRef.current.clear();
      captionYSettersRef.current.clear();
      setSwiperLayoutReady(false);

      const onMotion = () => updateSlideMotion(swiper);
      const onReveal = () => revealActiveSlide(swiper);

      swiper.on("progress", onMotion);
      swiper.on("touchMove", onMotion);
      swiper.on("sliderMove", onMotion);
      swiper.on("slideChange", onMotion);
      swiper.on("transitionEnd", () => {
        onMotion();
        onReveal();
      });

      const centerActiveSlide = () => {
        applyMobileEdgeCentering(swiper);
        swiper.update();
        swiper.slideTo(swiper.activeIndex, 0, false);
      };

      const onResize = () => centerActiveSlide();
      window.addEventListener("resize", onResize);

      requestAnimationFrame(() => {
        centerActiveSlide();
        requestAnimationFrame(() => {
          layoutReadyRef.current = true;
          centerActiveSlide();
          onMotion();
          onReveal();
          setSwiperLayoutReady(true);
          ScrollTrigger.refresh();
        });
      });

      swiper.on("destroy", () => {
        window.removeEventListener("resize", onResize);
      });
    },
    [updateSlideMotion, revealActiveSlide]
  );

  /** GSAP scroll parallax on carousel images after section enters viewport. */
  useLayoutEffect(() => {
    if (!showSwiper || !swiperLayoutReady) return;

    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const wraps = section.querySelectorAll<HTMLElement>(".ig-parallax-img-wrap");
      wraps.forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { y: -IMAGE_GALLERY_SCROLL_PARALLAX_Y },
          {
            y: IMAGE_GALLERY_SCROLL_PARALLAX_Y,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: IMAGE_GALLERY_SCROLL_SCRUB,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [showSwiper, swiperLayoutReady]);

  if (count === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="ImageGallery-slider mt-10 overflow-hidden w-full"
    >
      <div
        className="ImageGallery-slider-inner container-fluid mx-auto !px-0"
        data-lenis-prevent={showSwiper || undefined}
        data-lenis-prevent-touch={showSwiper || undefined}
      >
        {showSingleCentered && (
          <div className="flex justify-center px-4">
            <div className="ig-center-single w-full max-w-[min(92vw,760px)]">
              <GalleryCard item={data[0]} />
            </div>
          </div>
        )}

        {showStaticRow && (
          <div className="flex flex-col items-stretch justify-center gap-10 px-4 md:flex-row md:items-start md:justify-center md:gap-6 lg:gap-10">
            {data.map((item) => (
              <div
                key={item.id}
                className="ig-static-card mx-auto w-full shrink-0 max-w-[min(92vw,520px)] md:mx-0 md:max-w-[min(42vw,440px)]"
              >
                <GalleryCard item={item} />
              </div>
            ))}
          </div>
        )}

        {showSwiper && (
          <div className="image-gallery-swiper-outer w-full overflow-hidden">
            <Swiper 
              className={`image-gallery-swiper image-gallery-swiper--many${swiperLayoutReady ? " is-layout-ready" : ""}`}
              centeredSlides
              loop={false}
              slidesPerView="auto"
              spaceBetween={16}
              speed={1000}
              grabCursor
              initialSlide={0}
              observer
              observeParents
              watchSlidesProgress
              touchEventsTarget="wrapper"
              threshold={5}
              touchAngle={45}
              shortSwipes
              longSwipesRatio={0.35}
              followFinger
              passiveListeners={false}
              touchMoveStopPropagation
              onSwiper={handleSwiperInit}
              centerInsufficientSlides
              breakpoints={{
                0: {
                  spaceBetween: 16,
                  centeredSlides: true,
                  centerInsufficientSlides: true,
                },
                640: {
                  spaceBetween: 16,
                  centeredSlides: true,
                  centerInsufficientSlides: true,
                },
                1024: { spaceBetween: 16, centeredSlides: true },
              }}
            >
              {data.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="image-gallery-slide box-border shrink-0"
                >
                  <GalleryCard item={item} parallax />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {showSwiper && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-xl"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-xl"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  parallax = false,
}: {
  item: ImageGallerySlide;
  parallax?: boolean;
}) {
  return (
    
    <div className={`ig-card${parallax ? " h-full w-full" : ""}`} data-lenis-prevent>
      <div className="ig-card-media overflow-hidden rounded-[14px]">
        {parallax ? (
          <div className="ig-parallax-track relative w-full overflow-hidden">
            <div className="ig-parallax-img-wrap relative h-full w-full will-change-transform">
              <div className="ig-parallax-img-scale relative h-full w-full will-change-transform">
                <Image
                  src={item.image}
                  alt=""
                  width={1200}
                  height={800}
                  draggable={false}
                  className="ig-parallax-img-el pointer-events-none h-full w-full select-none object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={item.image}
            alt=""
            width={1200}
            height={800}
            draggable={false}
            className="pointer-events-none h-[280px] w-full select-none object-cover sm:h-[360px] md:h-[420px]"
          />
        )}
      </div>

      <p className="ig-card-text mt-5 text-center text-p">{item.title}</p>
    </div>
  );
}
