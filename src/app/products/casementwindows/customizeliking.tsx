"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { initCardReveal } from "@/components/base/cardReveal";
import Link from "next/link";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

import "./slider.css";




export default function Customizeliking() {

   const { sectionRef, headingRef } = useHeadingAnimation();

  const colorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colorContainerRef = useRef<HTMLDivElement>(null);

  const [activeColor, setActiveColor] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  const handleSubmit = () => {
    console.log({ selectedCountry, selectedState, selectedCity, selectedBlock });
  };

 
  const [activeTab, setActiveTab] = useState("colors");

  const containerRef = useRef<HTMLDivElement>(null);
  const revealCtxRef = useRef<ReturnType<typeof initCardReveal> | null>(null);


  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealCtxRef.current?.revert();

        revealCtxRef.current = initCardReveal({
          container,
          cardSelector: ".cardreveal",
          imageSelector: ".cardreveal-image",
        });
      });
    });

    return () => {
      cancelAnimationFrame(id);
      revealCtxRef.current?.revert();
    };
  }, []);


  // Color change animation scroll into view
  useEffect(() => {
  const container = containerRef.current;

  if (!container) return;

  const id = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealCtxRef.current?.revert();

      revealCtxRef.current = initCardReveal({
        container,
        cardSelector: ".cardreveal",
        imageSelector: ".cardreveal-image",
      });
    });
  });

  return () => {
    cancelAnimationFrame(id);
    revealCtxRef.current?.revert();
    revealCtxRef.current = null;
  };
}, [activeTab]);

useEffect(() => {
  if (window.innerWidth >= 768) return;

  const container = colorContainerRef.current;
  const activeElement = colorRefs.current[activeColor - 1];

  if (!container || !activeElement) return;

  container.scrollTo({
    left:
      activeElement.offsetLeft -
      container.offsetWidth / 2 +
      activeElement.offsetWidth / 2,
    behavior: "smooth",
  });
}, [activeColor]);


  return (
    <section className=" w-full py-10 md:common-padding">

      {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">Customize to  <span className="font-subFont text-corinthiaHeading text-brown">your liking</span></h2>
                                 
                             </div>
                         </div>
                     </div>  
      <div className="container">
        <div className="content ">

            {/* Tabs */}
            <div className="tab-outer flex justify-center w-full py-10">

              <div className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-18 leading-normal">

                <button
                  data-tab="colors"
                  type="button"
                  onClick={() => setActiveTab("colors")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "colors"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                Color
                </button>

                <button
                  data-tab="glass"
                  type="button"
                  onClick={() => setActiveTab("glass")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "glass"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                  Glass
                </button>
                <button
                  data-tab="handle"
                  type="button"
                  onClick={() => setActiveTab("handle")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "handle"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                  Handle
                </button>
                  <button
                  data-tab="meshgrill"
                  type="button"
                  onClick={() => setActiveTab("meshgrill")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "meshgrill"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                Mesh & grill
                </button>

                

              </div>

            </div>

        


            {/* COlors Room Cards */}
            {activeTab === "colors" && (

              <div
                ref={containerRef}
                className="studio-card-wrapper   gap-8"
              >


            <section className=" pt-10 md:py-10 bg-white">
          

                {/* Main Image */}
                <div className="relative">

                  <div className="relative overflow-hidden rounded-[24px] h-[350px] md:h-[650px]">

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 1
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 2
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 3
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 4
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 5
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 6
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                    <Image
                      src="/images/customizeslider/color-img.png"
                      alt=""
                      fill
                      className={`object-cover transition-all duration-700 ${
                        activeColor === 7
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 absolute inset-0"
                      }`}
                    />

                  </div>

                  {/* Color Selector */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-[80%] md:translate-y-[75%] z-20">

                    <div ref={colorContainerRef}  className="color-selector flex justify-start md:justify-center gap-2 md:gap-16 overflow-x-auto md:overflow-visible px-6 md:px-0 py-3 scrollbar-hide snap-x snap-mandatory w-full">

                 
              
                      {/* Walnut */}
                      <div
                        ref={(el) => {
                        colorRefs.current[0] = el;
                      }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(1)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 1
                              ? "border-[#8B5A2B] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/walnut.png"
                              alt="Walnut"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Walnut</p>
                      </div>
                  
                      {/* Midnight black */}
                      <div
                        ref={(el) => {
                          colorRefs.current[1] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(2)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 2
                              ? "border-[#000000] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/midnight-black.png"
                              alt="Midnight black"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Midnight  black</p>
                      </div>

                      {/* Diamond grey */}
                      <div
                        ref={(el) => {
                          colorRefs.current[2] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(3)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 3
                              ? "border-[#5a5755] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/diamond-grey.png"
                              alt="Diamond grey"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Diamond grey</p>
                      </div>
                      {/* Champagne gold */}
                       <div
                        ref={(el) => {
                          colorRefs.current[3] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(4)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 4
                              ? "border-[#fcda90] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/champagnegold.png"
                              alt="Walnut"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Champagne gold</p>
                      </div>

                      {/* Light oak */}
                      <div
                        ref={(el) => {
                          colorRefs.current[4] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(5)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 5
                              ? "border-[#ceb89b] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/light-oak.png"
                              alt="Light oak"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Light oak</p>
                      </div>

                      {/* pristine white */}
                      <div
                        ref={(el) => {
                          colorRefs.current[5] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(6)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 6
                              ? "border-[#fafafa] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/pristine-white.png"
                              alt="Pristine white"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">pristine white</p>
                      </div>

                      {/* Ocean blue */}
                       <div
                        ref={(el) => {
                          colorRefs.current[6] = el;
                        }}
                        className="text-center cursor-pointer shrink-0 snap-center"
                        onClick={() => setActiveColor(7)}
                      >
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-full border-2 transition-all duration-300 ${
                            activeColor === 7
                              ? "border-[#2f7eb3] scale-110 shadow-xl"
                              : "border-transparent"
                          }`}
                        >
                          <div className="relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden">
                            <Image
                              src="/images/customizeslider/ocean-blue.png"
                              alt="Ocean blue"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-lg">Ocean blue</p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Space for circles overlap */}
                <div className="h-40"></div>

              
            </section>

        

              </div>

            )}
            {/* glass Interior Cards */}
            {activeTab === "glass" && (

          <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-10"
              >

                  {/* Card 1 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 2 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 3 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 4 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>


              </div>
            )}
             {/* handle Interior Cards */}
            {activeTab === "handle" && (

          <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-10"
              >

                    {/* Card 1 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 2 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 3 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 4 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>


                  

              </div>
            )}
             {/* Mesh Grill Cards */}
            {activeTab === "meshgrill" && (

          <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-10"
              >

                                    {/* Card 1 */}
                                  {/* Card 1 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 2 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 3 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 4 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>


                  

              </div>
            )}





        </div>
      </div>
    </section>
  );
}