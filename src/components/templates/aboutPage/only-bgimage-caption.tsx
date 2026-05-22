"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useOnlyBgImageCaptionAnimation } from "@/hooks/useOnlyBgImageCaptionAnimation";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

export type OnlyBgImageCaptionProps = {
  image?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULTS: Required<OnlyBgImageCaptionProps> = {
  image: "/images/about/in-the-news-bg1.webp",
  title: "In the News",
  description: "Want to know what's new? Stay connected through our media reports, press releases, events, blogs and customer stories.",
  ctaLabel: "KNOW MORE",
  ctaHref: "/about-us/inthisnews",
};

export default function OnlyBgImageCaption(props: OnlyBgImageCaptionProps) {
  const { image, title, description, ctaLabel, ctaHref } = { ...DEFAULTS, ...props };
  const [captionRevealDone, setCaptionRevealDone] = useState(false);
  const onCaptionRevealComplete = useCallback(() => setCaptionRevealDone(true), []);

  const sectionRefBgImageCaption = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useOnlyBgImageCaptionAnimation(
    { sectionRef: sectionRefBgImageCaption, frameRef, bgRef, captionRef, overlayRef },
    { onCaptionRevealComplete }
  );
  const { headingRef, sectionRef } = useHeadingAnimation({ startWhen: captionRevealDone });

  return (
    <section ref={sectionRefBgImageCaption} className="relative w-full only-bgimage-caption-outer bg-white dark:bg-theme/15">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full w-full flex items-center justify-center overflow-hidden">
          <div ref={frameRef} className="relative overflow-hidden w-screen h-screen rounded-[80px] will-change-transform">
            <div ref={bgRef} className="absolute inset-0 will-change-transform scale-[1.5]">
              <Image src={image} alt="" fill className="object-cover" />
            </div>

            <div
              ref={overlayRef}
              className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent only-bgimage-caption-overlay z-1"
              aria-hidden
            />
          </div>

          <div ref={captionRef} className="container absolute inset-y-0 z-10 flex items-center py-16 md:py-20 only-bgimage-caption-caption">
            <div ref={sectionRef} className="w-full max-w-lg title-section">          
              <div ref={headingRef} className="title-section text-left flex flex-col justify-center w-full gap-y-5">
                <h2 className="text-h2 leading-none text-theme ">{title}</h2>
                <div className="headingSubTitle flex flex-col justify-center w-full gap-y-5">  
                  <p className=" max-w-full">{description}</p>  
                   
                  <div className="flex flex-col justify-start items-start flex-wrap">
                  
                        <FenestaButton  href={ctaHref}> {ctaLabel}t</FenestaButton>
                                     
                  </div>  
                </div>         
              </div>           
            </div>           
          </div>
          
        </div>
      </div>
    </section>
  );
}
