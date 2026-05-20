import { useEffect, useRef } from "react";
import Image from 'next/image';
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Globalstandards() {

 const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const image = imageWrapperRef.current;

    if (!image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) * 0.02;
      const y = (window.innerHeight / 2 - e.clientY) * 0.02;

      gsap.to(image, {
        x,
        y,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


    const { headingRef, sectionRef } = useHeadingAnimation();

  return (
      <section className='common-padding blue-bg-wrapper overflow-hidden'>
         <div className="container p-0 relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-[60%]">
                    <div className="max-w-full mx-auto">
                        {/* Heading */} 
                        <div className="relative z-10">
                                <div ref={sectionRef} className="w-full">
                                    <div ref={headingRef} className="title-section text-start flex flex-col justify-start w-full max-w-full">
                                        <h2 className="text-h2 leading-none text-white">Certified to global  <span className="font-subFont text-corinthiaHeading text-white">standards</span> </h2>
                                    </div>
                                </div>
                        </div>  

                        <div className='text-white sm:max-w-2xl'>
                            <p>Our commitment to environmental stewardship is supported by several internationally recognised certifications that validate the quality and performance of our products and processes. These certifications reinforce trust in Fenesta’s environmentally-friendly windows and doors and in our manufacturing practices.</p>
                             <div className="mt-8 space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center mt-1">
                                        <Image
                                                src="/images/about/sustainability/data-recovery.svg"
                                                alt=""
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                    <p className="text-white font-bold">
                                        ISO 14001:2015 environmental management certification
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center mt-1">
                                        <Image
                                                src="/images/about/sustainability/eco-lab.svg"
                                                alt=""
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                    <p className="text-white font-bold">
                                    ISO 14001:2015 environmental management certification
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center mt-1">
                                        <Image
                                                src="/images/about/sustainability/checkmark-badge.svg"
                                                alt=""
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                    <p className="text-white font-bold">
                                    Multiple quality checks across design, fabrication, and installation
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div> 
                </div>
                 <div className="w-full lg:w-[40%] relative flex justify-center lg:justify-end">
                    <div className="relative will-change-transform"  ref={imageWrapperRef}>
                        <div className="blur-rounded-full absolute inset-0"> <img src="/images/about/sustainability/blur.svg" alt="" className="w-full object-cover"  /></div>
                        <img src="/images/about/sustainability/certifiedglobal-img.webp" alt="" className="relative max-w-full object-contain rounded-full"  />
                    </div>
                </div>
        
            </div>
         </div> 
      </section>
  )
}
