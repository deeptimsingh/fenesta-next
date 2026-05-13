"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import { useInsidePageBlurLoad } from "@/hooks/useInsidePageBlurLoad";
import BannerMain from "@/components/templates/aboutPage/bannerMain";
import JourneyTimeline from "@/components/templates/aboutPage/ourJourney";
import VisitQuick from "@/components/templates/aboutPage/visitquick";
import OnlyBgimageCaption from "@/components/templates/aboutPage/only-bgimage-caption";
import OurClients from "@/components/ClientStories";
import LeftRightStructure from "@/components/templates/aboutPage/LeftRightStructure";


import "@/components/templates/common.css";
import "@/components/templates/aboutPage/aboutus.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { pageBlurClass, isReady } = useInsidePageBlurLoad(1000);

  return (
    <section className={`about-page inside-page w-full ${pageBlurClass}`}>
       {/* Banner Main */}
      <BannerMain animationReady={isReady} />

      {/* Our Story / Our Presence */}
      <LeftRightStructure
        sections={[
          {
            imageSrc: "/images/about/our-story-img.webp",
            imageAlt: "Our Story",
            content: {
              title: "Our ",
              titleHighlight: "Story",
              description:
                "Propelled by innovation, anchored by our employees, and supported by our clients, Fenesta, part of the DCM Shriram Group, is today India's largest premium windows and doors brand.",
              ctaLabel: "Know More",
              ctaHref: "/about-us/ourstory",
            },
          },
          {
            imageSrc: "/images/about/our-presence-img.webp",
            imageAlt: "Our Presence",
            flipOnDesktop: true,
            content: {
              title: "Our ",
              titleHighlight: "Presence",
              description:
                "Fenesta straddles over 900 cities nationally and internationally. Our state-of-the-art factories, Signature Studios, sales offices, and dealer showrooms help us turn your dreams into reality.",
              ctaLabel: "Know More",
              ctaHref: "/about-us/our-presence",
            },
          },
        ]}
      />           

      {/* Our Journey*/}
      <JourneyTimeline />    

      {/* Sustainability */}
      <VisitQuick />

      {/*In This News*/}            
      <OnlyBgimageCaption />

      {/*Our Clients*/}
      <OurClients />
      
    </section>
  );
}
