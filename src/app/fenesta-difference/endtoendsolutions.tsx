"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

gsap.registerPlugin(ScrollTrigger);

export default function Endtoendsolutions() {
    const { headingRef, sectionRef } = useHeadingAnimation();

    useEffect(() => {
        const items = gsap.utils.toArray(".parallax-item");

        items.forEach((item: any) => {
            const image = item.querySelector(".parallax-image");

            gsap.fromTo(
                image,
                {
                    y: -40,
                },
                {
                    y: 40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="common-padding w-full flex flex-col items-center ImageGallery-section">

            {/* Heading */}
            <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                            End-to-End{" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                Solutions
                            </span>
                        </h2>

                        <p className="mt-3 mb-10 ">
                            Dream. Meet Design.
                        </p>
                    </div>
                </div>
            </div>

            <section className="w-full">

                <div className="w-full">

                    {/* Banner Image */}
                    <div className="w-full overflow-hidden parallax-item">

                        <div className="parallax-image">
                            <Image
                                src="/images/fenesta-difference/modern-minimalist-living-room-design.png"
                                alt="Fenesta"
                                width={1920}
                                height={800}
                                className="w-full h-full object-cover  scale-110"
                            />
                        </div>

                    </div>

                    {/* Content */}
                    <div className="container">

                        <div className="py-10 lg:py-16">

                            <div className="columns-1 lg:columns-2 lg:gap-16 gap-6">

                                <p className="mb-1">
                                    Fenesta offers an exclusive range of end-to-end
                                    windows and doors solutions that can meet and surpass customer expectations.
                                    From consultation to design, from choice of products to customisation,
                                    from site survey to manufacturing,
                                    installation to after-sales support, Fenesta provides an integrated approach of one team, one process,
                                    and one point of responsibility.
                                </p>

                                <p className="mb-1">
                                    Our integrated approach has ensured that Fenesta has been a trusted partner for fenestration
                                    solutions in India for decades.
                                    Whether it is new installations or replacement windows and doors, Fenesta’s end-to-end solutions make your experience as
                                    stress-free as possible. Quality is consistent, timelines are predictable, and service is exemplary.
                                </p>

                                <p className="mb-1">
                                    Whether your home is traditional, modern or a mixture of both,
                                    our wide range of options will inspire your dreams to take flight.
                                    Our meticulously crafted window and door solutions help bring out the beauty of your home.
                                </p>

                                <p className="mb-1">
                                    We have unmatched execution capabilities,
                                    and have set a national record for the largest order executed in the country – 70,000 windows.
                                    But whether it is ten windows or a thousand,
                                    meticulous planning, precise execution, synchronised teamwork and comprehensive project management go into each project.
                                    Our trained professionals have a collective experience of more than five lakh installations across the country.
                                </p>

                                <p className="mb-1">
                                    Fenesta also offers same-day replacement for windows – the only manufacturer in India to do so.
                                    This means that you have no hassle, no mess,
                                    and no disturbance to your normal life.
                                    And all this is complemented by our unmatched commitment to customer satisfaction.
                                </p>

                                <p className="mb-1">
                                    Because building or renovation can be so stressful,
                                    we go out of our way to make your experience as stress-free as possible.
                                    Our 365-day customer service will help resolve your queries and concerns.
                                    That is our promise to you – reliable support,
                                    prompt assistance, and peace of mind.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </section>
    );
}