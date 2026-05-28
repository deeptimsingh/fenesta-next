"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";


import BannerMain from "@/components/templates/aboutPage/our-presence/bannerMain";


import ContactForm from "./contactform";
import OfficeCards from "./officecards";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function About() {

    const { headingRef, sectionRef } = useHeadingAnimation();
  
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);


  


  return (
    <section className={`about-page w-full ${pageBlurClass}`}>
      {/*Banner Main*/}
      <BannerMain animationReady={isReady} />

      <ContactForm/>

      <OfficeCards/>


    </section>
  );
}
