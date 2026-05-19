"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import BannerMain from "./bannerMain";
import Introsection from "./introsection";
import Endtoendsolutions from "./endtoendsolutions";
import Visitquick from "./visitquick";
import Finestaedge from "./fenestaedge";
import Countersection from "./countersection";
import Sciencework from "./sciencework";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Fenestadifference() {

  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);

  return (
    <section className={`about-page w-full ${pageBlurClass}`}>
      <BannerMain/>
      <Introsection/>
      <Endtoendsolutions/>
      <Visitquick/>
      <Finestaedge/>
      <Countersection/>
      <Sciencework/>
    </section>
  )
}
