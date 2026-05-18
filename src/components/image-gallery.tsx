"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "@/app/product-page/image-gallery.css";

/** Horizontal parallax strength (px at slide progress ±1). */
const IMAGE_GALLERY_PARALLAX_SHIFT_PX = 110;

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

export default function ImageGallery({ slides }: ImageGalleryProps) {
  const data = slides ?? defaultGalleryData;
  const count = data.length;
  const swiperRef = useRef<SwiperType | null>(null);

  const showSwiper = count > SWIPER_THRESHOLD;
  const showSingleCentered = count === 1;
  const showStaticRow = count >= 2 && count <= SWIPER_THRESHOLD;

  if (count === 0) {
    return null;
  }

  const handleParallaxProgress = useCallback((swiper: SwiperType) => {
    if (!swiper?.slides) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shiftPx = reduceMotion ? 0 : IMAGE_GALLERY_PARALLAX_SHIFT_PX;
    Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
      const el = slide.querySelector<HTMLElement>(".ig-parallax-track");
      if (!el) return;
      const progress =
        (slide as unknown as { progress?: number }).progress ?? 0;
      el.style.transform = `translateX(${-progress * shiftPx}px)`;
    });
  }, []);

  const handleParallaxSetTransition = useCallback(
    (swiper: SwiperType, duration: number) => {
      if (!swiper?.slides || duration === 0) return;
      Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
        const el = slide.querySelector<HTMLElement>(".ig-parallax-track");
        if (el) el.style.transition = "none";
      });
    },
    []
  );

  const handleParallaxTransitionEnd = useCallback(
    (swiper: SwiperType) => {
      if (!swiper?.slides) return;
      Array.from(swiper.slides as HTMLElement[]).forEach((slide) => {
        const el = slide.querySelector<HTMLElement>(".ig-parallax-track");
        if (el) {
          el.style.transform = "translateX(0px)";
          el.style.transition = "";
        }
      });
      handleParallaxProgress(swiper);
    },
    [handleParallaxProgress]
  );

  return (
    <section className="overflow-x-clip overflow-y-visible ImageGallery-slider mt-10">
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
                className="ig-static-card mx-auto w-full shrink-0 max-w-[min(92vw,520px)]  md:mx-0 md:max-w-[min(42vw,440px)]"
              >
                <div className="ig-static-card-media overflow-hidden rounded-[14px]">
                  <Image
                    src={item.image}
                    alt=""
                    width={1200}
                    height={800}
                    draggable={false}
                    className="pointer-events-none h-[280px] w-full select-none object-cover sm:h-[360px] md:h-[420px]"
                  />
                </div>
                <GalleryCard item={item} />
              </div>
            ))}
          </div>
        )}

        {showSwiper && (
          <div className="overflow-x-clip">
            <Swiper
              className="image-gallery-swiper"
              centeredSlides
              loop={false}
              slidesPerView="auto"
              spaceBetween={32}
              speed={700}
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
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleParallaxProgress(swiper);
              }}
              breakpoints={{
                0: { spaceBetween: 16 },
                640: { spaceBetween: 24 },
                1024: { spaceBetween: 32 },
              }}
              onProgress={handleParallaxProgress}
              onSetTransition={handleParallaxSetTransition}
              onTransitionEnd={handleParallaxTransitionEnd}
            >
              {data.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="image-gallery-slide !h-auto max-w-[min(92vw,760px)] !w-[85%] sm:!w-[70%] md:!w-[55%]"
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
    <div className="ig-card">
      <div className="ig-card-media overflow-hidden rounded-[14px]">
        {parallax ? (
          <div className="ig-parallax-track relative h-[280px] w-full sm:h-[360px] md:h-[420px]">
            <Image
              src={item.image}
              alt=""
              width={1200}
              height={800}
              draggable={false}
              className="ig-parallax-img-el pointer-events-none h-full select-none object-cover"
            />
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

