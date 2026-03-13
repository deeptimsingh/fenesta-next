"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import BannerMain from "@/components/templates/aboutPage/our-presence/bannerMain";
import FilterSection from "@/components/templates/aboutPage/our-presence/filtersection";
import FenestaEdit from "@/components/templates/aboutPage/our-presence/FenestaEdit";

import "@/components/templates/common.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function About() {
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const missionRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);

  const missionLineRef = useRef<SVGSVGElement | null>(null);
  const visionLineRef = useRef<SVGSVGElement | null>(null);

  const missionDotRef = useRef<HTMLDivElement | null>(null);
  const visionDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** ==========================================
     * PARALLAX IMAGE ANIMATION
     ========================================== */
    imageRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (!img) return;

      gsap.set(img, { scale: 1.125 });

      gsap.fromTo(
        img,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="about-page w-full">
      {/*Banner Main*/}
      <BannerMain />

      {/* INTRO SECTION */}
      <section className="intro-section relative  content-over-banner">
        <div className="container">          
            <div className="content-inside bg-white rounded-tl-2xl rounded-tr-2xl shadow-[0px_-156px_35.3px_0px_#00000017]">         
              <div className="headingTitle px-0 md:px-0 text-center">
                  <div className="title-section  flex flex-col  w-full">
                    <h2 className="font-mainFont text-h2 leading-none text-theme flex justify-center flex-wrap mx-auto">All <span className="font-subFont text-corinthiaHeading text-brown leading-none">Office</span></h2>
                  </div>
              </div>   
            </div> 
               
            <FilterSection />                        
        </div>
      </section>   
    

      {/* COUNTRY SECTION */}
      <section className="country-section relative">
        <div className="container text-center">   
          <FenestaEdit />   
        </div>
      </section>
    </section>
  );
}
