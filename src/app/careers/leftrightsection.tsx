"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";






export default function LeftRightsection() {
 const sectionRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const cards =
    sectionRef.current?.querySelectorAll(".culture-card");

  cards?.forEach((card) => {
    const image = card.querySelector(".parallax-img");

    if (!image) return;

    /* ===============================
       IMAGE PARALLAX
    =============================== */
    gsap.fromTo(
      image,
      {
        yPercent: -8,
        scale: 1.1,
      },
      {
        yPercent: 8,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      }
    );

    /* ===============================
       CONTENT FADE-UP
    =============================== */
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);
 
  return (
    <section
      ref={sectionRef}
      className="intro-section relative content-over-banner md:pb-20"
    >
      <div className="container ">
        <div className=" content-inside space-y-10 md:space-y-28 md:px-20">

          {/* ROW 1 */}
          <div className="culture-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* IMAGE */}
            <div >
              <div className="overflow-hidden rounded-xl">
                <div className="parallax-img will-change-transform">
                  <Image
                    src="/images/careers/life-at-fenesta.png"
                    alt="Discover Life at Fenesta"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-22 font-semibold mb-5 text-black">
                Discover Life at Fenesta
              </h2>

              <p >
                At Fenesta, we are united by a shared passion for collaboration, innovation, and excellence. We are not just building a future for windows and doors; we are building reliability, trust, a reputation for unparalleled service, and the careers of those driven by innovation. Fenesta offers a supportive team environment that fosters holistic growth, providing employees with dynamic roles and responsibilities that allow them to grow every day. Complementing this, our tailored programs are thoughtfully designed to support each individual’s professional journey and personal aspirations. We empower our employees to “be the change” in improving themselves and provide them with a platform to exhibit their skills.
              </p>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="culture-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-22  font-semibold mb-5 text-black">
                Your Growth, Our Commitment
              </h2>

              <p >
                At Fenesta, we are united by a shared passion for collaboration, innovation, and excellence. We are not just building a future for windows and doors; we are building reliability, trust, a reputation for unparalleled service, and the careers of those driven by innovation. Fenesta offers a supportive team environment that fosters holistic growth, providing employees with dynamic roles and responsibilities that allow them to grow every day. Complementing this, our tailored programs are thoughtfully designed to support each individual’s professional journey and personal aspirations. We empower our employees to “be the change” in improving themselves and provide them with a platform to exhibit their skills.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-xl">
                <div className="parallax-img will-change-transform">
                  <Image
                    src="/images/careers/your-growth.png"
                    alt="Your Growth, Our Commitment"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="culture-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* IMAGE */}
            <div>
              <div className="overflow-hidden rounded-xl">
                <div className="parallax-img will-change-transform">
                  <Image
                    src="/images/careers/celebartion.png"
                    alt="Celebrate the Moments That Matter"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-22 font-semibold mb-5 ">
                Celebrate the Moments That Matter
              </h2>

              <p >
                At Fenesta, we are united by a shared passion for collaboration, innovation, and excellence. We are not just building a future for windows and doors; we are building reliability, trust, a reputation for unparalleled service, and the careers of those driven by innovation. Fenesta offers a supportive team environment that fosters holistic growth, providing employees with dynamic roles and responsibilities that allow them to grow every day. Complementing this, our tailored programs are thoughtfully designed to support each individual’s professional journey and personal aspirations. We empower our employees to “be the change” in improving themselves and provide them with a platform to exhibit their skills.
              </p>
            </div>
          </div>

        </div>
      </div>


    </section>
  );
}