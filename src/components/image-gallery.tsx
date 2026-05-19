"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useImageParallax } from "@/hooks/useImageParallax";

import "swiper/css";
import "@/app/product-page/image-gallery.css";

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
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
 
];

type ImageGalleryProps = {
  slides?: ImageGallerySlide[];
};

function GallerySlideCard({
  item,
  compact = false,
  carousel = false,
}: {
  item: ImageGallerySlide;
  compact?: boolean;
  carousel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useImageParallax(containerRef, imageWrapRef, {
    enabled: !carousel,
    fromScale: 1.25,
    toScale: 1.25,
    fromY: -50,
    toY: 50,
    smooth: 0.08,
  });

  const imageHeightClass = compact
    ? "h-[220px] sm:h-[280px] lg:h-[360px]"
    : "h-[280px] sm:h-[400px] md:h-[495px]";

  const mediaClass = carousel
    ? "ig-card-media ig-card-media--carousel overflow-hidden rounded-2xl"
    : "ig-card-media overflow-hidden rounded-xl";

  return (
    <div className={carousel ? "ig-card ig-card--carousel" : "ig-card"} data-lenis-prevent>
      <div ref={containerRef} className={mediaClass}>
        <div
          ref={imageWrapRef}
          className={`ig-card-media__parallax relative w-full overflow-hidden ${carousel ? "" : "will-change-transform"}`}
          style={{ transformOrigin: "center" }}
        >
          <Image
            src={item.image}
            alt=""
            width={1200}
            height={800}
            draggable={false}
            className={`pointer-events-none w-full select-none object-cover ${imageHeightClass}`}
          />
        </div>
      </div>

      <p
        className={
          carousel
            ? "ig-card-text ig-card-text--carousel mt-4 text-center text-base  text-theme md:text-lg"
            : "ig-card-text  mt-5 text-center text-xl! text-theme"
        }
      >
        {carousel ? `\u201C${item.title}\u201D` : item.title}
      </p>
    </div>
  );
}

export default function ImageGallery({ slides }: ImageGalleryProps) {
  const items = useMemo(
    () => (slides?.length ? slides : defaultGalleryData),
    [slides]
  );
  const count = items.length;

  /** 1 = centered static · 2–3 = column grid · >3 = side-peek carousel */
  const isSingle = count === 1;
  const isGrid = count > 1 && count <= 3;
  const isCarousel = count > 3;
  const showCarouselControls = count > 4;

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (isCarousel) return;

    const lenis = (
      window as Window & {
        lenis?: {
          on?: (event: string, fn: () => void) => void;
          off?: (event: string, fn: () => void) => void;
        };
      }
    ).lenis;
    if (!lenis?.on) return;

    let scrollRaf = 0;
    const kick = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        window.dispatchEvent(new Event("scroll"));
      });
    };

    lenis.on("scroll", kick);
    return () => {
      lenis.off?.("scroll", kick);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [isCarousel]);

  if (count === 0) {
    return null;
  }

  const viewportCenterWrap =
    "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip";

  if (isSingle) {
    return (
      <section className="ImageGallery-slider mt-10 w-full overflow-x-clip">
        <div className={`${viewportCenterWrap} px-4`}>
          <div className="mx-auto w-full max-w-[min(92vw,850px)]">
            <GallerySlideCard item={items[0]} />
          </div>
        </div>
      </section>
    );
  }

  if (isGrid) {
    const gridCols =
      count === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 md:max-w-4xl md:mx-auto";

    return (
      <section className="ImageGallery-slider mt-10 w-full overflow-x-clip">
        <div className="container-fluid px-4 md:px-6">
          <div
            className={`image-gallery-grid grid grid-cols-1 gap-6 sm:gap-8 ${gridCols}`}
          >
            {items.map((item) => (
              <GallerySlideCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const swiperClassName = "image-gallery-swiper image-gallery-swiper--many";
  const slideClassName = "image-gallery-slide !h-auto shrink-0";

  return (
    <section className="ImageGallery-slider mt-10 w-full overflow-x-clip overflow-y-visible">
      <div className="w-full" data-lenis-prevent data-lenis-prevent-touch>
        <div className={viewportCenterWrap}>
          <Swiper
            className={swiperClassName}
            centeredSlides
            loop={false}
            slidesPerView="auto"
            spaceBetween={24}
            speed={700}
            grabCursor
            allowTouchMove
            simulateTouch
            watchOverflow
            observer
            observeParents
            watchSlidesProgress
            touchEventsTarget="wrapper"
            threshold={5}
            touchAngle={45}
            passiveListeners={false}
            touchMoveStopPropagation
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              requestAnimationFrame(() => {
                swiper.update();
                requestAnimationFrame(() => swiper.update());
              });
            }}
            onResize={(swiper) => swiper.update()}
            breakpoints={{
              0: { spaceBetween: 16 },
              640: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className={slideClassName}>
                <GallerySlideCard item={item} carousel />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {showCarouselControls && (
          <>
            <div className="image-gallery-controls mt-8 flex items-center justify-center gap-4 md:mt-10">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
                className="image-gallery-controls__btn flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-xl shadow-sm transition hover:bg-gray-50"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
                className="image-gallery-controls__btn flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-xl shadow-sm transition hover:bg-gray-50"
              >
                →
              </button>
            </div>           
          </>
        )}
      </div>
    </section>
  );
}
