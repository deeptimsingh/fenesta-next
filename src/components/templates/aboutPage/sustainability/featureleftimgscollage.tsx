"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useImageParallax } from "@/hooks/useImageParallax";


export default function Featureleftimgcollage() {
      const { headingRef, sectionRef } = useHeadingAnimation();

 const contentRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const getCollapsedHeight = () => {
    return window.innerWidth <= 768 ? 120 : 160;
  };

  const updateHeight = () => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const collapsed = getCollapsedHeight();

    setHasOverflow(content.scrollHeight > collapsed);

    if (expanded) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = collapsed + "px";
    }
  };

  useEffect(() => {
    updateHeight();

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [expanded]);


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
    <section className='common-pb'>
        <div className="container p-0 relative z-10">
            <div className="max-w-full mx-auto">
                {/* Heading */}
                <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                        <div ref={sectionRef} className="w-full">
                            <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                <h2 className="text-h2 leading-none">Responsible <span className="font-subFont text-corinthiaHeading text-brown">manufacturing</span></h2>
                            </div>
                        </div> 
                </div>  

            </div>

            <div className="flex flex-col md:flex-row items-center gap-15 mt-15 relative overflow-hidden" >
      
                    {/* Left Image */}
                    <div className="w-full sm:w-[45%]">
                        <div className="relative will-change-transform flex justify-center items-center h-[300px] sm:h-[650px]">
                           <div className="grid grid-cols-2 gap-0 rotate-45 w-[225px] sm:w-[450px] overflow-hidden relative">
  
                                    <Image
                                        src="/images/about/our-story-img.webp"
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        className="w-full aspect-square object-cover -rotate-45 scale-[1.20] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]"
                                    />

                                    <Image
                                        src="/images/about/our-story-img.webp"
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        className="w-full aspect-square object-cover -rotate-45 scale-[1.20] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]"
                                    />

                                    <Image
                                        src="/images/about/our-story-img.webp"
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        className="w-full aspect-square object-cover -rotate-45 scale-[1.20] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]"
                                    />

                                    <Image
                                        src="/images/about/our-story-img.webp"
                                        alt=""
                                        width={0}
                                        height={0} 
                                        sizes="100%"
                                        className="w-full aspect-square object-cover -rotate-45 scale-[1.20] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]"
                                    />

                                    <div className="vector-collage">  <Image
                                        src="/images/about/sustainability/vector.svg"
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        className="w-full"
                                    /></div>

                                    </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full sm:w-[45%]">
                        
                        {/* Read More Wrapper */}
                        <div
                        className={`relative ${
                            !expanded && hasOverflow
                            ? "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[60px] after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none"
                            : ""
                        }`}
                        >
                            <div
                                ref={contentRef}
                                className="overflow-hidden transition-all duration-500 ease-in-out">
                                <p>
                                Sustainable design begins with the choice of materials that
                                shape the frame. Fenesta’s energy-efficient windows and doors are
                                built using carefully selected sustainable materials that
                                prioritize durability, longevity, and environmental
                                responsibility.
                                </p>

                                <p className="mt-5">
                                These sustainable materials reduce environmental impact while
                                ensuring long-lasting performance. Fenesta products are designed
                                to enhance insulation, improve energy efficiency, and contribute
                                toward greener living spaces.
                                </p>

                            
                            </div>
                        </div>
                        

                        {/* Button */}
                        {hasOverflow && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-5 flex items-center gap-2 text-[#0094DA] text-base font-normal uppercase tracking-[1px] cursor-pointer"
                        >
                            {expanded ? "READ LESS" : "READ MORE"}

                            <span
                            className={`w-8 h-8 rounded-full bg-[#0094DA] flex items-center justify-center transition-transform duration-300 ${
                                expanded ? "rotate-180" : ""
                            }`}
                            >
                             <Image
                            src="/images/readmore-vector.svg"
                            alt=""
                            width={12}
                            height={6}
                            className="w-auto object-cover"
                        />
                            </span>
                        </button>
                        )}

                             {/* Features */}
                        <div className="mt-8 space-y-5">

                            {/* Item 1 */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center mt-1">
                                <Image
                                    src="/images/about/sustainability/ai-book.svg"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain"
                                />
                                </div>

                                <p className="font-bold">
                               Waste reduction across fabrication
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center mt-1">
                                <Image
                                    src="/images/about/sustainability/plant.svg"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain"
                                />
                                </div>

                                <p className="font-bold">
                               Optimised energy use in production
                                </p>
                            </div>

                             <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center mt-1">
                                <Image
                                    src="/images/about/sustainability/ripple.svg"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain"
                                />
                                </div>

                                <p className="font-bold">
                               Clean and standardised processes guided by environmental management principles
                                </p>
                            </div>

                        </div>

                        
                    </div>
            </div>

        </div>
    </section>
  )
}