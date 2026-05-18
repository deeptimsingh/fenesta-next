"use client";

import Image from "next/image";
import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

gsap.registerPlugin(ScrollTrigger);

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
  const faqSectionRef = useRef<HTMLDivElement>(null);
  const { headingRef, sectionRef } = useHeadingAnimation();

  useLayoutEffect(() => {
    const root = faqSectionRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>(".faq-section-item");
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        // Use opacity (not autoAlpha): autoAlpha sets visibility:hidden and blocks
        // pointer events until the tween runs — FAQ clicks feel "broken", especially
        // with Lenis + ScrollTrigger timing. once: true avoids reversing back to hidden.
        gsap.fromTo(
          item,
          { opacity: 0, y: 20, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              once: true,
            },
          }
        );
      });
    }, root);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="have-question-section"
      className="bg-[#f5f5f5] common-padding  flex items-center relative min-h-auto sm:min-h-[90vh]"
    >
      {/* Background Shape */}
      <div className="absolute bottom-0 -left-[5vw]">
        <div className="grid h-[20vw] w-[20vw] rotate-[-25deg] grid-cols-2 gap-3">
            <Image src="/images/blog/have-question.svg" alt="Have Question" fill className="object-cover"  />
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">       

           {/* Heading */}
           <div className="headingOuter w-full left-side-content lg:sticky lg:top-30">
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
          <div ref={faqSectionRef} className="space-y-6 faq-section">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className="faq-section-item rounded-[18px] border border-[#bde5ff] bg-white px-6 py-6 relative"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-start justify-between gap-5 text-left"
                  >
                    <h3 className="text-p font-bold leading-tight text-black pr-15">
                      {item.question}
                    </h3>

                    {/* Plus / Minus Icon */}
                    <div className="absolute top-6 right-6 z-10 flex h-9 w-9  items-center justify-center rounded-full bg-[#009FE3]">
                      {/* Horizontal Line */}
                      <span className="absolute h-[2px] w-4 bg-white" />

                      {/* Vertical Line */}
                      <span
                        className={`absolute z-10 h-4 w-[2px] bg-white transition-all duration-300 ${
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