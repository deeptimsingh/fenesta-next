"use client";
import React from 'react'

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function DesignedLiving() {
    const { headingRef, sectionRef } = useHeadingAnimation();

  return (

<section className="relative w-full py-20 px-6 overflow-hidden">

  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
    alt="Modern living background"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/65" />

  {/* Heading */}
  <div className="container-fluid m-auto px-6 md:px-0 relative z-10 md:mb-18 mb-5" >
    <div ref={sectionRef} className="w-full">
      <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-6xl mx-auto">
        <h2 className="text-h2 leading-none text-white">
          Designed for Modern  
          <span className="font-subFont text-corinthiaHeading text-white">
            Living Pro Tec
          </span>
        </h2>
      </div>
    </div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto">

    {/* Wrapper with vertical divider lines */}
    <div className="relative grid grid-cols-1 md:grid-cols-3">

      {/* Vertical divider lines — hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-white/50" />
      <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-white/50" />

      {/* Row 1 — Feature 1 */}
      <div className="text-center px-6 md:px-10 py-8 md:pb-12 md:pt-0 border-b border-white/20 md:border-b-0">
        <h3 className="text-white font-semibold text-p mb-3">
          Minimise Harmful Effect of Electrosmog
        </h3>
        <p className="text-white text-base leading-relaxed">
          An integrated advanced layer strip, powered by Environics technology, is embedded directly within the window and door structure to neutralise the potentially harmful effects of electrosmog.
        </p>
      </div>

      {/* Row 1 — Feature 2 */}
      <div className="text-center px-6 md:px-10 py-8 md:pb-12 md:pt-0 border-b border-white/20 md:border-b-0">
        <h3 className="text-white font-semibold text-p mb-3">
          Seamless Connectivity
        </h3>
        <p className="text-white text-base leading-relaxed">
          Mobile networks, Wi-Fi, and smart devices continue to function normally. The technology works around digital life, not against it.
        </p>
      </div>

      {/* Row 1 — Feature 3 */}
      <div className="text-center px-6 md:px-10 py-8 md:pb-12 md:pt-0 border-b border-white/20 md:border-b-0">
        <h3 className="text-white font-semibold text-p mb-3">
          Clinically Tested &amp; Validated
        </h3>
        <p className="text-white text-base leading-relaxed">
          Independently tested by leading medical institutions such as AIIMS, Medanta, Apollo &amp; Max Healthcare and validated against measurable health parameters—particularly for individuals in close proximity to multiple smart devices and electrical systems.
        </p>
      </div>

      {/* Row 2 — Feature 4 */}
      <div className="text-center px-6 md:px-10 py-8 md:pt-5 border-b border-white/20 md:border-b-0">
        <h3 className="text-white font-semibold text-p mb-3">
          Built to Last
        </h3>
        <p className="text-white text-base leading-relaxed">
          Maintains Fenesta's trusted standards of quality, safety and longevity.
        </p>
      </div>

      {/* Row 2 — Feature 5 */}
      <div className="text-center px-6 md:px-10 py-8 md:pt-5 border-b border-white/20 md:border-b-0">
        <h3 className="text-white font-semibold text-p mb-3">
          Available Across Fenesta Systems
        </h3>
        <p className="text-white text-base leading-relaxed">
          Compatible with Fenesta's wide range of window and door designs — no separate installation, no visible hardware.
        </p>
      </div>

    </div>
  </div>
</section>
  );
}