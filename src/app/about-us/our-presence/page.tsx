"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import Image from "next/image";

import BannerMain from "@/components/templates/aboutPage/our-presence/bannerMain";
import Countersection from "./countersection";
import Visitquick from "./visitquick";
import ClientStories from "@/components/ClientStories-old";
import FenestaEdit from "./FenestaEdit";
import Locateus from "./locateus";
import Awardsaccreditations from "./awardsaccreditations";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function About() {

    const { headingRef, sectionRef } = useHeadingAnimation();
  
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);
  // const imageRefs = useRef<HTMLDivElement[]>([]);
  // const addToRefs = (el: HTMLDivElement | null) => {
  //   if (el && !imageRefs.current.includes(el)) {
  //     imageRefs.current.push(el);
  //   }
  // };

  


  return (
    <section className={`about-page w-full ${pageBlurClass}`}>
      {/*Banner Main*/}
      <BannerMain animationReady={isReady} />

      {/* INTRO SECTION */}
      <section className="intro-section relative content-over-banner">
        <div className="container">          
            <div className="content-inside bg-white rounded-tl-2xl rounded-tr-2xl "> 

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 pb-15">

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                       <Image src="/images/about/our-presence/svg-1.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                     2000+ Direct Sales <br className="hidden sm:block" />
                      Representatives
                    </h3>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                      <Image src="/images/about/our-presence/svg-2.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      400+ Channel <br className="hidden sm:block" />
                      Partner Showrooms
                    </h3>
                  </div>
            
                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                      <Image src="/images/about/our-presence/svg-3.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      9 Signature <br className="hidden sm:block" />
                      Studios
                    </h3>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                      <Image src="/images/about/our-presence/svg-4.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      20 Sales Offices  <br className="hidden sm:block" />
                      & 8 Factories
                    </h3>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                     <Image src="/images/about/our-presence/svg-5.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      Serving in  <br className="hidden sm:block" />
                      900 Cities
                    </h3>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                     <Image src="/images/about/our-presence/svg-6.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      Part of 1889 Est. <br className="hidden sm:block" />
                      DCM Shriram group
                    </h3>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="mb-4">
                    <Image src="/images/about/our-presence/svg-7.svg" alt="" width={76} height={76} sizes="100vw" className="object-cover relative"  />
                    </div>

                    <h3 className="text-14 font-normal text-brown leading-normal text-start">
                      India's Largest <br className="hidden sm:block" />
                      Windows & Doors brand
                    </h3>
                  </div>
                  
              </div>       
              <div className="page-intro text-center">          
                <p className="text-22 text-theme dark:text-white sm:max-w-5xl mx-auto">
                 Brand Fenesta has a wide-ranging network of manufacturing and distribution locations, and showrooms that guarantees complete control over the entire supply chain of window and door manufacturing and installation. Safety, quality and sustainability are core to how we work. We use the hub-and-spoke model to serve customers in every region of India. Our network comprises:
                </p>
              </div>
            </div> 
               
                   
        </div>
      </section>   

      <Countersection/>
      <Locateus/>
      <Visitquick/>
      <Awardsaccreditations/>
      <FenestaEdit/>
      <ClientStories/>

     
    </section>
  );
}
