"use client";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import BannerMain from "@/components/templates/aboutPage/awards/bannerMain";
import PressCard from "@/components/templates/aboutPage/awards/PressCard";

import "@/components/templates/common.css";

export default function AwardsPage() {
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);

  return (
    <>  
      <section className={`inside-page w-full ${pageBlurClass}`}>
        <BannerMain animationReady={isReady} /> 
        <PressCard /> 
      </section>  
    </>
  );
}
