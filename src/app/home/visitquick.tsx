"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function ParallaxSection() {
  const leftSection = useRef<HTMLDivElement | null>(null);
  const rightSection = useRef<HTMLDivElement | null>(null);
  const leftBg = useRef<HTMLDivElement | null>(null);
  const rightBg = useRef<HTMLDivElement | null>(null);
  const leftCaption = useRef<HTMLDivElement | null>(null);
  const rightCaption = useRef<HTMLDivElement | null>(null);


  // 🔥 Heading animation with GSAP - separate instances for each section
  const { headingRef: leftHeadingRef, sectionRef: leftSectionRef } = useHeadingAnimation();
  const { headingRef: rightHeadingRef, sectionRef: rightSectionRef } = useHeadingAnimation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      {
        section: leftSection.current,
        bg: leftBg.current,
        caption: leftCaption.current,
      },
      {
        section: rightSection.current,
        bg: rightBg.current,
        caption: rightCaption.current,
      },
    ];

    /* ===============================
       BACKGROUND PARALLAX
    =============================== */
    sections.forEach(({ section, bg }) => {
      if (!section || !bg) return;

      gsap.fromTo(
        bg,
        {
          yPercent: -8,
          scale: 1.1,
        },
        {
          yPercent: 8,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    /* ===============================
       CAPTION FADE-UP
    =============================== */
    sections.forEach(({ section, caption }) => {
      if (!section || !caption) return;

      gsap.fromTo(
        caption,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="visitquick flex flex-col md:flex-row w-full h-auto xl:h-screen bg-[white] overflow-hidden">
      {/* LEFT SECTION */}
      <div
        ref={leftSection}
        className="relative flex-1 flex items-center justify-center overflow-hidden min-h-141.25 md:min-h-auto"
      >
        <div
          ref={leftBg}
          className="absolute inset-0 bg-[url('/images/home/signatureStudio.webp')] bg-center bg-cover will-change-transform scale-110"
        ></div>      

        <div  
          ref={leftCaption}
          className="title-section relative z-10 text-center text-white px-4 xl:px-6 py-4  xl:py-6 bg-[#00000080] backdrop-blur-sm rounded-xl mx-6 md:mx-0 w-[100%] xl:w-[60%] flex items-center flex-wrap content-center h-[350px] max-w-[552px]">      
             {/* Heading */}
             <div ref={leftSectionRef}  className="headingOuter w-full">
              <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 ">
                <div ref={leftHeadingRef} className="title-section  flex flex-col  w-full">
                  <h2 className="font-mainFont text-pageh2 leading-none text-cream flex justify-center flex-wrap mx-auto">Visit Our <span className="font-subFont text-corinthiaHeading text-cream flex w-full justify-center leading-0">Signature Studio</span></h2>
                </div>

                <div className="headingSubTitle flex flex-col justify-center w-full sm:max-w-md mx-auto">  
                  <p className="mt-3  max-w-3xl ">Explore finishes, test movement, and feel the  quiet difference for yourself</p>
                </div>
              </div>     
            </div>
         
            <div className=" flex-col justify-center items-center flex mt-5 mx-auto">
              <FenestaButton>Book A Visit</FenestaButton>          
            </div>   
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div
        ref={rightSection}
        className="relative flex-1 flex items-center justify-center overflow-hidden min-h-141.25 md:min-h-auto gradient-background"
      >
        <div
          ref={rightBg}
          className="absolute inset-0 bg-[url('/images/home/GetaQuickEstimate-bg.webp')] bg-center bg-cover will-change-transform scale-110"
        ></div>

        <div ref={rightCaption} className="title-section relative z-10 text-center text-white px-6 xl:px-8 py-6  xl:py-8 trustedpartners-gradient-background backdrop-blur-sm rounded-xl mx-6 md:mx-0 w-[100%] xl:w-[60%]  flex items-center flex-wrap content-center h-[350px] max-w-[552px]">          
            {/* Heading */}
            <div ref={rightSectionRef}  className="headingOuter w-full">
              <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 ">
                <div ref={rightHeadingRef} className="title-section  flex flex-col  w-full">
                  <h2 className="font-mainFont text-pageh2 leading-none text-brown flex justify-center flex-wrap mx-auto">Get a Quick <span className="font-subFont text-corinthiaHeading text-brown flex w-full justify-center ">Estimate</span></h2>
                </div>

                <div className="headingSubTitle flex flex-col justify-center w-full sm:max-w-md mx-auto">  
                  <p className="mt-3  max-w-3xl text-black">Answer a few quick questions  and get a ballpark estimate</p>
                </div>
              </div>     
            </div>  


          <div className=" flex-col justify-center items-center flex mt-5 mx-auto">
            {/* <FenestaButton label="Start my estimate" href="#" theme="orange" />         */}
             <FenestaButton>BookStart my estimate A Visit</FenestaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
