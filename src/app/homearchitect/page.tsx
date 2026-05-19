"use client";

import HeroSlider from "@/app/homeowner/HeroSlider";
import WindowDoorSection from "@/app/homeowner/WindowDoorSection";
import TrustedPartners from "@/app/homeowner/TrustedPartners";
import ClientStories from "@/app/homeowner/ClientStories";
import CircularSliders from "@/app/home/CircularSliders";
import VisitQuick from "@/app/homeowner/visitquick";
import FenestaEdit from "@/app/homeowner/FenestaEdit";
import ImageGallery from "@/app/homeowner/image-gallery";
import HaveQuestion from "@/components/base/HaveQuestion";

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

import "@/app/homeowner/homepage-style.css";

export default function HomeownerPage() {
    
  const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <main className="min-h-screen">
      <HeroSlider />     
      <WindowDoorSection />   

      {/* Image Gallery */}
      <section className="common-padding w-full flex flex-col items-center ImageGallery-section">
        {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
            <div ref={sectionRef} className="w-full">
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                    <h2 className="text-h2 leading-none">Images <span className="font-subFont text-corinthiaHeading text-brown">Gallery</span></h2>
                </div>
            </div>
        </div> 
        <ImageGallery/> 

        <div className="mt-5  z-1">
          <FenestaButton>Explore our Gallery</FenestaButton>
        </div>       
      </section>

      <VisitQuick />
      <CircularSliders />
      <TrustedPartners />
      <ClientStories />
      <FenestaEdit />
      <HaveQuestion/>
    </main>
  );
}
