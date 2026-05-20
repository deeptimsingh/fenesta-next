"use client";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";
import Image from "next/image";

export default function Awardsaccreditations() {
            const { headingRef, sectionRef } = useHeadingAnimation();

  return (
    <section className="common-padding w-full flex flex-col items-center ImageGallery-section">
                  {/* Heading */}
                  <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                      <div ref={sectionRef} className="w-full">
                          <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                              <h2 className="text-h2 leading-none">Awards <span className="font-subFont text-corinthiaHeading text-brown">and Accreditations</span></h2>
                          </div>
                      </div>
                  </div>  

                <div className="container">
                    <div className="press-card-outer flex flex-wrap justify-center mt-10! w-full">
                        <div className="press-card cardreveal">
                            <div className="press-card-inner">
                                <div className="press-card-image">
                                    <Image
                                        src="/images/demo.jpg"
                                        alt="Press Image"
                                        width={400}
                                        height={200}
                                        className="w-full object-contain cardreveal-image"
                                    />
                                </div>
                                <div className="press-card-text">
                                    <span>2025-26</span>
                                    <p className="mt-2">  Superbrands India </p>
                                </div>
                            </div>
                        </div>
                        <div className="press-card cardreveal">
                            <div className="press-card-inner">
                                <div className="press-card-image">
                                    <Image
                                        src="/images/demo.jpg"
                                        alt="Press Image"
                                        width={400}
                                        height={200}
                                        className="w-full object-contain cardreveal-image"
                                    />
                                </div>
                                <div className="press-card-text">
                                    <span>2024-25</span>
                                    <p className="mt-2">  Iconic Brand of India 2025 by ET Now </p>
                                </div>
                            </div>
                        </div>
                        <div className="press-card cardreveal">
                            <div className="press-card-inner">
                                <div className="press-card-image">
                                    <Image
                                        src="/images/demo.jpg"
                                        alt="Press Image"
                                        width={400}
                                        height={200}
                                        className="w-full object-contain cardreveal-image"
                                    />
                                </div>
                                <div className="press-card-text">
                                    <span>2023-24</span>
                                    <p className="mt-2">  Sustainable Organisation </p>
                                </div>
                            </div>
                        </div>
                        <div className="press-card cardreveal">
                            <div className="press-card-inner">
                                <div className="press-card-image">
                                    <Image
                                        src="/images/demo.jpg"
                                        alt="Press Image"
                                        width={400}
                                        height={200}
                                        className="w-full object-contain cardreveal-image"
                                    />
                                </div>
                                <div className="press-card-text">
                                    <span>2022-23</span>
                                    <p className="mt-2">  BRAND OF THE YEAR </p>
                                </div>
                            </div>
                        </div>
                    </div>
          
                  <div className="mt-5  z-1 text-center">
                    <FenestaButton href="#">view more</FenestaButton>
                  </div>    
                </div>   
          </section>
  )
}
