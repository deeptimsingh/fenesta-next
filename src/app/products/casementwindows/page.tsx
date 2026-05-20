"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import BannerMain from "./bannerMain";
import Productspecifications from "./productspecifications";
import ProductStyles from "@/app/products/ProductStyles";

import FenestaEdit from "@/components/FenestaEdit";
import HaveQuestion from "@/components/base/HaveQuestion";

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

import "../allproducts-style.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Casementwindows() {
  const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <section className="about-page w-full">
      {/*Banner Main*/}
      <BannerMain/>

      {/* INTRO SECTION */}
      <section className="intro-section relative ">
        <div className="container">
          <div className="intro-heightlight mx-auto flex flex-row d:flex-col gap-y-10 gap-x-10 items-start -mt-[40px] sm:-mt-[60px] rounded-sm bg-white dark:bg-theme sm:p-6 relative z-20">   
            <div className="flex flex-col justify-center">
              <p className="first-intro-line font-normal leading-6 mb-4 text-center">Nunc suscipit lacinia ante, in fringilla dolor tincidunt non. Vestibulum lorem felis, efficitur at dolor auctor, lacinia pretium leo. In tincidunt augue dolor, ac dictum leo pretium sit amet. Morbi vitae ipsum ac magna volutpat pharetra. Etiam at enim sit amet eros ultrices finibus in eget risus.</p>                      
            </div>   
          </div>
        </div>
      </section>   

      {/* Product Styles */}
      <section  className="common-padding w-full flex flex-col items-center  window-door-section white-gradient-background text-black">
        {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
            <div ref={sectionRef} className="w-full">
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto">
                    <h2 className="text-h2 leading-none">
                    Available  
                        <span className="font-subFont text-corinthiaHeading text-brown">
                        designs
                        </span>
                    </h2>
                </div>
            </div>
        </div>     
        <ProductStyles id="available-designs" />        
      </section>  

     <Productspecifications/>

     {/* Ideal for use in*/}
     <section  className="common-padding w-full flex flex-col items-center  window-door-section white-gradient-background text-black">
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

        <ProductStyles id="ideal-for-use-in" />

        <div className="mt-5 z-1">
          <FenestaButton href="#">Explore Our Gallery</FenestaButton>
        </div>
      </section>

      {/* Have Questions */}
      <HaveQuestion/>

      {/* The Fenesta Edit */}
      <FenestaEdit/>
    </section>
  );
}
