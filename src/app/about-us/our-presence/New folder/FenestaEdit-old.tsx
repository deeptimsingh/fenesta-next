"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/autoplay";


import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

const posts = [
  {
    id: 1,
    title: "1 extrusion plant in Kota, Rajasthan",
    img: "/images/home/fenestaedit/theFenestaEdit-img1.webp",
  },
  {
    id: 2,
    title: "20+ sales offices in every metro and Tier 1 and Tier 2 cities help serve institutional and retail clients",
    img: "/images/home/fenestaedit/theFenestaEdit-img2.webp",
  },
  {
    id: 3,
    title: "400+ authorised Channel Partner showrooms across India provide easy access to Fenesta products",
    img: "/images/home/fenestaedit/theFenestaEdit-img3.webp",
  },
  {
    id: 4,
    title: "8 state-of-the-art factories with ISO 9000, 14000 and 18000 certifications, located near strategic markets, all furnished with the world's most advanced and highly-efficient machines",
    img: "/images/home/fenestaedit/theFenestaEdit-img4.webp",
  },
  {
    id: 5,
    title: "900-city sales presence",
    img: "/images/home/fenestaedit/theFenestaEdit-img5.webp",
  },
  {
    id: 6,
    title: "2000+ Direct Sales Representatives",
    img: "/images/home/fenestaedit/theFenestaEdit-img1.webp",
  },
  {
    id: 7,
    title: "9 first-of-their-kind Signature Studios in Noida, Gurgaon, Mumbai, Pune, Kolkata, Chennai, Hyderabad, Bengaluru and Ahmedabad that are designed to revolutionise the way consumers buy doors and windows",
    img: "/images/home/fenestaedit/theFenestaEdit-img2.webp",
  },
];

export default function FenestaEdit() {
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { headingRef, sectionRef } = useHeadingAnimation();

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const setupParallax = () => {
      // Only run when desktop grid is visible (refs have size)
      const cards = imageRefs.current.filter(Boolean);
      cards.forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;

        gsap.set(img, {
          scale: 1.15,
          yPercent: 0,
          transformOrigin: "center center",
          willChange: "transform",
          force3D: true,
        });

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
          invalidateOnRefresh: true,
          animation: gsap.to(img, {
            yPercent: 15,
            ease: "none",
            force3D: true,
          }),
        });
        triggers.push(st);
      });
    };

    // Defer so refs and layout (including Next.js Image) are ready
    const t = setTimeout(() => {
      setupParallax();
      scrollTriggersRef.current = triggers;
      ScrollTrigger.refresh();
    }, 100);

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onRefresh);
      triggers.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
    };
  }, []);


  return (
    <section className="FenestaEdit common-padding w-full mx-auto overflow-hidden relative bg-darkbase ">
      <div className="container p-0 relative z-10">
        <div className="max-w-full mx-auto">
            {/* Heading */}
            <div className="content-inside w-full max-w-[960px] mt-5 mx-auto px-4 sm:px-0">   
              <div ref={sectionRef}  className="headingOuter w-full">
                <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 title-section "> 
                  <div className="headingSubTitle flex flex-col justify-center w-full">  
                    <p className="text-22">Brand Fenesta has a wide-ranging network of manufacturing and distribution locations, and showrooms that guarantees complete control over the entire supply chain of window and door manufacturing and installation. Safety, quality and sustainability are core to how we work. We use the hub-and-spoke model to serve customers in every region of India. Our network comprises:</p>                    
                  </div>
                </div>     
              </div> 
            </div> 

          {/* Desktop: 3-col grid – card 4 spans 2 rows, card 7 spans 2 columns */}
          <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-6 mt-20 fenesta-edit-grid min-h-[950px] lg:min-h-[950px]">
            {posts.map((post, index) => {
              const isTwoRows = index === 3;   // 4th card: span 2 rows
              const isTwoCols = index === 6;   // 7th card: span 2 columns
              const gridClass = isTwoRows
                ? "col-span-1 row-span-2"
                : isTwoCols
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1";
              return (
                <div
                  key={post.id}
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  className={`relative overflow-hidden group cursor-pointer rounded-2xl ${gridClass}`}
                  data-cursor
                >
                  {/* Image fills card */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Solid dark bar at bottom with white text (like reference image) */}
                  {/* Overlay Text */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#12121250] group-hover:bg-[#0288D1] text-white px-4 py-4 pr-14 backdrop-blur-sm">                  
                    <p className=" mt-2 leading-tight text-p text-left">{post.title}</p>

                    {/* HOVER BUTTON */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#12121250] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] scale-75 group-hover:scale-100">
                      <Image src="/images/arrow-right.svg" alt="" width="14" height="14" className="object-cover transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-45 relative top-[2px] -left-[2px]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: same card style – image + solid bar at bottom */}
          <div className="md:hidden -mx-6 mt-10">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              centeredSlides={true}
              slidesPerView={1.2}
              loop={true}
              autoplay={{ delay: 2500 }}
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className="relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute left-0 right-0 bottom-0 bg-black/70 text-white px-4 py-3">
                      <p className="font-medium text-sm leading-snug">{post.title}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
