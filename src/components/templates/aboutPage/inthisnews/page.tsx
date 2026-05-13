"use client";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import BannerMain from "@/components/templates/aboutPage/inthisnews/bannerMain";
import PressCard from "@/components/templates/aboutPage/inthisnews/PressCard";

import "@/components/templates/common.css";

export default function BlogPage() {
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
