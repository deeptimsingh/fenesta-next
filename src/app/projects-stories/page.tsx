"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import BannerMain from "./bannerMain";
import Customizeliking from "./ourprojects";

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import CertificationSlider from "./certificationslider";
import Testimonials from "./testimonials";
import OurProjects from "./ourprojects";




gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Casementwindows() {
  const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <section className="about-page w-full">
      {/*Banner Main*/}
      <BannerMain/>

      {/* our projects */}
      <OurProjects/>

       {/* Certification Slider */}
      <CertificationSlider/>

      {/* Testimonials */}
      <Testimonials/>

    </section>
  );
}
