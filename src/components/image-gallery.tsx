"use client";

/**
 * ImageGallery 
 */

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "@/app/product-page/image-gallery.css";


gsap.registerPlugin(ScrollTrigger);

const PARALLAX_Y    = 28;
const SCROLL_SCRUB  = 1.35;
const SWIPER_THRESHOLD = 3;

export type ImageGallerySlide = {
  id: number;
  image: string;
  title: string;
};

const defaultSlides: ImageGallerySlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

type Props = { slides?: ImageGallerySlide[] };

export default function ImageGallery({ slides }: Props) {
  const data  = slides ?? defaultSlides;
  const count = data.length;

  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef  = useRef<SwiperType | null>(null);
  const [layoutReady, setLayoutReady] = useState(false);

  const showSingle = count === 1;
  const showStatic = count >= 2 && count <= SWIPER_THRESHOLD;
  const showSwiper = count > SWIPER_THRESHOLD;

  /* ── Swiper init ──────────────────────────────────────────────── */
  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;

    /*
      Two rAF passes so Swiper measures real CSS slide widths before
      running centeredSlides offset maths.
      No manual slidesOffsetBefore/After — centeredSlides owns this.
    */
    requestAnimationFrame(() => {
      swiper.update();
      requestAnimationFrame(() => {
        swiper.update();
        setLayoutReady(true);
      });
    });

    const onResize = () => {
      swiper.update();
      swiper.slideTo(swiper.activeIndex, 0, false);
    };
    window.addEventListener("resize", onResize);
    swiper.on("destroy", () => window.removeEventListener("resize", onResize));
  }, []);

  /* ── GSAP scroll-parallax ─────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!showSwiper || !layoutReady) return;
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".ig-parallax-img-wrap").forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { y: -PARALLAX_Y },
          {
            y: PARALLAX_Y,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: SCROLL_SCRUB,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, [showSwiper, layoutReady]);

  if (count === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="ImageGallery-slider mt-10 w-full overflow-hidden"
    >
      <div className="ImageGallery-slider-inner mx-auto w-full">

        {/* 1 slide */}
        {showSingle && (
          <div className="flex justify-center px-4">
            <div className="ig-center-single w-full max-w-[min(92vw,760px)]">
              <GalleryCard item={data[0]!} />
            </div>
          </div>
        )}

        {/* 2–3 slides: static row */}
        {showStatic && (
          <div className="flex flex-col items-stretch justify-center gap-10 px-4 md:flex-row md:items-start md:gap-6 lg:gap-10">
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

        {/* 4+ slides: center-mode carousel */}
        {showSwiper && (
          <>
            {/*
              image-gallery-swiper-outer: overflow:hidden clips the horizontal bleed.
              Do NOT add horizontal padding here — it would shift the centering axis.
            */}
            <div className="image-gallery-swiper-outer">
              <Swiper
                className={`image-gallery-swiper${layoutReady ? " is-layout-ready" : ""}`}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                speed={800}
                 grabCursor={true}
                initialSlide={0}
                  watchSlidesProgress={true}
                 observer={true}
                observeParents={true}
                touchEventsTarget="wrapper"
                threshold={5}
                touchAngle={45}
                shortSwipes
                longSwipesRatio={0.35}
                followFinger
                passiveListeners
                touchMoveStopPropagation={false}
                onSwiper={handleSwiperInit}
                breakpoints={{
                  0:    { spaceBetween: 12 },
                  640:  { spaceBetween: 16 },
                  1024: { spaceBetween: 24 },
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

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous slide"
                className="ig-nav-btn"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="ig-nav-btn"
                onClick={() => swiperRef.current?.slideNext()}
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

function GalleryCard({
  item,
  parallax = false,
}: {
  item: ImageGallerySlide;
  parallax?: boolean;
}) {
  return (
    <div className="ig-card">
      <div className="ig-card-media">
        {parallax ? (
          <div className="ig-parallax-track">
            <div className="ig-parallax-img-wrap">
              <div className="ig-parallax-img-scale">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 74vw, (max-width: 1023px) 68vw, 56vw"
                  draggable={false}
                  className="ig-parallax-img-el"
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
            className="pointer-events-none h-[280px] w-full select-none rounded-[14px] object-cover sm:h-[360px] md:h-[420px]"
          />
        )}
      </div>
      <p className="ig-card-text text-p">{item.title}</p>
    </div>
  );
}
