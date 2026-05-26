import Image from "next/image";
import Link from "next/link"; 

import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function SupportCards() {
     // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <section className="w-full support-cards common-padding">
      <div className="container mx-auto">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Card 1 — Design */}
          <div className="group relative min-h-[260px] overflow-hidden lg:min-h-[435px] support-cards-item">
            <div className="absolute inset-0">
              <Image  src="/images/design-card.webp" alt="Everything You Need to Design" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-sky-500/80" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white lg:p-10">             
                {/* Heading */}
                <div className="heading-outer relative z-10 max-w-120">
                    <div ref={sectionRef} className="w-full">
                        <div ref={headingRef} className="title-section text-left flex flex-col justify-start w-full max-w-full md:max-w-4xl mx-auto">
                            <h2 className="text-h2 leading-tight"> Everything You Need to <span className="font-subFont text-corinthiaHeading text-white">Design</span></h2>
                        </div>
                    </div>
                </div> 

              <div className="mt-8 space-y-4">
                <Link href="#" className="group/item flex items-center justify-between border-b border-white/40 pb-2 text-p transition-all hover:border-white">
                  <span>DWG &amp; CAD Files</span>
                  <span className="translate-x-0 transition-transform duration-300 group-hover/item:translate-x-1">
                     <Image src="/images/download-icon.svg" className="w-6 h-6" alt="DWG & CAD Files" width={24} height={24} />
                  </span>
                </Link>

                <Link href="#" className="group/item flex items-center justify-between border-b border-white/40 pb-2 text-p transition-all hover:border-white "
                >
                  <span>Installation guides</span>
                  <span className="translate-x-0 transition-transform duration-300 group-hover/item:translate-x-1">
                     <Image src="/images/download-icon.svg" className="w-6 h-6" alt="Installation guides" width={24} height={24} />
                  </span>
                </Link>

                <Link
                  href="#"
                  className="group/item flex items-center justify-between border-b border-white/40 pb-2 text-sm transition-all hover:border-white lg:text-base"
                >
                  <span>Specification sheets</span>
                  <span className="translate-x-0 transition-transform duration-300 group-hover/item:translate-x-1">
                     <Image src="/images/download-icon.svg" className="w-6 h-6" alt="Specification sheets" width={24} height={24} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 — Support */}
          <div className="group relative min-h-auto overflow-hidden lg:min-h-[435px] support-cards-item">
            <div className="absolute inset-0">
              <Image
                src="/images/support-card.webp"
                alt="Get Expert Support"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white lg:p-10">
                {/* Heading */}
                <div className="heading-outer relative z-10 max-w-120">
                    <div ref={sectionRef} className="w-full">
                        <div ref={headingRef} className="title-section text-left flex flex-col justify-start w-full max-w-full md:max-w-4xl mx-auto">
                            <h2 className="text-h2 leading-tight"> Get Expert <span className="font-subFont text-corinthiaHeading text-white">Support</span></h2>
                        </div>
                    </div>
                </div> 
              

              <div className="mt-8">
                
                <FenestaButton>REQUEST A CONSULT</FenestaButton>
               
              </div>
            </div>
          </div>    
        </div>
      </div>
    </section>
  );
}
