"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Low maintenance",
      icon: "/images/productPage/icon1.svg",
    },
    {
      title: "Excellent acoustic insulation",
      icon: "/images/productPage/icon5.svg",
    },
    {
      title: "Energy efficient",
      icon: "/images/productPage/icon2.svg",
    },
    {
      title: "Enhanced strength and security",
      icon: "/images/productPage/icon6.svg",
    },
    {
      title: "Weather resistant",
      icon: "/images/productPage/icon3.svg",
    },
    {
      title: "Rainwater insulation",
      icon: "/images/productPage/icon7.svg",
    },
    {
      title: "Termite resistant",
      icon: "/images/productPage/icon4.svg",
    },
  ];

  const topRow = [features[0], features[2], features[4], features[6]];
  const bottomRow = [features[1], features[3], features[5]];
  const topRowAnimIndex = [0, 2, 4, 6];
  const bottomRowAnimIndex = [1, 3, 5];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    type LenisInstance = {
      scroll: number;
      scrollTo: (value: number, opts?: { immediate?: boolean }) => void;
      on: (event: string, fn: () => void) => void;
      off: (event: string, fn: () => void) => void;
    };

    const VIEWPORT_VISIBLE = 0.4;
    const TRAVEL_DISTANCE = 120;
    const SCRUB_SMOOTH = 0.8;

    const getTravelOffset = (animateIndex: number, isDesktop: boolean) => {
      if (isDesktop) {
        if (animateIndex === 0 || animateIndex === 2) {
          return { x: -TRAVEL_DISTANCE, y: 0 };
        }
        if (animateIndex === 4 || animateIndex === 6) {
          return { x: TRAVEL_DISTANCE, y: 0 };
        }
        if (animateIndex === 1 || animateIndex === 3 || animateIndex === 5) {
          return { x: 0, y: TRAVEL_DISTANCE };
        }
      }

      // Mobile — consistent upward travel
      return { x: 0, y: TRAVEL_DISTANCE };
    };

    let ctx: gsap.Context | null = null;
    let onLenisScroll: (() => void) | undefined;
    let onStRefresh: (() => void) | undefined;
    let lenisPoll: ReturnType<typeof setInterval> | undefined;

    const getSelector = () =>
      window.matchMedia("(min-width: 1024px)").matches
        ? ".infographic-desktop .infographic-card"
        : ".infographic-mobile .infographic-card";

    const getCards = (selector: string) =>
      gsap.utils
        .toArray<HTMLElement>(selector, root)
        .sort(
          (a, b) =>
            Number(a.dataset.animateIndex) - Number(b.dataset.animateIndex)
        );

    const setupAnimation = () => {
      const lenis = (window as Window & { lenis?: LenisInstance }).lenis;
      if (!lenis) return false;

      ctx?.revert();

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      onLenisScroll = () => ScrollTrigger.update();
      onStRefresh = () => lenis.scrollTo(lenis.scroll, { immediate: true });
      lenis.on("scroll", onLenisScroll);
      ScrollTrigger.addEventListener("refresh", onStRefresh);

      ctx = gsap.context(() => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const selector = getSelector();
        const cards = getCards(selector);
        if (!cards.length) return;

        cards.forEach((card) => {
          const animateIndex = Number(card.dataset.animateIndex);
          const { x, y } = getTravelOffset(animateIndex, isDesktop);
          gsap.set(card, { opacity: 0, x, y, force3D: true });
        });

        gsap.to(cards, {
          opacity: 1,
          x: 0,
          y: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: root,
            start: `${VIEWPORT_VISIBLE * 100}% bottom`,
            end: "top 35%",
            scrub: SCRUB_SMOOTH,
            invalidateOnRefresh: true,
          },
        });
      }, root);

      ScrollTrigger.refresh();
      return true;
    };

    if (!setupAnimation()) {
      lenisPoll = setInterval(() => {
        if (setupAnimation()) clearInterval(lenisPoll);
      }, 50);
    }

    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = () => {
      setupAnimation();
    };
    mq.addEventListener("change", onBreakpointChange);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      if (lenisPoll) clearInterval(lenisPoll);
      mq.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("resize", onResize);

      const lenis = (window as Window & { lenis?: LenisInstance }).lenis;
      if (lenis && onLenisScroll) lenis.off("scroll", onLenisScroll);
      if (onStRefresh) ScrollTrigger.removeEventListener("refresh", onStRefresh);

      ctx?.revert();
    };
  }, []);

  type FeatureCardProps = {
    title: string;
    icon: string;
    arrow?: boolean;
    isBottom?: boolean;
    animateIndex: number;
  };

  const FeatureCard = ({
    title,
    icon,
    arrow = false,
    isBottom = false,
    animateIndex,
  }: FeatureCardProps) => (
    <div className="infographic-card-slot relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] xl:w-[220px] xl:h-[220px] shrink-0">
      <div
        className="infographic-card absolute inset-0"
        data-animate-index={animateIndex}
      >
        {arrow && (
          <div
            className={`infographic-arrow absolute z-10 w-0 h-0 ${
              isBottom
                ? "top-[0%] right-[24%] border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[14px] border-t-[#A89D80] -rotate-[144deg]"
                : "top-[93%] right-[24%] border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[14px] border-b-[#A89D80] rotate-[144deg]"
            }`}
          />
        )}

        <div className="absolute inset-0 rounded-full bg-[#e7ddbf]" />

        <div className="infographic-card__inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[130px] h-[130px] md:w-[145px] md:h-[145px] xl:w-[175px] xl:h-[175px] shadow-[15px_15px_14px_rgba(0,0,0,0.30)]">
          <Image
            src="/images/icon-circle.png"
            alt=""
            width={175}
            height={175}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-[12px] rounded-full flex flex-col items-center justify-center text-center px-4">
          <div className="relative w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] mb-3">
            <Image src={icon} alt={title} fill className="object-contain" />
          </div>

          <p className="text-[12px] xl:text-sm text-[#5a4b3f] leading-tight max-w-[130px]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="infographic-wrapper  "
    >
      <div className="container mx-auto px-4">
        <div className="infographic-mobile grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden justify-items-center">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              icon={item.icon}
              animateIndex={index}
            />
          ))}
        </div>

        <div className="infographic-desktop hidden lg:flex flex-col items-center">
          <div className="flex justify-center gap-8 xl:gap-10">
            {topRow.map((item, index) => (
              <FeatureCard
                key={index}
                title={item.title}
                icon={item.icon}
                arrow={index < topRow.length - 1}
                isBottom={false}
                animateIndex={topRowAnimIndex[index]}
              />
            ))}
          </div>

          <div className="flex justify-center gap-8 xl:gap-10">
            {bottomRow.map((item, index) => (
              <FeatureCard
                key={index}
                title={item.title}
                icon={item.icon}
                arrow
                isBottom={true}
                animateIndex={bottomRowAnimIndex[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
