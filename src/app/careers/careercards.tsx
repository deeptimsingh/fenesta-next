"use client";

import Image from "next/image";
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import EnquiryButton from "@/components/base/EnquiryButton";

export default function CareerCards() {
    const { sectionRef, headingRef } = useHeadingAnimation();
  return (
     <section className="pb-20 md:py-20 bg-white">

      {/* Heading */}
       <div className="container-fluid m-auto px-6 md:px-0 relative z-10 mb-10 md:mb-20">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                            Build Your {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                Career at Fenesta
                            </span>
                        </h2>

                    </div>
                </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1 - Internal */}
          <div className="group relative rounded-[24px] overflow-hidden min-h-[500px] cursor-pointer">

            {/* Background Image */}
            <Image
              src="/images/careers/businesswoman.png"
              alt="Internal Position"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Always-on dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Blue overlay - appears on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#1296db] to-[#0ab5f5] group-hover:h-full transition-all duration-500 ease-in-out opacity-60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-10">
                <div className="title-section text-start flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto text-white" >
                          <h2 className="text-h2 leading-none text-white">
                          Applying or Referring for an {" "}
                              <span className="font-subFont text-corinthiaHeading text-white">
                                  Internal Position?
                              </span>
                          </h2>

                          <p >
                              If you're currently part of the Fenesta or DCM group and looking
                          for growth opportunities within the company, explore our latest
                          internal job openings.
                          </p>
                </div>

       
              <div className="self-start">

                  <div className=" z-1 ">
                  <EnquiryButton>Apply Now</EnquiryButton>
                  </div> 
              </div>
            </div>
          </div>

          {/* CARD 2 - External */}
          <div className="group relative rounded-[24px] overflow-hidden min-h-[500px] cursor-pointer">

            {/* Background Image */}
            <Image
              src="/images/careers/businesswoman.png"
              alt="External Position"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Always-on dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Blue overlay - appears on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#1296db] to-[#0ab5f5] group-hover:h-full transition-all duration-500 ease-in-out opacity-60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-10">
                  <div  className="title-section text-start flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto text-white" >
                     <h2 className="text-h2 leading-none text-white">
                      Not Part of Fenesta or DCM Group{" "}
                       <span className="font-subFont text-corinthiaHeading text-white">
                        Yet?
                        </span>
                      </h2>
                       <p>
                         If you're not yet a member of the Fenesta or DCM family but are
                        eager to join a dynamic and innovative team, explore our
                      external job opportunities.
                      </p>
                </div>

              <div className=" z-1 ">
              <EnquiryButton>Apply Now</EnquiryButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}