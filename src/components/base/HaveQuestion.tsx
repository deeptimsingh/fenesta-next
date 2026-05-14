"use client";

import { useState, useRef } from "react";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

const faqData = [
  {
    question:
      "Get clear answers about products, materials, service, installation and more?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    question: "Quisque a maximus dui. Integer et odio metus?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, suscipit.",
  },
  {
    question: "Maecenas dignissim vehicula blandit?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, laboriosam.",
  },
  {
    question: "Nullam at efficitur mi. Cras rhoncus sagittis eros vel laoreet?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eligendi.",
  },
];

export default function HaveQuestion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  //const sectionRef = useRef<HTMLElement | null>(null);
  const { headingRef, sectionRef } = useHeadingAnimation();
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="have-question-section"
      className=" overflow-hidden bg-[#f5f5f5] common-padding"
    >
      {/* Background Shape */}
      <div className="absolute bottom-0 left-0 opacity-40">
        <div className="grid h-[180px] w-[180px] rotate-[-25deg] grid-cols-2 gap-3">
            
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">       

           {/* Heading */}
           <div ref={sectionRef}  className="headingOuter w-full">
              <div className="headingTitle mb-6 xl:mb-6 px-6 md:px-0 title-section  max-w-xl">
                <div ref={headingRef} className="  flex flex-col  w-full">
                  <h2 className="font-mainFont text-h2  leading-none">Have <span className="font-subFont text-corinthiaHeading text-brown leading-0">Questions?</span></h2>
                </div>

                <div className="headingSubTitle flex flex-col justify-center w-full">  
                  <p className="mt-3 text-p  text-theme">Check out our Frequently Asked Questions. If that doesn’t answer your questions about our products, materials, services, installations, and more, please book a consultation with one of our highly trained service representatives or visit us at any of our Signature Studios.</p>
                </div>
              </div>     
            </div>  

          {/* RIGHT FAQ SECTION */}
          <div className="space-y-6">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-[18px] border border-[#bde5ff] bg-white px-8 py-7 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-start justify-between gap-5 text-left"
                  >
                    <h3 className="text-p font-bold leading-tight text-black">
                      {item.question}
                    </h3>

                    {/* Plus / Minus Icon */}
                    <div className="relative flex h-9 w-9  items-center justify-center rounded-full bg-[#009FE3]">
                      {/* Horizontal Line */}
                      <span className="absolute h-[2px] w-4 bg-white" />

                      {/* Vertical Line */}
                      <span
                        className={`absolute h-4 w-[2px] bg-white transition-all duration-300 ${
                          isActive ? "rotate-90 opacity-0" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-10 text-p text-theme">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}