"use client";
import React from 'react'

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import Infographicwrap from "./Infographicwrap";

export default function Whyexpertswrap() {
     const { headingRef, sectionRef } = useHeadingAnimation();
  return (
    <>
         {/*Why experts trust and customers love our uPVC doors */}
              <section className="common-padding w-full flex flex-col items-center whyExperts-section">
                {/* Heading */}
                <div className="container m-auto px-6 md:px-0 relative z-10">
                    <div ref={sectionRef} className="w-full">
                        <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto mb-10">
                            <h2 className="text-h2 leading-none">
                                 Why experts <span className="font-subFont text-corinthiaHeading text-brown">trust</span> and customers <span className="font-subFont text-corinthiaHeading text-brown">love</span> our uPVC <span className="font-subFont text-corinthiaHeading text-brown">doors</span>                        
                            </h2>
                        </div>
                    </div>
                </div> 
                <Infographicwrap/>
              </section>
    </>
  )
}