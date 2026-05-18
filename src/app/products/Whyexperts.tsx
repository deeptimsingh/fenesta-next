"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./whyexperts.css";
gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: "/images/expertsicon/icon1.svg", title: "Low maintenance" },
  { icon: "/images/expertsicon/icon2.svg", title: "Energy efficient" },
  { icon: "/images/expertsicon/icon3.svg", title: "Weather resistant" },
  { icon: "/images/expertsicon/icon4.svg", title: "Termite resistant" },
  { icon: "/images/expertsicon/icon5.svg", title: "Excellent acoustic insulation" },
  { icon: "/images/expertsicon/icon6.svg", title: "Enhanced strength and security" },
  { icon: "/images/expertsicon/icon7.svg", title: "Rainwater insulation" },
] as const;

const cardClass =
  "feature-card group relative overflow-hidden rounded-[12px] border border-[#ece7e2] bg-black/20 px-5 py-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl";

const glowClass =
  "absolute inset-0 bg-gradient-to-b from-transparent to-[#f3eee8] opacity-0 transition-opacity duration-500 group-hover:opacity-100";

const titleClass =
  "relative z-10 text-[13px] font-medium leading-[1.5] text-[#4b3425] md:text-[15px]";

export default function Whyexperts() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll(".feature-card");
      const icons = root.querySelectorAll(".feature-icon");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.to(icons, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      ctx.revert();
      root.querySelectorAll(".feature-card").forEach((el) => {
        gsap.set(el, { clearProps: "opacity,transform" });
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="whyExperts-items-wrapper container">      
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {features.map((item) => (
            <article key={item.title} className={cardClass}>
              <div aria-hidden="true" className={glowClass} />

              <div className="relative z-10 mb-5 flex justify-center">
                <div className="feature-icon">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className={titleClass}>{item.title}</h3>
            </article>
          ))}
        </div>     
    </section>
  );
}
