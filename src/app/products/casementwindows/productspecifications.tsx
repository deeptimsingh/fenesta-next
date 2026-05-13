"use client";
import { useState } from "react";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function Productspecifications() {
  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

const [activeAccordion, setActiveAccordion] =
  useState<string>("technical");

const toggleAccordion = (accordion: string) => {
  setActiveAccordion(
    activeAccordion === accordion ? "" : accordion
  );
};



  return (
    <section className="productspecifications-section w-full bg-white overflow-hidden transition-colors duration-200 common-padding relative bg-darkbase">
       
        <div className="container m-auto px-6 md:px-0"> 
          <div ref={sectionRef} className="w-full">
              <div className="container" >
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full">
                  <h2 className="font-mainFont text-h2 leading-none"> Product <span className="font-subFont text-corinthiaHeading text-brown leading-0"> Specifications </span>
                  </h2>
                </div>
              </div>
          </div>
        </div>

        <div className="productspecifications-wrapper pt-15">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.8fr] gap-8 items-start">

                    {/* ================= LEFT SIDE ================= */}
                    <div className="space-y-4">
                        <div className="accordion-wrapper">

                            {/* HEADER */}
                            <button
                            onClick={() => toggleAccordion("technical")}
                            className="w-full flex items-center justify-between px-7 py-3 border-y border-[#d8d8d8] bg-[#F7F7F7]"
                            >
                            <h2 className="text-[22px] font-semibold text-black text-left">
                                Technical specification
                            </h2>

                            {/* ARROW */}
                            <span
                                className={`w-8 h-8 rounded-full border border-[#9b9b9b] flex items-center justify-center transition-all duration-300 ${
                                activeAccordion === "technical"
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#777"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <path d="M6 9l6 6 6-6" />
                                </svg>
                            </span>
                            </button>

                            {/* CONTENT */}
                            <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                activeAccordion === "technical"
                                ? "max-h-[5000px]"
                                : "max-h-0"
                            }`}
                            >

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Products Name
                                </div>

                                <div className="spec-value">
                                Casement doors
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Series
                                </div>

                                <div className="spec-value">
                                Luxury
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Introduction
                                </div>

                                <div className="spec-value">
                                Fenesta&apos;s new-generation uPVC casement doors are designed
                                for larger openings and are joined by multiple sashes in a
                                unique mechanism. Our highly accurate manufacturing processes
                                ensure that each door is completely secure and
                                well-insulated. Contemporary and stylish designs, the
                                casement doors can be customised in a variety of colour
                                options to suit every preference.
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                USP
                                </div>

                                <div className="spec-value">
                                With their side-hinged design, casement doors can swing
                                inwards or outwards with the twist of a handle. They can be
                                styled as single or double panels, and even as a French-door,
                                with a clear view of the outside.
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Insulation
                                </div>

                                <div className="spec-value">
                                Double sealing offers superior thermal and acoustic
                                insulation. Resists corrosion and warping.
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Locking
                                </div>

                                <div className="spec-value">
                                Multi-point system.
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Design
                                </div>

                                <div className="spec-value">
                                French Door, Combination Door with right-fixed, left-fixed or
                                top-fixed options
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                colour
                                </div>

                                <div className="spec-value flex items-center">
                                    <span className="w-5 h-5 rounded-full bg-[#2a2a2a] border border-[#999]" />
                                    <span className="w-5 h-5 rounded-full bg-[#4d4d4d] border border-[#999]" />
                                    <span className="w-5 h-5 rounded-full bg-[#7a552f] border border-[#999]" />
                                    <span className="w-5 h-5 rounded-full bg-[#d38a05] border border-[#999]" />
                                    <span className="text-[#888] text-sm ml-1">+</span>
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Glass thickness
                                </div>

                                <div className="spec-value">
                                4mm to 40mm
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Glass type
                                </div>

                                <div className="spec-value">
                                SG, DG, TG, SG Laminated, DG Laminated, Special Glass
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Height
                                </div>

                                <div className="spec-value">
                                3050
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Width
                                </div>

                                <div className="spec-value">
                                1130
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Weight
                                </div>

                                <div className="spec-value">
                                120
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Available
                                </div>

                                <div className="spec-value">
                                Retail
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b spec-row">
                                <div className="spec-title">
                                Application
                                </div>

                                <div className="spec-value">
                                Homes, offices, commercial spaces
                                </div>
                            </div>

                            {/* ROW */}
                            <div className="grid grid-cols-[180px_1fr] border-b border-[#d8d8d8] last:border-b">
                                <div className="spec-title">
                                Ideal for use in
                                </div>

                                <div className="spec-value">
                                Balconies / Large Openings / Villas and Luxury Residences
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="space-y-4">

                        {/* ARCHITECTURE */}
                        <div className="accordion-wrapper">

                            <button
                                onClick={() => toggleAccordion("architecture")}
                                className="w-full flex items-center justify-between px-7 py-3 border-y border-[#d8d8d8] bg-[#F7F7F7]"
                            >
                                <span className="text-[20px] font-semibold text-black">
                                Architecture Files
                                </span>

                                <span
                                className={`w-8 h-8 rounded-full border border-[#9b9b9b] flex items-center justify-center transition-all duration-300 ${
                                    activeAccordion === "architecture"
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#777"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                activeAccordion === "architecture"
                                    ? "max-h-96"
                                    : "max-h-0"
                                }`}
                            >
                                <div className="px-7 pb-6 space-y-3 mt-5">
                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Architecture-file.pdf
                                </a>

                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Floor-plan.pdf
                                </a>
                                </div>
                            </div>
                        </div>

                        {/* DOWNLOADS */}
                        <div className="accordion-wrapper">

                            <button
                                onClick={() => toggleAccordion("downloads")}
                                className="w-full flex items-center justify-between px-7 py-3 border-y border-[#d8d8d8] bg-[#F7F7F7]"
                            >
                                <span className="text-[20px] font-semibold text-black">
                                Downloads
                                </span>

                                <span
                                className={`w-8 h-8 rounded-full border border-[#9b9b9b] flex items-center justify-center transition-all duration-300 ${
                                    activeAccordion === "downloads"
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#777"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                activeAccordion === "downloads"
                                    ? "max-h-96"
                                    : "max-h-0"
                                }`}
                            >
                                <div className="px-7 pb-6 space-y-3 mt-5">
                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Product-catalogue.pdf
                                </a>

                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Technical-sheet.pdf
                                </a>
                                </div>
                            </div>
                        </div>

                        {/* Brochures */}
                        <div className="accordion-wrapper">

                            <button
                                onClick={() => toggleAccordion("brochures")}
                                className="w-full flex items-center justify-between px-7 py-3 border-y border-[#d8d8d8] bg-[#F7F7F7]"
                            >
                                <span className="text-[20px] font-semibold text-black">
                                Brochures
                                </span>

                                <span
                                className={`w-8 h-8 rounded-full border border-[#9b9b9b] flex items-center justify-center transition-all duration-300 ${
                                    activeAccordion === "brochures"
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#777"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                activeAccordion === "brochures"
                                    ? "max-h-96"
                                    : "max-h-0"
                                }`}
                            >
                                <div className="px-7 pb-6 space-y-3 mt-5">
                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Product-catalogue.pdf
                                </a>

                                <a
                                    href="#"
                                    className="block hover:text-black transition spec-list"
                                >
                                    Technical-sheet.pdf
                                </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
       
    </section>
  );
}
