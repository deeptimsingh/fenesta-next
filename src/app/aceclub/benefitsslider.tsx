"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import "swiper/css";
import "swiper/css/navigation";

export default function BenefitsSlider() {
        const { sectionRef, headingRef } = useHeadingAnimation();
  return (
    <section className="py-16 bg-[#f5f5f5] overflow-hidden">

      {/* Heading */}
      <div className="container-fluid m-auto px-6 md:px-0 relative z-10 mb-10 md:mb-20">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                            Membership {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                Benefits
                            </span>
                        </h2>

                    </div>
                </div>
      </div>

      <div className="container mx-auto px-4">
            <Swiper
            modules={[Navigation]}
            navigation={{
                prevEl: ".benefits-prev",
                nextEl: ".benefits-next",
            }}
            spaceBetween={16}
            breakpoints={{
                0: {
                slidesPerView: 1.1,
                },
                576: {
                slidesPerView: 2,
                },
                768: {
                slidesPerView: 3,
                },
                1200: {
                slidesPerView: 4,
                },
            }}
            >

            {/* Slide 1 */}
            <SwiperSlide>

                <div className="bg-white border border-[#dcdcdc] rounded-[8px] p-6 min-h-[220px] flex flex-col justify-between">

                <div>
                    <img
                    src="images/aceclub/reward-points-icon.svg"
                    alt=""
                    className="w-10 h-10"
                    />
                </div>

                <h3 className="text-22">
                    Reward ponts
                </h3>

                </div>

            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>

                <div className="bg-white border border-[#dcdcdc] rounded-[8px] p-6 min-h-[220px] flex flex-col justify-between">

                <div>
                    <img
                    src="images/aceclub/media-icon.svg"
                    alt=""
                    className="w-10 h-10"
                    />
                </div>

                <h3 className="text-22">
                    Media spotlight
                </h3>

                </div>

            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>

                <div className="bg-white border border-[#dcdcdc] rounded-[8px] p-6 min-h-[220px] flex flex-col justify-between">

                <div>
                    <img
                    src="/images/aceclub/customer-service-icon.svg"
                    alt=""
                    className="w-10 h-10"
                    />
                </div>

                <h3 className="text-22  ">
                    Priority customer support
                </h3>

                </div>

            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>

                <div className="bg-white border border-[#dcdcdc] rounded-[8px] p-6 min-h-[220px] flex flex-col justify-between">

                <div>
                    <img
                    src="/images/aceclub/reward-points-icon.svg"
                    alt=""
                    className="w-10 h-10"
                    />
                </div>

                <h3 className="text-22  ">
                    Reward ponts
                </h3>

                </div>

            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>

                <div className="bg-white border border-[#dcdcdc] rounded-[8px] p-6 min-h-[220px] flex flex-col justify-between">

                <div>
                    <img
                    src="/images/aceclub/reward-points-icon.svg"
                    alt=""
                    className="w-10 h-10"
                    />
                </div>

                <h3 className="text-22 ">
                    Exclusive benefits
                </h3>

                </div>

            </SwiperSlide>

            </Swiper>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-center gap-3 mt-10">

                {/* Prev */}
                <div className="benefits-prev group cursor-pointer w-10 h-10 rounded-full border border-[#d8d8d8] bg-white hover:bg-black transition-all duration-300 flex items-center justify-center">
                    <svg width="9"  height="14" viewBox="0 0 9 14"  fill="none"  >
                    <path   d="M7 1L1 7L7 13" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300"/>
                    </svg>

                </div>

                {/* Next */}
                <div className="benefits-next group cursor-pointer w-10 h-10 rounded-full border border-[#d8d8d8] bg-white hover:bg-black transition-all duration-300 flex items-center justify-center">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" >
                    <path d="M2 1L8 7L2 13" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300"/>
                    </svg>

                </div>

            </div>
      </div>

    </section>
  );
}