"use client";
import { useRef } from "react";
import Image from 'next/image';
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useImageParallax } from "@/hooks/useImageParallax";


export default function Featureleftimgsplain() {
      const { headingRef, sectionRef } = useHeadingAnimation();

 

  const containerRef = useRef<HTMLDivElement>(null);
const imageWrapRef = useRef<HTMLDivElement>(null);

useImageParallax(containerRef, imageWrapRef, {
   fromScale: 1,
    toScale: 1,
    fromY: -50,
    toY: 50,
    smooth: 0.08,
});

  return (
    <section className='common-padding'>
        <div className="container p-0 relative z-10">
            <div className="max-w-full mx-auto">
                {/* Heading */}
                <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                        <div ref={sectionRef} className="w-full">
                            <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                <h2 className="text-h2 leading-none">Supporting your  <span className="font-subFont text-corinthiaHeading text-brown">LEED credits</span></h2>
                            </div>
                        </div>
                </div>  

            </div>

            <div className="flex flex-col md:flex-row items-start gap-15 mt-15 relative overflow-hidden"  ref={containerRef}>
      
                    {/* Left Image */}
                    <div className="w-full sm:w-[45%]">
                        <div className="rounded-xl overflow-hidden relative will-change-transform">
                         <div  ref={imageWrapRef} className="w-full h-full min-h-[280px] md:min-h-[320px] will-change-transform scale-[1.15]"
  >
                        <Image
                            src="/images/about/our-story-img.webp"
                            alt=""
                            width={595}
                            height={366}
                            className="w-full h-full object-cover"
                        />
                        </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full sm:w-[45%]">
                        
                        
                         
                                <p>Fenesta windows and doors are made of recyclable materials using sustainable processes, and use minimal energy during production. The low carbon footprint and superior energy-saving insulation enable builders and developers to achieve valuable LEED (Leadership in Energy and Environmental Design) rating points for their projects. These benefits highlight the advantages of sustainable windows for homes, offering long-term energy savings while supporting their dedication to environmentally conscious construction.
                                </p>

                            
                    
                        
                    </div>
            </div>

        </div>
    </section>
  )
}