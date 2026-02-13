 "use client";
import Image from "next/image";
import {useRef, useLayoutEffect} from "react";
import {gsap} from "gsap";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";


export default function Seeitlikeyourethere() {
  const studioRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();


  // Animate arrow bounce on mount
  useLayoutEffect(() => {
    gsap.to(arrowRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8,
    });
  }, []);

  // Scroll to studio section
  const scrollToStudio = () => {
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="flex flex-col md:flex-row  px-6 md:px-0  relative bg-[#E3E4E6] text-center overflow-hidden w-full common-padding max-h-screen  min-h-[600px] md:h-screen md:max-h-[768px] ">    
            {/* Background */}
          <div className="absolute inset-0">
              <img src="/images/home/Seeitlikeyourethere-bg-mobile.webp" alt="See it Like you're there" className="w-full h-full object-cover md:hidden" />
              <img src="/images/home/Seeitlikeyourethere-bg.webp" alt="See it Like you're there" className="w-full h-full object-cover hidden md:block" />
          </div>
          
          <div className="container px-6 md:px-0 relative h-full">
              <div className="max-w-full mx-auto flex items-start md:items-center  h-full">
                    {/* LEFT SIDE TEXT */}          
                    {/* Heading */}
                    <div ref={sectionRef}  className="headingOuter w-full md:w-80 flex flex-col  z-20 relative text-center md:text-left">
                      <div className="headingTitle mb-6 xl:mb-6  md:px-0 ">
                        <div ref={headingRef} className="title-section  flex flex-col  w-full">
                          <h2 className="font-mainFont text-h2 leading-none">See it <span className="font-subFont text-corinthiaHeading text-brown leading-0">Like</span> <br className="hidden md:flex" /> you’re there</h2>
                        </div>

                        <div className="headingSubTitle flex flex-col justify-center w-full ">  
                          <p className="mt-3  max-w-3xl mb-6 leading-normal">Browse our Virtual Studio to experience our products to help you choose with confidence.</p>
                          <div className="md:mx-0 mx-auto absolute -bottom-[100%] left-0 right-0 sm:relative">
                          <FenestaButton className="max-w-min">ENTER STUDIO</FenestaButton>
                          </div>
                        </div>
                      </div>     
                    </div> 

                    {/* Arrow Button */}
                    <div
                        ref={arrowRef}
                        onClick={scrollToStudio}
                        className="absolute -bottom-16 right-1/3 cursor-pointer flex items-center justify-center transition-all"
                    data-cursor>
                        <Image
                        src="/images/studio-arrow.svg"
                        alt="Scroll Down"
                        width={69}
                        height={29}
                        className=" w-[70px] h-[30px]"
                        />
                    </div>
              </div>
          </div>  
      </section>
    </>   
)
}