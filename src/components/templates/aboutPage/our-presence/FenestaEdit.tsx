"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

import "swiper/css";
import "swiper/css/navigation";

export default function ResearchSlider() {
    const { headingRef, sectionRef } = useHeadingAnimation();

    const totalSlides = 4;

    return (
        <section className="w-full common-padding relative ">

              {/* Background Pattern Image */}
              <div className="absolute  top-[28vw] right-[-13vw] md:top-0 md:right-0 z-[1]  pointer-events-none">
                  <Image
                      src="/images/about/our-presence/edit-bg-icon.png"
                      alt="pattern"
                      width={500}
                      height={500}
                      className="w-[180px] sm:w-[180px] md:w-[450px] h-auto object-contain"
                  />
              </div>

            {/* background-gradient */}
               <div className="absolute top-[0vw] right-[22vw] w-[1096px] h-[320px] rounded-[1096px] bg-[rgba(237,232,208,0.91)] blur-[117px] z-[1]"></div>
               
            {/* Heading */}
            <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto mb-6">
                                 <h2 className="text-h2 leading-none ">The Fenesta  <span className="font-subFont text-corinthiaHeading text-brown">Edit</span></h2>
                                  <p className="mt-3  max-w-3xl text-base">A curated collection of ideas and stories for homes that value design and style</p>
                                 
                             </div>
                         </div>
             </div>  

              <div className="container ">
                <Swiper
                            modules={totalSlides > 3 ? [Navigation] : []}
                            navigation={{
                                prevEl: ".research-prev",
                                nextEl: ".research-next",
                            }}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="research-slider"
                        >

                    {/* Slide -1 */}
                    <SwiperSlide>

                        <div className="h-full edit-card">
                            
                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/about/our-presence/window-design-ideas.png"
                                    alt="Materials Science"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4 edits-contain">

                                <h4 className="text-22 font-semibold">A platform to exhibit skills and due recognition for work</h4>
                                <p className=" mb-2 ">
                                    Window Design Ideas for North-Facing Vs South-Facing Homes
                                </p>


                            </div>

                        </div>

                    </SwiperSlide>

                    {/* Slide -2 */}
                    <SwiperSlide>

                        <div className="h-full edit-card">

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/about/our-presence/indian-homeowners.png"
                                    alt="Engineering & Simulation"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4 edits-contain">

                                <h4 className="text-22 font-semibold">A culture that fosters innovative thinking</h4>
                                <p className=" mb-2 ">
                                    Luxury Door Design Trends That Indian Homeowners Love (2026 Guide)
                                </p>



                            </div>

                        </div>

                    </SwiperSlide>

                    {/* Slide -3 */}
                    <SwiperSlide>

                        <div className="h-full edit-card">

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/about/our-presence/doors-impact-vastu.png"
                                    alt="Testing & Validation"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4 edits-contain">

                                  <h4 className="text-22 font-semibold">Each Employee can "be the change"</h4>  
                                <p className=" mb-2 ">
                                    How Windows and Doors Impact Vastu and Feng Shui (2026 Guide)
                                </p>

    

                            </div>

                        </div>

                    </SwiperSlide>



                </Swiper>
                      {totalSlides > 3 && (
                        <div className="flex items-center justify-center gap-4 mt-4 ">

                            <button className="research-prev w-[45px] h-[45px] rounded-full border flex items-center justify-center">
                                <span>←</span>
                            </button>

                            <button className="research-next w-[45px] h-[45px] rounded-full border flex items-center justify-center">
                                <span>→</span>
                            </button>

                        </div>
                    )}  


                    <div className="mt-5 z-1 text-center">
                      <FenestaButton>View all blogs</FenestaButton>
                    </div>    
            </div>
 
        </section>
    );
}