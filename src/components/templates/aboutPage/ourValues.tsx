// components/templates/aboutPage/ValuesSection.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Single DrawSVG trigger for the big line:
    const mainPath = section.querySelector("#mainLine");
    if (mainPath) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: () => {
          // DrawSVG plugin handles the animation efficiently
          gsap.fromTo(
            mainPath,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 3.2, ease: "power2.out" }
          );
        },
      });
    }



    const ctx = gsap.context(() => {
    const blocks = gsap.utils.toArray(".values-block .letter");
    // Set initial state for all letters
    gsap.set(blocks, {
      opacity: 0,
      scale: 0.4,
      y: 40,
    });

    // TIMELINE (Sequential Animation)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".letters-outer",
        start: "top 85%",
        toggleActions: "play none play reverse",
      },
    });

    tl.to(blocks, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.6)",
      stagger: 0.15, // 👉 one by one!
    });
  }, sectionRef);
    

    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);


  return (
    <section ref={sectionRef} className="w-full py-12 text-center values-section relative common-padding">       
        <div className="handSvg w-full overflow-hidden ">
            <div className=" container-fluid p-0">
                <svg width="1600" height="416" viewBox="0 0 1600 416" fill="none" className="mx-auto" aria-hidden>
                    <path
                    id="mainLine"
                    d="M-93 410.306C-93 410.306 303.41 408.327 290.549 410.306C277.688 412.286 266.807 252.906 262.85 210.337C258.893 167.77 250.977 146.981 250.977 138.071C250.977 129.161 262.136 131.166 263.368 124.592C264.599 118.016 266.652 104.047 267.474 113.087C268.293 122.127 253.923 141.849 244.889 131.577C235.857 121.305 221.485 77.3406 225.592 63.7815C229.698 50.2224 226.003 32.1442 224.771 37.4842C223.54 42.8259 232.983 74.4649 244.07 65.0137C255.156 55.5641 245.302 20.6382 243.248 25.159C241.195 29.6798 254.745 74.0536 267.062 69.5345C279.38 65.0137 270 31.2983 268.359 36.2287C266.719 41.1592 276.917 62.1397 288.825 62.9606C300.732 63.7832 306.475 54.1787 306.475 54.1787C306.475 54.1787 262.377 48.6639 269.238 23.0493C270.32 19.0147 284.309 22.285 294.574 25.1607C304.839 28.0363 317.569 23.5155 323.314 26.3929C329.063 29.2685 340.973 59.264 345.078 50.2241C349.184 41.1858 340.972 11.6016 329.476 5.43897C317.98 -0.723639 302.376 4.20679 301.554 11.192C300.732 18.1772 300.323 25.1623 301.554 20.2319C302.786 15.3015 306.481 5.43898 296.216 1.74241C285.951 -1.95582 269.939 2.9746 269.939 11.6033C269.939 20.2319 271.579 25.1623 271.992 19.4093C272.401 13.6563 276.097 7.49373 268.295 5.43897C260.495 3.38421 243.659 9.95978 243.25 16.532C242.841 23.1059 243.659 23.1059 244.072 19.4093C244.481 15.7111 244.072 11.6033 238.323 12.8371C232.574 14.0693 223.951 21.0528 223.542 26.8058C223.131 32.5588 222.309 67.0734 237.501 71.1813C252.693 75.2908 263.368 67.8943 263.779 75.2908C264.191 82.6873 255.979 106.107 262.96 97.4786C269.94 88.8499 274.045 73.236 284.72 70.7717C295.398 68.3073 311.408 66.6621 308.536 66.2525C305.661 65.8412 288.006 74.0586 286.364 93.3707C284.72 112.683 292.932 129.529 297.038 131.172C301.143 132.816 334.812 95.0125 338.097 86.7968C341.382 78.5794 343.024 46.5292 345.9 56.3917C348.773 66.2525 344.668 85.5646 330.707 106.517C316.747 127.472 313.052 128.295 316.747 137.744C320.442 147.194 329.063 186.229 333.992 207.595C338.919 228.96 416.111 404.815 402.151 404.815C388.19 404.815 336.455 271.692 335.633 300.452C334.811 329.215 376.269 399.198 365.594 404.951C354.92 410.704 320.031 415.5 339.739 415.5C359.448 415.5 426.032 413.565 426.032 413.565C462.278 413.46 552.931 406.503 625.573 379.511C698.215 352.519 963.747 343.147 1069.5 348.02L1667 386.259"
                    stroke="#0094D9"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>

        <div className="iaction-outer relative md:absolute letters-wrap  md:top-20 md:inset-0">           
            <div className="container text-center">      
              <div className="headingTitle mb-6 xl:mb-6 px-0 md:px-0">
                <div className="title-section  flex flex-col  w-full">
                  <h2 className="font-mainFont text-h2 leading-none text-theme flex justify-center flex-wrap mx-auto">Our <span className="font-subFont text-corinthiaHeading text-brown leading-none">Values</span></h2>
                </div>

                <div className="headingSubTitle flex flex-col justify-center w-full sm:max-w-md mx-auto">  
                  <p className="mt-3 max-w-3xl">Vibrant Growth With Trust, Energised Employees & Delighted Customers</p>
                </div>
              </div>     
            </div>

            <div className="container text-center">
                <div className="flex justify-center flex-wrap gap-[3vw] mt-0 md:mt-5 letters-outer">
                    <div className="inline-flex gap-0 relative top-0 md:top-12">  
                        {/* I */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/i-letter.webp"
                                alt="INTEGRITY"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">INTEGRITY</p>
                        </div>
                    </div>    

                    <div className="inline-flex gap-2 relative top-0 md:top-0">                 
                        {/* A */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/a-letter.webp"
                                alt="AGILITY"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">AGILITY</p>
                        </div>

                        {/* C */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/c-letter.webp"
                                alt="CUSTOMER CENTRICITY"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">CUSTOMER <br /> CENTRICITY</p>
                        </div>

                        {/* T */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/t-letter.webp"
                                alt="TEAM WORK"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">TEAM WORK</p>
                        </div>
                    </div>

                    <div className="inline-flex gap-2 relative top-0 md:top-12">
                        {/* O */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/o-letter.webp"
                                alt="OPENNESS"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">OPENNESS</p>
                        </div>

                        {/* N */}
                        <div className="values-block flex flex-col items-center">
                            <Image
                                src="/images/about/n-letter.webp"
                                alt="NEWNESS"
                                width={110}
                                height={143}
                                loading="lazy"
                                className="letter opacity-0 scale-50 object-contain"
                            />
                            <p className="text-base18 uppercase tracking-wider mt-1">NEWNESS</p>
                        </div>
                    </div>
                </div>
            </div>       
        </div>      
    </section>
  );
}
