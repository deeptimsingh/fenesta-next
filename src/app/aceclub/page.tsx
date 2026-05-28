"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";


import BannerMain from "@/components/templates/aboutPage/our-presence/bannerMain";

import Locateus from "./locateus";
import BrochureSlider from "./brochureslider";
import BenefitsSlider from "./benefitsslider";
import ContactForm from "./contactform";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function About() {

    const { headingRef, sectionRef } = useHeadingAnimation();
  
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);


  


  return (
    <section className={`about-page w-full ${pageBlurClass}`}>
      {/*Banner Main*/}
      <BannerMain animationReady={isReady} />

      {/* INTRO SECTION */}
      <section className="intro-section relative content-over-banner">
        <div className="container">          
            <div className="content-inside bg-white rounded-tl-2xl rounded-tr-2xl ">        
              <div className="page-intro text-center">          
                <p className="text-22 text-theme dark:text-white sm:max-w-5xl mx-auto">
                Experience the remarkable partnership that seamlessly blends Fenesta's unparalleled expertise in Window Excellence with the imaginative genius of Architects
                </p>
              </div>
            </div> 
               
                   
        </div>
      </section>   

      <Locateus/>

      <BrochureSlider/>

      <BenefitsSlider/>
      <ContactForm/>


    </section>
  );
}
