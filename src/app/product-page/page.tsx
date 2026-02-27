"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import BannerMain from "@/components/templates/productPage/bannerMain";
import ProductCards from "@/components/templates/productPage/ProductCards";

import "@/app/product-page/productpage.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ProductPage() {

  return (
    <section className="about-page w-full">
      {/*Banner Main*/}
      <BannerMain />

      {/* INTRO SECTION */}
      <section className="intro-section relative ">
        <div className="container">
          <div className="intro-heightlight mx-auto flex flex-row d:flex-col gap-y-10 gap-x-10 items-start -mt-[60px] rounded-sm bg-white p-6 relative z-20">   
            <div className="flex flex-col justify-center">
              <p className="first-intro-line font-normal leading-6 mb-4 text-center">
              Nunc suscipit lacinia ante, in fringilla dolor tincidunt non. Vestibulum lorem felis, efficitur at dolor auctor, lacinia pretium leo. In tincidunt augue dolor, ac dictum leo pretium sit amet. Morbi vitae ipsum ac magna volutpat pharetra. Etiam at enim sit amet eros ultrices finibus in eget risus.
              </p>                      
            </div>   
          </div>
        </div>
      </section>     

      {/*Product List*/} 
      <ProductCards />   
    </section>
  );
}
