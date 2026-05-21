 "use client";
import Image from "next/image";
import {useRef, useLayoutEffect} from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function Seeitlikeyourethere() {
  const studioRef = useRef<HTMLDivElement>(null);
  
  const bgImageRef = useRef<HTMLDivElement>(null);
  const sectionRefForScroll = useRef<HTMLElement>(null);

  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

  // Image zoom-out on scroll into viewport
  useLayoutEffect(() => {
    const section = sectionRefForScroll.current;
    const bgImage = bgImageRef.current;
    if (!section || !bgImage) return;

    gsap.set(bgImage, { scale: 1.25 });
    const tween = gsap.fromTo(
      bgImage,
      { scale: 1.5 },
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.2,
        },
      }
    );

    return () => tween.scrollTrigger?.kill();
  }, []);

  // Animate arrow bounce on mount
  

 

  return (
    <>
      <section
        ref={sectionRefForScroll}
        className="flex flex-col md:flex-row  px-6 md:px-0  relative text-center overflow-hidden w-full  max-h-screen  min-h-[600px] md:h-screen md:max-h-[768px] "
      >
         
          
          <div className="container relative h-full common-padding" >
               {/* Background - zoom out on scroll into viewport */}
              <div className="absolute inset-0 overflow-hidden left-4 right-4">
                <div ref={bgImageRef} className="absolute inset-0 w-full h-full origin-center">
                  <img src="/images/home/Seeitlikeyourethere-bg-mobile.webp" alt="See it Like you're there" className="w-full h-full object-cover md:hidden" />
                  <img src="/images/home/Seeitlikeyourethere-bg.webp" alt="See it Like you're there" className="w-full h-full object-cover hidden md:block" />
                </div>
              </div>

              <div className="max-w-full mx-auto flex items-start md:items-center  h-full">
                    {/* LEFT SIDE TEXT */}          
                    {/* Heading */}
                    <div ref={sectionRef}  className="headingOuter w-full md:w-120 flex flex-col left-15   z-20 relative text-center md:text-left">
                      <div className="headingTitle mb-6 xl:mb-6  md:px-0 ">
                        <div ref={headingRef} className="title-section  flex flex-col  w-full">
                          <h2 className="font-mainFont text-h2 leading-none">Join the Fenesta <br className="hidden md:flex" /> Ace<span className="font-subFont text-corinthiaHeading text-brown leading-0">Club</span> </h2>
                        </div>

                        <div className="headingSubTitle flex flex-col justify-center w-full ">  
                          <p className="mt-3  max-w-3xl mb-6 leading-normal">An exclusive community of architects and designers—gain early access to new systems, priority support, and peer‑to‑peer insights.</p>
                          <div className="md:mx-0 mx-auto absolute -bottom-[100%] left-0 right-0 sm:relative">
                          <FenestaButton className="max-w-min">ENTER STUDIO</FenestaButton>
                          </div>
                        </div>
                      </div>     
                    </div> 

                    {/* Arrow Button */}
                    
              </div>
          </div>  
      </section>
    </>   
)
}