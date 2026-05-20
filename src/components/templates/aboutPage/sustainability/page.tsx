"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import BannerMain from "./bannerMain";
import Introsection from "./introsection";
import Featureleftimg from "./featureleftimgs";
import Featurerightimg from "./featurerightimgs";
import Featureleftimgcollage from "./featureleftimgscollage";
import Featureleftimgsplain from "./featureleftimgplain";
import Globalstandards from "./globalstandards";



gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Page() {

const { pageBlurClass } = useInsidePageBlurLoad(1000);


  return (

    <section className={`about-page w-full ${pageBlurClass}`}>
      <BannerMain/>
      <Introsection/>
      <Featureleftimg/>
      <Featurerightimg/>
      <Featureleftimgcollage/>
      <Globalstandards/>
      <Featureleftimgsplain/>
    </section>
  );
}
