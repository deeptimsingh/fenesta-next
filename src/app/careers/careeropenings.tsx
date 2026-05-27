"use client";

import EnquiryButton from "@/components/base/EnquiryButton";
import Image from "next/image";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function CareerOpenings() {
  const { sectionRef, headingRef } = useHeadingAnimation();
  return (
      <section className="common-padding relative">

              {/* Background Pattern Image */}
              <div className="absolute  top-[-252px] right-[350px]  z-[1]  pointer-events-none">
                  <Image
                      src="/images/careers/ellipse-bg.png"
                      alt="pattern"
                      width={800}
                      height={800}
                      className="  w-full object-contain"
                  />
              </div> 

              {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                           Explore the current {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                opportunities
                            </span>
                        </h2>

                        <p className="mt-3 mb-10 ">
                            Dream. Meet Design.
                        </p>
                    </div>
                </div>
        </div>

        <div className="container mx-auto px-4">

        
          {/* FILTERS */}
            <div className="flex flex-col lg:flex-row gap-4 items-center md:items-end justify-center md:justify-center mb-16">

              {/* Department */}
              <div className="w-full max-w-[270px]">
                <label className="block text-[16px] mb-3 text-black">
                  Department
                </label>
                <div className="relative">
                  <select className="w-full h-[52px] pl-5 pr-11 rounded-full border border-[#d9d4c8] bg-white text-[#333] text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer appearance-none">
                    <option>All</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Location */}
              <div className="w-full max-w-[270px]">
                <label className="block text-[16px] mb-3 text-black">
                  Location
                </label>
                <div className="relative">
                  <select className="w-full h-[52px] pl-5 pr-11 rounded-full border border-[#d9d4c8] bg-white text-[#333] text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer appearance-none">
                    <option>All</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-5 z-1">
                <FenestaButton href="#">Submit</FenestaButton>
              </div>

            </div>

          {/* JOB CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 job-cards">

            {/* CARD 1 */}
            <div className="bg-white border border-[#ddd7ca] rounded-[20px] p-8">

              <h3 className="text-22 font-semibold  mb-5">
                Channel manager - sales
              </h3>

              <p>
                Requirements: 1-4 Years’ Experience, any graduate/MBA preferred.
                Experience in managing dealers, Architect, generating leads &
                attend customer enquiries to maximize the revenue targets.
              </p>

              <ul className="flex items-start gap-2 mb-8 mt-8">
                <li className="text-[#1296db] mt-1">
                  <img src="/images/careers/pin-icon.svg" alt="Location Icon" className=" " />
                </li>

                <li >
                  Agra, Rajkot, Hyderabad, Bangalore, Vellore, Patna, Jaipur
                </li>

              </ul>


              <div className=" z-1 ">
              <EnquiryButton>Apply Now</EnquiryButton>
              </div>  
            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-[#ddd7ca] rounded-[20px] p-8">

              <h3 className="text-22 font-semibold mb-5">
                Channel manager - sales
              </h3>

              <p >
                Requirements: 1-4 Years’ Experience, any graduate/MBA preferred.
                Experience in managing dealers, Architect, generating leads &
                attend customer enquiries to maximize the revenue targets.
              </p>

               <ul className="flex items-start gap-2 mb-8 mt-8">
                <li className="text-[#1296db] mt-1">
                  <img src="/images/careers/pin-icon.svg" alt="Location Icon" className=" " />
                </li>

                <li >
                  Agra, Rajkot, Hyderabad, Bangalore, Vellore, Patna, Jaipur
                </li>

              </ul>

              <div className=" z-1 ">
              <EnquiryButton>Apply Now</EnquiryButton>
              </div>  
            </div>

            {/* CARD 3 */}
            <div className="bg-white border border-[#ddd7ca] rounded-[20px] p-8">

              <h3 className="text-22 font-semibold  mb-5">
                Channel manager - sales
              </h3>

              <p >
                Requirements: 1-4 Years’ Experience, any graduate/MBA preferred.
                Experience in managing dealers, Architect, generating leads &
                attend customer enquiries to maximize the revenue targets.
              </p>

               <ul className="flex items-start gap-2 mb-8 mt-8">
                <li className="text-[#1296db] mt-1">
                  <img src="/images/careers/pin-icon.svg" alt="Location Icon" className=" " />
                </li>

                <li >
                  Agra, Rajkot, Hyderabad, Bangalore, Vellore, Patna, Jaipur
                </li>

              </ul>

              <div className=" z-1 ">
              <EnquiryButton>Apply Now</EnquiryButton>
              </div>  
            </div>

          </div>

          {/* PAGINATION */}
                        <div className="mt-10 z-1 text-center">
                          <FenestaButton>View More</FenestaButton>
                        </div> 

          
        </div>
    </section>
  );
}