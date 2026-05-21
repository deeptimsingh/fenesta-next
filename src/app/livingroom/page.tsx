"use client";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import Introsection from "./introsection";
import BannerMain from "./bannerMain";
import Roomcard from "./roomcard";
import HaveQuestion from "./HaveQuestion";

export default function Livingroom() {
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);

  return (
    <>  
      <section className={`inside-page w-full ${pageBlurClass}`}>
        <BannerMain animationReady={isReady} />
        <Introsection/>
        <Roomcard/>
        <HaveQuestion/>
        
      </section>  
    </>
  );
}
