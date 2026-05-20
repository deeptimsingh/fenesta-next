import React, { useEffect, useRef } from "react";
import Image from 'next/image'
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Finestaedge() {
   const { headingRef, sectionRef } = useHeadingAnimation();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const items = gsap.utils.toArray(".parallax-item");

  items.forEach((item: any) => {
    const image = item.querySelector(".parallax-image");

    gsap.fromTo(
      image,
      {
        y: -50,
      },
      {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}, []);


  return (
     <section className="common-pt w-full flex flex-col items-center ImageGallery-section ">

         {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">The Fenesta <span className="font-subFont text-corinthiaHeading text-brown">Edge</span></h2>
                                 
                             </div>
                         </div>
                     </div>  
            <div className="container">          
           
              <section className="w-full py-10 lg:py-16">

              

                    <div className="flex flex-col gap-8 lg:gap-10">

                        {/* Item-1 */}
                        <div className="parallax-item flex flex-col md:flex-row items-end gap-5 lg:gap-10 overflow-hidden"  >

                            {/* Image */}
                           <div
                                className="w-full md:w-[45%] shrink-0 overflow-hidden rounded-xl"
                                >
                                <div className="parallax-image">
                                    <Image
                                    src="/images/fenesta-difference/designed-to-stun.png"
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover rounded-xl scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:flex-1">
                                <h3 className="mb-2 font-bold text-22">
                                    Designed to stun. Built to Last.
                                </h3>

                                <p className="">
                                    Our promise of quality and performance durability is the most comprehensive offer in the Indian market. With an integrated supply chain and world-class manufacturing, Fenesta combines design customisation with professional installation and exemplary customer service to offer durability, reliability, and long-term performance.
                                    Because one size doesn’t fit all, Fenesta windows and doors are custom-built with care to meet your design needs.
                                    Check out what goes into the Fenesta Edge.
                                </p>
                            </div>

                        </div>

          
                        {/* Item-2 */}
                        <div className="parallax-item flex flex-col md:flex-row items-end gap-5 lg:gap-10 overflow-hidden"  >

                            {/* Image */}
                           <div
                                className="w-full md:w-[45%] shrink-0 overflow-hidden rounded-xl"
                                >
                                <div className="parallax-image">
                                    <Image
                                    src="/images/fenesta-difference/world-class-manufacturing.png"
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover rounded-xl scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:flex-1">
                                <h3 className="mb-2 font-bold text-22">
                                    World-class Manufacturing
                                </h3>

                                <p className="">
                                    Extrusion in Kota, and ISO-aligned fabrication units position Fenesta as an ISO-certified window manufacturer, ensuring precise, globally benchmarked quality across every profile and frame. Highly efficient modern technology forms the backbone of all our factories. Our extrusion factory in Kota is the proud recipient of the British ‘Sword of Honour’ for its unblemished safety record.
                                </p>
                            </div>

                        </div>

                        {/* Item-3 */}
                        <div className="parallax-item flex flex-col md:flex-row items-end gap-5 lg:gap-10 overflow-hidden"  >

                            {/* Image */}
                           <div
                                className="w-full md:w-[45%] shrink-0 overflow-hidden rounded-xl"
                                >
                                <div className="parallax-image">
                                    <Image
                                    src="/images/fenesta-difference/tropical-conditions.png"
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover rounded-xl scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:flex-1">
                                <h3 className="mb-2 font-bold text-22">
                                    Designed for Tropical Conditions
                                </h3>

                                <p className="">
                                    Unlike imported uPVC profiles, Fenesta’s proprietary uPVC formulations and high-performance aluminium systems are engineered to withstand Indian weather. These Fenesta fenestration solutions resist heat, humidity, UV exposure and heavy rain without warping or fading, making them ideal for Indian conditions.
                                </p>
                            </div>

                        </div>

                        {/* Item-4 */}
                        <div className="parallax-item flex flex-col md:flex-row items-end gap-5 lg:gap-10 overflow-hidden"  >

                            {/* Image */}
                           <div
                                className="w-full md:w-[45%] shrink-0 overflow-hidden rounded-xl"
                                >
                                <div className="parallax-image">
                                    <Image
                                    src="/images/fenesta-difference/tested-certified-excellence.png"
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover rounded-xl scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:flex-1">
                                <h3 className="mb-2 font-bold text-22">
                                   Tested & Certified Excellence
                                </h3>

                                <p className="">
                                    We test each system beyond requirements to ensure that our products meet your standards. Our fenestration solutions are manufactured without compromise. Every system is validated by leading national and international labs, including BSI (UK), CEPT and CBRI, for weather resistance, sound and thermal insulation, strength, colour retention, and durability.
                                </p>
                            </div>

                        </div>

                        {/* Item-5 */}
                        <div className="parallax-item flex flex-col md:flex-row items-end gap-5 lg:gap-10 overflow-hidden"  >

                            {/* Image */}
                           <div
                                className="w-full md:w-[45%] shrink-0 overflow-hidden rounded-xl"
                                >
                                <div className="parallax-image">
                                    <Image
                                    src="/images/fenesta-difference/engineered-performance.png"
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover rounded-xl scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:flex-1">
                                <h3 className="mb-2 font-bold text-22">
                                    Engineered for Performance
                                </h3>

                                <p className="">
                                    Fusion-welded frames, steel reinforcement, multi-point locking and patented drainage channels prevent seepage during heavy rain. Energy-saving features such as airtight sealing and double- or triple-insulation help minimise heating/cooling costs without compromising aesthetics. These features also help reduce noise. Customisable meshes made of fibreglass or steel offer freedom from insects without compromising ventilation.
                                </p>
                            </div>

                        </div>

                    </div>

            

             </section>    
                       
            </div>
          </section>   
  )
}
