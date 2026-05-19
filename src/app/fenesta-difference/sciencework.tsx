"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import "swiper/css";
import "swiper/css/navigation";

export default function ResearchSlider() {
    const { headingRef, sectionRef } = useHeadingAnimation();

    const totalSlides = 4;

    return (
        <section className="w-full py-10 lg:py-16">
            {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">Science <span className="font-subFont text-corinthiaHeading text-brown">@Work</span></h2>
                                 <p className="mt-4">Redefining what’s possible / Innovations grounded in real-world performance
                                    As an ISO-certified window manufacturer, Fenesta’s engineering philosophy supports durable, sustainable and green building window solutions designed for modern homes and buildings. The use of uPVC and endlessly recyclable aluminium helps us to conserve natural resources and reduce our carbon footprint.</p>
                                 
                             </div>
                         </div>
                     </div>  

            <div className="container mt-10">

                <Swiper
                    modules={totalSlides > 3 ? [Navigation] : []}
                    navigation={totalSlides > 3}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    className="research-slider"
                >

                    {/* Slide */}
                    <SwiperSlide>

                        <div className=" h-full">

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/fenesta-difference/material-science.png"
                                    alt="Materials Science"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4">

                                <h3 className="font-semibold mb-2">
                                    Materials Science
                                </h3>

                                <p className="leading-[1.7]">
                                    We develop climate-resilient formulations by studying how materials behave under heat, humidity, UV exposure and heavy rain, supporting long-term performance and green building window solutions.
                                </p>

                            </div>

                        </div>

                    </SwiperSlide>

                    {/* Slide */}
                    <SwiperSlide>

                        <div className=" h-full">

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/fenesta-difference/engineering.png"
                                    alt="Engineering & Simulation"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4">

                                <h3 className="font-semibold mb-2">
                                    Engineering & Simulation
                                </h3>

                                <p className="leading-[1.7]">
                                    Fenesta is the only Indian company that manufactures doors and windows designed and simulated for different wind loads, building heights and topography.
                                </p>

                            </div>

                        </div>

                    </SwiperSlide>

                    {/* Slide */}
                    <SwiperSlide>

                        <div className=" h-full">

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/fenesta-difference/testing.png"
                                    alt="Testing & Validation"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4">

                                <h3 className="font-semibold mb-2">
                                    Testing & Validation
                                </h3>

                                <p className="leading-[1.7]">
                                    Independent national and international laboratories verify performance across weather resistance, insulation and durability.
                                </p>

                            </div>

                        </div>

                    </SwiperSlide>

                  

                </Swiper>



            </div>

            

        </section>
    );
}