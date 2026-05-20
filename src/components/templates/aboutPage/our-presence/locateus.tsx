"use client";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";
import ImageGallery from "@/components/image-gallery";


export default function Locateus() {
        const { headingRef, sectionRef } = useHeadingAnimation();
  return (
      <section className="common-padding w-full flex flex-col items-center ImageGallery-section">
              {/* Heading */}
              <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                  <div ref={sectionRef} className="w-full">
                      <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                          <h2 className="text-h2 leading-none">Locate <span className="font-subFont text-corinthiaHeading text-brown">us</span></h2>
                      </div>
                  </div>
              </div> 
              <ImageGallery/> 
      
              <div className="mt-5  z-1">
                <FenestaButton href="#">Explore our gallery</FenestaButton>
              </div>       
      </section>
  )
}
