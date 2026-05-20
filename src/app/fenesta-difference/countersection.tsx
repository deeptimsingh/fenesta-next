"use client";
import { useEffect } from "react";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";




export default function Countersection() {
   const { headingRef, sectionRef } = useHeadingAnimation();


 useEffect(() => {

    /* ---------------------------------------------
       ODOMETER ANIMATION FOR COUNTERS
    --------------------------------------------- */
    const BASE_ROLLS = 2;
    const EXTRA_ROLLS_PER_POS = 1;
    const BASE_DURATION = 900;
    const DURATION_PER_ROLL = 220;

    /* ---------------------------------------------
       FORMAT NUMBER WITH COMMAS
    --------------------------------------------- */
    function formatNumberString(nStr: string) {

      const num = Number(nStr);

      if (isNaN(num)) return "0";

      const abs = Math.abs(num);

      const [intPartRaw, decPartRaw] = abs.toString().split(".");

      const intPart = intPartRaw.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );

      if (!decPartRaw) return intPart;

      const decPart = decPartRaw.replace(/0+$/, "");

      if (!decPart) return intPart;

      return `${intPart}.${decPart}`;
    }

    /* ---------------------------------------------
       BUILD ODOMETER DOM
    --------------------------------------------- */
    function buildOdometer(counterEl: HTMLElement) {

      const rawTarget =
        counterEl.getAttribute("data-target") || "0";

      const suffix =
        counterEl.getAttribute("data-suffix") || "";

      const targetStr = formatNumberString(rawTarget);

      counterEl.textContent = "";

      const odometer = document.createElement("span");

      odometer.className = "counter-odometer";

      const chars = targetStr.split("");

      for (let i = 0; i < chars.length; i++) {

        const char = chars[i];

        /* -------- COMMA / DOT -------- */
        if (char === "," || char === ".") {

          const staticChar = document.createElement("span");

          staticChar.className = "odometer-separator";

          staticChar.textContent = char;

          odometer.appendChild(staticChar);

          continue;
        }

        /* -------- DIGIT -------- */
        const digit = parseInt(char, 10);

        const slot = document.createElement("span");

        slot.className = "odometer-digit";

        const column = document.createElement("span");

        column.className = "odometer-column";

        const numericIndex =
          chars
            .slice(i)
            .filter(c => c !== "," && c !== ".").length - 1;

        const rolls =
          BASE_ROLLS +
          numericIndex * EXTRA_ROLLS_PER_POS;

        for (let r = 0; r <= rolls; r++) {

          for (let d = 0; d < 10; d++) {

            const line = document.createElement("span");

            line.className = "odometer-digit-line";

            line.textContent = d.toString();

            column.appendChild(line);
          }
        }

        slot.appendChild(column);

        odometer.appendChild(slot);

        (slot as any)._finalIndex = rolls * 10 + digit;
        (slot as any)._rolls = rolls;
      }

      /* -------- SUFFIX -------- */
      if (suffix) {

        const suf = document.createElement("span");

        suf.className = "counter-suffix";

        suf.textContent = suffix;

        odometer.appendChild(suf);
      }

      counterEl.appendChild(odometer);

      return Array.from(
        odometer.querySelectorAll(".odometer-digit")
      ) as HTMLElement[];
    }

    /* ---------------------------------------------
       ANIMATE DIGITS
    --------------------------------------------- */
    function animateOdometerSlots(slots: HTMLElement[]) {

      if (!slots.length) return;

      const firstLine = slots[0].querySelector(
        ".odometer-digit-line"
      ) as HTMLElement;

      const digitHeight =
        firstLine?.getBoundingClientRect().height || 0;

      slots.forEach((slot, idx) => {

        const column = slot.querySelector(
          ".odometer-column"
        ) as HTMLElement;

        const finalIndex = (slot as any)._finalIndex;

        const duration =
          BASE_DURATION +
          (slot as any)._rolls * DURATION_PER_ROLL;

        const totalSlots = slots.length;

        const staggerFactor = 0.08;

        const delay = Math.round(
          duration *
          staggerFactor *
          (totalSlots - idx - 1)
        );

        column.style.transition =
          `transform ${duration}ms cubic-bezier(.22,.9,.35,1) ${delay}ms`;

        column.style.transform = "translateY(0px)";

        const offset = finalIndex * digitHeight;

        setTimeout(() => {

          column.style.transform =
            `translateY(-${offset}px)`;

        }, 20);
      });
    }

    /* ---------------------------------------------
       INTERSECTION OBSERVER
    --------------------------------------------- */
    const counters =
      document.querySelectorAll(".counter");

    const stateMap = new WeakMap();

    if (counters.length) {

      const io = new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target as HTMLElement;

            if (stateMap.get(el)) {

              obs.unobserve(el);

              return;
            }

            const slots = buildOdometer(el);

            void el.offsetHeight;

            animateOdometerSlots(slots);

            stateMap.set(el, true);

            obs.unobserve(el);
          });
        },
        {
          threshold: 0.3,
        }
      );

      counters.forEach(c => io.observe(c));

      return () => io.disconnect();
    }

  }, []);


  return (
    <section className='relative common-pt'>
       {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">The Fenesta <span className="font-subFont text-corinthiaHeading text-brown">Edge</span></h2>
                                 <p className="mt-10 ">Fenesta is committed to standing behind its products. Our category-leading coverage is also our seal of assurance in the quality of our products.</p>
                                 
                             </div>
                         </div>
                     </div> 

        <div className='container'>
            <div className="flex flex-wrap justify-center space-y-5 mt-14">

                    {/* 20 year */}
                    <div className="w-full sm:w-1/2 md:w-1/4 relative after:content-[''] after:absolute after:top-0 after:left-[6px] after:w-[calc(100%-6px)] after:border-t after:border-[#ddd7cf] before:content-[''] before:absolute before:right-0 before:top-[8px] before:bottom-0 before:border-r before:border-[#ddd7cf] px-[15px] pt-[18px] pb-[18px] sm:px-[28px] sm:pt-[22px] sm:pb-[18px] min-h-[155px] flex flex-col justify-between counter-outer-wrapper items-center md:items-start">
                        <div className="absolute  rounded-full bg-[#F6F0D1] opacity-60 blur-[117px] top-0 right-0" />
                        <div className="counter-wrap flex items-center gap-2">
                            <h2 className="text-brown counter" data-target="20" >
                                20
                            </h2>
                                 <span><h2 className="text-brown year-style " >  years</h2></span>
                        </div>
                        <p>
                           uPVC profiles
                        </p>
                    </div>

                     {/* 20 year */}
                    <div className="w-full sm:w-1/2 md:w-1/4 relative after:content-[''] after:absolute after:top-0 after:left-[6px] after:w-[calc(100%-6px)] after:border-t after:border-[#ddd7cf] before:content-[''] before:absolute before:right-0 before:top-[8px] before:bottom-0 before:border-r before:border-[#ddd7cf] px-[15px] pt-[18px] pb-[18px] sm:px-[28px] sm:pt-[22px] sm:pb-[18px] min-h-[155px] flex flex-col justify-between counter-outer-wrapper items-center md:items-start">
                        <div className="absolute  rounded-full bg-[#F6F0D1] opacity-60 blur-[117px] top-0 right-0" />
                        <div className="counter-wrap flex items-center gap-2">
                            <h2 className="text-brown counter" data-target="10" >
                                10
                            </h2>
                                <span><h2 className="text-brown year-style "> years</h2></span>
                        </div>


                        <p>
                              Aluminium profiles
                        </p>
                    </div>

                     {/* 20 year */}
                    <div className="w-full sm:w-1/2 md:w-1/4 relative after:content-[''] after:absolute after:top-0 after:left-[6px] after:w-[calc(100%-6px)] after:border-t after:border-[#ddd7cf] before:content-[''] before:absolute before:right-0 before:top-[8px] before:bottom-0 before:border-r before:border-[#ddd7cf] px-[15px] pt-[18px] pb-[18px] sm:px-[28px] sm:pt-[22px] sm:pb-[18px] min-h-[155px] flex flex-col  counter-outer-wrapper items-center md:items-start">
                        <div className="absolute  rounded-full bg-[#F6F0D1] opacity-60 blur-[117px] top-0 right-0" />
                        <div className="counter-wrap flex items-center gap-2">
                            <h2 className="text-brown counter" data-target="5" >
                                5
                            </h2>
                                <span><h2 className="text-brown year-style "> years</h2></span>
                        </div>
                        <p>
                          Hardware and doors
                        </p>
                    </div>


            </div>
        </div>
    </section>
  )
}
