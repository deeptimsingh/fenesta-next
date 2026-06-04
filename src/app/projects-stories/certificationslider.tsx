"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import "swiper/css";
import "swiper/css/navigation";

export default function CertificationSlider() {
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
                           Our  {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                Certification
                            </span>
                        </h2>

                    </div>
                </div>
      </div>

      <div className="container mx-auto px-4 relative">

        {/* Navigation Buttons */}

          {/* Prev Button */}
          <div className="brochure-prev group absolute top-[40%] left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer w-11 h-11 rounded-full border border-[#d8d8d8] bg-white hover:bg-black transition-all duration-300 flex items-center justify-center">
            <svg  width="10"  height="16"  viewBox="0 0 10 16"  fill="none">
              <path d="M8 1L2 8L8 15" stroke="#000"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="group-hover:stroke-white transition-all duration-300"/>
            </svg>
          </div>

          {/* Next Button */}
          <div className="brochure-next group absolute top-[40%] right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer w-11 h-11 rounded-full border border-[#d8d8d8] bg-white hover:bg-black transition-all duration-300 flex items-center justify-center">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M2 1L8 8L2 15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300"/>
            </svg>

          </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".brochure-prev",
            nextEl: ".brochure-next",
          }}
          spaceBetween={24}
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
          className="px-10"
        >

          {/* Slide 1 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl flex items-center justify-center" >

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/project-prestige-pinewood.png"
                    alt=""
                    className="max-w-full h-auto transition-all duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)] "
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-center mb-4">
                  Project-prestige pinewood
                </p>



              </div>

            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl">

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/Project-prestige group.png"
                    alt=""
                    className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)]"
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-center mb-4">
                  Project-prestige group
                </p>



              </div>

            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl">

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/Project-prestige-falcon-city.png"
                    alt=""
                    className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)]"
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-center mb-4">
                  Project-prestige falcon city
                </p>



              </div>

            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl">

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/prestige-jindal-City-bengaluru.png  "
                    alt=""
                    className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)]"
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-center mb-4">
                  Prestige Jindal City, Bengaluru
                </p>



              </div>

            </div>
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl">

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/Project-prestige group.png"
                    alt=""
                    className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)]"
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-[18px] leading-[28px] mb-4">
                  Curabitur blandit tellus id luctus hendrerit. Ut laoreet orci.
                </p>

                <a
                  href="#"
                  className="relative inline-flex items-center gap-2 text-[#00AEEF] text-[14px] uppercase pb-1 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#00AEEF] hover:after:w-full after:transition-all after:duration-500"
                >
                  Download PDF →
                </a>

              </div>

            </div>
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide>
            <div className="group">

              <div className="bg-white border border-[#dddddd] rounded-[10px] p-6 transition-all duration-500 hover:shadow-xl">

                <div className="flex items-center justify-center min-h-[350px]">
                  <img
                    src="/images/projects-stories/Project-prestige group.png"
                    alt=""
                    className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.52)]"
                  />
                </div>

              </div>

              <div className="pt-5">

                <p className="text-[18px] leading-[28px] mb-4">
                  Curabitur blandit tellus id luctus hendrerit. Ut laoreet orci.
                </p>

                <a
                  href="#"
                  className="relative inline-flex items-center gap-2 text-[#00AEEF] text-[14px] uppercase pb-1 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#00AEEF] hover:after:w-full after:transition-all after:duration-500"
                >
                  Download PDF →
                </a>

              </div>

            </div>
          </SwiperSlide>

        </Swiper>

      </div>

    </section>
  );
}