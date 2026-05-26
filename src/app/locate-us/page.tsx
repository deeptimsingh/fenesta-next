"use client";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";



import SignatureStudio from "./signaturestudio";
import BannerMain from "./bannerMain";

export default function LocateUs() {
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);

  return (
    <>  
      <section className={`inside-page w-full ${pageBlurClass}`}>

      <BannerMain animationReady={isReady} /> 
   
        <SignatureStudio/>    
   
        
      </section>  
    </>
      );
    }
