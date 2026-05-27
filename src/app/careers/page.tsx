"use client";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";

import BannerMain from "./bannerMain";
import SignatureStudio from "./leftrightsection";  
import CareerOpenings from "./careeropenings";
import CareerCards from "./careercards";
import LeftRightsection from "./leftrightsection";

export default function LocateUs() {
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000); 

  return (
    <>  
      <section className={`inside-page w-full ${pageBlurClass}`}>

      <BannerMain animationReady={isReady} /> 

     <LeftRightsection/>

      <CareerOpenings/> 

      <CareerCards/>  
   
        
      </section>  
    </>
      );
    }
