"use client";
import React, { use } from 'react'
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import ProductStyles from "@/app/products/ProductStyles";

export default function Productstyleswrap() {
  const { headingRef, sectionRef } = useHeadingAnimation();


  return (
    <>
{/* Product Styles */}
    <section className="common-padding w-full flex flex-col items-center window-door-section  text-black">
      {/* Heading */}
      <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
        <div ref={sectionRef} className="w-full">
          <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto">
            <h2 className="text-h2 leading-none">
              Product
              <span className="font-subFont text-corinthiaHeading text-brown">
                Styles
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Product cards */}
       <div className=" flex items-center justify-center p-8 mt-4">
          <div className="w-full max-w-8xl grid grid-cols-2 gap-4">
 
        {/* Card 1 - Handle */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/2]"
         
        >
          <img
            src="/images/other-accessories/handle.webp"
            alt="Modern door handle on a grey door"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 flex items-center justify-between px-4 py-3">
            <span className="text-white text-base font-light tracking-wide">
              Handle
            </span>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-sky-400 hover:bg-sky-500 hover:scale-110 transition-all duration-300 ease-out"
              aria-label="Go to Handle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
 
        {/* Card 2 - Other Accessories */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/2]"
        
        >
          <img
            src="/images/other-accessories/other-accessories.webp"
            alt="Modern building facade with glass and wood"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 flex items-center justify-between px-4 py-3">
            <span className="text-white text-base font-light tracking-wide">
              Other Accessories
            </span>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-sky-400 hover:bg-sky-500 hover:scale-110 transition-all duration-300 ease-out"
              aria-label="Go to Other Accessories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
 
         </div>
       </div>



    </section>  
    </>
  )
}
