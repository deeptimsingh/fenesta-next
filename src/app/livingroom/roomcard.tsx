"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { initCardReveal } from "@/components/base/cardReveal";
import Link from "next/link";
import FenestaButton from "@/components/base/FenestaButton";


export default function LivingRoomCards() {

  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("livingroom");

  const containerRef = useRef<HTMLDivElement>(null);
  const revealCtxRef = useRef<ReturnType<typeof initCardReveal> | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealCtxRef.current?.revert();

        revealCtxRef.current = initCardReveal({
          container,
          cardSelector: ".cardreveal",
          imageSelector: ".cardreveal-image",
        });
      });
    });

    return () => {
      cancelAnimationFrame(id);
      revealCtxRef.current?.revert();
      revealCtxRef.current = null;
    };
  }, [activeTab]);

  return (
    <section className="common-padding w-full">

      <div className="container">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-h2 leading-none">
            Living Room{" "}
            <span className="font-subFont text-corinthiaHeading text-brown">
              Inspirations
            </span>
          </h2>

          <p className="mt-4 text-theme text-18">
            Explore elegant living room spaces crafted with modern windows,
            premium interiors, and natural lighting aesthetics.
          </p>

        </div>

        {/* Tabs */}
        <div className="tab-outer flex justify-center mt-10 w-full">

          <div className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-18 leading-normal">

            <button
              data-tab="livingroom"
              type="button"
              onClick={() => setActiveTab("livingroom")}
              className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                activeTab === "livingroom"
                  ? "bg-blue text-white"
                  : "text-neutral-500"
              }`}
            >
             Windows
            </button>

            <button
              data-tab="luxury"
              type="button"
              onClick={() => setActiveTab("luxury")}
              className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                activeTab === "luxury"
                  ? "bg-blue text-white"
                  : "text-neutral-500"
              }`}
            >
              Doors
            </button>

            

          </div>

        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mt-5 w-full">

          <div className="inline-flex flex-wrap items-center gap-5 px-4 py-2 ">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                name="windowType"
                checked={selectedType === "all"}
                onChange={() => setSelectedType("all")}
                className="accent-blue"
              />

              <span className="">
                All
              </span>

            </label>

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                name="windowType"
                checked={selectedType === "upvc"}
                onChange={() => setSelectedType("upvc")}
                className="accent-blue"
              />

              <span className="">
                uPVC
              </span>

            </label>

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                name="windowType"
                checked={selectedType === "aluminium"}
                onChange={() => setSelectedType("aluminium")}
                className="accent-blue"
              />

              <span className=" ">
              Aluminium
              </span>

            </label>

          </div>

        </div>

        {/* Living Room Cards */}
        {activeTab === "livingroom" && (

          <div
            ref={containerRef}
            className="press-card-outer grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-5"
          >

        {/* Card 1 */}
          <Link
            href="/living-room/interior-design"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/combination.png"
                  alt="Modern Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                   Combination
                </span>

              </div>

              {/* Content */}


            </article>
          </Link>

          {/* Card 2 */}
          <Link
            href="/living-room/luxury-space"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/vlla.png"
                  alt="Luxury Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                   Vlla
                </span>

              </div>



            </article>
          </Link>

          {/* Card 3 */}
          <Link
            href="/living-room/minimal-style"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/bay.png"
                  alt="Minimal Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                    Bay
                </span>

              </div>


            </article>
          </Link>

           {/* Card 4 */}
          <Link
            href="/living-room/minimal-style"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/fixed.png"
                  alt="Minimal Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                   Flxed
                </span>

              </div>



            </article>
          </Link>

           {/* Card 5 */}
          <Link
            href="/living-room/minimal-style"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/glass.png"
                  alt="Minimal Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                  Glass to glass
                </span>

              </div>



            </article>
          </Link>

           {/* Card 6 */}
          <Link
            href="/living-room/minimal-style"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/sliding.png"
                  alt="Minimal Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                  Sliding
                </span>

              </div>

  

            </article>
          </Link>

          </div>

        )}

        {/* Luxury Interior Cards */}
        {activeTab === "luxury" && (

          <div
            ref={containerRef}
            className="press-card-outer grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-5"
          >

        {/* Card 1 */}
          <Link
            href="/living-room/interior-design"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/combination.png"
                  alt="Modern Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                   Combination
                </span>

              </div>

              {/* Content */}

 

            </article>
          </Link>

          {/* Card 2 */}
          <Link
            href="/living-room/luxury-space"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/vlla.png"
                  alt="Luxury Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                 Vlla
                </span>

              </div>
                {/* Content */}

            </article>
          </Link>

          {/* Card 3 */}
          <Link
            href="/living-room/minimal-style"
            className="group block cursor-pointer"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">

              <div className="relative overflow-hidden rounded-2xl">

                <Image
                  src="/images/livingroom/bay.png"
                  alt="Minimal Living Room"
                  width={600}
                  height={450}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image
                    src="/images/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-18 px-5 py-2 rounded-tl-2xl rounded-tr-2xl shadow">
                  Bay
                </span>

              </div>
                  {/* Content */}


            </article>
          </Link>
        </div>

        )}



          <div className="mt-5 z-1 text-center">
            <FenestaButton>Explore our product</FenestaButton>
          </div>  



      </div>

    </section>
  );
}