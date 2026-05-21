"use client";

import HeroSlider from "@/app/homearchitect/HeroSlider";
import WindowDoorSection from "@/app/homearchitect/WindowDoorSection";
import Seeitlikeyourethere from "@/app/homearchitect/Seeitlikeyourethere";

import CircularSliders from "@/app/home/CircularSliders";
import ImageGallery from "@/app/homearchitect/image-gallery";
import SupportCards from "@/components/templates/SupportCards";


import VisitQuick from "@/app/home/visitquick";
import TrustedPartners from "@/app/home/TrustedPartners";
import ClientStories from "@/app/home/ClientStories";
import FenestaEdit from "@/app/home/FenestaEdit";
import HaveQuestion from "@/components/base/HaveQuestion";
import FenestaImageGallery from "@/components/templates/fenesta-image-gallery";

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

      {/* What’s New at Fenesta*/}
      <section className="common-padding w-full flex flex-col items-center ImageGallery-section">
        {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
            <div ref={sectionRef} className="w-full">
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                    <h2 className="text-h2 leading-none">What’s New at <span className="font-subFont text-corinthiaHeading text-brown">Fenesta</span></h2>
                </div>
            </div>
        </div> 

       <FenestaImageGallery />             
      </section>

      <SupportCards />
      
      <Seeitlikeyourethere />       
      <CircularSliders />
      <VisitQuick />
      <TrustedPartners />
      <ClientStories />
      <FenestaEdit />
      <HaveQuestion/>
    </main>
  );
}
