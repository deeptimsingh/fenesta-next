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
    date: "21 January, 2026",
    title: "Pellentesque sed porta ligula.",
    img: "/images/home/fenestaedit/theFenestaEdit-img1.webp",
  },
  {
    id: 2,
    date: "16 March, 2026",
    title: "Sed tristique porttitor sem, id feugiat.",
    img: "/images/home/fenestaedit/theFenestaEdit-img2.webp",
  },
  {
    id: 3,
    date: "20 June, 2026",
    title: "Ut ultricies feugiat sapien non ornare.",
    img: "/images/home/fenestaedit/theFenestaEdit-img3.webp",
  },
  {
    id: 4,
    date: "16 July, 2026",
    title: "Etiam a bibendum elit. Sed eget ligula.",
    img: "/images/home/fenestaedit/theFenestaEdit-img4.webp",
  },
  {
    id: 5,
    date: "20 August, 2026",
    title: "Maecenas eu nisi massa.",
    img: "/images/home/fenestaedit/theFenestaEdit-img5.webp",
  },
];

export default function FenestaEdit() {
  const imageRefs = useRef<HTMLDivElement[]>([]);
  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation(); 
  
useEffect(() => {
  imageRefs.current.forEach((el) => {
    if (!el) return;

    const img = el.querySelector("img");
    if (!img) return;

    // 🔥 IMPORTANT: base state
    gsap.set(img, {
      scale: 1.15,
      yPercent: 0,
      transformOrigin: "center center",
      willChange: "transform",
    });

    // 🔥 Smooth parallax (editorial style)
    gsap.to(img, {
      yPercent: 15, // 👈 subtle downward movement
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.6, // 👈 smoother than 0.8
        invalidateOnRefresh: true,
      },
    });
  });

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);


  return (
    <section className="FenestaEdit common-padding w-full mx-auto overflow-hidden relative bg-darkbase ">
      <div className="container p-0 relative z-10">
        <div className="max-w-full mx-auto">
            {/* Heading */}
            <div ref={sectionRef}  className="headingOuter w-full">
              <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 title-section ">
                <div ref={headingRef} className="  flex flex-col  w-full">
                  <h2 className="font-mainFont text-h2  leading-none">The Fenesta <span className="font-subFont text-corinthiaHeading text-brown leading-0">Edit</span></h2>
                </div>

                <div className="headingSubTitle flex flex-col justify-center w-full">  
                  <p className="mt-3  max-w-3xl text-base">A curated collection of ideas and stories for homes that value design and style</p>
                </div>
              </div>     
            </div>  

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <div
                key={post.id}
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                  index === 0 ? "col-span-1 row-span-2 h-[295px] lg:h-[500px] 2xl:h-[650px]" : "h-[295px]  lg:h-[240px] 2xl:h-[310px]" 
                }` }
              data-cursor>
                {/* Parallax Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>

                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 bg-[#12121250] group-hover:bg-[#0288D1] text-white px-4 py-4 pr-14 backdrop-blur-sm">
                  <p className="text-sm opacity-80 leading-none ">{post.date}</p>
                  <p className=" mt-2 leading-tight text-p">{post.title}</p>

                  {/* HOVER BUTTON */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#12121250] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] scale-75 group-hover:scale-100">
                    <Image src="/images/arrow-right.svg" alt="" width="14" height="14" className="object-cover transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-45 relative top-[2px] -left-[2px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden -mx-6 ">
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
                  <div className="relative rounded-xl overflow-hidden cursor-pointer h-72">
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                      <p className="text-sm opacity-80">{post.date}</p>
                      <h4 className="font-pageh4 mt-1">{post.title}</h4>
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
