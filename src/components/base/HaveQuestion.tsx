"use client";

import { useState, useRef } from "react";

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

  const sectionRef = useRef<HTMLElement | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="have-question-section"
      className="relative overflow-hidden bg-[#f5f5f5] py-20"
    >
      {/* Background Shape */}
      <div className="absolute bottom-0 left-0 opacity-40">
        <div className="grid h-[180px] w-[180px] rotate-[-25deg] grid-cols-2 gap-3">
          <div className="bg-[#d9edf8]" />
          <div className="bg-[#d9edf8]" />
          <div className="bg-[#d9edf8]" />
          <div className="bg-[#d9edf8]" />
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          
          {/* LEFT STICKY SECTION */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-[480px]">
              <h2 className="text-[42px] leading-none font-light text-black md:text-[52px]">
                Have{" "}
                <span className="font-serif italic text-[#5b3b2b]">
                  Questions?
                </span>
              </h2>

              <p className="mt-6 text-[18px] leading-[1.7] text-black/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
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
                    <h3 className="text-[20px] font-semibold leading-[1.4] text-black md:text-[22px]">
                      {item.question}
                    </h3>

                    {/* Plus / Minus Icon */}
                    <div className="relative flex h-11 w-11 min-w-[44px] items-center justify-center rounded-full bg-[#009FE3]">
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
                      <p className="pr-10 text-[16px] leading-[1.7] text-black/70">
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