"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import BannerMain from "./bannerMain";



import ProductStyles from "@/app/products/ProductStyles";
import Whyexperts from "@/app/products/Whyexperts";

import FenestaEdit from "@/components/FenestaEdit";
import HaveQuestion from "@/components/base/HaveQuestion";

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";
import ImageGallery from "@/components/image-gallery";
import ClientStories from "./ClientStories";
import Featureleftimgcollage from "./featureleftimgscollage";



gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function WindowsPage() {
  const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <section className="about-page w-full">
        {/*Banner Main*/}
        <BannerMain/>

       {/*Form section  */}
       <section className="content-over-banner">
            <div className="container mx-auto px-4">
              <div className="content-inside py-[50px] px-[150px]">
              <form>
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-[14px] mb-2 text-black">
                      Name<span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer bg-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[14px] mb-2 text-black">
                      Email ID<span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email ID"
                      className="w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer bg-transparent"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[14px] mb-2 text-black">
                      Phone No<span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your phone No"
                      className="w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer bg-transparent"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-[14px] mb-2 text-black">
                      Pincode<span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your pincode"
                      className="w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  
                  {/* State */}
                    <div className="flex flex-col gap-1 flex-1">
                    <label className="block text-[14px] mb-2 text-black">
                      Select
                    </label>

                    <div className="relative">
                    <select className="appearance-none w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 pr-12 text-[13px] outline-none bg-transparent text-[#8c8c8c] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer">
                      <option>Select</option>
                    </select>

                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <svg  className="w-3 h-3 text-[#8c8c8c]"  fill="none"  stroke="currentColor"  strokeWidth="2"  viewBox="0 0 24 24">
                      <path  strokeLinecap="round"  strokeLinejoin="round"  d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>


                  </div>

                  {/* Select */}
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="block text-[14px] mb-2 text-black">
                      Select
                    </label>

                    <div className="relative">
                    <select className="appearance-none w-full h-[42px] border border-[#d9d9d9] rounded-full px-5 pr-12 text-[13px] outline-none bg-transparent text-[#8c8c8c] focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer">
                      <option>Select</option>
                    </select>

                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#8c8c8c]"fill="none"stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-5 z-1 ">
                          <FenestaButton>Submit</FenestaButton>
                </div>  

                {/* Privacy Text */}
                <p className="text-[12px] text-black mt-4">
                  *By clicking submit button I agree that I have the{" "}
                  <a href="#" className="text-red-500 underline">
                    privacy policy
                  </a>
                </p>
              </form>
              </div>
            </div>
       </section> 

        {/* Image Gallery */}
        <section className="common-padding w-full flex flex-col items-center ImageGallery-section">
        {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
            <div ref={sectionRef} className="w-full">
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                    <h2 className="text-h2 leading-none">Our  <span className="font-subFont text-corinthiaHeading text-brown">Offerings</span></h2>
                </div>
            </div>
        </div> 
        <ImageGallery/> 

        <div className="mt-5  z-1">
          <FenestaButton href="#">Explore our Gallery</FenestaButton>
        </div>       
        </section>

       <ClientStories/>

        {/* Product Styles */}
        <section  className="common-padding w-full flex flex-col items-center  window-door-section white-gradient-background text-black">
            {/* Heading */}
            <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                <div ref={sectionRef} className="w-full">
                    <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto">
                        <h2 className="text-h2 leading-none">
                            Our top trending  
                            <span className="font-subFont text-corinthiaHeading text-brown">
                              products
                            </span>
                        </h2>
                    </div>
                </div>
            </div>     
    
            <ProductStyles id="product-styles" />
    
            <div className="mt-5 sm:-mt-10 z-1">
              <FenestaButton href="#">Explore our range</FenestaButton>
            </div>
        </section>    
    
      <Featureleftimgcollage/>

    </section>
  );
}
